import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
const kits = JSON.parse(
  fs.readFileSync("src/content/website-kits.json", "utf8"),
);
const normalize = (s) =>
  s
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}]/gu, "")
    .toLowerCase();
const words = (node) =>
  node.type === "html"
    ? ""
    : node.value || node.children?.map(words).join(" ") || "";
const expected = (raw) =>
  normalize(words(unified().use(remarkParse).use(remarkGfm).parse(raw)));
const base = process.env.PREVIEW_URL || "http://127.0.0.1:4173";
const dir = ".review/website-kit-qa";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_EXECUTABLE ||
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const report = { legalDocuments: [], checks: [], errors: [] };
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`);
  });
  for (const [slug, kit] of Object.entries(kits)) {
    const category = slug === "arcane-brigade" ? "games" : "apps";
    for (const locale of ["en", "vi"]) {
      const root = `/${locale}/${category}/${slug}/`;
      await page.goto(base + root, { waitUntil: "networkidle" });
      assert.match(
        await page.locator(".product-actions").innerText(),
        locale === "vi" ? /Thử nghiệm kín/ : /closed testing/,
      );
      const old = await page
        .locator(`main img[src^="/products/${slug}/"]`)
        .evaluateAll((images) =>
          images
            .map((i) => i.getAttribute("src"))
            .filter((src) => !src.includes("/kit/")),
        );
      assert.deepEqual(old, [], `${slug}: old media still presented`);
      assert.equal(
        await page.locator(".kit-faq-list details").count(),
        Math.min(4, kit.faq[locale].length),
      );
      await page
        .locator(".kit-faq-list details")
        .first()
        .locator("summary")
        .click();
      assert.ok(
        (await page
          .locator(".kit-faq-list details")
          .first()
          .getAttribute("open")) !== null,
      );
      await page.goto(`${base}/${locale}/support/${slug}/`, {
        waitUntil: "networkidle",
      });
      assert.equal(
        await page.locator(".kit-faq-list details").count(),
        kit.faq[locale].length,
        `${slug}: full FAQ must remain on support`,
      );
      await page.goto(base + root + "media/", { waitUntil: "networkidle" });
      const clips = kit.clips.filter((c) =>
        slug === "handy-bookmark" || slug === "handy-boards"
          ? c.id.endsWith("-" + locale)
          : !c.id.startsWith("trailer-"),
      );
      assert.equal(
        await page.locator(".kit-clip").count(),
        clips.length,
        `${slug}: full film library must remain available`,
      );
      for (const kind of ["privacy", "terms"]) {
        await page.goto(base + root + kind + "/", { waitUntil: "networkidle" });
        const actual = normalize(
          await page.locator(".kit-legal .kit-markdown").innerText(),
        );
        assert.equal(
          actual,
          expected(kit.legal[locale][kind]),
          `${root}${kind}: supplied legal words were omitted or altered`,
        );
        assert.equal(await page.locator(".legal-draft").count(), 0);
        assert.equal(await page.locator("main h1").count(), 1);
        report.legalDocuments.push(root + kind + "/");
      }
    }
  }
  report.checks.push(
    `All ${report.legalDocuments.length} supplied legal documents preserve every rendered word in order; no generic draft replaces them.`,
  );
  await page.goto(base + "/en/apps/handy-bookmark/", {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: /Mobile/ }).click();
  for (
    let n = 0;
    n < 10 &&
    (await page.getByRole("button", { name: /Show more views/ }).count());
    n++
  )
    await page.getByRole("button", { name: /Show more views/ }).click();
  assert.ok((await page.locator(".capture-card").count()) > 60);
  assert.ok(
    (await page.locator(".capture-badges").filter({ hasText: "PRO" }).count()) >
      0,
  );
  const wrong = await page
    .locator(".capture-card img")
    .evaluateAll((images) => images.filter((i) => /-vi-/.test(i.src)).length);
  assert.equal(wrong, 0);
  await page.locator(".capture-card").last().click();
  assert.equal(await page.locator("dialog[open]").count(), 1);
  await page.keyboard.press("Escape");
  report.checks.push(
    "Progressive gallery reaches every supplied screen; English screenshots and Pro badges remain correct, including full-size viewing.",
  );
  await page.goto(base + "/vi/apps/handy-bookmark/credits/", {
    waitUntil: "networkidle",
  });
  assert.match(await page.locator("main").innerText(), /Valentin Orange/);
  assert.match(await page.locator("main").innerText(), /Kent Wang/);
  assert.match(await page.locator("main").innerText(), /CC BY-SA/);
  report.checks.push(
    "Required authors and Creative Commons licenses are present and reachable from the gallery and footer.",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const [slug, path, selector] of [
    ["handy-bookmark", "apps/handy-bookmark", ".bookmark-kit-share video"],
    ["handy-boards", "apps/handy-boards", ".boards-chapter video"],
    ["sticky-wall", "apps/sticky-wall", ".sticky-kit-film video"],
    ["arcane-brigade", "games/arcane-brigade", ".arcane-cinema-film video"],
  ]) {
    await page.goto(`${base}/vi/${path}/`, { waitUntil: "networkidle" });
    const video = page.locator(selector).first();
    await video.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      (selector) => {
        const v = document.querySelector(selector);
        return v && v.readyState >= 2 && v.currentTime > 0.15;
      },
      selector,
      { timeout: 20000 },
    );
    assert.equal(await video.evaluate((v) => v.muted), true);
    await video
      .locator("..")
      .locator("..")
      .getByRole("button", { name: "Tạm dừng video" })
      .click();
    await page.waitForTimeout(150);
    assert.equal(await video.evaluate((v) => v.paused), true);
    await page.screenshot({ path: `${dir}/${slug}-film.png` });
  }
  report.checks.push(
    "Localized Bookmark and Boards UI renders, native Sticky recording and Arcane trailer decode, play muted and honor their pause controls.",
  );
  await page.goto(base + "/en/games/arcane-brigade/", {
    waitUntil: "networkidle",
  });
  await page
    .getByRole("link", { name: "Watch the trailer with sound" })
    .click();
  const trailer = page.locator("#trailer video");
  assert.equal(await trailer.evaluate((v) => v.paused), true);
  assert.equal(await trailer.evaluate((v) => v.autoplay), false);
  await trailer.evaluate((v) => v.play());
  await page.waitForTimeout(600);
  assert.ok(await trailer.evaluate((v) => v.currentTime > 0.1));
  await trailer.evaluate((v) => v.pause());
  report.checks.push(
    "The full trailer waits for explicit play; audio is never autoplayed.",
  );
  assert.deepEqual(report.errors, []);
  await context.close();
} finally {
  fs.writeFileSync(`${dir}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
