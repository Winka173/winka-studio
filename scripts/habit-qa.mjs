import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:4174";
const dir = ".review/handy-habit-qa";
fs.mkdirSync(dir, { recursive: true });
const kit = JSON.parse(
  fs.readFileSync("src/content/website-kits.json", "utf8"),
)["handy-habit"];
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_EXECUTABLE ||
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const report = {
  layouts: [],
  checks: [],
  legalDocuments: [],
  errors: [],
  violations: [],
};
const normalize = (value) =>
  value
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}]/gu, "")
    .toLowerCase();
const words = (node) =>
  node.type === "html"
    ? ""
    : node.value || node.children?.map(words).join(" ") || "";
const expectedWords = (raw) =>
  normalize(words(unified().use(remarkParse).use(remarkGfm).parse(raw)));
try {
  for (const locale of ["vi", "en"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => report.errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        report.errors.push(`${response.status()} ${response.url()}`);
    });
    const external = new Set();
    page.on("request", (request) => {
      if (!request.url().startsWith(base) && !request.url().startsWith("data:"))
        external.add(request.url());
    });
    const root = `/${locale}/apps/handy-habit/`;
    for (const suffix of [
      "",
      "features/",
      "press/",
      "changelog/",
      "credits/",
      "privacy/",
      "terms/",
      "data-deletion/",
      "media/",
      "support",
    ]) {
      const url =
        suffix === "support"
          ? `/${locale}/support/handy-habit/`
          : root + suffix;
      const response = await page.goto(base + url, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, url);
      assert.equal(await page.locator("main h1").count(), 1, url);
      await page.evaluate(() => document.fonts.ready);
      for (const width of suffix === ""
        ? [320, 390, 768, 1024, 1440]
        : [390, 1440]) {
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
                i.getBoundingClientRect().height > 0 &&
                i.complete &&
                !i.naturalWidth,
            )
            .map((i) => i.src),
        }));
        assert.ok(
          layout.scrollWidth <= width,
          `${url} at ${width}px overflows`,
        );
        assert.deepEqual(layout.brokenImages, [], url);
        report.layouts.push({ locale, route: suffix || "landing", ...layout });
      }
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      report.violations.push(
        ...audit.violations.map((v) => ({
          locale,
          url,
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      );
      if (["privacy/", "terms/"].includes(suffix)) {
        const kind = suffix.slice(0, -1);
        // Independently split the archived source, rather than trusting the importer output.
        const raw = fs
          .readFileSync(
            `docs/website-kits/handy-habit/legal/${kind}.md`,
            "utf8",
          )
          .trim();
        const preamble = raw
          .split("## English")[0]
          .trim()
          .replace(/---$/, "")
          .trim();
        const body = raw
          .split(locale === "en" ? "## English" : "## Tiếng Việt")[1]
          .split("## Tiếng Việt")[0]
          .trim()
          .replace(/---$/, "")
          .trim();
        assert.equal(
          normalize(await page.locator(".kit-legal .kit-markdown").innerText()),
          expectedWords(preamble + "\n\n" + body),
          `${url}: source legal words changed`,
        );
        assert.equal(await page.locator(".legal-draft").count(), 0);
        report.legalDocuments.push(url);
      }
      if (suffix === "support")
        assert.equal(await page.locator(".kit-faq-list details").count(), 23);
      if (suffix === "data-deletion/") {
        assert.equal(
          await page.locator(".habit-deletion-guide ol li").count(),
          4,
        );
        assert.match(
          await page.locator(".habit-deletion-guide").innerText(),
          /Delete hidden app data|Xóa dữ liệu ẩn/,
        );
        assert.match(
          await page.locator(".habit-deletion-guide").innerText(),
          /30/,
        );
      }
      if (!suffix) {
        await expect(page).toHaveTitle(
          new RegExp(
            kit.seo[locale].title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          ),
        );
        assert.equal(
          await page.locator("meta[name=description]").getAttribute("content"),
          kit.seo[locale].description,
        );
        assert.equal(await page.locator("video").count(), 0);
        assert.equal(await page.locator(".development-flag").count(), 0);
        assert.deepEqual(
          await page
            .locator(".product-actions .product-store-list button > span")
            .allTextContents(),
          ["Google Play"],
        );
        assert.equal(
          await page
            .locator(".product-actions .product-store-list button")
            .isDisabled(),
          true,
        );
        assert.ok((await page.locator(".capture-desktop").count()) > 0);
        assert.ok((await page.locator(".capture-mobile").count()) > 0);
        const bead = page.locator(".habit-today-bead");
        await bead.click();
        await expect(bead).toHaveAttribute("aria-pressed", "true");
        await page.locator(".habit-bead-feedback button").click();
        await expect(bead).toHaveAttribute("aria-pressed", "false");
        await bead.focus();
        await page.keyboard.press("Space");
        await expect(bead).toHaveAttribute("aria-pressed", "true");
        for (const width of [1440, 390]) {
          await page.setViewportSize({
            width,
            height: width === 1440 ? 900 : 844,
          });
          await page.evaluate(async () => {
            for (
              let y = 0;
              y < document.body.scrollHeight;
              y += innerHeight * 0.8
            ) {
              scrollTo(0, y);
              await new Promise((resolve) => setTimeout(resolve, 30));
            }
            scrollTo(0, 0);
          });
          await page.waitForTimeout(120);
          await page.screenshot({
            path: `${dir}/habit-${locale}-${width}-light.jpg`,
            type: "jpeg",
            quality: 80,
            fullPage: true,
          });
        }
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.locator(".theme-switch").click();
        await expect(
          page.locator(".habit-hero-art .image-preview-trigger img"),
        ).toHaveAttribute("src", new RegExp(`01-today-dark-${locale}`));
        await page
          .locator(".habit-hero-art .image-preview-trigger img")
          .evaluate((img) => img.decode());
        assert.equal(
          await page
            .locator(".site")
            .evaluate((node) =>
              getComputedStyle(node).getPropertyValue("--bg").trim(),
            ),
          "#151312",
        );
        const wrong = await page
          .locator(".habit-picture img")
          .evaluateAll((images) =>
            images
              .filter((i) => !i.getAttribute("src").includes("dark"))
              .map((i) => i.src),
          );
        assert.deepEqual(
          wrong,
          [],
          "Every Habit story capture must follow dark theme",
        );
        const darkAudit = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        report.violations.push(
          ...darkAudit.violations.map((v) => ({
            locale,
            url,
            theme: "dark",
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        );
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
          path: `${dir}/habit-${locale}-1440-dark.jpg`,
          type: "jpeg",
          quality: 85,
        });
        await page.locator(".theme-switch").click();
        assert.equal(
          await page
            .locator(".site")
            .evaluate((node) =>
              getComputedStyle(node).getPropertyValue("--bg").trim(),
            ),
          "#faf7f2",
        );
        assert.equal(
          await page
            .locator(".site")
            .evaluate((node) =>
              getComputedStyle(node).getPropertyValue("--accent").trim(),
            ),
          "#54261f",
        );
      }
      console.log(`PASS ${url}`);
    }
    await page.goto(base + root + "media/", { waitUntil: "networkidle" });
    await page.locator(".habit-gallery-preference button").click();
    assert.match(
      await page.locator(".gallery-filters button").first().innerText(),
      /92/,
    );
    while (
      await page
        .getByRole("button", { name: /Show more views|Xem thêm màn hình/ })
        .count()
    )
      await page
        .getByRole("button", { name: /Show more views|Xem thêm màn hình/ })
        .click();
    assert.equal(await page.locator(".capture-card").count(), 92);
    const sourceCards = await page
      .locator(".capture-card")
      .evaluateAll((cards) =>
        cards
          .filter((card) =>
            /-(30-pro|31-studio)\.webp$/.test(
              card.querySelector("img").getAttribute("src"),
            ),
          )
          .map((card) => card.textContent),
      );
    assert.equal(sourceCards.length, 8);
    assert(sourceCards.every((text) => text.includes("PRO")));
    await page.locator(".capture-card").last().click();
    await expect(page.locator(".capture-lightbox")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("Escape");
    await expect(page.locator(".capture-lightbox")).not.toBeVisible();
    assert.deepEqual([...external], [], "No external runtime resources");
    await page.goto(`${base}/${locale}/`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("#work-handy-habit").count(), 1);
    await page.locator("#work-handy-habit .case-enter").click();
    await page.waitForURL(`**${root}`);
    await expect(page.locator(".habit-hero h1")).toBeVisible();
    report.checks.push(
      `${locale}: complete legal text, 23 FAQ answers, four deletion steps, Android-only coming-soon, keyboard check-in/Undo, matching light/dark captures, all 92 localized views, Pro badges, homepage navigation and no external requests.`,
    );
    await context.close();
  }
} catch (error) {
  report.errors.push(error.stack || error.message);
} finally {
  await browser.close();
  fs.writeFileSync(`${dir}/report.json`, JSON.stringify(report, null, 2));
}
console.log(
  JSON.stringify(
    {
      layouts: report.layouts.length,
      checks: report.checks,
      legalDocuments: report.legalDocuments,
      errors: report.errors,
      violations: report.violations,
    },
    null,
    2,
  ),
);
if (report.errors.length || report.violations.length) process.exitCode = 1;
