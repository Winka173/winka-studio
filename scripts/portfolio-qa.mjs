import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const dir = ".review/portfolio-qa";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_EXECUTABLE ||
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const report = { pages: [], checks: [], errors: [], violations: [] };
const products = [
  ["bookmark", "apps/handy-bookmark"],
  ["sticky", "apps/sticky-wall"],
  ["forge", "apps/asset-forge-studio"],
  ["arcane", "games/arcane-brigade"],
  ["aether", "games/aetherward"],
  ["forgebound", "games/forgebound"],
  ["runavelle", "games/runavelle"],
  ["machine", "games/machine-brigade"],
  ["acs", "apps/autonomous-creative-studio"],
];
const cases = [
  ["home", "/en/"],
  ["home-vi", "/vi/"],
  ...products.map(([n, p]) => [n, `/en/${p}/`]),
  ...products.slice(0, 4).map(([n, p]) => [n + "-vi", `/vi/${p}/`]),
  ...[
    "boards",
    "habit",
    "spend",
    "keep",
    "recall",
    "tools",
    "docs",
    "media",
    "dev",
    "trip",
    "forms",
    "card",
    "widget",
  ].map((n) => ["handy-" + n, `/en/apps/handy-${n}/`]),
  ["catalog", "/en/apps/"],
  ["support", "/en/support/sticky-wall/"],
  ["legal", "/vi/apps/sticky-wall/privacy/"],
  ['bookmark-features','/vi/apps/handy-bookmark/features/'],
  ['bookmark-credits','/en/apps/handy-bookmark/credits/'],
  ['bookmark-changelog','/en/apps/handy-bookmark/changelog/'],
  ['bookmark-privacy','/vi/apps/handy-bookmark/privacy/'],
  ['sticky-features','/en/apps/sticky-wall/features/'],
  ['sticky-terms','/vi/apps/sticky-wall/terms/'],
  ['arcane-terms','/en/games/arcane-brigade/terms/'],
  ['arcane-press','/vi/games/arcane-brigade/press/'],
];
const audit = async (page, url, theme) => {
  const a = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  for (const v of a.violations)
    report.violations.push({
      url,
      theme,
      id: v.id,
      nodes: v.nodes
        .slice(0, 8)
        .map((n) => ({ target: n.target, summary: n.failureSummary })),
    });
};
try {
  const only = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7);
  for (const [name, url] of process.argv.includes("--flows-only")
    ? []
    : cases.filter(([n]) => !only || n.startsWith(only))) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "reduce",
      colorScheme: "light",
    });
    const page = await context.newPage();
    const external = new Set();
    page.on("pageerror", (e) => report.errors.push(`${url}: ${e.message}`));
    page.on("response", (r) => {
      if (r.status() >= 400)
        report.errors.push(`${url}: ${r.status()} ${r.url()}`);
    });
    page.on("request", (r) => {
      if (!r.url().startsWith(base) && !r.url().startsWith("data:"))
        external.add(r.url());
    });
    await page.goto(base + url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    if (/^\/(en|vi)\/(apps|games)\/[^/]+\/$/.test(url)) {
      assert.equal(await page.locator('#how-it-works').count(), 1, `${url}: missing product explanation`);
      assert.equal(await page.locator('#how-it-works .guide-steps > li').count(), 3, `${url}: incomplete workflow`);
      assert.ok((await page.locator('#how-it-works .guide-intro p').innerText()).length > 40);
      assert.equal(await page.locator('.landing-nav a[href="#how-it-works"]').count(), 1);
    }
    await audit(page, url, "default");
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({
        width,
        height: width === 1440 ? 1000 : 900,
      });
      await page.waitForTimeout(100);
      const layout = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        h1: document.querySelectorAll("main h1").length,
        broken: [...document.images]
          .filter((i) => i.complete && !i.naturalWidth)
          .map((i) => i.src),
        canvases: document.querySelectorAll("canvas").length,
      }));
      if (layout.scroll > width + 1)
        report.errors.push(
          `${url} ${width}: horizontal overflow ${layout.scroll}`,
        );
      if (layout.h1 !== 1)
        report.errors.push(`${url}: ${layout.h1} main h1 elements`);
      if (layout.broken.length)
        report.errors.push(`${url}: broken ${layout.broken}`);
      if (layout.canvases > 1)
        report.errors.push(`${url}: too many canvas contexts`);
      report.pages.push({ url, width, ...layout, external: [...external] });
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: `${dir}/${name}-${width}.png`,
          fullPage: true,
        });
    }
    assert.equal(external.size, 0, `${url}: external runtime requests`);
    const previous = await page
      .locator(".site")
      .evaluate((el) => getComputedStyle(el).getPropertyValue("--bg"));
    await page
      .getByRole("button", {
        name: url.startsWith("/vi/")
          ? "Đổi giao diện sáng tối"
          : "Change color theme",
      })
      .click();
    assert.notEqual(
      await page
        .locator(".site")
        .evaluate((el) => getComputedStyle(el).getPropertyValue("--bg")),
      previous,
      `${url}: palette must change`,
    );
    await audit(page, url, "alternate");
    await context.close();
    console.log(`PASS layout ${url}`);
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().includes("does-not-exist"))
      report.errors.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(base + "/en/apps/handy-bookmark/", {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: /Mobile/ }).click();
  assert.ok((await page.locator(".capture-card").count()) > 3);
  assert.equal(await page.locator(".capture-desktop").count(), 0);
  await page.getByRole("button", { name: /Show more views/ }).click();
  assert.ok((await page.locator(".capture-card").count()) > 6);
  await page.locator(".capture-card").first().click();
  assert.equal(await page.locator("dialog[open]").count(), 1);
  const first = await page.locator("dialog>img").getAttribute("src");
  await page.keyboard.press("ArrowRight");
  assert.notEqual(await page.locator("dialog>img").getAttribute("src"), first);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog[open]").count(), 0);
  await page.getByRole("button", { name: /Desktop/ }).click();
  assert.equal(await page.locator(".capture-mobile").count(), 0);
  report.checks.push(
    "Real screenshot gallery: platform filters, expanded views, modal, arrow keys, Escape and native focus restoration",
  );
  await page.goto(base + "/en/apps/asset-forge-studio/", {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "Side", exact: true }).click();
  assert.match(
    await page.locator(".forge-model-display img").getAttribute("src"),
    /tower-side/,
  );
  await page.getByRole("button", { name: "Inspection frame" }).click();
  assert.equal(await page.locator(".inspection-reticle").count(), 1);
  await page.goto(base + "/en/games/arcane-brigade/", {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: /Between the halls/ }).click();
  assert.match(
    await page.locator(".act-screen img").getAttribute("src"),
    /shop-01-overview/,
  );
  await page.goto(base + "/en/games/runavelle/", { waitUntil: "networkidle" });
  const range = page.getByRole("slider");
  await range.fill("75");
  assert.match(
    await page.locator(".compare-night").getAttribute("style"),
    /75%/,
  );
  await range.focus();
  await page.keyboard.press("ArrowLeft");
  assert.equal(await range.inputValue(), "74");
  report.checks.push(
    "Forge source view switching; Arcane combat/shop switch; keyboard-operable real day/night screenshot comparison",
  );
  await page.goto(base + "/en/", { waitUntil: "networkidle" });
  assert.equal(await page.locator(".project-case").count(), 4);
  assert.equal(
    await page.locator(".theatre-sticky,.project-theatre").count(),
    0,
  );
  await page.locator('.project-jump a[href="#work-sticky-wall"]').click();
  const block = page.locator("#work-sticky-wall");
  const before = await block.evaluate((el) => el.getBoundingClientRect().top);
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(250);
  const after = await block.evaluate((el) => el.getBoundingClientRect().top);
  assert.ok(
    Math.abs(before - after - 350) < 10,
    `Projects must move with native page scroll: ${before - after}`,
  );
  await block.locator(".case-enter").click();
  await page.waitForURL("**/en/apps/sticky-wall/");
  assert.equal(await page.locator("main h1").count(), 1);
  await page.getByRole("link", { name: "Chuyển sang tiếng Việt" }).click();
  await page.waitForURL("**/vi/apps/sticky-wall/");
  assert.equal(await page.locator("html").getAttribute("lang"), "vi");
  report.checks.push(
    "Four projects in native document flow, anchor navigation, wheel movement, client navigation and localized path preservation",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Mở menu" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Đóng menu" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button", { name: "Mở menu" }).count(), 1);
  await page.goto(base + "/en/apps/", { waitUntil: "networkidle" });
  await page.getByRole("searchbox").fill("Bookmark");
  assert.equal(await page.locator(".catalog-grid .product-card").count(), 1);
  await page.getByRole("button", { name: "Clear search" }).click();
  report.checks.push(
    "Mobile menu, Escape dismissal, product catalogue search and reset",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base + "/en/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  assert.equal(
    await page.locator(".liquid-backdrop").getAttribute("data-shader"),
    "ready",
    "WebGL shader must actually compile",
  );
  const frame = Number(await page.locator("canvas").getAttribute("data-frame"));
  await page.waitForTimeout(180);
  assert.ok(
    Number(await page.locator("canvas").getAttribute("data-frame")) > frame,
  );
  await page.getByRole("button", { name: "Pause animations" }).click();
  await page.waitForTimeout(100);
  const frozen = await page.locator("canvas").getAttribute("data-frame");
  await page.waitForTimeout(220);
  assert.equal(await page.locator("canvas").getAttribute("data-frame"), frozen);
  assert.equal(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
    0,
  );
  await page.getByRole("button", { name: "Resume animations" }).click();
  await page.waitForTimeout(120);
  assert.notEqual(
    await page.locator("canvas").getAttribute("data-frame"),
    frozen,
  );
  report.checks.push(
    "Original WebGL compiles and draws; global pause freezes canvas and CSS, then resumes",
  );
  await page.evaluate(() =>
    document
      .querySelector("canvas")
      .getContext("webgl")
      .getExtension("WEBGL_lose_context")
      .loseContext(),
  );
  await page.waitForTimeout(120);
  assert.equal(
    await page.locator(".liquid-backdrop").getAttribute("data-shader"),
    "fallback",
  );
  assert.equal(await page.locator("main h1").count(), 1);
  report.checks.push(
    "WebGL context loss leaves CSS artwork fallback and readable content",
  );
  await page.goto(base + "/en/games/aetherward/", { waitUntil: "networkidle" });
  await page.locator("video").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const v = document.querySelector("video");
    return v.readyState >= 2 && !v.paused && v.currentTime > 0.1;
  });
  await page.getByRole("button", { name: "Pause animations" }).click();
  await page.waitForTimeout(120);
  const time = await page.locator("video").evaluate((v) => v.currentTime);
  await page.waitForTimeout(250);
  assert.equal(
    await page.locator("video").evaluate((v) => v.currentTime),
    time,
  );
  assert.equal(await page.locator("video").evaluate((v) => v.paused), true);
  report.checks.push(
    "Actual native-frame gameplay decodes and plays; global pause stops video time",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base + "/en/games/aetherward/", { waitUntil: "networkidle" });
  await page.locator("video").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  assert.equal(await page.locator("video").getAttribute("src"), null);
  const still = await page.locator("canvas").getAttribute("data-frame");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(100);
  assert.ok(
    Number(await page.locator("canvas").getAttribute("data-frame")) >
      Number(still),
  );
  assert.equal(await page.locator("video").evaluate((v) => v.paused), true);
  report.checks.push(
    "Reduced-motion renders a still shader including after resize and does not download/autoplay videos",
  );
  const response = await page.goto(base + "/this-does-not-exist/");
  assert.equal(response.status(), 404);
  report.checks.push("Direct static 404");
  await context.close();
} catch (error) {
  report.errors.push(error.stack || error.message);
} finally {
  await browser.close();
}
const name = process.argv.includes("--flows-only")
  ? "flows"
  : process.argv.some((a) => a.startsWith("--only="))
    ? "targeted"
    : "report";
fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      pages: report.pages.length,
      checks: report.checks,
      errors: report.errors,
      violations: report.violations,
    },
    null,
    2,
  ),
);
if (report.errors.length || report.violations.length) process.exitCode = 1;
