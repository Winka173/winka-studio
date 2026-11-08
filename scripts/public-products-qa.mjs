import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const apps = ["handy-bookmark", "sticky-wall", "handy-boards"];
const games = ["arcane-brigade", "aetherward", "forgebound", "machine-brigade", "runavelle"];
const allowed = new Set([...apps, ...games]);
const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const dir = ".review/public-products-qa";
fs.mkdirSync(dir, { recursive: true });
const routes = [];
function walk(folder) {
  for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, item.name);
    if (item.isDirectory()) walk(file);
    else if (item.name.endsWith(".html")) {
      const html = fs.readFileSync(file, "utf8");
      for (const match of html.matchAll(/href="\/(?:en|vi)\/(apps|games|support)\/([^/"?#]+)(?:\/|["?#])/g)) {
        assert(allowed.has(match[2]), `Hidden product link ${match[2]} in ${file}`);
      }
      const relative = path.relative("out", file).replaceAll("\\", "/");
      if (relative.endsWith("index.html")) routes.push("/" + relative.slice(0, -10));
      const productRoute = relative.match(/^(?:en|vi)\/(?:apps|games|support)\/([^/]+)\//);
      if (productRoute) assert(allowed.has(productRoute[1]), `Hidden export: ${relative}`);
      assert(!relative.includes("/directions/"), `Archived direction is public: ${relative}`);
    }
  }
}
walk("out");
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_EXECUTABLE || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const report = { exportRoutes: routes.length, layouts: [], errors: [], violations: [] };
let expectedMissingUrl = "";
page.on("pageerror", (error) => report.errors.push(error.message));
page.on("response", (response) => { if (response.status() >= 400 && response.url() !== expectedMissingUrl) report.errors.push(`${response.status()} ${response.url()}`); });
try {
  for (const locale of ["en", "vi"]) {
    for (const route of ["", "apps/", "games/", "lab/", "about/", "support/", "legal/", ...apps.map((s) => `apps/${s}/`), ...games.map((s) => `games/${s}/`)]) {
      const response = await page.goto(`${base}/${locale}/${route}`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const product = route.match(/^(apps|games)\/([^/]+)\/$/);
      if (product) {
        assert(!/Now on Google Play|Đã có trên Google Play/.test(await page.locator("main").innerText()), "A coming-soon product claims to be released");
        const stores = page.locator(".product-actions .product-store-list");
        const expected = ["App Store", "Google Play", "Microsoft Store", ...(product[1] === "games" ? ["Steam"] : [])];
        assert.deepEqual(await stores.locator("button > span").allTextContents(), expected);
        for (const button of await stores.locator("button").all()) {
          assert(await button.isDisabled());
          assert((await button.textContent()).includes("Coming soon"));
        }
        assert.equal(await stores.locator("a").count(), 0);
      }
      if (route === "apps/" || route === "games/") {
        const actual = await page.locator(".product-card").evaluateAll((links) => links.map((link) => link.getAttribute("href").split("/").filter(Boolean).at(-1)).sort());
        assert.deepEqual(actual, [...(route === "apps/" ? apps : games)].sort());
      }
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${locale}/${route}/${width} overflow`);
        report.layouts.push({ locale, route, width });
      }
      if (locale === "vi" && ["", "apps/handy-bookmark/", "apps/handy-boards/", "games/arcane-brigade/"].includes(route)) {
        await page.screenshot({ path: `${dir}/${route.replaceAll("/", "-") || "home"}.jpg`, type: "jpeg", quality: 80 });
      }
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      report.violations.push(...axe.violations.map((v) => ({ locale, route, id: v.id, nodes: v.nodes.map((n) => n.target) })));
    }
  }
  expectedMissingUrl = `${base}/vi/apps/asset-forge-studio/`;
  const response = await page.goto(expectedMissingUrl);
  assert.equal(response.status(), 404);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.violations, []);
} finally {
  await browser.close();
  fs.writeFileSync(`${dir}/report.json`, JSON.stringify(report, null, 2));
}
console.log(`PASS: ${routes.length} exported routes contain no hidden product pages/links; ${report.layouts.length} responsive cases; all release stores say Coming soon; no runtime or axe errors.`);
