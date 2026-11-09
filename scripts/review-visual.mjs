import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

// Requires current preview on 4173. Starts an isolated baseline preview.
const baseline = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "preview",
    "--outDir",
    "artifacts/before/dist",
    "--port",
    "4175",
    "--strictPort",
    "--host",
    "127.0.0.1",
  ],
  { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
);
await new Promise((resolve, reject) => {
  baseline.stdout.on("data", (data) => {
    if (data.toString().includes("Local:")) resolve();
  });
  baseline.on("error", reject);
  baseline.on("exit", (code) =>
    reject(new Error(`Baseline preview exited: ${code}`)),
  );
});
process.on("exit", () => baseline.kill());
const browser = await chromium.launch({
  ...(process.platform === "win32" ? { channel: "chrome" } : {}),
  headless: true,
});
const current = "http://127.0.0.1:4173/portfolio/";
const previous = "http://127.0.0.1:4175/portfolio/";
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const old = await context.newPage();
const report = [];
await mkdir("artifacts/review", { recursive: true });
await Promise.all([page.goto(current), old.goto(previous)]);
const normalize = (text) => text.replace(/\s+/g, " ").trim();
for (const selector of [
  ".hero-copy",
  "#sobre",
  "#competencias",
  "#formacao",
  "#contato",
  ".footer",
]) {
  assert.equal(
    normalize(await page.locator(selector).innerText()),
    normalize(await old.locator(selector).innerText()),
    `Changed content: ${selector}`,
  );
}
for (let index = 0; index < 3; index++) {
  const revised = (
    await page.locator(".project-body").nth(index).innerText()
  ).replace("PROJETO PRINCIPAL", "");
  assert.equal(
    normalize(revised),
    normalize(await old.locator(".project-body").nth(index).innerText()),
  );
}
report.push(
  "Conteúdo preservado: hero, biografia, competências, projetos, formação, contato e rodapé.",
);
for (const [device, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  await Promise.all([
    page.setViewportSize({ width, height }),
    old.setViewportSize({ width, height }),
  ]);
  for (const [version, target] of [
    ["after", page],
    ["before", old],
  ]) {
    await target.evaluate(() => document.fonts.ready);
    for (const [name, selector] of [
      ["hero", ".hero"],
      ["skills", "#competencias"],
      ["projects", "#projetos"],
    ]) {
      await target.evaluate(() => window.scrollTo(0, 0));
      const bounds = await target.locator(selector).boundingBox();
      await target.screenshot({
        path: `artifacts/review/${version}-${name}-${device}.png`,
        fullPage: true,
        clip: { x: 0, y: bounds.y, width, height: Math.ceil(bounds.height) },
      });
    }
  }
}
for (const width of [320, 620, 621, 900, 1024, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(current);
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    `Overflow at ${width}px`,
  );
}
report.push(
  "Sem overflow em 320, 620, 621, 900, 1024 e 1920 px, além das resoluções do teste original.",
);
const projectUrls = await page
  .locator(".project-link")
  .evaluateAll((links) => links.map((link) => link.href));
for (const url of projectUrls) {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(url);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
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
  }
  await old.goto(url.replace(":4173", ":4175"));
  assert.equal(
    normalize(await page.locator(".detail-content").innerText()),
    normalize(await old.locator(".detail-content").innerText()),
  );
}
report.push(
  "Axe WCAG A/AA: zero violações nas três páginas de projeto, em mobile e desktop; textos técnicos preservados.",
);
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.goto(current);
await page.locator("#competencias").scrollIntoViewIfNeeded();
await page.waitForFunction(() =>
  Array.from(document.querySelectorAll("#competencias .reveal")).every(
    (el) => getComputedStyle(el).opacity === "1",
  ),
);
await page.emulateMedia({ reducedMotion: "reduce" });
assert.equal(
  await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  ),
  "auto",
);
report.push(
  "Revelação na rolagem funciona; movimento reduzido desativa rolagem animada.",
);
await writeFile(
  "artifacts/review/validation.json",
  JSON.stringify({ report }, null, 2),
);
console.log(report.join("\n"));
await browser.close();
baseline.kill();
