# Handy Bookmark brand

Source: `apps/handy_bookmark/lib/design/theme.dart` ("Warm Modern Library"), `assets/icon.svg`, `docs/UX_REDESIGN.md`.

## Idea

A warm, modern library: ivory paper by day, warm charcoal by night. Surfaces part by tone, not by lines. One hue — the teal of the icon — for actions and selection; the user's own collections carry their own identity colours as small dots or pale tints, never as big coloured icons. Serif (Newsreader) only for "editorial" moments: the library's name, an item's title on its own page, collection names in headlines. Everything else in Geist.

## Logo / icon

- `icon/icon.svg` — master vector (viewBox 18 18 72 72; for a maskable web icon use viewBox `0 0 108 108`). A saved thing (a bookmark holding its picture) in front of another (a collection).
- `icon/icon-1024.png` (full-bleed square), `icon/icon-rounded-1024.png` (rounded preview for the web/press), `icon/icon-512-play-store.png`, `icon/icon-192.png`, `icon/icon-maskable-*.png`.
- Wordmark: there is no separate logotype file. The feature graphic sets **"Handy Bookmark"** in Newsreader Medium next to the icon; do the same on the site (Newsreader 500, letter-spacing −0.4px at display sizes).
- Clear space: at least ¼ of the icon's width around it. Don't recolour the icon, add shadows inside it, or put it on the teal colour without a light edge.

## Colours

| Token | Light | Dark | Use |
|---|---|---|---|
| canvas (page ground) | `#F6F4EE` | `#171D1C` | Page background |
| surface | `#FFFFFF` | `#222A29` | Cards, panels |
| raised | `#EFEDE6` | `#2B3432` | Chips, quiet buttons |
| sunk | `#EAE8E0` | `#121716` | Wells, inputs |
| **primary (brand teal)** | **`#0E7490`** | **`#7CC8D8`** | Buttons, links, selection |
| pressed | `#0B5A70` | `#9AD6E3` | Hover/pressed |
| tint | `#D9EEF2` | `#21424A` | Selected background, highlights |
| on primary | `#FFFFFF` | `#0C2A31` | Text on primary |
| ink | `#1C2627` | `#EEF2EF` | Body text |
| muted | `#5B6767` | `#B0BEBA` | Secondary text |
| line | `#E3E2DA` | `#34403E` | Hairlines |
| sage | `#557A66` | `#9CC2AC` | Secondary accent |
| warm | `#C97A5B` | `#E2A188` | Tertiary accent |
| danger | `#B03A36` | `#F0A29C` | Destructive |
| warning | `#8A5A14` | `#E8C07A` | Warnings |

Icon colours: teal `#0E7490`, deep teal `#0B4F63`, sky `#5FB0C2`, ivory `#F7F2E8`, amber `#F2B44B`, sun `#FFF4DA`.

Corner radii used in the app (px): chips pill, fields/buttons 14, thumbnails 12, items 16, collections 20, Focus card 22, dialogs 22, sheets 26.

`colors.json` has the same values for code.

## Fonts (all SIL Open Font License 1.1 — free to self-host; keep the OFL text next to the files)

| Face | Files | Use |
|---|---|---|
| **Newsreader** (Production Type) | `fonts/Newsreader/` Regular, Medium, SemiBold + `Newsreader-OFL.txt` | Display: headlines, the product name, quotes |
| **Geist** (Vercel) | `fonts/Geist/` Regular, Medium, Bold + `Geist-OFL.txt` | Body, UI, buttons |
| Geist Mono | `fonts/Geist/GeistMono-Regular.ttf` (same OFL) | Small technical labels only |

Both cover Vietnamese (the app uses them for Vietnamese text). If subsetting for the web, keep the Latin Extended Additional range (U+1EA0–1EF9) for Vietnamese.

## Imagery

- Screenshots are real app renders (see `../data/sample-data.md`).
- Photos inside them are Creative Commons pictures from Wikimedia Commons; **credit them on the site** (see `../data/photos/CREDITS.md`) or use the screenshots without those photos.
- Source apps are named in their own colours as text (TikTok, Facebook…), never with their logos. Keep it that way on the site; don't add third-party logos without checking their brand rules.
