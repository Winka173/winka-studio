# Arcane Brigade: website kit

Everything needed to build the game's website. Every picture and clip was taken from the real game (Windows build of 8 November 2026). The save behind them has really been played: fourteen runs went through the game's own progress code, so the records, Lamp Oil, collection and achievements are real numbers, not placeholders.

## What is where

| Folder | Contents |
|---|---|
| `01_Brand/` | `logo.png` (1200×420, transparent), app icon (1024, 512, 192), Play feature graphic (1024×500) |
| `02_Screenshots/pc/` | 1920×1080 JPEGs, PC layout. `_captions.md` gives an English and a Vietnamese caption for each |
| `02_Screenshots/mobile/` | 2400×1080 JPEGs, phone layout (touch controls, larger text). Same names as `pc/` |
| `02_Screenshots/vietnamese/` | 1920×1080 JPEGs with the game set to Tiếng Việt, for the Vietnamese pages |
| `03_Clips/pc/` | 1920×1080 MP4 clips at 30 fps with the game's own sound |
| `03_Clips/mobile/` | Three 2400×1080 MP4 clips in the phone layout (buying and a star-up, night 18, the night 4 boss), for phone mock-ups |
| `03_Clips/trailer-40s.mp4` | 40 seconds of the best moments with the logo at the start (1080p, with sound). `trailer-40s-web-720p.mp4` is a light copy for the page; `trailer-40s-muted-loop-720p.mp4` has no sound, for an autoplaying background |
| `04_Copy/` | Website copy in English (`website-copy.en.md`) and Vietnamese (`website-copy.vi.md`): hero section, pitch, numbers, 13 feature blocks, a how-to-play strip, price, platforms, FAQ, press facts, SEO |
| `05_Legal/` | `privacy-policy.md` and `terms-of-service.md`, both in English and Vietnamese |
| `06_Data/` | `facts.json` (read from the game), `heroes.md` (all 36 heroes and their skills), `bosses.md`, `friends.csv` (66), `relics.csv` (204) |
| `07_Art/` | The game's own character art, transparent PNG, cropped: `heroes/` (36), `friends/` (66, the ones in `friends.csv`), `bosses/` (10), `enemies/` (51), `relics/` (204, the ones in `relics.csv`). Secret relics and special guests are left out on purpose: they are surprises in the game |

## File names

- `menu-…`: the menus (main, hero select, continue, collection, journal, records, settings, how to play)
- `hub-…`: the Waiting Room and each station (Lamp Tree, Wardrobe, Postbox, Museum, Night Pact, Window, Bell)
- `shop-…`, `market-…`, `secret-…`: the shop, the dream market (ferry, Last Customer) and a secret room
- `fight-…`: nights 5, 14 and 18, a chest
- `boss-night-04…20`: the boss of each fourth night; `-a` is the arrival, `-b` the fight
- `place-…`: the six dream places
- `skill-NN-<HeroId>`: every hero's signature skill; `transform-…`: four transformations
- `result-…`: a won run, a lost run, the night's summary
- Clips: `clip-01-buy-and-star-up`, `clip-02/03-fight-wave-14/18`, `clip-04/05-boss-night-4/16`, `clip-06-transformation`, `clip-place-…` (six places)

## Brand

- **Colours** (sampled from the logo and icon):
  - midnight navy `#0D1430` (backgrounds)
  - lamp gold `#F0C060` and `#D8A848` (headings, buttons)
  - deep crimson `#4A1010` and `#7A1E1E` (banners, ribbons)
  - flame orange `#FF9A2E` (highlights)
  - parchment `#F4E6C8` (cards)
- **Mood:** a storybook at night. Warm lamplight on dark wood and velvet, gilded frames, hand-painted characters, small and friendly but strange.
- **Fonts in the game** (all SIL Open Font License, free for the web, all on Google Fonts): Young Serif, Fraunces, Lilita One, Coiny, Alegreya Sans, Be Vietnam Pro and Caveat. Use a serif such as Young Serif or Fraunces for titles. For body text use Be Vietnam Pro, which covers every Vietnamese accent.
- The mascot is the **Lantern Knight** (the app icon): `07_Art/heroes/lantern-knight.png`.

## Rules for the website

1. **Be honest about status.** Android is in closed testing; PC (Steam) and iPhone are planned. Do not show store buttons for stores where the game is not listed. See *Platforms* in the copy.
2. **Price:** say "free, no ads, one optional purchase (Deluxe)". Do not hide Deluxe.
3. **Use the numbers in the copy**; they come from the game (`06_Data/facts.json`). Do not round 36 heroes up to "40+".
4. **Every page links** to the privacy policy and the terms (`05_Legal/`). Contact: apps.winka.studio@gmail.com.
5. **No made-up quotes, reviews, ratings or download counts.**
6. Clips have sound; mute them when they autoplay.

## Still to decide (owner)

- The website address. The privacy policy and terms then move there; today they are also at `https://github.com/Winka173/Arcane-Brigade/blob/main/PRIVACY.md` and `.../TERMS.md`.
- Whether to show the Steam page before it exists ("Wishlist" needs a live Steam page).
- The terms say nothing about which country's law applies; add it if a lawyer advises it.

## Credits for a credits page

- Game by Winka Studio.
- Fonts: Noto, Be Vietnam Pro, Alegreya Sans, Caveat, Coiny, Fraunces, Lilita One, Young Serif (SIL Open Font License).
- Some sound effects use CC0 recordings by Kenney (kenney.nl).
