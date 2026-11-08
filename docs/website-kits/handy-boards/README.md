# Handy Boards — website kit

Everything needed to build the marketing website for **Handy Boards** (Android app, `com.apps.winka.handyboards`), in **Vietnamese and English**. Prepared 2026-11-09 from the app's source (`Handy-Suite/apps/handy_boards`, branch `ui-rebuild`, commit `ac4858ff`; Play has version 1.0.0 build 3). Built the same way as the sibling kit `../handy-bookmark/`.

**Ground rules for the site builder**
- Describe only what is in `copy/*/features.md`. Everything there was checked against the code.
- **The screenshots are newer than the store build.** The board timeline (by day/week/month, past weeks read-only), choosing several categories and template fields were finished on 2026-11-09 and reach testers with the next upload. Most board screenshots show the timeline (the "By week" chip and the week bar). Publish the site after that upload, or label those parts "coming in the next update". `captions.json` marks the newest scenes with `new_in_next_update`.
- Android is the only platform, and it is in **Google Play closed testing**. Don't show App Store or Windows download buttons.
- No reviews, ratings, user counts, awards or press quotes exist. Don't invent any.
- Privacy and terms: use `legal/` word for word. Changing their meaning is the owner's call, not the site's.

---

## What's inside

```
handy-boards/
├── README.md                 this file
├── copy/
│   ├── en/  vi/              same files in each language, written for that language (not machine-translated)
│   │   ├── features.md       every feature, grouped, with the screenshot to use for each; Pro section
│   │   ├── highlights.md     the 6 feature blocks for the landing page, in order, with images/clips
│   │   ├── taglines.md       hero headline/sub-headline options, short lines, SEO title + description
│   │   ├── faq.md            23 Q&As (ready for FAQPage JSON-LD)
│   │   ├── press.md          fact sheet, 20/60/150-word descriptions, boilerplate
│   │   └── store-listing.md  the Google Play listing exactly as published + its stale lines flagged
│   ├── pro-vs-free.md        Free vs Pro table (EN + VI), price
│   ├── platforms-and-links.md  platform status, Play links, legal URLs, contact
│   ├── changelog.md          releases (EN + VI), including the next update
│   └── why-handy-boards.md   comparison by approach (EN + VI)
├── legal/                    privacy.md, terms.md (verbatim copies of the published pages) + privacy.html, terms.html
├── brand/
│   ├── brand.md              logo use, colour tokens (light/dark), radii, type, imagery rules
│   ├── colors.json           the same tokens for code
│   ├── icon/                 icon.svg (master), 1024 full-bleed, rounded 1024, 512 (Play), 192, maskable 192/512/1024
│   ├── favicon/              favicon.ico (16–64), favicon.svg, 16–256 px, apple-touch-icon-180, android-chrome-192/512
│   ├── feature-graphic/      the Play feature graphics 1024×500, EN + VI
│   ├── social/               og-1200x630-{en,vi}.png (Open Graph / Twitter), square-1080-{en,vi}.png
│   └── fonts/                Plus Jakarta Sans (Regular, Medium, SemiBold, Bold) with its OFL licence
├── screenshots/              226 PNGs (both languages)
│   ├── mobile/   120         390×844 pt @3x = 1170×2532 px, light
│   ├── desktop/   44         1440×900 @2x = 2880×1800 px, light
│   ├── tablet/     4         834×1194 @2x = 1668×2388 px, light
│   └── dark/      58         mobile-dark-* and desktop-dark-*
├── highlights/   38          best-of: phones in a neutral frame (transparent PNG) + desktop JPGs 1920×1200
├── clips/        42          7 clips × 2 languages: .mp4 (H.264, 780 px wide, 30 fps), .gif (360 px wide), -poster.jpg
├── store-listing/            the 6 Google Play phone screenshots now live, EN + VI (1080×2160)
└── data/
    ├── sample-data.md        the five sample boards and the fixed date
    └── captions.json         alt text (EN + VI) for every screenshot, with form/theme/Pro/new flags
```

File names: `<form>[-dark]-<lang>-<NN>-<scene>[-<variant>].png`, e.g. `mobile-vi-04-week-past.png`, `desktop-dark-en-02-board.png`. The same scene number means the same screen in every form and language. Scenes 20–29 and `05-card-repeat` show **Pro** features (`pro: true` in `captions.json`); label them "Pro" on the site.

## How the images were made

All screenshots and clips are the **real app**, drawn by Flutter's test renderer with the app's own font at exact sizes, from a tool file in the repo (`apps/handy_boards/tool/website_shots_test.dart`). They are not mock-ups and not phone recordings, so there is no status bar or system navigation bar; the `highlights/` phones have a simple neutral frame. Clips are rendered frame by frame (33 ms per frame) and show the app's real animations; taps are simulated and drawn as a soft round finger marker.

The Pro page's purchase bar was **cropped off** `29-pro` and the `pro` clip: host renders have no store connection, so it read "Not on sale in this build". The price is in `copy/pro-vs-free.md`.

## Scene list (each in vi + en; ✦ = also dark; ▭ = also desktop; ▯ = also tablet)

| # | Scene | Notes |
|---|---|---|
| 01 | home ✦▭▯ | boards with covers, "1 due today" |
| 02 | board ✦▭▯, board-trip ✦▭, board-home | Semester 1 by week; the trip with its fields; home chores with repeats |
| 03 | categories-two ✦▭ | two categories picked (new) |
| 04 | week-next ✦, week-past ✦, timeline-sheet ✦, past-card | the timeline (new) |
| 05 | card ✦▭, card-fields ✦, card-repeat | a full card; a trip card's fields (new); repeat menu (Pro) |
| 06 | cover-picker | |
| 07 | new-board | template or blank |
| 08 | templates ✦▭, templates-study ✦▭ | the gallery |
| 09 | template-preview ✦, -setup ✦, -plan ✦, template-trip-preview, -trip-fields | preview → Smart Setup → plan; suggested fields (new) |
| 10 | blank | |
| 11 | board-menu ✦, categories-edit, move-to | |
| 12 | search ✦▭ | every board |
| 13 | trash | |
| 14 | key-dates | |
| 20 | my-work ✦▭ | Pro |
| 21 | rules ✦, rules-editor ✦ | Pro |
| 22 | saved-filters | Pro |
| 23 | card-templates | Pro |
| 24 | fields | Pro (making your own) |
| 25 | looks ✦ | Pro, Blueprint previewed on the board |
| 26 | insights | Pro |
| 27 | history | Pro |
| 28 | export-plain ▭, -poster ▭, -print ▭, -report ▭ | plain free, the others Pro |
| 29 | pro ✦▭ | Pro page, purchase bar cropped |
| 30 | settings, settings-1..3 ✦ | |
| 31 | notifications | |
| 32 | widgets | |
| 33 | how-to, -cards, -categories, -time | |
| 34 | empty ▭ | first open |
| 50 | welcome-1 … welcome-7 ▭ | the welcome with its practice board |

## Clips (`clips/`)

| Clip | Length | Shows |
|---|---|---|
| `welcome-{vi,en}` | 14 s | choosing Study, then the practice board: add a card, drag it, tap a category, tick a subtask |
| `template-{vi,en}` | 9 s | New board → template → Semester preview → Smart Setup → plan → board created |
| `categories-{vi,en}` | 4 s | tapping two categories; only their cards stay |
| `timeline-{vi,en}` | 7 s | next week, back, last week read-only, "Bring them all to this week" |
| `card-{vi,en}` | 6 s | opening a card, ticking two subtasks, back to the board |
| `dark-mode-{vi,en}` | 4 s | switching to Dark in Settings |
| `pro-{vi,en}` | 15 s | the Pro page playing three demos: repeating cards, automation, board looks |

Use the MP4 with `autoplay muted loop playsinline` and the poster JPG; the GIFs are fallbacks.

## Recommended page structure

1. **Hero**: headline "Everything you have to do, on one board." / "Mọi việc cần làm, trên một bảng." (`copy/*/taglines.md`), sub-line, Google Play badge + "Early access" note, image `highlights/02-board-*` with `04-week-past-*` (or the `timeline` clip).
2. **Six highlights**: `copy/*/highlights.md`, in order, each with its image/clip.
3. **Templates strip**: `screenshots/mobile/*-08-templates*`, `*-09-template-preview*`, clip `template`.
4. **Desktop/tablet**: `highlights/02-board-desktop-*`, `08-dark-desktop-*` (say the Windows app is coming later).
5. **Privacy block**: "No account. No ads. No tracking. Your boards stay on your phone." Link to `/privacy`.
6. **Free vs Pro**: `copy/pro-vs-free.md`, with the `pro` clip.
7. **FAQ**: `copy/*/faq.md`.
8. **Footer**: contact, privacy, terms, language switch, a link to Handy Bookmark.
Other pages: `/features` (full `features.md`), `/privacy`, `/terms`, `/press` (`press.md` + `brand/`), `/changelog`.

Colours, type and logo rules: `brand/brand.md`. The look is a "pinboard": warm stone `#F3EFEE`, white cards, magenta `#A61C8E`, Plus Jakarta Sans; dark mode is plum-black `#191417` with pink `#EB9BD9`.

## Left out on purpose, and why

| Not in the kit | Why |
|---|---|
| The Pro purchase bar and price inside screenshots | No store connection in host renders; cropped. Price in `copy/pro-vs-free.md`. |
| Google Drive sync screens | Shown only in builds made with `HANDY_DRIVE_SYNC=true` (the Play build 3 is one); the test renders a normal build. Described in text. |
| Notifications and widgets on a real home screen | Android draws them; host renders show only the app's settings pages for them. |
| Device-recorded clips | The BlueStacks instances hold the owner's real data and are landscape; worth recording later on a clean Android phone. |
| iPhone, Windows and web downloads | Not built/published. |
| Third-party logos (Google Play badge, Trello) | Must be taken from their owners under their brand rules. |

## Other things the owner should know

- **The phone header is tall.** On a 390×844 phone the board's title, key date, chips, category strip and week bar take about 60 % of the screen before the first card (`mobile-*-02-board.png`). This is item B1 of `docs/UI_AUDIT_2026-11-08.md`, still open. Re-render the kit after it is fixed.
- **Terms text** says "Settings › Handy Boards Pro › Restore purchase"; the app's actual path is **Settings › Upgrade to Pro › Restore**. The kit's FAQ uses the real path; `legal/terms.md` is left verbatim.
- The Play listing has lines that no longer match the app (`copy/*/store-listing.md` lists them); store screenshot 3 shows the old time view.
- Legal pages are hosted on GitHub (branch `ui-rebuild`). If the website hosts them, update Play Console, the Google Cloud OAuth branding and `lib/settings/help_links.dart` together.
- To re-render after app changes (from `apps/handy_boards`, Git Bash):
  `KIT_DIR=<out> flutter test --no-pub --timeout 600s tool/website_shots_test.dart` (about 4 minutes; `KIT_LANGS=vi` or `KIT_ONLY=<scene prefix>` to narrow), then the frames in `<out>/films/` are encoded with ffmpeg at 30 fps.
