# Winka Studio — design exploration

Status: **four directions implemented, owner selection pending**. Do not describe any direction as the approved final brand. The current assignment explicitly asks to review styles before applying a final UI across the site.

All directions use the same verified product inventory, a semantic header/footer, local media/fonts, EN/VI routes, keyboard focus, saved theme preference and reduced-motion support. They deliberately differ in composition, not just color tokens.

## A · The Independent

Skill: Addy Osmani `frontend-ui-engineering` from `addyosmani/agent-skills`.

Paper `#f5f3ed`, ink `#252620`, persimmon `#a23e28`. Newsreader display with Manrope UI. A broad typographic opening flows into a composed product stage, an unequal editorial product story and a ruled Handy family list. The source reference was Handy Bookmark's own after-audit Warm Modern Library implementation: reuse its hierarchy and evidence standards, while using a separate studio palette and homepage structure.

Interaction: once-only hero entrance, product-image hover, visible link/focus feedback. Body content is present without JavaScript. A is also the temporary shared foundation for product/support/legal pages until a studio direction is chosen.

## B · Product, in Focus

Skill: `design-taste-frontend` (installed 2.5.1).

The actual dealers selected **split** (`--type software --has ui`), **candy-on-black**, **Funnel Display / Funnel Sans**, and the **letters-assemble** moment. Palette tokens and deal history are in local `.taste-skill/`; the selected tokens are retained in `src/styles/taste.css`. Fonts are self-hosted instead of the dealer's external CDN snippets, following the project brief.

A fixed 72px navigation and twelve-column grid align the real Bookmark UI with the first-screen copy. Subsequent screens give Sticky Wall and Asset Forge their own space; the statement is the native letters-assemble module, with phone/reduced-motion fallback. Desktop sections and footer are exactly one screen in the native screenshot report. The skill's original motion/moment files are unchanged and MIT attribution is retained.

Actual native checker findings are recorded in `QA_REPORT.md`. Framework wrapper/review controls differ from the skill's standalone starter. No blanket certification or hidden waiver is claimed.

## C · After Hours

Skill: `ui-ux-pro-max` from NextLevelBuilder.

Local design-system query: `indie software studio portfolio`, project `Winka Studio`. It returned a monochrome, motion-driven portfolio with scroll storytelling. The implementation uses Archivo display and locally available Manrope UI, restrained entrance/hover feedback and real game/workbench imagery. No heavy parallax, video autoplay, WebGL or external fonts were added.

Ink `#151719`, warm white `#f4f2ec`, secondary `#aab0b3`. A large typographic intro leads into a cinematic pair of actual captures, then an indexed collection of product rows and an in-development game workshop. The light mode has a separate neutral palette.

## D · The Play Department

Skill: gstack design-consultation and craft-audit guidance.

Cobalt `#254fda`, cream `#f4f4ed`, moss ink `#243026`, citron action surface `#e8eeaa`. Verified local Bricolage Grotesque display with Manrope body. A committed color band introduces an open workbench composition; products use material-like surfaces, then a named Handy family list. No invented numbers, testimonials, avatars or commercial claims.

The gstack guidance specifically discouraged the cream/serif default, neon-black default and generic icon/three-card SaaS pattern for its proposal. D takes a color-led, expressive direction instead. Its image feedback moves the container, not the image. The source craft lint was run; its coverage and findings are documented rather than passed off as a full external design review. No second agent/provider was invoked.

## Selection and next implementation

After selection, apply the chosen system consistently to the shared catalogue, completed product landing pages, legal/support documents and development states. Revisit the chosen direction's outstanding native craft findings; remove the unused design routes and review UI from the public delivery. Public legal approval and actual domain/store/publisher values remain independent release prerequisites.
