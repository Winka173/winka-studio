# Content guide

For Handy Bookmark, Sticky Wall and Arcane Brigade, the owner-supplied website kits are now the primary editorial source. Read `docs/WEBSITE_KIT_INTEGRATION.md`; their copy, complete supplied legal text, localized media and FAQs live in `website-kits.json`, `kit-media.json` and `kit-films.json`. Run `scripts/import-website-kits.py` only when deliberately refreshing from the local kit directories. Keep raw legal wording unchanged and preserve required photo credits. Other products continue to follow the registry/guide process below.

1. Open `src/content/products.ts`. Each entry has EN/VI copy, a source note, family, completion, public status, platforms, media and verified store links.
2. Update information only when supported by the actual product/release or owner approval. `completion: 'complete'` means the owner says the work is finished. Use `status: 'released'` only after verifying public availability and reviewing its legal documents.
3. Put approved media in `public/products/<slug>/`. Prefer WebP under 500 KB per image. Provide the original source/provenance and dimensions in `src/content/media-manifest.json`. Only call an image a screenshot when it is one; label composites/concepts.
4. Add translations in the `text('English', 'Tiếng Việt')` records. UI locale paths are `/en/.../` and `/vi/.../`. A new product automatically receives both product/support and privacy/terms/data-deletion routes at build time.
5. Add source-backed features. Empty features, platforms, store links and galleries are allowed and render useful development states. Empty `storeLinks` never creates a fake download button.

The current landing copy and exhibits live in `src/components/portfolio/`, with theme selection in `src/content/product-themes.ts`. Update registry facts and the relevant landing composition together; the registry does not generate the bespoke narrative automatically. Keep EN/VI in sync. Current gallery metadata lives in `portfolio-media.json`; film provenance lives in `portfolio-films.json`. Earlier `world-media.json` and `live-media.json` are retained as source history. Run capture helpers only against isolated review data; never clear an installed app's data to stage a screenshot.

`src/content/product-guides.ts` supplies the purpose, three-stage workflow/gameplay loop and verified controls for every product. Keep exact documentation/implementation references in each guide's `sources`; they are editorial metadata, not public UI. Read `docs/PRODUCT_CONTENT_AUDIT.md` before changing product claims. Where old plans disagree with current code, use current supported behavior and qualify anything still in development. A folder name, package version or target platform does not establish a shipped feature or release.

Example (inside the registry):

```ts
product({
  slug: 'handy-example',
  name: 'Handy Example',
  category: text('A verified category', 'Danh mục đã xác minh'),
  description: text('A source-backed description.', 'Mô tả dựa trên source.'),
  source: 'Project/README.md and exact implementation files',
  status: 'in-development',
})
```

For a real store URL, add `{label, url, verified: true}` only after opening the actual listing and verifying product/publisher identity. Do not synthesize links from Android package IDs.

## Legal documents

`src/content/legal.ts` currently holds review previews. Before a product becomes released, replace the outline with approved product-specific sections, dates, operator/contact details and complete disclosures for the shipping build, then set `legalReviewed: true`. Keep privacy, terms and data-deletion as directly loadable HTML pages. Do not set the approval flag to bypass the release validator.

Check both languages, SDKs/permissions/Drive/backup/billing behavior and actual deletion steps. An existing repository privacy document can be out of date or internally inconsistent. Do not copy a blanket “nothing collected” claim without reconciling optional providers. `LEGAL_AUDIT_MATRIX.md` tracks gaps.

## Changelog

No changelog or version history is currently shown because the website does not have approved public release notes. To publish a changelog, add a typed list containing actual public version, real release date and EN/VI notes, render it on the product page, and link to the verified release source. A package version is not a public release date.

## More languages

Add the locale to `Locale` and `locales` in `src/content/studio.ts`, then every critical UI/product/legal translation and the root-layout locale validation, switcher, metadata and QA cases. Run `typecheck` to find missing translation records. Do not expose untranslated legal documents as approved.

## Check an update

```powershell
npm run typecheck
npm run lint
npm run build
npm run validate
npm start
```

Open the actual exported route, switch language without losing the current page, check mobile and dark mode, and inspect every new image. Read `RELEASE_CHECKLIST.md` before public deployment.

## Gallery and film updates

`scripts/prepare-portfolio-media.py` prepares optimized copies from the named source repositories. Every item has source, width/height, layout category and EN/VI title. Its category describes the capture, not public platform availability. Keep actual UI content recognizable, identify demonstration content and never redraw an app screen in HTML to stand in for a missing capture.

Films use `ProductFilm` and local MP4, plus a genuine poster. Keep clips compact, muted and inline. The component delays the source until visible, honors reduced-motion/data-saver choices and stops for global pause or a hidden document. Do not add eager/autoplay video URLs to static markup. Prefer source-supported native capture over desktop window grabbers for GPU-rendered games. Inspect both frames and playback metadata before selecting any recording.

`npm run validate` checks gallery dimensions/provenance/coverage and film existence. Browser QA checks decode/playback, global pause, WebGL fallback, galleries, localization, theme and responsive layout.
