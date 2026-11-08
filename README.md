# Winka Studio

Static Next.js / TypeScript / React / Tailwind v4 website. The current implementation is a media-rich experimental portfolio: an original WebGL light-ribbon hero, spatial product captures, naturally scrolling project articles, bespoke landing pages, 689 source-attributed screenshot records and locally hosted product films. All 22 products have source-grounded usage/gameplay explanations. The initial four style studies are archived for comparison. Public website deployment remains pending; repository publication is a separate step.

**Latest update:** the owner-supplied Bookmark, Sticky Wall and Arcane website kits replace their earlier media and copy. There are now 689 active screenshot records across 22 products, including 585 new kit captures, 49 imported kit films, an explicit-play trailer with sound, and the retained Aetherward film. All three kit products include full features, Free/Pro or Deluxe information, complete FAQ and verbatim supplied privacy/terms. See [the integration record](docs/WEBSITE_KIT_INTEGRATION.md).

## Run

Node 20.19+ (Node 22 recommended), npm.

```powershell
npm ci
npm run dev
```

Development: `http://127.0.0.1:3000`. For the actual static export:

```powershell
npm run build
npm start
```

Static preview: **http://127.0.0.1:4173/vi/**. `PORT` changes the preview port. `npm start` is a local review server, not a production backend.

## Current portfolio

- `/vi/` or `/en/`: ink/pearl studio, interactive hero light ribbons, actual desktop/mobile/gameplay composition, four full project articles with native anchor navigation, and an image index.
- `/en/apps/handy-bookmark/`: source-kit reading/share landscape with localized desktop/mobile/tablet/dark captures, six feature chapters, all eight localized UI films and labeled Pro content.
- `/en/apps/sticky-wall/`: actual source-kit phone-screen fan, large-screen Android wall, memory boards, real materials and seven native gesture recordings.
- `/en/apps/asset-forge-studio/`: technical workbench, interactive source screenshot views and 9 captures including responsive web UI.
- `/en/games/arcane-brigade/`: original logo on battle footage, full explicit-play trailer with sound, all 36 hero portraits, six places, PC/mobile-layout captures and Deluxe details.
- Aetherward: an actual native Unity battle film. Runavelle: draggable day/night screenshot comparison. Machine Brigade: real Android gameplay after resolving the capture renderer. All remaining development products have actual source galleries.

Every gallery supports layout filters, progressive access to all views and a native full-size modal with keyboard arrows/Escape. Every product keeps EN/VI detail/support/privacy/terms/data-deletion routes. The three owner-kit products render complete supplied legal documents; other product drafts remain individually identified.

Each product includes its purpose, three usage/gameplay steps and verified controls where applicable. All nine source repositories were revisited for this copy; see `docs/PRODUCT_CONTENT_AUDIT.md`. The homepage reference study and replacement of the sticky theatre are recorded in `docs/SCROLL_AND_BACKGROUND_RESEARCH.md`.

## Archived initial explorations

| Direction | Skill influence | Preview |
| --- | --- | --- |
| A · The Independent | Addy Osmani frontend-ui-engineering: reference-led hierarchy, accessible components, product evidence | `/vi/directions/addy/` |
| B · Product, in Focus | Taste Frontend 2.5: dealt split hero, candy-on-black palette, Funnel fonts, actual product UI, letters-assemble moment | `/vi/directions/taste/` |
| C · After Hours | UI/UX Pro Max: locally queried monochrome, motion-driven portfolio system; Archivo replaces the recommendation's overused display face | `/vi/directions/uipro/` |
| D · The Play Department | gstack design principles: expressive Bricolage type, committed cobalt palette, open product layouts, claims tied to evidence | `/vi/directions/gstack/` |

Replace `/vi/` with `/en/` for English. These are **four implementations informed by the respective skills**, not themes officially authored or endorsed by their maintainers. Addy and gstack are broader engineering/design workflows, not fixed visual styles. The owner subsequently requested stronger bespoke product identities; these initial studies remain at `/review/`, while the main site uses the implementation described above.

## Architecture

- `src/content/products.ts`: typed registry, 22 products, verified features/media, separate completion and release status.
- `src/content/product-guides.ts`: translated, source-attributed workflows and gameplay guides for every product.
- `src/content/website-kits.json`, `kit-media.json`, `kit-films.json`: current owner-kit copy, legal text, localized screenshots and movies; prepared by `scripts/import-website-kits.py`.
- `src/content/studio.ts`: owner configuration; domain, publisher legal identity and studio-wide support remain unset.
- `src/content/legal.ts`: source-backed **draft previews**, not effective or final policies.
- `src/content/portfolio-media.json`, `portfolio-films.json`: current gallery/film provenance. Earlier media manifests are retained as source history.
- `src/components/portfolio/`: current studio and product compositions, original shader, lazy product films, gallery/lightbox and comparison slider.
- `src/components/worlds/`: retained shared navigation/outro, motion controller and source screenshot exhibits; earlier compositions are historical.
- `src/styles/portfolio*.css`: current palettes, spatial layouts, motion, galleries and responsive rules. Earlier worlds styles remain for shared/archive components.
- `src/components/directions/`: archived initial homepage studies.
- `src/components/pages.tsx`: product, catalogue, support, legal, about and contact pages.
- `src/app/(localized)/[locale]/[[...path]]/page.tsx`: explicitly enumerated EN/VI static routes; unknown routes return 404. The optional catch-all keeps app/game/legal layouts shared without runtime routing.
- `public/products/`: optimized local WebP media. No stock screenshots or fictional key art.
- `public/fonts/`: self-hosted fonts and OFL licenses.
- `public/taste/`: selected unchanged Taste moment/microinteraction assets; see `THIRD_PARTY_NOTICES.md`.

The review site has no analytics, forms, tracking SDKs, database, server functions, auth, payments or external font requests. Theme preference is stored in browser localStorage. All nine supplied repositories were inspected and launched for capture where possible. All nine now have usable real media. Machine Brigade was captured successfully with OpenGL ES 3 after the Vulkan path failed. Its placeholder has been replaced with Android deployment/battle images. See SOURCE_INVENTORY.md. Source code was not modified.

## Checks

```powershell
npm run typecheck
npm run lint
npm run build
npm run validate
npm run qa
npm run validate -- --release
```

`validate --release` is **expected to fail** until real domain/publisher/contact values and legal approvals are configured. It is a stricter owner/release gate, not the normal design-preview gate. `npm run qa` needs an installed Chromium browser; default is Windows Edge. Override `BROWSER_EXECUTABLE` and optionally `PREVIEW_URL`. Start `npm start` before QA. Current reports/screenshots are local in `.review/portfolio-qa/` and ignored by Git. `npm run validate` also checks all gallery dimensions, provenance, per-product coverage and film files. `npm run qa` runs `scripts/portfolio-qa.mjs`; the earlier `browser-qa.mjs` covers the historical implementation. Archived Taste prototype checks are recorded in `docs/qa/prototype-report.md`; current browser coverage is recorded in `QA_REPORT.md`.

The Windows Next exporter currently emits nested segment-prefetch files while its browser client requests dot-separated names. The `postbuild` script preserves the original files and adds matching portable copies. This was found by real-browser 404 monitoring, then verified by navigation tests. It requires no Cloudflare rewrite or function.

## Cloudflare Pages (after review)

Use an existing Git-connected Pages project or create one pointing at this repository:

- Framework preset: **Next.js (Static HTML Export)**.
- Production branch: `main` (confirm before connecting).
- Build command: `npm run build` (includes automatic postbuild).
- Output directory: **`out`**.
- Node: 22 recommended. No API keys or runtime environment variables are required.

Before making the site public, complete `RELEASE_CHECKLIST.md`, configure the real origin, approve product legal content, replace design-review navigation, and remove the preview `X-Robots-Tag` in `public/_headers`. Metadata is noindex by default; sitemap is intentionally empty without an approved real domain. Canonicals and social image URLs are emitted only with a real configured domain. Never insert a fictional domain to silence a warning.

Set the custom domain in Cloudflare Pages → Custom domains, follow its DNS instructions, wait for the issued HTTPS certificate and verify the actual public pages without login. There is no deployment in this review delivery.

Official implementation references inspected:

- [Next.js static export](https://nextjs.org/docs/app/guides/static-exports)
- [Cloudflare static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Cloudflare Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Google Play policy page requirements](https://support.google.com/googleplay/android-developer/answer/9859455)
- [Apple privacy disclosures](https://developer.apple.com/app-store/app-privacy-details/)

## Local machine note

Drive C ran out of space while installing. Newly installed Bun cache and gstack runtime were relocated to `D:\CodexCache\winka-studio`; Codex skills link to that location. The web app's `node_modules` and `.next` are ordinary local directories, after confirming that cross-drive junctions caused Next resolution/duplicate-React errors. This cache arrangement is machine-local and not required to clone/build the repository elsewhere.
