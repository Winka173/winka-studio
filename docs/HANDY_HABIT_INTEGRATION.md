# Handy Habit product integration

Source: `Handy-Suite/website-kit/handy-habit`, supplied by the owner on 11 November 2026. Work starts from main `da51401` on `feat/handy-habit-product`. Do not merge into or push main: merging main triggers deployment.

## Design contract

An Android habit tracker with a kind, calm voice. Use the supplied warm-paper/oxblood/vermilion palette, Nunito font and original icon. Bead strings are the visual signature: a hollow bead is an unrecorded day, never a red failure mark. The product's own captures lead each section, with distinct layouts for daily check-ins, home-screen widgets, reducing habits, routine steps, yearly progress and data controls. Motion is gentle, can be paused, and respects reduced motion. A labelled web bead demonstration explains the interaction without pretending to be the running app.

Taste Frontend and frontend engineering guide hierarchy, real imagery, equal edges and native interaction. UI/UX Pro Max's queried habit-tracker result supports rounded, approachable typography and clear touch targets; the owner's provided Nunito and exact color tokens take priority over generic palette suggestions. Existing portfolio chrome and resource components are reused.

## Content boundaries

- Owner-confirmed complete; Android 1.0.0 build 5 is in Google Play closed testing. The store remains Coming soon. No iOS, Windows, web or tablet buttons or invented films.
- Import all 184 captioned screenshots, 40 transparent phone highlights, original branding and bundled OFL fonts. Localize captures and match light/dark website theme. Wide captures show a responsive Android layout, not a Windows product.
- Captures are Flutter host renders with disposable demo data dated 2 November 2026, not device or launcher recordings. Widget images are explicitly in-app previews.
- Free tracking/routines/data features and optional one-time Pro must remain distinct. Mark Pro imagery; do not publish the unconfirmed VND price.
- Privacy and terms are supplied legal documents and must retain every word of their locale sections. Deletion guidance distinguishes local storage, 30-day Trash, user-kept backup/shared files and optional Drive hidden app data. There is no Habit account to delete or developer-held data to request.
- Optional Drive sync goes directly to the user's own Drive and is not end-to-end encrypted. Mood/notes never appear in notifications or widgets.

## Import

`python -X utf8 scripts/import-website-kits.py --only handy-habit` preserves the existing kits, media and films. Original textual documents are archived in `docs/website-kits/handy-habit/`; converted asset provenance is appended to the existing import manifest. No source kit or app files are modified or regenerated.

## Verification and review

Production build, typecheck, lint, export/media validation and `validate:habit`, `validate:public`, `validate:boards` pass. The export contains 163 HTML files (164 generated pages). `qa:habit` passes 46 responsive layout cases, four exact rendered legal comparisons, both locale galleries, theme switching, keyboard/Undo interaction and deletion/store checks. `qa:public` passes 128 responsive cases and scans 162 exported directory routes for hidden product leakage. Neither suite reports runtime/resource errors or tested axe violations. These are headless Edge checks at emulated device widths; no physical Android device test is claimed.

Compact evidence: `docs/qa/handy-habit-summary.json`. Local screenshots and full reports: `.review/handy-habit-qa/`, `.review/public-products-qa/`. Local review URL: `http://127.0.0.1:4174/vi/apps/handy-habit/`. Main remains at `da51401`; this feature has not been merged or deployed.

Commands: `npm run build`, `npm run typecheck`, `npm run lint`, `npm run validate`, `npm run validate:habit`, `npm run validate:public`, `npm run validate:boards`. With the export preview running, set `$env:PREVIEW_URL = 'http://127.0.0.1:4174'` in PowerShell, then run `npm run qa:habit` and `npm run qa:public`.
