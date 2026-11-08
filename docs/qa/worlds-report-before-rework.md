# Verification â€” bespoke worlds, 8 November 2026

The current studio and product-world implementation passed the project checks and the real-browser suite. This report concerns the new implementation, not the archived four-style prototype exercise.

| Check | Observed result |
| --- | --- |
| TypeScript | PASS |
| ESLint | PASS, zero warnings |
| Production build | PASS; 248 static pages generated, 245 portable segment-prefetch files prepared |
| Registry / export validation | PASS; 22 products, 2 locales, 247 HTML files, 9,936 local resource references |
| Dependency audit | 0 vulnerabilities |
| Browser QA | PASS; 31 routes, 124 route/viewport combinations at 320 / 390 / 768 / 1440px |
| Browser runtime | Zero reported page errors, missing HTTP resources, broken images, horizontal overflow or clipped product-door copy in tested cases |
| axe | Zero reported WCAG 2 A/AA and 2.1 AA violations in the tested default and alternate palettes |
| External runtime requests | None in tested pages |
| Public release | Not approved; legal previews and owner configuration remain pending |

Browser: installed Windows Edge, headless, isolated Playwright contexts. No personal browser profile. Every product landing is covered, plus EN/VI homepage and the four completed product worlds in both languages, catalogue, support and Vietnamese privacy document. The automated axe scans run at desktop width in both palettes; all four listed widths are checked for layout. This is automated evidence, not a blanket accessibility certification or a full manual screen-reader audit.

Verified flows:

- Search, clear, family and completion filters, no-results state.
- Theme toggle and persistence; language switch preserves product path.
- Mobile navigation open/close; source-specific FAQ disclosure.
- Keyboard skip link; reduced-motion disables authored hero animation.
- Product interactions: Bookmark mouse and arrow-key tabs, Sticky rearrangement, Forge view and inspection frame, Arcane scene switch.
- Normal motion is active; global pause freezes authored CSS animations and resumes.
- Client navigation reinitializes scene observers; product chapter remains visible after entering from home.
- Custom directly served 404.

## Visual review and motion

Desktop and mobile screenshots were opened and inspected. The first round found an intrinsic-width screenshot pushing the homepage door's text outside its clipped container; the grid now constrains that track and the suite guards the copy width. Other repaired findings included invalid ARIA on animated title spans, low-contrast auxiliary colors, and transitions continuing after global pause. The title now exposes one complete screen-reader text string and decorative word masks separately.

Client navigation is explicitly tested in normal motion: enter Sticky Wall from the studio cabinet, scroll to a new chapter and verify that the scene observer reveals it. `WorldMotion` rebinds its observer on pathname changes. Reduced motion disables the hero choreography; normal mode has active authored animations; pause leaves no running authored animations in the tested homepage flow.

Screenshots: ignored `.review/world-screenshots/`. Labeled overview boards: `.review/site-worlds-contact.jpg` and `.review/product-runtime-contact.jpg`. Raw browser report: `.review/browser-qa.json`; compact committed summary: `docs/qa/worlds-browser-summary.json`.

A final artwork polish replaced the duplicated Arcane title image with the original character artwork. Its EN/VI pages were rechecked at all four widths (8 additional cases), both palettes and all interaction flows: no errors or reported axe violations.

## Source capture limits

All nine source repos were inspected and launch/capture attempted. Eight yielded actual runtime media, tracked in `src/content/live-media.json`. Machine Brigade crashes in native Unity Vulkan on the existing emulator; its launcher screenshot is excluded, and its landing graphic is labeled as project identity artwork. Source art-acceptance diagnostics for Arcane include failures; screenshot capture is not game-release QA approval. Exploratory Asset Forge routes that returned Not Found are excluded from selected media.

Product source code was not changed. Windows captures used source-supported hooks and isolated saves; studio backends used isolated review data; installed Android app data was not cleared. Source servers have been stopped; the website preview remains available locally.

## Build and release limits

One Windows export attempt encountered `ENOTEMPTY` while the static preview was serving `out/`. After stopping that preview, the production build completed. Build before starting the static preview when rebuilding on this machine. The previously verified Windows segment-prefetch postbuild workaround remains in use.

No public store URLs, reviews, ratings, release dates, legal publisher identity or final privacy promises were invented. Legal documents remain visibly non-effective previews with approval flags false. No commit, push or public deployment was performed. Real domain/contact/publisher values and shipping-build legal review remain prerequisites in RELEASE_CHECKLIST.md.

Archived skill-native prototype results, including Taste `GATE: OPEN 3`, are preserved in `docs/qa/prototype-report.md`. They apply to the old Taste direction only. No fresh native Taste pass or third-party certification is claimed for the bespoke implementation, whose expanded motion and separate identities follow the owner's later instructions.
