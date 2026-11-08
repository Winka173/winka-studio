import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { products, productPath } from "../src/content/products";
import {
  legalSections,
  legalTitles,
  type LegalKind,
} from "../src/content/legal";
import { studio, locales } from "../src/content/studio";

const release = process.argv.includes("--release");
const errors: string[] = [];
const check = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};
const slugs = new Set<string>();
for (const p of products) {
  check(!slugs.has(p.slug), `Duplicate slug: ${p.slug}`);
  slugs.add(p.slug);
  check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug), `Invalid slug: ${p.slug}`);
  check(Boolean(p.source), `Source missing: ${p.slug}`);
  for (const locale of locales) {
    check(
      Boolean(p.description[locale] && p.category[locale]),
      `Missing ${locale}: ${p.slug}`,
    );
    for (const kind of Object.keys(legalTitles) as LegalKind[]) {
      const sections = legalSections(p, kind);
      check(sections.length > 0, `Missing ${kind}: ${p.slug}`);
      check(
        sections.every((s) => s.heading[locale] && s.body[locale]),
        `Missing ${locale} legal section: ${p.slug}/${kind}`,
      );
    }
  }
  for (const image of [p.image, p.icon, ...p.gallery].filter((x): x is string =>
    Boolean(x),
  ))
    check(fs.existsSync(path.join("public", image)), `Missing asset: ${image}`);
  for (const store of p.storeLinks) {
    try {
      const u = new URL(store.url);
      check(u.protocol === "https:", `Non-HTTPS store: ${p.slug}`);
      check(
        [
          "play.google.com",
          "apps.apple.com",
          "store.steampowered.com",
          "store.epicgames.com",
          "apps.microsoft.com",
          "galaxystore.samsung.com",
          "appgallery.huawei.com",
        ].includes(u.hostname),
        `Unrecognized store host: ${p.slug}`,
      );
    } catch {
      errors.push(`Invalid store URL: ${p.slug}`);
    }
  }
  if (p.status === "released")
    check(
      p.legalReviewed && p.storeLinks.some((s) => s.verified),
      `Released without reviewed legal/store: ${p.slug}`,
    );
  if (release && p.completion === "complete")
    check(p.legalReviewed, `REVIEW REQUIRED — legal: ${p.slug}`);
}
if (release) {
  check(studio.publicReleaseApproved, "Public release not approved");
  check(studio.domain, "Domain is not configured");
  check(studio.publisher, "Publisher legal identity is not configured");
  check(studio.supportEmail, "Studio support email is not confirmed");
}

// Meaningful behavior invariants, not component snapshots.
for (const slug of [
  "handy-bookmark",
  "handy-boards",
  "sticky-wall",
  "asset-forge-studio",
  "arcane-brigade",
]) {
  assert.equal(
    products.find((p) => p.slug === slug)?.completion,
    "complete",
    `Owner-confirmed completion: ${slug}`,
  );
}
assert.equal(
  products.find((p) => p.slug === "autonomous-creative-studio")?.kind,
  "app",
  "mmo directory is a creative app",
);
for (const p of products.filter(
  (p) => p.image === "/products/aetherward/concept.webp",
)) {
  assert.equal(
    p.mediaKind,
    "composite",
    "The source simulation image must not be presented as gameplay",
  );
}

let htmlCount = 0,
  linkCount = 0;
if (fs.existsSync("out")) {
  const htmls: string[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith(".html")) htmls.push(file);
    }
  }
  walk("out");
  const titles = new Map<string, string>();
  for (const file of htmls) {
    const html = fs.readFileSync(file, "utf8");
    htmlCount++;
    check(Boolean(html.match(/<h1[ >]/)), `No h1: ${file}`);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    check(title, `No title: ${file}`);
    if (
      title &&
      !file.endsWith("404.html") &&
      !file.includes(`${path.sep}404${path.sep}`) &&
      !file.includes(`${path.sep}_not-found${path.sep}`) &&
      !file.endsWith(path.join("review", "index.html"))
    ) {
      check(
        !titles.has(title),
        `Duplicate title: ${file} and ${titles.get(title)}`,
      );
      titles.set(title, file);
    }
    for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
      const url = match[1].replace(/&amp;/g, "&");
      check(url !== "" && url !== "#", `Empty link: ${file}`);
      if (!url.startsWith("/") || url.startsWith("//")) continue;
      const target = decodeURIComponent(url.split(/[?#]/)[0]);
      linkCount++;
      const resolved = path.join("out", target);
      check(
        fs.existsSync(resolved) ||
          fs.existsSync(path.join(resolved, "index.html")),
        `Broken local resource ${url} in ${file}`,
      );
    }
    check(
      !/https?:\/\/(?:fonts\.googleapis|fonts\.gstatic|www\.googletagmanager|api\.openai)/.test(
        html,
      ),
      `External runtime resource: ${file}`,
    );
    if (file.includes(`${path.sep}en${path.sep}`))
      check(html.includes('<html lang="en"'), `Wrong HTML language: ${file}`);
    if (file.includes(`${path.sep}vi${path.sep}`))
      check(html.includes('<html lang="vi"'), `Wrong HTML language: ${file}`);
  }
  for (const locale of locales) {
    for (const route of [
      "",
      "apps/",
      "games/",
      "lab/",
      "legal/",
      "support/",
      "apps/handy-bookmark/",
      "apps/sticky-wall/",
      "games/arcane-brigade/",
      "apps/handy-bookmark/privacy/",
      "apps/sticky-wall/terms/",
      "games/arcane-brigade/data-deletion/",
    ])
      check(
        fs.existsSync(path.join("out", locale, route, "index.html")),
        `Required route missing: /${locale}/${route}`,
      );
    for (const p of products.filter((p) => p.status !== "hidden")) {
      check(
        fs.existsSync(path.join("out", productPath(p, locale), "index.html")),
        `Product not exported: ${p.slug}/${locale}`,
      );
      check(
        fs.existsSync(
          path.join("out", productPath(p, locale), "media", "index.html"),
        ),
        `Complete media library not exported: ${p.slug}/${locale}`,
      );
    }
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`${errors.length} validation error(s).`);
  process.exitCode = 1;
} else
  console.log(
    `PASS: ${products.length} products, 2 locales, ${htmlCount} HTML files, ${linkCount} local resource references. Release approval: ${studio.publicReleaseApproved}.`,
  );
