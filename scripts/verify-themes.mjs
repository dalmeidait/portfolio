import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { serveStatic } from "./serve-static.mjs";
const server = await serveStatic({ port: 0 });
const base = `http://127.0.0.1:${server.address().port}/portfolio/`;
const output = "artifacts/final/themes";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.platform === "win32" ? { channel: "chrome" } : {}),
});
const report = [];
const violations = [];
const errors = [];
const routes = [
  "",
  "projetos/avanceos-microsoft-365/",
  "projetos/oficina-avance-on-premises/",
  "projetos/oficina-avance-migracao/",
];
try {
  for (const theme of ["dark", "light"]) {
    const context = await browser.newContext({
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [device, width, height] of [
      ["desktop", 1440, 1000],
      ["tablet", 768, 1024],
      ["mobile", 390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      for (const [index, route] of routes.entries()) {
        assert.equal((await page.goto(base + route)).status(), 200);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(
          await page.locator("html").getAttribute("data-theme"),
          theme,
        );
        assert.equal(await page.locator("h1").count(), 1);
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${device} ${route} overflow`,
        );
        const audit = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        violations.push(
          ...audit.violations.map((v) => ({
            theme,
            device,
            route,
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        );
        if (index === 0) {
          assert(
            !(await page.locator("body").innerText()).match(
              /Daniel Barros|Aviatrix|Tecnologia com propósito/,
            ),
          );
          assert.equal(
            await page.getByText("AI Agent Manager", { exact: true }).count(),
            1,
          );
          assert.deepEqual(
            await page.locator(".focus-list li").allTextContents(),
            [
              "Microsoft 365",
              "Microsoft Entra ID",
              "Microsoft Intune",
              "Windows Server",
              "Segurança",
            ],
          );
          await page.screenshot({
            path: `${output}/home-${device}-${theme}.png`,
            fullPage: true,
          });
          await page.screenshot({
            path: `${output}/hero-${device}-${theme}.png`,
          });
          if (device !== "tablet")
            for (const [name, selector] of [
              ["diagrama", ".cloud-architecture"],
              ["formacao", "#formacao"],
              ["foco", ".tech-strip"],
            ]) {
              const sectionHeight = await page
                .locator(selector)
                .evaluate((node) => node.getBoundingClientRect().height);
              // Give isolated section captures enough space beneath the sticky header.
              await page.setViewportSize({
                width,
                height: Math.max(height, Math.ceil(sectionHeight) + 220),
              });
              await page.locator(selector).screenshot({
                path: `${output}/${name}-${device}-${theme}.png`,
              });
              await page.setViewportSize({ width, height });
            }
          for (const id of ["sobre", "competencias", "projetos", "formacao"]) {
            await page.locator(`#${id}`).scrollIntoViewIfNeeded();
            await page.evaluate(
              (id) =>
                window.scrollTo(0, document.getElementById(id).offsetTop - 100),
              id,
            );
            await page.waitForTimeout(100);
            assert.equal(
              await page
                .locator(`.navigation a[href$="#${id}"]`)
                .getAttribute("aria-current"),
              "location",
            );
          }
        } else
          await page.screenshot({
            path: `${output}/projeto-${index}-${device}-${theme}.png`,
            fullPage: true,
          });
        report.push({
          theme,
          device,
          route: route || "home",
          accessibility: audit.violations.length === 0 ? "pass" : "fail",
        });
      }
    }
    await page.goto(base);
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .getByRole("button", { name: "Abrir menu" })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.locator('.navigation a[href$="#sobre"]').click();
    assert.equal(new URL(page.url()).hash, "#sobre");
    assert.equal(
      await page
        .getByRole("button", { name: "Abrir menu" })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page.getByRole("button", { name: "Tema claro", exact: true }).focus();
    await page.keyboard.press("Enter");
    const next = theme === "dark" ? "light" : "dark";
    await page.waitForFunction(
      (theme) => document.documentElement.dataset.theme === theme,
      next,
    );
    assert.equal(await page.locator("html").getAttribute("data-theme"), next);
    assert.equal(
      await page
        .getByRole("button", { name: "Tema claro", exact: true })
        .getAttribute("aria-pressed"),
      String(next === "light"),
    );
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("data-theme"), next);
    await page.goto(base + routes[1]);
    assert.equal(await page.locator("html").getAttribute("data-theme"), next);
    await page.emulateMedia({ colorScheme: next });
    await page.emulateMedia({ colorScheme: theme });
    assert.equal(await page.locator("html").getAttribute("data-theme"), next);
    await context.close();
  }
  const system = await browser.newContext({ colorScheme: "dark" });
  const systemPage = await system.newPage();
  await systemPage.goto(base);
  await systemPage.emulateMedia({ colorScheme: "light" });
  await systemPage.waitForFunction(
    () => document.documentElement.dataset.theme === "light",
  );
  assert.equal(
    await systemPage.locator("html").getAttribute("data-theme"),
    "light",
  );
  await system.close();
  // The bootstrap also resolves the theme before React or external scripts execute.
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({ colorScheme: theme });
    await context.route("**/*.js", (route) => route.abort());
    const page = await context.newPage();
    await page.goto(base);
    assert.equal(await page.locator("html").getAttribute("data-theme"), theme);
    await context.close();
  }
  await writeFile(
    `${output}/verification.json`,
    JSON.stringify(
      {
        report,
        violations,
        errors,
        themeBehavior:
          "keyboard, persistence, navigation, OS changes and prepaint bootstrap passed",
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({ pages: report.length, violations, errors }, null, 2),
  );
  assert.equal(violations.length, 0);
  assert.equal(errors.length, 0);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
