import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const dir = ".review/workbench-qa";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_EXECUTABLE ||
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const report = { layouts: [], checks: [], errors: [], violations: [] };
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.on("pageerror", (e) => report.errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`);
});
const cases = [
  ["home", ""],
  ["lab", "lab/"],
  ["studio", "about/"],
  ["contact", "contact/"],
  ["bookmark", "apps/handy-bookmark/"],
  ["sticky", "apps/sticky-wall/"],
  ["forge", "apps/asset-forge-studio/"],
  ["arcane", "games/arcane-brigade/"],
];
try {
  for (const locale of process.argv.includes("--flows-only")
    ? []
    : ["vi", "en"])
    for (const [name, path] of cases) {
      await page.goto(`${base}/${locale}/${path}`, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("main h1").count(), 1);
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({
          width,
          height: width === 1440 ? 900 : 844,
        });
        await page.waitForTimeout(70);
        const layout = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          height: document.querySelector("main").offsetHeight,
          brokenImages: [...document.querySelectorAll("main img")]
            .filter(
              (i) =>
                i.getBoundingClientRect().height &&
                i.complete &&
                !i.naturalWidth,
            )
            .map((i) => i.src),
        }));
        report.layouts.push({ locale, name, ...layout });
        assert.ok(
          layout.scrollWidth <= width,
          `${locale}/${name}/${width} horizontal overflow`,
        );
        assert.deepEqual(layout.brokenImages, []);
        if (locale === "vi" && [390, 1440].includes(width)) {
          // Native lazy loading is intentionally retained; visit the document before the full-page proof.
          await page.evaluate(async () => {
            for (
              let y = 0;
              y < document.body.scrollHeight;
              y += innerHeight * 0.8
            ) {
              scrollTo(0, y);
              await new Promise((resolve) => setTimeout(resolve, 25));
            }
            scrollTo(0, 0);
          });
          await page.waitForTimeout(120);
          await page.screenshot({
            path: `${dir}/${name}-${width}.jpg`,
            type: "jpeg",
            quality: 80,
            fullPage: true,
          });
        }
      }
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      for (const violation of audit.violations)
        report.violations.push({
          locale,
          name,
          id: violation.id,
          nodes: violation.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        });
      console.log(`Reviewed ${locale}/${name}`);
    }
  if (!process.argv.includes("--flows-only"))
    report.checks.push(
      "All eight reworked destinations in both locales, four widths, real image loading and WCAG audit.",
    );

  await page.goto(`${base}/en/apps/handy-bookmark/`, {
    waitUntil: "networkidle",
  });
  assert.ok((await page.locator(".capture-desktop").count()) > 0);
  assert.ok((await page.locator(".capture-mobile").count()) > 0);
  await page.locator(".filing-collections button").nth(1).click();
  assert.equal(
    await page
      .locator(".filing-collections button")
      .nth(1)
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.match(
    await page.locator(".filing-demo [role=status]").innerText(),
    /Travel/,
  );
  await page.getByRole("button", { name: /Try again/ }).click();
  assert.equal(
    await page.locator(".filing-path").getAttribute("data-filed"),
    "false",
  );
  await page.locator(".bookmark-kit-desktop .image-preview-trigger").click();
  assert.equal(await page.locator(".image-preview-dialog[open]").count(), 1);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".image-preview-dialog[open]").count(), 0);
  report.checks.push(
    "Bookmark collection demo, status, reset and full capture enlargement with Escape.",
  );

  await page.goto(`${base}/en/apps/sticky-wall/`, { waitUntil: "networkidle" });
  const paper = page.locator(".sandbox-paper").first();
  const before = await paper.getAttribute("style");
  await page.getByRole("button", { name: "Move note 1", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  assert.notEqual(await paper.getAttribute("style"), before);
  await page.getByRole("button", { name: "Move down", exact: true }).click();
  await page.getByRole("button", { name: "Threads", exact: false }).click();
  assert.equal(await page.locator(".sandbox-board path").count(), 0);
  await page.setViewportSize({ width: 390, height: 844 });
  for (let i = 0; i < 20; i++)
    await page.getByRole("button", { name: "Move right", exact: true }).click();
  for (let i = 0; i < 20; i++)
    await page.getByRole("button", { name: "Move down", exact: true }).click();
  const bounds = await paper.evaluate((el) => {
    const r = el.getBoundingClientRect(),
      b = el.closest(".sandbox-board").getBoundingClientRect();
    return {
      right: r.right,
      bottom: r.bottom,
      boardRight: b.right,
      boardBottom: b.bottom,
    };
  });
  assert.ok(
    bounds.right <= bounds.boardRight + 5 &&
      bounds.bottom <= bounds.boardBottom + 5,
    JSON.stringify(bounds),
  );
  await page.getByRole("button", { name: "Reset notes", exact: true }).click();
  await page.screenshot({
    path: `${dir}/sticky-playground-390.jpg`,
    type: "jpeg",
    quality: 85,
  });
  report.checks.push(
    "Sticky keyboard movement, single-pointer movement buttons, yarn toggle, mobile bounds and reset.",
  );

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/en/apps/asset-forge-studio/`, {
    waitUntil: "networkidle",
  });
  assert.equal(
    await page.locator(".model-canvas canvas").count(),
    0,
    "Reduced motion must not auto-load the model",
  );
  await page.getByRole("button", { name: /Open 3D model/ }).click();
  await page
    .locator("canvas[data-model-loaded=true]")
    .waitFor({ timeout: 30000 });
  await page.getByRole("button", { name: "Clay", exact: true }).click();
  await page.getByRole("button", { name: "Rotate right", exact: true }).click();
  await page
    .locator(".forge-model-inspector")
    .screenshot({ path: `${dir}/forge-clay.png` });
  await page.getByRole("button", { name: "Wireframe", exact: true }).click();
  await page
    .locator(".forge-model-inspector")
    .screenshot({ path: `${dir}/forge-wireframe.png` });
  assert.equal(
    await page
      .getByRole("button", { name: "Wireframe", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.getByRole("button", { name: "Texture", exact: true }).click();
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page
    .locator(".forge-model-inspector")
    .screenshot({ path: `${dir}/forge-texture.png` });
  report.checks.push(
    "Real GLB loaded and rendered; texture/clay/wireframe, rotate and reset; reduced-motion opt-in.",
  );

  await page.goto(`${base}/en/games/arcane-brigade/`, {
    waitUntil: "networkidle",
  });
  assert.equal(await page.locator(".hero-selection-roster button").count(), 24);
  await page.locator(".hero-selection-roster button").nth(1).click();
  await expect(page.locator(".hero-skill-copy h3")).toHaveText("Postmaster");
  assert.match(
    await page
      .locator(".hero-skill-scene .image-preview-trigger img")
      .getAttribute("src"),
    /skill-02-Postmaster/,
  );
  await page.locator(".hero-selection-roster button").last().click();
  await expect(
    page.locator(".hero-skill-scene .image-preview-trigger img"),
  ).toHaveAttribute("src", /skill-24-/);
  report.checks.push(
    "All 24 heroes in the game today selectable with corresponding real skill capture (heroes held for later updates and acts stay hidden).",
  );

  await page.goto(`${base}/en/lab/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Tools", exact: true }).click();
  assert.equal(await page.locator(".lab-project").count(), 1);
  assert.equal(await page.locator(".lab-handy-modules > a").count(), 13);
  await page.getByRole("button", { name: "Game worlds", exact: true }).click();
  assert.equal(await page.locator(".lab-project").count(), 4);
  report.checks.push(
    "Lab filters and all thirteen developing Handy tools are separate from completed work.",
  );

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(`${base}/en/`, { waitUntil: "networkidle" });
  assert.equal(
    await page.locator(".studio-reel-dialog video").getAttribute("src"),
    null,
  );
  await page.getByRole("button", { name: /24 seconds inside/ }).click();
  await page.waitForFunction(() => {
    const v = document.querySelector(".studio-reel-dialog video");
    return v.readyState >= 2 && v.currentTime > 0.1;
  });
  const reel = await page
    .locator(".studio-reel-dialog video")
    .evaluate((v) => ({
      duration: v.duration,
      muted: v.muted,
      width: v.videoWidth,
    }));
  assert.ok(Math.abs(reel.duration - 24) < 0.2);
  assert.equal(reel.width, 1280);
  assert.equal(reel.muted, false);
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator(".studio-reel-dialog video").evaluate((v) => v.paused),
    true,
  );
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await page.waitForTimeout(100);
  assert.equal(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
    0,
  );
  await page
    .getByRole("button", { name: "Resume animations", exact: true })
    .click();
  report.checks.push(
    "24-second reel loads only on request, plays with user-initiated audio and pauses on Escape; global animation pause remains effective.",
  );

  await page.locator("#work-handy-bookmark .case-enter").click();
  await page.waitForURL("**/en/apps/handy-bookmark/");
  await page.goBack();
  await page.waitForURL(`${base}/en/`);
  await expect(page.locator(".project-case")).toHaveCount(4);
  report.checks.push(
    "Shared-element route navigation and native Back preserve the four-project index.",
  );
  await page.locator(".workbench-lab").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const frozen = await page
    .locator(".workbench-ambient canvas")
    .getAttribute("data-frame");
  await page.waitForTimeout(200);
  assert.equal(
    await page.locator(".workbench-ambient canvas").getAttribute("data-frame"),
    frozen,
  );
  report.checks.push(
    "Homepage WebGL stops drawing when the workbench opening leaves the viewport.",
  );

  const touchContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const touchPage = await touchContext.newPage();
  await touchPage.goto(`${base}/vi/apps/sticky-wall/`, {
    waitUntil: "networkidle",
  });
  const touchButton = touchPage.getByRole("button", {
    name: "Sang phải",
    exact: true,
  });
  await touchButton.scrollIntoViewIfNeeded();
  const touchBefore = await touchPage
    .locator(".sandbox-paper")
    .first()
    .getAttribute("style");
  const touchBox = await touchButton.boundingBox();
  await touchPage.touchscreen.tap(
    touchBox.x + touchBox.width / 2,
    touchBox.y + touchBox.height / 2,
  );
  await expect(touchPage.locator(".sandbox-paper").first()).not.toHaveAttribute(
    "style",
    touchBefore,
  );
  await touchContext.close();
  report.checks.push(
    "Emulated mobile touchscreen can move paper using a single tap, without dragging.",
  );

  const saverContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  await saverContext.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    }),
  );
  const saver = await saverContext.newPage();
  await saver.goto(`${base}/en/`, { waitUntil: "networkidle" });
  assert.equal(
    await saver.locator(".liquid-backdrop").getAttribute("data-shader"),
    "fallback",
  );
  assert.equal(
    await saver.locator(".studio-reel-dialog video").getAttribute("src"),
    null,
  );
  await saver.goto(`${base}/en/apps/asset-forge-studio/`, {
    waitUntil: "networkidle",
  });
  await saver.locator(".model-canvas").scrollIntoViewIfNeeded();
  assert.equal(await saver.locator(".model-canvas canvas").count(), 0);
  await saver.goto(`${base}/en/apps/handy-bookmark/`, {
    waitUntil: "networkidle",
  });
  await saver.locator(".bookmark-kit-share video").scrollIntoViewIfNeeded();
  assert.equal(
    await saver.locator(".bookmark-kit-share video").getAttribute("src"),
    null,
  );
  await saverContext.close();
  report.checks.push(
    "Data saver keeps static shader artwork, model opt-in, unloaded showreel and video posters.",
  );
} catch (error) {
  report.errors.push(error.stack || error.message);
} finally {
  await context.close();
  await browser.close();
  fs.writeFileSync(
    `${dir}/${process.argv.includes("--flows-only") ? "flows" : "report"}.json`,
    JSON.stringify(report, null, 2),
  );
}
console.log(
  JSON.stringify(
    {
      layouts: report.layouts.length,
      checks: report.checks,
      errors: report.errors,
      violations: report.violations,
    },
    null,
    2,
  ),
);
if (report.errors.length || report.violations.length) process.exitCode = 1;
