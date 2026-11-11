import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getProduct } from "../src/content/products";
import { websiteKits } from "../src/content/website-kits";
import { mediaFor, portfolioMedia } from "../src/content/portfolio-media";

const product = getProduct("handy-boards")!;
assert.equal(
  product.completion,
  "complete",
  "Boards is owner-confirmed complete",
);
assert.equal(
  product.status,
  "coming-soon",
  "Completion must not imply a public store release",
);
assert(!product.storeLinks.some((link) => link.verified));
const kit = websiteKits[product.slug];
assert(kit, "Boards must use its supplied website kit");
const archive = "docs/website-kits/handy-boards";
for (const kind of ["privacy", "terms"] as const) {
  // Git may check the source out with Windows line endings; the importer normalizes them.
  const raw = fs
    .readFileSync(path.join(archive, "legal", `${kind}.md`), "utf8")
    .replace(/\r\n/g, "\n")
    .trim();
  const preamble = raw.split("## English")[0].trim().replace(/---$/, "").trim();
  for (const locale of ["en", "vi"] as const) {
    const start = locale === "en" ? "## English" : "## Tiếng Việt";
    const body = raw
      .split(start)[1]
      .split(locale === "en" ? "## Tiếng Việt" : "\u0000")[0]
      .trim()
      .replace(/---$/, "")
      .trim();
    assert.equal(
      kit.legal[locale][kind],
      `${preamble}\n\n${body}`,
      `Verbatim ${locale}/${kind}`,
    );
  }
}
assert.equal(
  portfolioMedia.filter((media) => media.slug === product.slug).length,
  226,
);
for (const locale of ["en", "vi"] as const) {
  assert.equal(kit.faq[locale].length, 23);
  assert.equal(
    kit.clips.filter((clip) => clip.id.endsWith(`-${locale}`)).length,
    7,
  );
  assert.equal(kit.highlights?.[locale].length, 6);
  assert(
    kit.highlights?.[locale].every((chapter) => chapter.body.length > 80),
    "Every chapter must retain its supplied product description",
  );
  assert(mediaFor(product.slug, locale).some((media) => media.pro));
  assert(mediaFor(product.slug, locale).some((media) => media.newInNextUpdate));
}
console.log(
  "PASS: Handy Boards complete/coming-soon, exact bilingual legal, 226 attributed captures, 14 localized films, 46 FAQ answers and next-update/Pro distinctions.",
);
