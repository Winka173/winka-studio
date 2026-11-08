import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { websiteKits } from "../src/content/website-kits";
import { portfolioMedia, mediaFor } from "../src/content/portfolio-media";

for (const [slug, kit] of Object.entries(websiteKits)) {
  for (const locale of ["en", "vi"] as const) {
    assert.ok(
      kit.pages[locale].features.length > 2000,
      `${slug}/${locale}: missing full feature copy`,
    );
    assert.ok(
      kit.pricing[locale].length > 300,
      `${slug}/${locale}: missing paid inclusions`,
    );
    assert.ok(kit.faq[locale].length > 7, `${slug}/${locale}: incomplete FAQ`);
    for (const kind of ["privacy", "terms"] as const) {
      const document = kit.legal[locale][kind];
      assert.ok(
        document.length > 1500,
        `${slug}/${locale}/${kind}: incomplete supplied policy`,
      );
      assert.ok(!document.includes("Document preview · Not effective"));
    }
    assert.ok(mediaFor(slug, locale).some((m) => m.device === "desktop"));
    assert.ok(mediaFor(slug, locale).some((m) => m.device === "mobile"));
  }
  for (const file of Object.values(kit.assets))
    assert.ok(fs.existsSync(path.join("public", file)), file);
  for (const film of kit.clips) {
    assert.ok(fs.existsSync(path.join("public", film.src)), film.src);
    assert.ok(fs.existsSync(path.join("public", film.poster)), film.poster);
  }
}
assert.equal(
  portfolioMedia.filter((m) => m.slug === "handy-bookmark").length,
  270,
);
assert.equal(portfolioMedia.filter((m) => m.slug === "sticky-wall").length, 88);
assert.equal(
  portfolioMedia.filter((m) => m.slug === "arcane-brigade").length,
  227,
);
assert.ok(
  !portfolioMedia.some((m) => m.slug === "sticky-wall" && m.id === "21_pro"),
  "Sticky test-price screenshot must stay excluded",
);
assert.ok(
  portfolioMedia
    .filter((m) => m.slug === "handy-bookmark" && m.id.includes("42-layouts"))
    .every((m) => m.pro),
  "Bookmark paid layouts need a Pro label",
);
assert.ok(
  websiteKits["handy-bookmark"].faq.en.some(
    (q) =>
      /sync/i.test(q.question) &&
      /not yet|not in|not.*store|in development/i.test(q.answer),
  ),
  "Do not advertise Bookmark Drive sync as shipped",
);
assert.ok(
  fs.existsSync(
    "public/products/arcane-brigade/kit/03_Clips/trailer-with-sound.mp4",
  ),
);
console.log(
  "PASS: supplied EN/VI copy, pricing, 76 FAQ answers, legal documents, 585 new screen captures, Pro labels and closed-testing boundaries.",
);
