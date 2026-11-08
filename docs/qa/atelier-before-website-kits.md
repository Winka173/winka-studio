# Verification — Atelier portfolio rework, 8 November 2026

The reworked portfolio passed build, typecheck, lint, media/export validation and the real-browser suite. The earlier four-style study and cobalt cabinet/worlds reports are historical, not claims about the current implementation.

| Check | Observed result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, zero warnings |
| `npm run build` | PASS; 248 generated pages and 245 portable segment-prefetch files |
| `npm run validate` | PASS; 22 products, 247 HTML files, 10,813 local resource references |
| Media contract | PASS; 133 attributed images across all 22 products, matching dimensions and EN/VI titles; four local films |
| Film decode audit | All four selected H.264 films decoded successfully; durations 7.30s / 2.50s / 8.00s / 6.00s |
| `npm run qa` | PASS; 31 routes, 124 cases at 320 / 390 / 768 / 1440px |
| Browser errors | None reported: no page errors, missing HTTP resources, broken images or horizontal overflow in tested cases |
| axe | No reported WCAG 2 A/AA or 2.1 AA violations in tested default/alternate themes |
| External runtime requests | None in tested pages |
| Release | Not approved; legal previews and owner configuration remain pending |

## Runtime coverage

Installed Windows Edge, headless, isolated contexts; no personal signed-in browser profile. The browser is launched with SwiftShader availability so WebGL is tested rather than silently skipped. Every product landing, the EN/VI homepage, all four completed-product pages in both languages, catalogue, support and a Vietnamese legal document are included. Layout is checked at all four widths. The automated axe audits run at desktop width in both palettes; this is not a full manual accessibility certification or a physical low-end-device benchmark.

Verified flows:

- Real screenshot gallery: platform filters, expanded views, modal, arrow keys, Escape and native focus restoration.
- Forge source view switching; Arcane combat/shop switch; keyboard-operable real day/night screenshot comparison.
- Four complete projects in ordinary document flow, native anchor navigation, measured wheel movement, client navigation and localized path preservation. No old pinned theatre remains.
- Source-grounded purpose and three-stage workflow/gameplay guide on every product landing, directly reachable from its navigation.
- Mobile menu, Escape dismissal, product catalogue search and reset.
- Original WebGL compiles and draws; global pause freezes canvas and CSS, then resumes.
- WebGL context loss leaves CSS artwork fallback and readable content.
- Actual native-frame gameplay decodes and plays; global pause stops video time.
- Reduced-motion renders a still shader including after resize and does not download/autoplay videos.
- Direct static 404.

The shader test checks actual compile readiness and increasing draw frames. It verifies a stable frame counter under global pause, successful resume and a deliberately lost WebGL context falling back to CSS artwork. The reduced-motion test also resizes the viewport to confirm that the still canvas redraws correctly. The movie test waits for actual native-frame gameplay decode/playback, then verifies that global pause freezes media time. Reduced motion leaves the video source absent and does not autoplay/download the movie.

## Visual review

Desktop and mobile screenshots were opened and inspected. Earlier checks corrected a too-dark light-mode shader treatment and a still canvas clearing on resize. The latest revision replaces the pinned theatre with native-flow project articles, confines a new light-ribbon shader to the homepage hero, and adds source-grounded product guides. Browser QA caught insufficient contrast on the new anchor numbers in light mode; their color was corrected and the complete 124-case matrix passed with no reported violations.

The guide registry covers all 22 products. An editorial audit read current docs and relevant implementation across all nine source repositories; all 58 internal source references resolved locally. This is not an exhaustive source-code correctness review. Product-purpose, workflow-step and navigation-anchor checks run on every tested product landing. Exact gameplay distinctions and controls are documented in `docs/PRODUCT_CONTENT_AUDIT.md`.

Current screenshots: `.review/portfolio-qa/`. Review boards: `.review/portfolio-desktop-board.jpg`, `.review/portfolio-mobile-board.jpg`, `.review/portfolio-development-board.jpg`. Product source board: `.review/portfolio-product-captures.jpg`. Compact test summary: `docs/qa/portfolio-browser-summary.json`.

Latest focused review: `.review/native-scroll-review/` contains all four project articles and the nine primary products' Vietnamese guides at desktop/mobile widths (18 guide captures). `.review/portfolio-motion.webm` and `.review/portfolio-motion.mp4` show the current hero, actual wheel scrolling through the four projects, and direct navigation to Arcane/Runavelle controls. They replace the earlier theatre recording.

## Media evidence and limits

All nine supplied repositories now have usable real product media. Machine Brigade's Vulkan startup crash was bypassed with the source-supported Android Unity command-line extra `-force-gles30`; actual home/deployment/battle images replace the earlier conceptual placeholder. No source product code was modified, no installed app data was cleared, and the newly installed game was stopped after capture.

The gallery records source paths, dimensions, translated titles and the capture/layout category. Genuine product UI can contain demonstration content, explicitly identified in gallery context. Layout labels do not invent native PC/mobile distribution. Source screenshot fixtures are not asserted to be customer activity.

Bookmark's selected film is the source UI review's actual frame sequence, identified accordingly. Sticky Wall is an Android screen recording. Aetherward consists of 192 images captured by its native Unity hook during a real battle at 24 fps. Arcane uses the original in-engine combat/VFX preview and is not called a public trailer. Invalid-timing and wrong-target recorder output was excluded, including the window-recording attempt. No desktop-grabber footage is shipped.

## Delivery and remaining release work

The static preview remains at http://127.0.0.1:4173/vi/. No commit, push or public deployment was performed. No reviews, ratings, usage metrics, store URLs, release dates, legal identity or final privacy assertions were invented. Legal documents remain visibly non-effective previews; real origin/publisher/contact values, shipping-build review and owner approval are still prerequisites.

Skill influence is documented in DESIGN.md and docs/PORTFOLIO_REWORK.md. The owner's later request for extensive motion, shaders and separate product compositions takes priority over incompatible Taste constraints. No new standalone Taste gate or third-party certification is claimed. Historical results remain in docs/qa/prototype-report.md and docs/qa/worlds-report-before-rework.md.
