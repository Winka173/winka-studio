# Product sources and fresh capture evidence

Latest priority update, 8 November 2026: the owner-supplied Handy Bookmark, Sticky Wall and Arcane website kits supersede earlier copy/media observations for those products. Full source docs are preserved in `docs/website-kits/`; `docs/WEBSITE_KIT_INTEGRATION.md` records the integration. Bookmark Drive sync is not shipped in the current store build; all three Android products are in closed testing. Earlier capture counts and policy-preview observations below are historical for these three products.

Inspected 7–8 November 2026. Completion follows the owner's statements and does not establish public availability. Product source code was not edited; builds and local services were launched for the requested screenshots.

| Source | Identity / state | Capture result on 8 November |
| --- | --- | --- |
| `Projects/Handy-Suite` | 14 Flutter apps; Bookmark complete, other 13 unfinished | Existing release APK installed on the existing Android emulator; real onboarding captured. Source's filled library, collection and Focus screenshots retained for feature presentation. |
| `Projects/Asset-Forge-Studio` | Completed Windows 3D workbench | Local Python backend launched against isolated review data; actual home UI captured. Source Production workspace and front/side/back app inspection screenshots supply richer feature exhibits. No model inference triggered. |
| `Projects/Aetherward` | In-development crystal defense roguelike | Actual Windows build, native `awCapture`, Direct3D 11; preparation and battle captures. The old simulation composite is no longer used as the catalogue/landing image. |
| `Projects/Forgebound` | In-development weapon engineering roguelike | Actual Windows build, native `fbCapture`; title, Forge Board, battles, workshop and legacy screens. |
| `Projects/mmo` | **Autonomous Creative Studio**, an in-development creative app, not an MMO game | Local Node backend with isolated data and session; actual home/create/model screens. No personal signed-in browser profile used. |
| `Projects/MachineBrigade` | In-development mobile vehicle tactics game | Android development APK installed on the review emulator and launched with `unity -force-gles30`, which avoids the Vulkan crash. Real deployment/home and battle frames captured. The old conceptual placeholder is removed. |
| `Projects/Runavelle` | In-development kingdom day/build, night/defend game | Actual Windows build, native `runavelleCapture`; day, close view, HUD and night scenes. Old asset sheet is not called gameplay. |
| `OneDrive/Documents/Arcane-Brigade` | Owner-completed squad action game | Actual Windows build with native art-capture path; combat, bosses and shops. Original store artwork/icon and runtime UI fonts reused. Source art-acceptance diagnostics contain failures; capture success is not game QA approval. |
| `OneDrive/Documents/Sticky-Wall` | Owner-completed Flutter pinboard; source records closed Play testing | Opened already-installed app on existing Android emulator and captured actual sample board. Existing portrait wall/editor/night captures and original cork/stickers retained. No app data reset or uninstall. |

## Reproduction and provenance

- `scripts/capture-products.py`: source-supported Windows capture hooks, per-run isolated saves, Direct3D 11 rendering.
- `scripts/capture-android.py`: existing emulator, install only when absent, never clears app data; validates target package is present in foreground UI.
- `scripts/capture-web-products.mjs`: isolated headless Edge for local running studios. Home captures approved; the exploratory Asset Forge `/production` and `/library` paths returned Not Found and are excluded.
- `scripts/prepare-world-assets.py`, `scripts/select-live-media.py`: optimized copies, original sources unchanged.
- `src/content/media-manifest.json`: earlier source screenshot provenance.
- `src/content/world-media.json`: original art, textures, stickers and inspection screenshot provenance.
- `src/content/live-media.json`: newly captured runtime files, dimensions and date.
- Raw captures and launch logs stay in ignored `.review/product-captures/`. Selected optimized files are under `public/products/`.

Source UI can contain fixture/sample content; it is not represented as customer activity. No ratings, reviews, usage counts, launch dates or public store URLs were invented. All fonts and images are local at runtime. Source font OFL files are included in `public/fonts/`.

`Arcane-Brigade/PRIVACY.md` supplies `apps.winka.studio@gmail.com`; it is used only for that game's support. Studio-wide contact, domain and legal publisher identity still require real owner values.

## Portfolio rework media pass

133 attributed gallery images now cover all 22 products. The expanded selection includes eleven Bookmark desktop/mobile/tablet screens; nine Sticky Wall screens including actual landscape Android; nine Asset Forge screens including responsive web; nine Arcane encounters; and actual development-app galleries, including Widget. `src/content/portfolio-media.json` records exact origin, dimensions, translated title and layout category.

`src/content/portfolio-films.json` records four selected films. Bookmark uses the source review's actual UI transition frames (8 fps, 20 frames); the new Android screenrecord had invalid timestamps and was excluded. Sticky Wall uses an actual Android recording. Aetherward uses 192 native Unity battle screenshots sampled at 24 fps. Arcane uses the original `comet-runner.mp4` in-engine combat/VFX capture, explicitly a preview, not a public trailer.

All selected film pixels were inspected. A window-recorder attempt did not capture the intended game pixels and was discarded, along with its review thumbnail. No desktop-window recorder output is used on the website. Native capture hooks and existing in-engine recordings supply game footage instead.

The image galleries identify demonstration content inside genuine product UI. No customer activity, public release, native mobile version of the Asset Forge web layout, or native PC release of Sticky Wall is inferred from a screenshot. Source app code and installed app data were preserved.
