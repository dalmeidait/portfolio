import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";

// Uses an installed browser on Windows; in CI run `npx playwright install chromium`.
const browser = await chromium.launch({
  ...(process.platform === "win32" ? { channel: "chrome" } : {}),
  headless: true,
});
const base = process.env.TEST_URL || "http://127.0.0.1:4173/portfolio/";
await mkdir("artifacts", { recursive: true });
const report = [];
const errors = [];
const context = await browser.newContext({ reducedMotion: "reduce" });
context.on("page", (page) => {
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(base) && response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
});
const page = await context.newPage();
for (const [device, width, height] of [
  ["desktop", 1440, 1000],
  ["tablet", 768, 1024],
  ["mobile", 390, 844],
]) {
  await page.setViewportSize({ width, height });
  const response = await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").count(), 1);
  assert(
    await page
      .locator("h1")
      .innerText()
      .then((text) => text.includes("Daniel")),
  );
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    `Horizontal overflow: ${device}`,
  );
  await page.screenshot({
    path: `artifacts/home-${device}.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `artifacts/hero-${device}.png` });
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  await writeFile(
    `artifacts/accessibility-${device}.json`,
    JSON.stringify(accessibility.violations, null, 2),
  );
  assert.equal(
    accessibility.violations.length,
    0,
    JSON.stringify(
      accessibility.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
    ),
  );
  for (const href of await page
    .locator("a[href]")
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href) => href.startsWith("#")),
    )) {
    assert(await page.locator(href).count(), `Missing section: ${href}`);
  }
  if (device === "mobile") {
    const toggle = page.getByRole("button", { name: "Abrir menu" });
    await toggle.click();
    assert.equal(
      await page
        .getByRole("button", { name: "Fechar menu" })
        .getAttribute("aria-expanded"),
      "true",
    );
    await page.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    await toggle.click();
    await page
      .locator("#navigation")
      .getByRole("link", { name: "Projetos", exact: true })
      .click();
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    await page.waitForURL("**/#projetos");
    const y = await page
      .locator("#projetos")
      .evaluate((element) => element.getBoundingClientRect().top);
    assert(y >= 70 && y < 200, `Anchor obscured by header: ${y}`);
  }
  report.push(`${device}: home, layout, screenshot, section anchors OK`);
}
const projectPaths = await page
  .locator(".project-link")
  .evaluateAll((links) => links.map((link) => link.href));
assert.equal(projectPaths.length, 3);
for (const url of projectPaths) {
  for (const [device, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    assert.equal(
      (await page.goto(url, { waitUntil: "networkidle" })).status(),
      200,
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").count(), 1);
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    for (const id of [
      "objetivos",
      "arquitetura",
      "implementacao",
      "evidencias",
      "desafios",
      "resultados",
    ])
      assert.equal(await page.locator(`#${id}`).count(), 1);
    assert(await page.title().then((title) => title.includes(awaitTitle(url))));
    await page.screenshot({
      path: `artifacts/${url.split("/").filter(Boolean).at(-1)}-${device}.png`,
      fullPage: true,
    });
    for (const href of await page
      .locator(".detail-nav a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
      assert(await page.locator(href).count());
    report.push(
      `${device}: ${url}, direct route + reload + content + layout OK`,
    );
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base);
await page.keyboard.press("Tab");
assert.equal(
  await page.evaluate(() => document.activeElement.textContent),
  "Pular para o conteúdo",
);
await page.keyboard.press("Enter");
assert.equal(await page.evaluate(() => document.activeElement.id), "conteudo");
const external = await page
  .locator('a[target="_blank"]')
  .evaluateAll((links) =>
    links.map((link) => ({ href: link.href, rel: link.rel })),
  );
assert(
  external.every(
    (link) => link.rel.includes("noopener") && link.rel.includes("noreferrer"),
  ),
);
assert(
  external.every((link) =>
    [
      "https://github.com/dalmeidait",
      "https://www.linkedin.com/in/danielbarrosalmeida/",
    ].includes(link.href),
  ),
);
await page.goto(`${base}404.html`);
assert(
  await page
    .getByRole("heading", { name: "Vamos voltar ao início." })
    .isVisible(),
);
assert.equal(errors.length, 0, errors.join("\n"));
report.push(
  "Keyboard skip link, external URL destinations, safe new tabs, 404 and zero runtime/asset errors OK",
);
await writeFile(
  "artifacts/verification.json",
  JSON.stringify({ base, report, errors }, null, 2),
);
console.log(report.join("\n"));
await browser.close();
function awaitTitle(url) {
  return url.includes("avanceos") ? "AvanceOS" : "Oficina Avance";
}
