# Handy Boards brand

Source: `apps/handy_boards/lib/design/theme.dart` (palette, radii), `packages/handy_ui/lib/kit/theme.dart` (`HandyBrand.boards`), `assets/icon.svg`, `docs/UX_REDESIGN.md`.

## Idea

A pinboard for work: warm stone ground, flat white cards, one magenta for actions and selection. The user's own categories carry their identity colours as small dots, thin bars and pale tints; the app's chrome never competes with them. Covers are flat drawings (a notebook, a road, a lamp) in muted paper tones. Indigo is never used.

## Logo / icon

- `icon/icon.svg`: master vector, "Board in Colour": three columns of cards (amber, ivory, teal) on a full-bleed magenta field, inside the 66 % safe circle (viewBox `0 0 108 108`, so it also works as a maskable web icon).
- `icon/icon-1024.png` (full-bleed square), `icon/icon-rounded-1024.png` (rounded preview for the web and press), `icon/icon-512-play-store.png` (as uploaded to Play), `icon/icon-192.png`, `icon/icon-maskable-{192,512,1024}.png` (extra margin for Android/PWA masks).
- Favicons in `favicon/`: `favicon.ico` (16–64), `favicon.svg`, 16–256 px PNGs, `apple-touch-icon-180.png`, `android-chrome-192/512.png`.
- Wordmark: no separate logotype file. Set **"Handy Boards"** in Plus Jakarta Sans Bold next to the icon, as on the feature graphic and the social images.
- Clear space: at least ¼ of the icon's width. Don't recolour the icon, add effects inside it, or put it on magenta without a light edge.

## Colours

| Token | Light | Dark | Use |
|---|---|---|---|
| canvas (page ground) | `#F3EFEE` | `#191417` | Page background (warm stone) |
| surface | `#FFFFFF` | `#241E22` | Cards, panels |
| raised | `#EAE4E3` | `#2E272C` | Chips, quiet buttons |
| sunk | `#E4DDDC` | `#130F12` | Wells, inputs |
| **primary (brand magenta)** | **`#A61C8E`** | **`#EB9BD9`** | Buttons, links, selection |
| pressed | `#82136F` | `#F4BCE6` | Hover / pressed |
| tint | `#F7E1F1` | `#45233C` | Selected background |
| on primary | `#FFFFFF` | `#3A0E30` | Text on primary |
| ink | `#231A21` | `#F3ECF0` | Body text |
| muted | `#62575F` | `#BFB2BA` | Secondary text |
| line | `#E2DADA` | `#3A3237` | Hairlines |
| control | `#CBC1C3` | `#574C53` | Switch tracks, borders |
| danger | `#B3261E` | `#F2A7A0` | Destructive, "Not finished" |
| warning | `#8A5A0F` | `#E9C27F` | Warnings |
| positive | `#2F6F4A` | `#8FD3A8` | Done |

Icon colours: magenta `#A61C8E`, amber `#D9930B`, teal `#1F9E8F`, ivory `#FFF6EC`.

Category identity colours in the screenshots (blue, amber, green, red dots) come from the app's 8-hue palette and belong to the user's data, not the brand. Don't use them as brand accents.

Corner radii (px): chips pill, controls 12, cards 14, columns 18, tiles 20, sheets 26. Spacing scale 4 / 8 / 12 / 16 / 24 / 32.

`colors.json` has the same values for code.

## Type

- **Plus Jakarta Sans** for everything (display 400–700, text 400–600). The Vietnamese is complete in the bundled static weights. Files and the OFL licence are in `fonts/PlusJakartaSans/`. It is also on Google Fonts.
- Headlines: Bold or SemiBold, letter-spacing about −0.5 px at display sizes. Body 16 px or more.
- Figures (counts like 2/5, dates) use the same face; no monospace.

## Imagery rules

- Use the real screenshots in `screenshots/` and `highlights/`. They are the app, not mock-ups.
- Show the phone in the neutral dark frame of `highlights/` or without a frame. Don't add a brand-name device.
- Covers are the app's own drawings; they may be cropped and enlarged as decoration.
- No stock photos of people at laptops, no gradients, no glows.
