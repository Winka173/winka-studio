# Winka Studio — one studio, many worlds

The owner's latest instruction supersedes the initial four-style selection exercise: make each product landing page its own world and make motion a large part of the experience. The studio frame connects those worlds through consistent navigation, real product evidence and clear release states.

## The studio

Cobalt `#244dd8`, cream `#f3f2e9`, citron actions, Bricolage display and Manrope text. A perspective cabinet previews the four completed products. Four larger doors introduce the products through their own materials and compositions; a compact directory keeps development projects discoverable. The homepage avoids presenting every product as an equal generic card.

## Product worlds

| Product | Identity and composition | Motion / interaction |
| --- | --- | --- |
| Handy Bookmark | Warm paper, teal, Newsreader; library masthead, physical book motif, real wide UI, reading chapters and phone shelf | Book entrance, staggered words, screen tabs with keyboard arrows, local/Drive connection path |
| Sticky Wall | Cork and paper, source Mali/Sriracha fonts, actual source stickers, scrapbook wall and night-board chapter | Rearrange the board, floating stickers, paper transitions, decorative waveform |
| Asset Forge Studio | Graphite, technical grid, amber, Archivo/Geist Mono; inspection workbench, four-step pipeline, full workspace | Real front/side/back screenshot selector, optional inspection-frame overlay, scan line, sequenced pipeline pulses |
| Arcane Brigade | Original store artwork, burgundy theatre, gold; source Fraunces display/heading and Alegreya body assets | Curtain entrance, drifting embers, slow key-art movement, combat/shop scene switch |
| Autonomous Creative Studio | Salmon film treatment, large production headline and real running workspace | Moving film perforations, timeline entrance |
| Aetherward | Jade crystal, concentric sigil and authentic battle window | Counter-rotating rings, crystal drift, chapter entrance |
| Forgebound | Parchment, copper, monumental serif title, actual title/forge/combat captures | Forge glow, title and image entrance |
| Runavelle | Lime kingdom/daylight into a darker night chapter; authentic day/night captures | Landscape response, chapter transition |
| Machine Brigade | Olive military typography and an explicitly conceptual tactical diagram | Scanner sweep, route pulses; no invented gameplay |
| Remaining Handy apps | Family relationship with individual slug-specific colors, icons, titles and poster motifs | Light poster motion and entrance; clearly in development |

Screenshots are authentic app captures, never hand-built replacement app interfaces. Book/board/tactical graphics belong to the website's presentation; the tactical graphic is explicitly identified as project identity artwork. Asset Forge's three views are actual app screenshots, not a live 3D viewer.

## Motion and access

`WorldMotion` uses one IntersectionObserver and coalesced animation frames for scroll/pointer input. Long CSS loops suspend offscreen and when the document is hidden. A fixed named pause button freezes the authored animation layer. Reduced-motion shows content immediately without choreography; content is also visible when JavaScript is disabled. No WebGL contexts, scroll hijacking or autoplay video. Pointer effects stay decorative and do not move text required for reading.

Light/dark palettes are defined per world, with a saved explicit preference and OS dark fallback. Branded dark worlds can retain a dark default. Navigation, language switching, support links and legal routes follow the same studio structure throughout. Mobile art must not force an intrinsic-width grid track wider than its container.

## Skills and historical exploration

Addy Osmani frontend-ui-engineering informs semantics, responsive behavior and verification. Taste informs evidence, deliberate typography and authentic media. UI/UX Pro Max informs contrast, interaction and responsive checks. gstack informs expressive art direction and visual review. The owner's explicit request for many animations and different product worlds takes priority over conflicting Taste restrictions on a single uniform system or few motion moments.

The original four directions are retained for historical comparison at `/review/`. Their exact native Taste gate result and gstack craft findings are archived in `docs/qa/prototype-report.md`; they do not certify the new bespoke implementation. Original direction notes are in `docs/qa/prototype-design.md`.
