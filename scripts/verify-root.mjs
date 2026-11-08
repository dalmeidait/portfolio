import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  ...(process.platform === "win32" ? { channel: "chrome" } : {}),
  headless: true,
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400) errors.push(response.url());
});
const origin = "http://127.0.0.1:4174";
await page.goto(origin, { waitUntil: "networkidle" });
const routes = await page
  .locator(".project-link")
  .evaluateAll((links) => links.map((link) => link.href));
assert.equal(routes.length, 3);
for (const route of routes) {
  assert(!route.includes("/portfolio/"));
  assert.equal(
    (await page.goto(route, { waitUntil: "networkidle" })).status(),
    200,
  );
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator("#evidencias").count(), 1);
  assert(
    !(
      await page.locator('link[rel="canonical"]').getAttribute("href")
    ).includes("/portfolio/"),
  );
}
assert.deepEqual(errors, []);
await writeFile(
  "artifacts/root-verification.json",
  JSON.stringify({ origin, routes, errors, status: "passed" }, null, 2),
);
await browser.close();
console.log(
  "Root deployment: home, all project routes, reloads, assets and canonical URLs passed.",
);
