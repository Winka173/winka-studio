# Verification — 8 November 2026

**Taste native result: `GATE: OPEN 3 (rounds used up)`.** This is a design-review delivery, not a claim that all four skills certified a public release.

## Normal project checks

| Check | Actual result |
| --- | --- |
| `npm ci` / installation | Completed; machine disk issue resolved using task-local caches on D |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, zero warnings |
| `npm run build` | PASS; Next reports 248 generated static pages and automatic postbuild prepares 245 portable prefetch copies |
| `npm run validate` | PASS: 22 products, 2 locales, 247 HTML files, 9,866 local resource references checked |
| `npm audit` | 0 vulnerabilities, including dev dependencies |
| `npm run qa` | PASS: 33 route/viewport combinations, zero page errors, zero broken images, zero unintended external runtime requests, zero reported axe violations |
| `npm run validate -- --release` | EXPECTED FAIL: four unapproved product legal sets, unapproved public release, missing real domain, legal publisher identity and studio-wide support address |

The initial dependency audit found moderate issues in a dev-only transitive `minimatch`. The narrow override for `@typescript-eslint/typescript-estree` selects 11.0.5; lint/typecheck/build still pass and the final audit is clean. The framework was not downgraded to silence the advisory.

## Browser coverage

Headless installed Windows Edge; isolated browser contexts, no personal browser profile. The Playwright/axe suite covered the review board; EN and VI A/C/D; Bookmark detail; Sticky Wall detail; a Vietnamese legal document; and the app catalogue at **360, 768 and 1440px**. The non-review pages were also checked after switching to their alternate color palette. Axe ran WCAG 2 A/AA and 2.1 AA tags; this is automated coverage, not a blanket accessibility certification.

Working flows verified:

- Search, clearing search, family and completion filters, and no-results recovery.
- Theme actually changes the palette and persists after reload.
- Language switch retains the current product and sets the correct HTML language.
- Mobile menu open/close and FAQ expansion.
- First keyboard Tab reaches the skip link; reduced motion disables the authored A hero entrance.
- Unknown URL serves the custom 404 with an HTTP 404 response.

The Windows static export initially produced broken browser prefetch requests. The postbuild helper adds the exact flattened filenames requested by the client. Browser verification was rerun after the fix: zero 404s or JavaScript errors in the tested pages/flows. The exported HTML/link validator checks all product and legal routes, not only the photographed pages.

## Taste native checks and open findings

Taste was captured using **its own scripts**, with Node 22 and separate headless Edge profiles. Actual final screenshots exist at 1440×900, 768×1024 and Vietnamese 390×844. The desktop screenshot report measures five sections at exactly one screen each. The native gate checked 1440 and 390, reported zero runtime errors at both, and progressed from 33 open findings to 6, then 3 across its three allowed rounds.

The three remaining native findings are recorded without changing or hiding the checker:

1. `container-edges`: the top-level React theme wrapper is outside the standalone starter's expected direct `body > header/main/footer` shape. Semantic landmarks exist inside it; the wrapper is still a deviation from the skill's starter contract.
2. `container-edges`: the Taste footer wrap has three children (directory, completed-product navigation, legal row), while the kit requires exactly two. The additional navigation is functional; it is still a structural failure under that contract.
3. `split-pair`: Sticky Wall's text column starts with its real app icon above the heading. The checker treats that as a picture-first column even though the text column is visually left and the screenshots right. Keep this item open rather than claim it passed.

Three waivers were applied and disclosed:

- `button-styles`: the closing primary action intentionally reverses foreground/background on the cyan statement section. It uses the same component, type and interaction.
- `motion-layer`: unchanged native `motion.css` is present inside Next's generated hashed stylesheet; the checker expects a literal stylesheet filename. The original native motion script and `.btn` rules are retained.
- `hero-lines`: the fixed final English headline fits two desktop lines; the actual Vietnamese phone heading was inspected. The skill explicitly permits a waiver when its synthetic 45-character stress headline fails but the final text fits.

A fourth attempted waiver for the React wrapper was **ignored** because its target matched both structural findings. Those findings remain open. No kit files were edited and no page content was hidden from the checker. There were 17 nonblocking native warnings, including hashed/optimized asset recognition, visual-selector detection and copy/action annotations for the review dock; these are not presented as passes. Native performance and every possible screen-reader/device/browser combination have not been tested.

The [Taste skill](C:/Users/Winka/.agents/skills/design-taste-frontend/SKILL.md:278) says: “Fix what it lists and run it again until its last line is `GATE: PASS` or `GATE: OPEN`, three rounds at most.” Its native final result instructed stopping fixes and reporting the open findings. Accordingly, this delivery retains B as a reviewable direction with those three findings, without labeling it final or store-ready.

## gstack craft lint

The source craft lint was run on the D component/styles and shared global CSS: **0 blocks, 16 asks, 2 polish notes; rendered mode not requested**. Remaining heuristic questions include off-scale spacing and global hover rules used by other directions. Real browser QA is separate above. No external model, independent agent, or full gstack shipping workflow was invoked or claimed.

## Media, claims and release audit

All product screenshots/icons come from the supplied repositories. Aetherward's simulation composite is visibly labeled and is not called gameplay. Runavelle's inspected asset sheet was deliberately not marketed as a screenshot. Preview-board images are actual browser captures of these implementations. Fonts and runtime media are local; the image manifest records provenance.

No store links, download buttons without destinations, ratings, testimonials, launch dates, studio legal entity, final privacy assertions or governing-law clauses were invented. Arcane's repository email is used only for Arcane support. Legal text is explicitly a non-effective review preview; all final legal flags remain false.

The site has no backend requirement, paid API dependency, analytics, contact form submission or third-party embed. No public deployment, commit or push has occurred. Shared detail/support/legal pages use the temporary A foundation until the owner selects the final direction.
