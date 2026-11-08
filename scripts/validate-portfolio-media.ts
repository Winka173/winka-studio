import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import sharp from "sharp";
import { products } from "../src/content/products";
import { portfolioMedia, mediaFor } from "../src/content/portfolio-media";
import films from "../src/content/portfolio-films.json";
import kitFilms from '../src/content/kit-films.json';
import { productGuides } from "../src/content/product-guides";

async function main() {
  const seen = new Set<string>();
  for (const item of portfolioMedia) {
    assert.ok(
      products.some((p) => p.slug === item.slug),
      `Unknown product ${item.slug}`,
    );
    assert.ok(!seen.has(item.src), `Duplicate image ${item.src}`);
    seen.add(item.src);
    assert.ok(
      item.source && item.title.en && item.title.vi,
      `Missing source or translation: ${item.src}`,
    );
    assert.ok(
      ["desktop", "mobile", "tablet", "gameplay"].includes(item.device),
    );
    const file = path.join("public", item.src);
    assert.ok(fs.existsSync(file), `Missing ${file}`);
    const image = await sharp(file).metadata();
    assert.equal(image.width, item.width);
    assert.equal(image.height, item.height);
  }
  for (const product of products) {
    const guide = productGuides[product.slug];
    assert.ok(guide, `Missing source-grounded product guide: ${product.slug}`);
    assert.ok(
      guide.purpose.en && guide.purpose.vi && guide.sources.length >= 2,
    );
    assert.equal(
      guide.steps.length,
      3,
      `Missing workflow/gameplay steps: ${product.slug}`,
    );
    for (const step of guide.steps)
      assert.ok(step.title.en && step.title.vi && step.body.en && step.body.vi);
    assert.ok(
      mediaFor(product.slug).length >= 3,
      `Insufficient genuine views: ${product.slug}`,
    );
  }
  for (const slug of ["handy-bookmark", "asset-forge-studio"]) {
    const media = mediaFor(slug);
    assert.ok(media.some((m) => m.device === "desktop"));
    assert.ok(media.some((m) => m.device === "mobile"));
  }
  for (const film of [...films.filter(film=>film.slug==='aetherward'),...kitFilms]) {
    assert.ok(fs.existsSync(film.file), `Missing film ${film.slug}`);
    assert.ok(film.kind, `Unattributed film ${film.slug}`);
  }
  assert.equal(
    fs.existsSync("public/products/arcane-brigade/combat-film.mp4"),
    false,
    "Rejected window capture must not be shipped",
  );
  console.log(
    `PASS: ${portfolioMedia.length} attributed images across ${products.length} products; ${kitFilms.length+1} selected ambient films, plus the explicit-play trailer.`,
  );
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
