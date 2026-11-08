import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { serveStatic } from "./serve-static.mjs";

const server = await serveStatic({ port: 0 });
const origin = `http://127.0.0.1:${server.address().port}`;
const base = `${origin}/portfolio/`;
const report = [];
let browser;
await mkdir("artifacts/final", { recursive: true });
try {
  await new Promise((resolve, reject) => {
    const test = spawn(process.execPath, ["scripts/verify.mjs"], {
      windowsHide: true,
      stdio: "inherit",
      env: { ...process.env, TEST_URL: base },
    });
    test.on("error", reject);
    test.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`Original UI suite: ${code}`)),
    );
  });
  await copyFile(
    "artifacts/verification.json",
    "artifacts/final/original-suite.json",
  );
  report.push(
    "Suíte original aprovada no servidor estático, sem fallback de SPA.",
  );
  browser = await chromium.launch({
    ...(process.platform === "win32" ? { channel: "chrome" } : {}),
    headless: true,
  });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const routes = [
    "",
    "projetos/avanceos-microsoft-365/",
    "projetos/oficina-avance-on-premises/",
    "projetos/oficina-avance-migracao/",
  ];
  const links = new Set();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [device, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      const name = route ? route.split("/")[1] : "home";
      await page.screenshot({
        path: `artifacts/final/${name}-${device}.png`,
        fullPage: true,
      });
      if (!route) {
        await page.screenshot({ path: `artifacts/final/hero-${device}.png` });
        for (const section of [
          "sobre",
          "competencias",
          "projetos",
          "formacao",
          "contato",
        ]) {
          const bounds = await page.locator(`#${section}`).boundingBox();
          await page.screenshot({
            path: `artifacts/final/section-${section}-${device}.png`,
            fullPage: true,
            clip: {
              x: 0,
              y: bounds.y,
              width,
              height: Math.ceil(bounds.height),
            },
          });
        }
      } else {
        assert(
          await page
            .getByText("Evidências ainda não disponibilizadas", { exact: true })
            .isVisible(),
        );
        assert(
          await page
            .locator("#resultados")
            .innerText()
            .then((text) => text.includes("ainda não foram disponibilizados")),
        );
      }
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      await writeFile(
        `artifacts/final/axe-${name}-${device}.json`,
        JSON.stringify(audit.violations, null, 2),
      );
      assert.equal(
        audit.violations.length,
        0,
        JSON.stringify(
          audit.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ),
      );
      for (const href of await page
        .locator("a[href]")
        .evaluateAll((items) => items.map((item) => item.href)))
        if (href.startsWith(base)) links.add(href);
      report.push(
        `${name} ${width}×${height}: HTTP 200, layout, captura e Axe A/AA aprovados.`,
      );
    }
  }
  // Check every distinct internal page/fragment discovered in the actual rendered UI.
  const grouped = new Map();
  for (const link of links) {
    const url = new URL(link);
    const key = url.origin + url.pathname;
    if (!grouped.has(key)) grouped.set(key, new Set());
    if (url.hash) grouped.get(key).add(url.hash);
  }
  for (const [url, fragments] of grouped) {
    assert.equal((await page.goto(url)).status(), 200);
    for (const hash of fragments)
      assert.equal(
        await page.locator(hash).count(),
        1,
        `Missing anchor ${url}${hash}`,
      );
  }
  for (const route of routes) {
    assert.equal((await page.goto(base + route + "index.html")).status(), 200);
    assert.equal(
      await page.locator(route ? ".detail-content" : ".hero-copy").count(),
      1,
    );
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    assert.equal(canonical, `https://dalmeidait.github.io/portfolio/${route}`);
  }
  const legacy = [
    ["avanceos-m365.html", "avanceos-microsoft-365"],
    ["oficina-avance-onpremises.html", "oficina-avance-on-premises"],
    ["oficina-avance-migracao-m365.html", "oficina-avance-migracao"],
  ];
  for (const [old, slug] of legacy) {
    await page.goto(`${base}projetos/${old}`);
    await page.waitForURL(`${base}projetos/${slug}/`);
    assert.equal(await page.locator(".detail-content").count(), 1);
  }
  assert.equal((await page.goto(`${base}inexistente/`)).status(), 404);
  assert(
    await page
      .getByRole("heading", { name: "Vamos voltar ao início." })
      .isVisible(),
  );
  const sitemap = await page.request.get(`${base}sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  for (const route of routes)
    assert(
      (await sitemap.text()).includes(
        `https://dalmeidait.github.io/portfolio/${route}`,
      ),
    );
  assert.deepEqual(errors, []);
  report.push(
    `${links.size} links internos verificados; index.html explícito, canonical, três URLs legadas, sitemap e HTTP 404 aprovados.`,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base);
  for (const id of [
    "sobre",
    "competencias",
    "projetos",
    "formacao",
    "contato",
  ]) {
    const selector = `#${id} .reveal`;
    for (
      let index = 0;
      index < (await page.locator(selector).count());
      index++
    ) {
      await page.locator(selector).nth(index).scrollIntoViewIfNeeded();
      await page.waitForFunction(
        ([selector, index]) =>
          getComputedStyle(document.querySelectorAll(selector)[index])
            .opacity === "1",
        [selector, index],
      );
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  report.push(
    "Rolagem/revelação e movimento reduzido aprovados; nenhum erro JavaScript.",
  );
  await writeFile(
    "artifacts/final/release-validation.json",
    JSON.stringify({ status: "passed", report }, null, 2),
  );
  console.log(report.join("\n"));
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
