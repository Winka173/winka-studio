import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const executable =
  process.env.BROWSER_EXECUTABLE ||
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const dir = ".review/world-screenshots";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({
  executablePath: executable,
  headless: true,
  args: ["--disable-gpu"],
});
const report = { pages: [], checks: [], errors: [], violations: [] };
const cases = [
  ["home", "/en/"],
  ["home-vi", "/vi/"],
  ["bookmark-en", "/en/apps/handy-bookmark/"],
  ["bookmark", "/vi/apps/handy-bookmark/"],
  ["sticky", "/en/apps/sticky-wall/"],
  ["sticky-vi", "/vi/apps/sticky-wall/"],
  ["forge", "/en/apps/asset-forge-studio/"],
  ["forge-vi", "/vi/apps/asset-forge-studio/"],
  ["arcane", "/en/games/arcane-brigade/"],
  ["arcane-vi", "/vi/games/arcane-brigade/"],
  ["acs", "/en/apps/autonomous-creative-studio/"],
  ["aether", "/en/games/aetherward/"],
  ["forgebound", "/en/games/forgebound/"],
  ["runavelle", "/en/games/runavelle/"],
  ["machine", "/en/games/machine-brigade/"],
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
  ].map((n) => [`handy-${n}`, `/en/apps/handy-${n}/`]),
  ["legal", "/vi/apps/sticky-wall/privacy/"],
  ["support", "/en/support/arcane-brigade/"],
  ["catalog", "/en/apps/"],
];
try {
  const only=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7);
  for (const [name, url] of process.argv.includes('--flows-only') ? [] : cases.filter(([name])=>!only||name.startsWith(only))) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) =>
      report.errors.push(`${url}: ${error.message}`),
    );
    page.on("response", (response) => {
      if (response.status() >= 400)
        report.errors.push(`${url}: ${response.status()} ${response.url()}`);
    });
    const external = new Set();
    page.on("request", (request) => {
      if (!request.url().startsWith(base) && !request.url().startsWith("data:"))
        external.add(request.url());
    });
    await page.goto(base + url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    for (const v of audit.violations)
      report.violations.push({
        page: url,
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes
          .slice(0, 8)
          .map((n) => ({ target: n.target, summary: n.failureSummary })),
      });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({
        width,
        height: width === 1440 ? 1000 : width === 768 ? 1024 : 800,
      });
      await page.waitForTimeout(150);
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        broken: [...document.images]
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
        headings: document.querySelectorAll("main h1").length,
        clippedCopy: [...document.querySelectorAll('.door-copy')].filter(el=>el.getBoundingClientRect().width>el.parentElement.getBoundingClientRect().width+1).length,
      }));
      if (layout.scroll > width + 1)
        report.errors.push(
          `${url} ${width}: horizontal overflow ${layout.scroll}`,
        );
      if (layout.broken.length)
        report.errors.push(
          `${url} ${width}: broken images ${layout.broken.join(",")}`,
        );
      if (layout.headings !== 1)
        report.errors.push(`${url}: ${layout.headings} main h1 elements`);
      if(layout.clippedCopy) report.errors.push(`${url} ${width}: clipped product-door copy`);
      const file = path.join(dir, `${name}-${width}.png`);
      if (width === 390 || width === 1440)
        await page.screenshot({ path: file, fullPage: true });
      report.pages.push({
        url,
        width,
        ...layout,
        externalRequests: [...external],
      });
    }
    assert.equal(
      external.size,
      0,
      `${url}: unexpected external runtime request`,
    );
    if (await page.locator(".site").count()) {
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
      const next = await page
        .locator(".site")
        .evaluate((el) => getComputedStyle(el).getPropertyValue("--bg"));
      assert.notEqual(
        previous,
        next,
        `${url}: theme must change the actual palette`,
      );
      const alternateAudit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      for (const v of alternateAudit.violations)
        report.violations.push({
          page: url,
          theme: "alternate",
          id: v.id,
          impact: v.impact,
          nodes: v.nodes
            .slice(0, 5)
            .map((n) => ({ target: n.target, summary: n.failureSummary })),
        });
    }
    await context.close();
    console.log(`Reviewed ${url} — 320 / 390 / 768 / 1440`);
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(base + "/en/apps/", { waitUntil: "networkidle" });
  await page.getByRole("searchbox").fill("Bookmark");
  assert.equal(await page.locator(".catalog-grid .product-card").count(), 1);
  await page.getByRole("button", { name: "Clear search" }).click();
  await page
    .getByRole("button", { name: "Creative tools", exact: true })
    .click();
  assert.equal(await page.locator(".catalog-grid .product-card").count(), 2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.locator(".catalog-status select").selectOption("complete");
  assert.equal(await page.locator(".catalog-grid .product-card").count(), 3);
  await page.getByRole("searchbox").fill("zzzznothing");
  assert.equal(
    await page.getByRole("heading", { name: "No products found" }).count(),
    1,
  );
  report.checks.push(
    "Search, clear, family and completion filters, no-results state",
  );
  await page.goto(base + "/en/apps/sticky-wall/", { waitUntil: "networkidle" });
  const before = await page.locator(".site").getAttribute("data-preference");
  await page.getByRole("button", { name: "Change color theme" }).click();
  await page.waitForTimeout(100);
  const after = await page.locator(".site").getAttribute("data-preference");
  assert.notEqual(before, after);
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page.locator(".site").getAttribute("data-preference"),
    after,
  );
  await page.getByRole("link", { name: "Chuyển sang tiếng Việt" }).click();
  await page.waitForURL("**/vi/apps/sticky-wall/");
  assert.equal(await page.locator("html").getAttribute("lang"), "vi");
  report.checks.push(
    "Theme toggle and persistence; language switch preserves product path",
  );
  await page.setViewportSize({ width: 360, height: 800 });
  await page.getByRole("button", { name: "Mở menu" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Đóng menu" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.getByRole("button", { name: "Đóng menu" }).click();
  await page.goto(base + "/en/support/sticky-wall/", {
    waitUntil: "networkidle",
  });
  await page
    .locator("summary")
    .filter({ hasText: "Does locking a board encrypt its notes?" })
    .click();
  assert.equal(await page.locator("details[open]").count(), 1);
  report.checks.push(
    "Mobile navigation open/close; source-specific FAQ disclosure",
  );
  await page.goto(base + "/en/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent),
    "Skip to content",
  );
  const animations = await page
    .locator(".reveal-words .word-mask>span")
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  assert.equal(animations, "none");
  report.checks.push(
    "Keyboard skip link; reduced-motion disables authored hero animation",
  );
  await page.goto(base + "/en/apps/handy-bookmark/", {
    waitUntil: "networkidle",
  });
  await page.getByRole("tab", { name: "Collections", exact: true }).click();
  assert.equal(
    await page.locator("#bookmark-screen img").getAttribute("src"),
    "/products/handy-bookmark/collection.webp",
  );
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await page
      .getByRole("tab", { name: "Focus", exact: true })
      .getAttribute("aria-selected"),
    "true",
  );
  await page.goto(base + "/en/apps/sticky-wall/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Rearrange the board" }).click();
  assert.equal(
    await page.locator(".sticky-interactive.arrangement-1").count(),
    1,
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
    /runtime-shop/,
  );
  report.checks.push(
    "Product interactions: Bookmark mouse and arrow-key tabs, Sticky rearrangement, Forge view and inspection frame, Arcane scene switch",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base + "/en/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1100);
  const running = await page.evaluate(
    () =>
      document.getAnimations().filter((a) => a.playState === "running").length,
  );
  assert.ok(running > 0, "Normal mode must have actual animations");
  await page.getByRole("button", { name: "Pause animations" }).click();
  await page.waitForTimeout(100);
  assert.equal(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
    0,
  );
  await page.getByRole("button", { name: "Resume animations" }).click();
  assert.equal(
    await page.locator(".site").getAttribute("data-animation-paused"),
    "false",
  );
  report.checks.push(
    "Normal motion is active; global pause freezes authored CSS animations and resumes",
  );
  await page.locator('.drawer-sticky').click();
  await page.waitForURL('**/en/apps/sticky-wall/');
  const chapter=page.locator('.sticky-section-title');
  await chapter.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('.sticky-section-title')?.getAttribute('data-seen')==='true');
  await page.waitForTimeout(850);
  assert.equal(await chapter.evaluate(el=>getComputedStyle(el).opacity),'1');
  report.checks.push('Client navigation reinitializes scene observers; product chapter remains visible after entering from home');
  const response = await page.goto(base + "/this-page-does-not-exist/");
  assert.equal(response.status(), 404);
  assert.equal(
    await page.getByRole("heading", { name: "A small detour." }).count(),
    1,
  );
  report.checks.push("Custom directly served 404");
  await context.close();
} catch (error) {
  report.errors.push(error.stack || error.message);
} finally {
  await browser.close();
}
fs.writeFileSync(process.argv.includes('--flows-only') ? '.review/browser-flows.json' : process.argv.some(arg=>arg.startsWith('--only=')) ? '.review/browser-targeted.json' : ".review/browser-qa.json", JSON.stringify(report, null, 2));
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
