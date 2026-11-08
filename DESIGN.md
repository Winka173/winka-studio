# Winka Atelier — portfolio rework

The owner rejected the previous cobalt cabinet and sparse, decorative product presentations. The current direction is a media-rich experimental portfolio. `docs/PORTFOLIO_REWORK.md` records the design contract and primary references.

The latest owner-provided website kits supersede the earlier three-product compositions below: Bookmark now follows ivory/brand teal and a six-part share/save story; Sticky uses its yellow/ink/paper materials and Pacifico/Patrick Hand; Arcane uses its original logo, midnight navy/gold, full battle footage, six places and all 36 hero portraits. `docs/WEBSITE_KIT_INTEGRATION.md` records the exact source content/media rules. All three have complete FAQ, paid inclusions, detailed feature pages and supplied legal documents. Active gallery coverage is now 689 screenshots across 22 products.

## Studio

Ink `#0d0d10`, warm white `#f5f2eb`, silver/jade/rose light, Archivo with an expressive Newsreader counterpoint. Original GLSL satin/glass ribbons respond to pointer movement inside the homepage hero. Real desktop, mobile and gameplay captures form a perspective composition under the headline. There is no solid cobalt hero or CSS imitation application UI.

The portfolio unfolds through a studio statement, four complete project articles, a complete project index and an oversized moving signoff. Each article scrolls naturally with its own real media, palette and typography. Desktop alternates image/text sides; mobile stacks them. Native anchors jump to projects. The former sticky theatre and scroll-fraction content switching were removed after owner feedback. See `docs/SCROLL_AND_BACKGROUND_RESEARCH.md` for the reference study and rationale.

## Product compositions

| Product | Current presentation |
| --- | --- |
| Handy Bookmark | Owner-kit share/save landscape, six editorial chapters, eight localized UI film scenes, Free/Pro details and 270 localized light/dark captures. Ivory/teal, Newsreader/Geist. |
| Sticky Wall | Five source-kit phone views, real large-screen Android walls, paper chapters, materials, seven native recordings and 88 localized captures. Paper/yellow/ink, Pacifico/Patrick Hand. |
| Asset Forge Studio | Large outlined typography, real production workbench, active scan layer, source front/side/back inspector, staggered Create/Library exhibits and nine gallery views including responsive web UI. Graphite/ice, Archivo/Geist Mono. |
| Arcane Brigade | Original logo, native battle footage, full sound trailer on request, all 36 hero portraits, six dream places and 227 PC/mobile-layout/VI captures. Midnight navy/lamp gold, Fraunces/Be Vietnam Pro. |
| Aetherward | Crystal-like liquid field, real eight-second battle film sampled by the native Unity capture hook, formation/battle gallery. |
| Forgebound | Copper/parchment treatment, monumental serif title, actual forgemaster/forge/map/battle/workshop captures. |
| Runavelle | Day/night landscape comparison with a keyboard-operable slider; five actual Windows game views. |
| Machine Brigade | Military display type and real Android deployment/battle images. The earlier missing-capture state was resolved by launching with OpenGL ES 3. |
| Autonomous Creative Studio | Editorial film treatment with actual home/create/model screens, clear development state. |
| Remaining Handy apps | Source-backed developing-product introductions and actual app galleries, including Widget's native theme and responsive editor views. |

## Media integrity

133 optimized gallery images cover all 22 products. `src/content/portfolio-media.json` records source, dimensions, device/layout category and translated title. Screens are never fabricated HTML imitations. Demonstration content inside the genuine UI is identified as such in the gallery context. Desktop, mobile, tablet/landscape and gameplay categories describe the capture; they do not invent public platform releases.

Four local films have provenance in `portfolio-films.json`: Bookmark's source UI frame sequence, Sticky Wall's Android recording, Aetherward's actual Unity battle frames and Arcane's existing in-engine combat/VFX preview. The latter is identified as a preview rather than a public trailer. Captures with invalid timing or pixels that did not match the intended target were excluded.

## Motion implementation

One native WebGL canvas per product/homepage, no heavy 3D library. Homepage ribbons are confined to the hero; product pages retain the warped noise, spectral contours and pointer ripples in their own palettes. The render loop caps updates near 30 fps, requests a low-power context, and stops for global pause, reduced motion, an offscreen surface or a hidden document. Resize redraws a still frame in reduced motion. Context loss reveals a CSS artwork fallback.

CSS perspective, floating capture groups, scroll-linked scenes, clip/blur entrances, animated inspection layers, filmstrip movement, hover previews and image magnification supply different types of motion. Project browsing remains in ordinary document flow. Effects support rather than replace access to real product media.

Global pause controls authored CSS, shader and video. Movies are muted, inline, source-lazy and visibility-driven; reduced motion and data saver keep posters until explicit play. No audio autoplay, scroll hijacking, paid API, external runtime font or image service.

## Access and verification

Galleries have actual buttons, device filters, native modal dialogs, arrow keys, Escape and focus restoration. Mobile menu Escape returns focus to its trigger. Source media remain viewable at full size. All product and legal URLs retain EN/VI paths. Theme controls persist the explicit choice; light/dark palettes are checked in the browser. Exact latest verification is in QA_REPORT.md.

All 22 product pages include a source-grounded purpose and three-stage workflow/gameplay explanation. Verified game controls are listed where supported, with a direct navigation anchor. Product prose follows current docs and implementation rather than stale design plans. `docs/PRODUCT_CONTENT_AUDIT.md` records the nine-repository findings and content boundaries.

Historical implementations and their checker findings are retained in `docs/qa/`. The current design follows the later owner instructions on shaders, extensive motion and separate product identities; it is not claimed to pass a conflicting standalone Taste dealer/gate contract or to be certified by a skill author.
