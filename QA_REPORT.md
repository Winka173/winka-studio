# Verification — Winka Workbench, 8 November 2026

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
