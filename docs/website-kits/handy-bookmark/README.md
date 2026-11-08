# Handy Bookmark — website kit

Everything needed to build the marketing website for **Handy Bookmark** (Android app, `com.apps.winka.handybookmark`), in **Vietnamese and English**. Prepared 2026-11-08 from the app's source (`Handy-Suite/apps/handy_bookmark`, branch `ui-rebuild`, version 1.0.0 build 5).

**Ground rules for the site builder**
- Describe only what is in `copy/*/features.md`. Everything there was checked against the code. A few things were left out on purpose (see "Left out" below).
- Android is the only platform, and it is in **Google Play closed testing**. Don't show App Store or Windows download buttons.
- No reviews, ratings, user counts, awards or press quotes exist. Don't invent any.
- The photos inside the screenshots are Creative Commons and **need credit** on the site: `data/photos/CREDITS.md` has the list and ready-made footer lines.
- Privacy and terms: use `legal/` word for word. Changing their meaning is the owner's call, not the site's.

---

## What's inside

```
handy-bookmark/
├── README.md                 this file
├── copy/
│   ├── en/  vi/              same files in each language, written for that language (not machine-translated)
│   │   ├── features.md       every feature, grouped, with the screenshot to use for each; Pro section
│   │   ├── highlights.md     the 6 feature blocks for the landing page, in order, with images/clips
│   │   ├── taglines.md       hero headline/sub-headline options, short lines, SEO title + description
│   │   ├── faq.md            20 Q&As (ready for FAQPage JSON-LD)
│   │   ├── press.md          fact sheet, 20/60/150-word descriptions, boilerplate
│   │   └── store-listing.md  the Google Play listing exactly as published + two stale lines flagged
│   ├── pro-vs-free.md        Free vs Pro table (EN + VI), price notes
│   ├── platforms-and-links.md  platform status, Play links, legal URLs, contact
│   ├── changelog.md          public releases (EN + VI)
│   └── why-handy-bookmark.md comparison by approach (EN + VI)
├── legal/                    privacy.md, terms.md (verbatim copies of the published pages) + privacy.html, terms.html
├── brand/
│   ├── brand.md              logo use, colour tokens (light/dark), radii, fonts, imagery rules
│   ├── colors.json           the same tokens for code
│   ├── icon/                 icon.svg (master), 1024 full-bleed, rounded 1024, 512 (Play), 192, maskable 192/512/1024
│   ├── favicon/              favicon.ico (16–64), favicon.svg, 16/32/48/64/96/128/256 px, apple-touch-icon-180, android-chrome-192/512
│   ├── feature-graphic/      Play feature graphics 1024×500, EN + VI
│   ├── social/               og-1200x630-{en,vi}.png (Open Graph / Twitter), square-1080-{en,vi}.png
│   └── fonts/                Newsreader (display) + Geist / Geist Mono (body), with OFL licence texts
├── screenshots/              270 PNGs (every feature, both languages)
│   ├── mobile/   146         390×844 pt @3x = 1170×2532 px, light
│   ├── desktop/   52         1440×900 @2x = 2880×1800 px, light
│   ├── tablet/     6         834×1194 @2x = 1668×2388 px, light
│   └── dark/      66         mobile-dark-* and desktop-dark-*
├── highlights/   36          best-of for hero/feature sections: phones in a frame (transparent PNG, ~1108×2156) + desktop JPGs 1920×1200
├── clips/        48          8 clips × 2 languages: .mp4 (H.264, 780×1688, 30 fps), .gif (360 px wide), -poster.jpg
├── store-listing/            the 6 Google Play phone screenshots now live in the store, EN + VI (1080×1920)
└── data/
    ├── sample-data.md        what the sample library contains and why it looks the way it does
    ├── captions.json         alt text (EN + VI) for every screenshot, with form/theme/Pro flags
    └── photos/               the 9 extra CC photos used in the renders + CREDITS.md for all 14
```

File names: `<form>[-dark]-<lang>-<NN>-<scene>[-<variant>].png`, e.g. `mobile-vi-13-share-sheet-saved.png`, `desktop-dark-en-22-reader.png`. The same scene number means the same screen in every form and language. Scenes 19, 21, 23, 40–44 and `06-library-smart-and-saved`, `07-smart-collection` show **Pro** features (`pro: true` in `captions.json`); label them "Pro" on the site.

## How the images were made

All screenshots and clips are the **real app**, drawn by Flutter's test renderer with the app's own fonts, at exact sizes, from a new tool file in the repo (`apps/handy_bookmark/tool/website_shots_test.dart`). They are not mock-ups and not phone recordings, so there is no status bar or system navigation bar; add a device frame on the site if wanted (the `highlights/` phones already have a simple neutral frame). The sample library is described in `data/sample-data.md`.

Clips were rendered frame by frame (33 ms per frame) from the same renderer and encoded with ffmpeg. They show the app's real animations; touches are simulated, so no finger or tap marker is drawn.

No device recordings were made: the owner's BlueStacks "android 11" instance holds a real personal library, and "android 11-2" was in active use by another session (a file picker was open), so recording there could have disturbed it. Both are landscape 1920×1080 anyway, which isn't phone-shaped.

## Scene list (each in vi + en; ✦ = also dark; ▭ = also desktop; ▯ = also tablet)

| # | Scene | Notes |
|---|---|---|
| 01 | home ✦▭▯ | Not sorted strip, Focus card, collections with picture covers; `-scrolled` shows recently saved |
| 02 | home-item-open ✦ (desktop only) | wide layout: item open beside the list — best desktop hero |
| 03 | collection, collection-cards ✦▭ | Recipes as rows and as picture cards |
| 04 | collection-trips ▭ | a collection with a collection inside |
| 05 | item-detail ✦▭ | picture, Open original, Read, tags, private note |
| 06 | library, library-smart-and-saved ✦ | Library page; Pro smart collections + saved searches |
| 07 | smart-collection ▭ | Pro |
| 08 | everything | all saves as cards |
| 09 | new-collection, -template ✦▭ | templates, icons, 8 colours |
| 10 | cover-chooser | |
| 11 | filters | |
| 12 | select-move ▭ | three selected, batch bar |
| 13 | share-sheet, share-sheet-saved | **the key moment**: shared from a video app; one tap → "Saved in Recipes" |
| 14 | save-sheet, save-sheet-paste ✦ | the + sheet; pasting a link |
| 15 | quick-saved | snackbar with Undo |
| 16 | share-how-to | how to save from other apps |
| 17 | picture, picture-full ✦ | a saved photo |
| 18 | search-start, search-results ✦▭ | "da nang" typed without accents finds Đà Nẵng |
| 19 | deep-search | Pro: found inside an offline article |
| 20 | focus ✦▭ | one at a time |
| 21 | focus-skins ✦ | Pro |
| 22 | reader, reader-night-tone ✦▭▯ | offline copy |
| 23 | reader-highlights, -list ✦▭ | Pro |
| 24 | reader-find | |
| 26 | weekly-nudge | Settings with the nudge on (Sunday 19:00) |
| 27 | trash ✦ | Recently deleted |
| 28 | duplicates | |
| 29 | broken-links ▭ | gone / moved / could not tell |
| 30 | settings, settings-1..3 ✦▭ | full settings, scrolled |
| 31 | backup-and-data, -more | import/export (Pocket, Raindrop, files) |
| 32 | library-tools, -storage | |
| 33 | pocket-import | preview before importing |
| 34 | share-collection-menu, share-collection | share a collection as a page |
| 35 | how-to | built-in guide |
| 36 | empty ▭ | first open, empty library |
| 40 | pro ✦ | Pro page (top) |
| 41 | themes, themes-ink-paper, themes-midnight-gallery | Pro |
| 42 | layouts-picker, layouts-0..7 | Pro: Magazine, Masonry, Film strip, Scrapbook, Lookbook, Research board, Timeline journal, Moodboard |
| 43 | auto-organize | Pro |
| 44 | export-studio ▭ | Pro: designed PDF / web export |
| 50 | welcome-1 … welcome-8-find ▭ | the first-run guide with its practice phone |

## Clips (`clips/`)

| Clip | Length | Shows |
|---|---|---|
| `share-sheet-{vi,en}` | 4 s | the save sheet over a video app, one tap on Recipes, the "Saved" card |
| `welcome-{vi,en}` | 13 s | the onboarding story: scattered saves gather, then the practice share on a pretend phone, saved, find |
| `file-{vi,en}` | 3 s | a Not sorted card filed into a collection with one tap |
| `collection-{vi,en}` | 3 s | opening a collection, switching cards/rows |
| `focus-{vi,en}` | 4 s | Focus: swipe right (done), swipe left (later) |
| `search-{vi,en}` | 3 s | typing "da nang", results narrowing |
| `dark-mode-{vi,en}` | 3 s | switching to Dark in Settings, back to Home |
| `layouts-{vi,en}` | 6 s | cycling the 8 Pro layouts |

Use the MP4 with `autoplay muted loop playsinline` and the poster JPG; the GIFs are fallbacks (the welcome GIF is ~9 MB, prefer the MP4).

## Recommended page structure

1. **Hero** — headline "Save it from any app. Find it again." / "Lưu từ mọi app. Tìm lại dễ dàng." (`copy/*/taglines.md`), sub-line, Google Play badge + "Early access" note, image `highlights/01-share-sheet-*` + `02-home-*` (or the `share-sheet` clip).
2. **The problem** — "Saved it. Then forgot it." with `highlights/11-welcome-*` or the `welcome` clip.
3. **Six highlights** — `copy/*/highlights.md`, in order, each with its image/clip.
4. **Screenshot strip** — mobile 01, 03-cards, 05, 13, 18-results, 20, 22, 17 (light) and a dark pair.
5. **Desktop/tablet** — `highlights/02-home-desktop-*`, `07-dark-desktop-*` (say the Windows app is coming later).
6. **Privacy block** — "No account. No ads. No tracking. Your library lives on your phone." Link to `/privacy`.
7. **Free vs Pro** — `copy/pro-vs-free.md`.
8. **FAQ** — `copy/*/faq.md`.
9. **Footer** — contact, privacy, terms, photo credits, language switch.
Other pages: `/features` (full `features.md`), `/privacy`, `/terms`, `/press` (`press.md` + `brand/`), `/changelog`.

Colours, fonts and logo rules: `brand/brand.md`. The app's look is a "warm modern library": ivory `#F6F4EE`, teal `#0E7490`, Newsreader for headlines, Geist for text; dark mode is warm charcoal `#171D1C` with teal `#7CC8D8`.

## Left out on purpose, and why

| Not in the kit | Why |
|---|---|
| Per-item reminders ("bring a link back on the day you choose") | The current build has no way to set a new reminder on an item (removed in the 2026-11 simplification). The **Play listing still claims it** — flagged in `copy/*/store-listing.md` for the owner to fix. Only the weekly nudge is marketed. |
| Google Drive sync | Only in builds made with `HANDY_DRIVE_SYNC=true`, never run against a real Drive account. The FAQ says "in development". The Play changelog for build 4 mentions it — flagged. |
| Folder sync ("sync through a folder") | Works on computers only, and the Windows app isn't released. |
| iPhone, Windows and web downloads | Not built/published. |
| Device-recorded clips (real share from Facebook/TikTok/Chrome) | See "How the images were made". A real share needs a phone-shaped device that isn't the owner's personal library; worth recording later on a clean Android phone. |
| The Pro purchase box and price inside screenshots | Host renders have no store connection, so the box would say purchases aren't set up. Price is in `copy/pro-vs-free.md` instead. |
| Copy text from pictures (OCR) screenshot | Needs the device's on-device OCR; host renders can't show it. Described in text only. |
| The weekly nudge notification itself | It's an Android notification; only the setting is shown. The exact wording is "4 things you saved recently are still waiting." / "4 mục bạn lưu gần đây còn chưa xem." (count only). |
| Dark share sheet | The test renderer drew the share sheet light even in dark mode; not shipped, to avoid showing something that may not match a real phone. |
| Third-party logos (Google Play badge, social apps) | Must be taken from their owners under their brand rules. |

## Other things the owner should know

- **Terms text** says "Settings › Handy Bookmark Pro › Restore purchase"; the app's actual path is **Settings › Upgrade to Pro › Restore purchase**. The kit's FAQ uses the real path; `legal/terms.md` is left verbatim.
- Legal pages are currently hosted on GitHub (branch `ui-rebuild`). If the website hosts them, update Play Console, the OAuth consent screen and `lib/settings/help_links.dart` together (see `copy/platforms-and-links.md`).
- To re-render after app changes (from `apps/handy_bookmark`, Git Bash):
  `KIT_DIR=<out> KIT_PHOTOS=<this kit>/data/photos flutter test --no-pub --timeout 300s tool/website_shots_test.dart`
  then the frames in `<out>/films/` can be encoded again with ffmpeg (30 fps). About 8 minutes for everything.
