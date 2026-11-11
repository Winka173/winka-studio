## Handy Habit integration, 11 November 2026

The feature branch contains a successful production export (164 generated pages / 163 HTML files, 161 portable segment copies). TypeScript, source lint, export/media validation and the Habit/public/Boards content contracts pass. The general media registry now contains 1,073 attributed images; the new Habit kit contributes 184 screenshots, 40 highlights, zero films and 46 FAQ answers.

`qa:habit` covers all 20 localized Habit destinations at 320/390/768/1024/1440px as applicable, 46 layout cases total. It independently compares all four rendered privacy/terms documents with the archived source, checks all 23 FAQ entries per language, deletion steps, Android-only store state, Pro labels, all 92 localized gallery views, theme-matched source images, original palette tokens after returning to light, bead keyboard/Undo behavior, homepage navigation and zero external runtime requests. The tested states have no reported runtime/resource errors or axe WCAG 2/2.1/2.2 violations. Focused screenshots verify the real app appears in the first phone screen at 320/390px in both languages. Browser evidence is from installed headless Edge and emulated phone widths, not physical device testing.

`qa:public` passes 128 responsive cases and scans 162 exported directory routes for the updated nine-product selection and its coming-soon controls, with no reported runtime/resource errors or tested axe violations. Local reports/screenshots are in `.review/handy-habit-qa/` and `.review/public-products-qa/`; a compact summary is retained in `docs/qa/handy-habit-summary.json`.

Two local tooling issues were addressed without relaxing source checks: old `out-locked-audit*` exports are excluded from ESLint alongside normal generated output, and the Boards legal validator normalizes Windows CRLF to the same LF format used by its importer before exact text comparison. No other product's kit content was changed.

## Handy Boards integration, 9 November 2026

Production build, typecheck, source lint, content validation and Boards-specific contracts pass. Public browser QA covers 120 EN/VI responsive cases with no reported runtime/resource errors or tested axe violations. Website-kit QA checks 16 rendered legal documents, 122 FAQ answers across four kits, localized media availability and film playback/pause. Focused Boards checks cover eight language/width/palette combinations, full 113-image galleries per language and dialog/Escape behavior. Exact legal text and all other kit data were preserved. Detailed scope and commands: [Boards integration](docs/BOARDS_KIT_INTEGRATION.md). Older results below retain their historical scope.

# Verification — Winka Workbench, 8 November 2026

## Current public catalog — 9 November 2026

The owner now limits public apps to Bookmark, Sticky Wall and Boards while keeping all five games visible. Every product lists App Store, Google Play and Microsoft Store as Coming soon; games also list Steam. Store controls have no placeholder URLs. The former Arcane "Now on" claim has been replaced with Coming soon. Original product source/media remain intact.

The publication contract and commands are recorded in [PUBLIC_CATALOG.md](docs/PUBLIC_CATALOG.md). `validate:public` checks product visibility and lookup boundaries; `qa:public` checks all exported HTML for hidden links/routes plus 120 EN/VI responsive cases, exact store labels/disabled state, catalog membership, hidden-product 404 behavior, axe and runtime/resource errors. Detailed evidence is saved locally in `.review/public-products-qa/`. Earlier audit matrices below describe their recorded catalog scope.

## Latest: gstack design review

The exported site was reviewed across all 310 directory routes at 320/375/768/1440px (1,240 layouts), with visual inspection of 16 representative pages. All four issue groups are fixed: undersized primary prose, shared touch targets (including a clipped product-header menu at 320px), overly wide document text, and product imagery below the first desktop screen on Sticky Wall. See [the review record](docs/qa/gstack-design-review-2026-11-08.md) for exact check timing, evidence and limitations.

Final production build and validation pass. Fifty-six targeted responsive assertions pass; the final complete route sweep reports no JavaScript errors, horizontal overflow, clipped header controls or broken local links. Website-kit QA confirms all twelve supplied legal documents still preserve every rendered word in order. Screenshots and detailed results live in the local gstack design-audit directory referenced by the review record.

The subsequent Sticky Wall hero change passes 16 EN/VI layouts at 320/375/768/1001/1024/1280/1440/1920px on the production export. Its main phone is fully visible within the initial 900px-high desktop viewport. No runtime, header clipping, overflow or axe failures were reported. The production build and content validation were repeated; source lint passes with generated export backups excluded from the lint command.

## Previous Workbench implementation verification

All twelve authorized portfolio-review improvements are implemented and verified against the final static export. Full evidence remains locally in `.review/workbench-qa/`, `.review/portfolio-qa/` and `.review/website-kit-qa/`; compact results are recorded in `docs/qa/workbench-summary.json`.

| Check | Final observed result |
| --- | --- |
| TypeScript / ESLint | PASS, no errors or warnings |
| Production build | PASS, 312 generated pages / 311 HTML files; 309 portable segment-prefetch files |
| Static/media validation | PASS, 22 products, 15,408 local resource references, 689 attributed image records, 42 selected ambient films plus explicit-play trailer |
| Main browser matrix | PASS, 43 routes × 320 / 390 / 768 / 1440px = 172 cases; default and alternate desktop palette audits |
| Workbench browser matrix | PASS, 8 destinations × EN/VI × four widths = 64 cases; WCAG 2/2.1/2.2 checks in this suite |
| Runtime/layout | No reported page errors, HTTP resource failures, broken visible images or horizontal document overflow |
| Accessibility | No reported axe violations in the tested states, including the repaired light-mode model caption and hero roster |
| Product interactions | Filing/status/reset; paper keyboard movement and single-tap alternatives; actual GLB texture/clay/wireframe/rotate/reset; 36 corresponding original hero/skill scenes |
| Navigation/media | Shared-image route navigation, native Back/scroll, full-size capture dialogs/Escape, Lab filters, all thirteen developing Handy entries |
| Reel | Real source footage/captures, 24 seconds, 1280×720, sound only after explicit play, pauses on dialog close; attribution links and source hashes retained |
| Resource preferences | Global pause; reduced-motion opt-in; offscreen homepage shader suspension; data saver leaves shader artwork/model opt-in/unloaded video posters |
| Content/legal | All 76 FAQ answers on support; complete selected-language/device film library; all twelve supplied legal documents match rendered words in order |

Desktop/phone screenshots and focused hero, paper-board, skill-selector and model-material frames were opened for visual review. The three previously overlong landings are approximately 37–48% shorter on desktop and 42–45% shorter on phone while retaining complete linked media/documents. See `docs/WORKBENCH_REWORK.md` for measured heights and the implementation contract.

Tests use headless installed Edge. Mobile touch is browser emulation, not a claim of testing physical Android/iOS hardware. axe is an automated check, not a complete accessibility certification. Shared transitions progressively fall back where browser support is absent. No deployment or public release is implied by these results.

## Previous website-kit integration

The Bookmark, Sticky Wall and Arcane integration passed the exported-site browser suite and focused content/media checks. Earlier results are preserved in `docs/qa/atelier-before-website-kits.md` and the other historical reports. Implementation and source boundaries are recorded in `docs/WEBSITE_KIT_INTEGRATION.md`.

| Check | Observed result |
| --- | --- |
| TypeScript / ESLint | PASS, no reported errors or warnings |
| Static production build | PASS, 266 generated pages / 265 HTML files; 263 portable segment-prefetch files |
| Export/media validation | PASS, 22 products, 12,602 local resource references, 689 active screenshot records |
| Website-kit contract | PASS, complete EN/VI features/pricing, 76 FAQ answers, legal text, media files, Pro badges and development/release boundaries |
| Browser matrix | PASS, 39 routes × 320 / 390 / 768 / 1440px = 156 cases |
| Runtime/layout | No reported page errors, HTTP resource failures, broken images or horizontal document overflow |
| axe | No reported WCAG 2 A/AA or 2.1 AA violations in the tested default/alternate desktop palettes |
| Runtime external requests | None in tested pages |
| Legal preservation | All 12 supplied privacy/terms documents match every rendered word in order, including EN/VI; no generic draft replaces them |
| Media behavior | Bookmark's localized rendered UI, Sticky's Android recording and Arcane's gameplay decode/play muted and pause; full sound trailer waits for explicit play |
| Source integrity | 585 new kit screenshots and 49 imported videos; four Sticky screenshots containing a test price excluded; no source kit or app code changed |

The final small hero-caption cleanup was followed by a fresh static build and targeted Bookmark/browser-flow checks; the focused legal/media suite also reran against that export. Current full and targeted results remain separate under `.review/portfolio-qa/`.

## Covered behavior

Galleries progressively expose the complete selected-language/device set rather than inserting hundreds of images at once. Filter changes reset the visible count. Pro labels remain visible, English UI is distinguished on relevant Vietnamese Arcane captures, and full-size dialogs support arrows, Escape and focus restoration. The focused suite reaches the last supplied Bookmark mobile screenshot.

Full feature, credit, press, changelog and legal routes are directly loadable static HTML. Legal Markdown preserves links/lists/tables, hides source comments, and resolves Arcane's relative privacy link to its actual localized route. Bookmark credits include all supplied authors, CC BY/CC BY-SA/CC0 links and the image-conversion notice; gallery/product/footer links expose the credits.

The native-flow project collection still moves with actual wheel input and retains native project anchors. Client navigation preserves locale. Mobile menu/Escape, catalogue search, model inspection, combat/shop scene switching and keyboard day/night comparison remain covered.

Global pause, reduced motion, shader compilation/drawing, resize still frames, context-loss fallback and Aetherward video behavior remain covered by the main suite. Ambient videos load only when visible and allowed by the user's motion/data preferences. Closed clip accordions do not autoplay hidden movies. The full Arcane trailer has native controls, no autoplay, retained sound and global-pause handling.

## Visual review and repairs

Desktop and phone screenshots were opened and reviewed. The first iteration exposed a mismatched Sticky fan wrapper, low-contrast yellow display text, light labels on dark-mode pastel papers, and an internal HTML comment escaping into a supplied policy. These were fixed and the browser matrix passed. Arcane's original logo now sits over battle footage without a duplicate trailer-intro logo, and its body uses the source Be Vietnam Pro font. The small Bookmark hero keeps its pause control without a cramped label over the phone UI.

Current screenshots are in `.review/portfolio-qa/`; focused film captures and the legal/media report are in `.review/website-kit-qa/`. Compact results are in `docs/qa/website-kit-browser-summary.json`. Review boards and a current kit walkthrough are retained locally in `.review/`.

## Limits and release state

Testing uses isolated headless Windows Edge with SwiftShader available, not a personal signed-in profile. axe runs at desktop width in both palettes; this is not a complete manual accessibility certification or a physical low-end-device performance benchmark.

All three supplied products are described as Android closed testing. The site does not invent verified public stores, tester registration, Steam/iOS downloads, customer metrics or reviews. The supplied policy wording is preserved; this is not an independent legal opinion or certification. Other product documents retain individual draft labels.

The support email is confirmed by all three owner kits. Domain, legal publisher identity and public deployment approval remain unset. `validate --release` therefore remains a separate unmet release gate. The local preview is http://127.0.0.1:4173/vi/. No commit, push or deployment was performed.
