# Winka Workbench rework

Owner request: implement all twelve recommendations from the portfolio review.

## Design contract

An independent maker's workbench: warm graphite, printed labels, mint registration marks, real product screens. Archivo and Manrope remain locally hosted. Large, legible editorial type; continuous native document scrolling. Four completed products are selected work. Developing products live in a separately named Lab with honest build status.

Each product earns its own material and interaction: Bookmark reading paper and a collection filing demonstration; Sticky Wall cork, movable paper and yarn; Asset Forge technical grid and a real GLB inspector; Arcane theatre, original hero art and actual skill captures. No fabricated customer numbers, release claims, testimonials or app screens.

Taste, Addy frontend engineering, UI/UX Pro Max and gstack design-review inform the implementation. Owner preference for expressive motion and distinct product worlds overrides Taste's limits on visual effects and a single product aesthetic. UI/UX Pro Max's verified motion-driven portfolio result supports native scrolling, complete DOM reading order, context-dependent motion and reduced-motion alternatives. This is not a claim of passing a skill's external certification.

## Delivery checklist

- [x] Workbench home opening
- [x] Source-grounded problem / decision / result case studies
- [x] Studio process and general Contact
- [x] Product-specific materials
- [x] Edited landings and complete media/detail destinations
- [x] Readable primary and supporting typography
- [x] Four product-specific interactions
- [x] Shared-element route transitions
- [x] 20–30 second studio showreel
- [x] Selected Work / Lab hierarchy
- [x] Visible mobile previews and enlargement
- [x] Motion choreography, pause, reduced motion and resource controls

## Evidence and constraints

Content comes from the existing source audit and archived owner website kits. Legal documents and platform release gates remain authoritative. Real product captures remain labelled with their capture context. Web demonstrations are explicitly labelled. No changes to source product repositories. No deployment in this task.

References: Instrument's work navigation, Lusion's separate experiments, BASIC/DEPT's reel entry point and Linear's product hierarchy were reviewed during the preceding audit; no branding or code is copied. Next 16.4.5's installed view-transitions guide documents React 19.3 ViewTransition with automatic route integration. Three.js's official GLTFLoader and OrbitControls documentation informs the lazy model inspector.

## Verified implementation

The complete export has 312 generated pages, 311 HTML files and 309 portable prefetch copies. Both locales have a Lab and all 22 products have full `/media/` destinations. Four completed-product previews immediately show desktop/mobile images when available; full libraries retain source order. All 76 FAQ answers remain on support, all paid inclusions remain in accessible disclosures, and the twelve supplied legal documents preserve their rendered words exactly.

The reel is 24 seconds, 1280×720, 3,715,534 bytes. `scripts/generate-studio-reel.py` reproduces the edit; `public/studio/showreel-provenance.json` records source paths and hashes. Playback and sound require an explicit click. Photo attribution is directly linked in the reel dialog, in product documents and in the footer. The GLB is copied byte-for-byte from the source application's reduced scale-reference pack; its separate provenance file identifies it as a website inspection example rather than a browser AI output or app recording.

Original hero/skill copy comes from the archived Arcane `06_Data/heroes.md` and PC caption index. All 36 original portraits and skill scenes are selectable. Six short descriptions have source-grounded Vietnamese copy; the remaining source descriptions are explicitly marked English on Vietnamese pages.

### Landing length

Measured at the same 1440px desktop / 390px phone widths with reduced motion. Values are main-content height, not a claim about reading time.

| Landing | Before desktop | After desktop | Before phone | After phone |
| --- | ---: | ---: | ---: | ---: |
| Handy Bookmark | 16,201px | 8,386px | 16,464px | 9,155px |
| Sticky Wall | 12,796px | 8,098px | 14,723px | 8,591px |
| Arcane Brigade | 13,470px | 8,238px | 15,189px | 8,354px |

`npm run qa` passed 43 routes at four widths (172 cases) and default/alternate desktop accessibility audits. `npm run qa:workbench` passed an additional 64 layout cases, interaction flows, touchscreen emulation, native Back, shader suspension and data-saver behavior. `npm run qa:kits` preserved all twelve legal documents, complete FAQ/film destinations, credits and actual video behavior. Evidence and limitations are recorded in `QA_REPORT.md`.
