import assert from "node:assert/strict";
import fs from "node:fs";
import { getProduct } from "../src/content/products";
import { websiteKits } from "../src/content/website-kits";
import { mediaFor, portfolioMedia } from "../src/content/portfolio-media";

const slug = "handy-habit";
const kit = websiteKits[slug];
const product = getProduct(slug);
assert(product && kit);
assert.equal(product.completion, "complete");
assert.equal(product.status, "coming-soon");
assert.deepEqual(product.platforms, ["Android"]);
assert.equal(product.storeLinks.filter((store) => store.verified).length, 0);
assert.equal(
  kit.clips.length,
  0,
  "The kit has no footage; do not invent films",
);
const captures = portfolioMedia.filter((item) => item.slug === slug);
assert.equal(captures.length, 184);
assert(captures.every((item) => item.kind === "kit-source-render"));
assert(
  captures
    .filter((item) => /-(30-pro|31-studio)$/.test(item.id))
    .every((item) => item.pro),
);
assert.equal(
  Object.keys(kit.assets).filter((key) => key.startsWith("highlights/")).length,
  40,
);
for (const locale of ["en", "vi"] as const) {
  const images = mediaFor(slug, locale);
  assert.equal(images.length, 92);
  for (const theme of ["light", "dark"]) {
    assert.equal(images.filter((item) => item.theme === theme).length, 46);
    for (const device of ["mobile", "desktop"])
      assert(
        images.some((item) => item.device === device && item.theme === theme),
      );
  }
  assert.equal(kit.faq[locale].length, 23);
  assert.equal((kit.pages[locale].changelog!.match(/^## /gm) || []).length, 4);
  assert(kit.seo?.[locale].title.startsWith("Handy Habit"));
  assert(
    !/99[,.]?000|99\.000|VND/.test(kit.pricing[locale]),
    "Unconfirmed prices must not be public copy",
  );
  assert(
    /end-to-end encrypted|mã hoá đầu-cuối/.test(kit.legal[locale].privacy),
  );
  assert(/drive.appdata/.test(kit.legal[locale].privacy));
  assert(
    kit.legal[locale].terms.includes(
      `https://winka.top/${locale}/apps/handy-habit/privacy/`,
    ),
  );
  for (const scene of [
    "01-today",
    "03-habit-reduce",
    "11-progress-year",
    "31-studio",
  ])
    for (const theme of ["", "-dark"]) {
      assert(
        fs.existsSync(
          `public/products/${slug}/kit/screenshots/mobile/mobile${theme}-${locale}-${scene}.webp`,
        ),
      );
    }
}
console.log(
  "PASS: Habit is complete/coming soon on Android; 184 real UI renders, 40 highlights, 46 localized FAQ answers, full legal text, no invented movies or unconfirmed prices.",
);
