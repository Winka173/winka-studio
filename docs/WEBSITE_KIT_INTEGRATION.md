# Owner website kit integration — 8 November 2026

The owner supplied three complete website kits and requested that the site follow them throughout. These kits now take precedence over earlier source-reading notes for Handy Bookmark, Sticky Wall and Arcane Brigade. No source repository or kit was modified.

## Imported evidence

| Kit | Active screenshots | Imported silent web videos | Content |
| --- | ---: | ---: | --- |
| `Handy-Website-Kit/handy-bookmark` | 270 | 16 | Six highlights, full features, Free/Pro comparison, 20 FAQ answers per language, press facts, actual closed-test changelog, verbatim privacy/terms and required photo credits. |
| `Sticky-Wall/docs/website` | 88 | 7 | Full feature sections, Pro inclusions, 10 FAQ answers per language, brand materials/fonts, native phone and landscape Android captures, verbatim EN/VI privacy/terms and credits. |
| `Arcane-Brigade-Website-Kit` | 227 | 26 | Thirteen feature sections, exact catalogue counts, all 36 original hero portraits, six dream places, Deluxe inclusions, 8 FAQ answers per language, press facts and verbatim EN/VI privacy/terms. |

There are 585 new screenshots. The four Sticky Wall `21_pro` screenshots are deliberately excluded because they expose a test price; the kit explicitly says not to publish that price. Bookmark's Pro images have visible Pro badges. English UI in Arcane's shared or mobile-layout media is identified on Vietnamese pages rather than relabeled as Vietnamese footage.

`scripts/import-website-kits.py` imports the kits reproducibly. It preserves all textual kit materials in `docs/website-kits/`, optimizes actual images to WebP, prepares muted H.264 web delivery copies and creates posters without retiming the footage. An additional copy of the supplied 40-second Arcane web trailer retains its soundtrack for explicit playback. Font files and OFL texts are self-hosted; Arcane's Be Vietnam Pro faces come from its original source Resources/Fonts directory named by the kit.

`src/content/kit-media.json`, `kit-films.json` and `docs/website-kits/import-manifest.json` record provenance. `website-kits.json` contains the selected public copy and complete legal text. Build/runtime do not require the local source repositories; rerunning the importer does.

## Product changes

Bookmark now leads with the kit's share/save story and teal/ivory library identity. Six editorial chapters show saving, pictured items, collections, search, Focus/reading and local ownership; a dedicated Pro exhibit labels paid layouts/highlights. **Drive sync is not promoted as shipped**: the current store build does not include it. Folder/file backups and import are described instead. Wide-screen images are previews of the app layout, not Windows downloads. The renderer-generated movies are explicitly described as UI renders, not recordings of a physical phone.

Sticky Wall uses the supplied paper/yellow/ink palette, Pacifico/Patrick Hand, all five phone exhibits and real large-screen Android boards. Its chapters show drag/rotate, yarn, memory walls and templates; supplied materials, Lights off and all seven gesture recordings carry the actual app. Seven note kinds plus stickers is the kit's public terminology. Pro is optional and paid once; no store price is hardcoded in the landing/pricing presentation.

Arcane uses the original transparent logo on actual battle footage, midnight navy and lamp gold. Catalogue counts come from `facts.json`: 36 heroes, 66 recruitable friends, 117 weapons, 204 relics and 94 duets; the copy separately identifies 23 joint combos. Six places, the Waiting Room, bosses, character art, both screen layouts and the complete clip collection expand the presentation. Deluxe is explicit; no paid power or nonexistent Steam/iOS download is promised. Full trailer sound waits for the visitor to play it.

## Complete information and legal text

Each product has `/features/` and `/credits/`, plus the existing support/privacy/terms/data-deletion URLs in EN/VI. Bookmark additionally has `/press/` and `/changelog/`; Arcane has `/press/`. The owner kit FAQ replaces generic support answers. The homepage images and selected project exhibits use the same current kit assets.

Privacy and terms render the complete supplied language section with its date and wording. Markdown links, lists and tables are retained; source HTML comments are hidden. Relative Arcane policy links resolve to the actual localized policy route. A browser test compares every rendered legal word in order with all twelve supplied documents. Data-deletion pages link/display the complete relevant privacy policy so backup/cloud distinctions stay intact.

Photo credits are reachable below the galleries, in product resources and in the global footer. Bookmark credits include all named authors, source links and CC BY/CC BY-SA/CC0 licenses, with an explicit resized/WebP transformation notice. Sticky's CC0/public-domain sources and font notices are retained.

## Deliberate boundaries

Android remains closed testing for all three products. No unverified public download, tester registration, Steam page or iOS store link was invented. Google Play could not be independently opened by the browser research tool, so the registry does not mark a public store link verified. Full source policies can describe optional/build-dependent integrations that the landing correctly distinguishes from current store availability; their legal wording was not silently rewritten.

Store-listing copy flagged as stale by the Bookmark kit is not repeated as a feature claim. Builder directions, internal file paths and test prices are removed from marketing presentation. Raw reference catalogues and unused source art stay editorial assets rather than becoming unsupported product promises.

The studio's domain/public deployment approval is still unset. This local integration does not publish the website or claim independent legal certification. Other products retain their individually marked draft documents. See QA_REPORT.md for final checks.

## Arcane Brigade refresh — 9 November 2026

The owner re-shot the Arcane kit. The site now follows it:

- **Status:** the owner's instruction for launch is "now on Google Play, the App Store and Steam"; the page says so. No store link is invented: buttons appear once real, verified links are added to the registry.
- **Unreleased content stays hidden:** 24 heroes (twelve more wait for later updates and acts and are never shown or named); only the first two bosses (the Coin Widow, the Chair Porter) appear. `validate-website-kits.ts` fails the build if Arcane media names a hidden hero or a later boss.
- **Story:** a short, spoiler-free story section (the Waiting Realm, eight lamps, keep the last one burning until dawn).
- **Footage:** a 2-minute trailer with the game's music (PC and phone layouts; explicit-play copy keeps its sound), clips of six heroes, the Waiting Room, a visitor, the dream market and a secret room, and three edited gameplay videos per layout. Counts come from the kit's `facts.json`: 24 heroes, 66 friends, 105 weapons, 204 relics, 94 duets.
