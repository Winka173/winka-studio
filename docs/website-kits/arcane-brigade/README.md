# Arcane Brigade: website kit

Everything needed to build the game's website. Every picture and clip was taken from the real game (Windows build of 8 November 2026). In play, the pictures show two heroes only, the Lantern Knight and the Comet Courier; the other heroes appear once each, in their skill picture. The save behind them has really been played: fourteen runs went through the game's own progress code, so the records, Lamp Oil, collection and achievements are real numbers, not placeholders.

## What is where

| Folder | Contents |
|---|---|
| `01_Brand/` | `logo.png` (1200×420, transparent), app icon (1024, 512, 192), Play feature graphic (1024×500) |
| `02_Screenshots/pc/` | 1920×1080 JPEGs, PC layout. `_captions.md` gives an English and a Vietnamese caption for each |
| `02_Screenshots/mobile/` | 2400×1080 JPEGs, phone layout (touch controls, larger text). Same names as `pc/` |
| `02_Screenshots/vietnamese/` | 1920×1080 JPEGs with the game set to Tiếng Việt, for the Vietnamese pages |
| `03_Clips/pc/` | 1920×1080 MP4 clips at 30 fps with the game's own sound (music and effects) |
| `03_Clips/mobile/` | The same clips in the 2400×1080 phone layout, for phone mock-ups |
| `03_Clips/gameplay/` | Three edited gameplay videos, about 1 minute 40 each, with sound: a whole night, the dream market and the shop between nights, the next night, uncut. Each opens with a short title and has small captions at the moments that matter. `pc/` is the PC layout (1920×1080); `phone/` is the phone layout, played sideways (2400×1080) |
| `03_Clips/trailer-pc.mp4` | The trailer: about 2 minutes, 1080p, PC layout. It opens on the story, then the two lead heroes (the Lantern Knight and the Comet Courier), the shop and star-ups, visitors, deals and secret rooms, bonds, four more heroes, the first two bosses, the six places, and a starfall climax. Music is the game's own (Moth Lullaby, Second Act, First Light) with the game's effects under it. `trailer-phone.mp4` is the same cut in the phone layout (2400×1080). `trailer-web-720p.mp4` is a light copy for the page; `trailer-muted-loop-720p.mp4` has no sound, for an autoplaying background |
| `04_Copy/` | Website copy in English (`website-copy.en.md`) and Vietnamese (`website-copy.vi.md`): hero section, pitch, numbers, 13 feature blocks, a how-to-play strip, price, platforms, FAQ, press facts, SEO |
| `05_Legal/` | `privacy-policy.md` and `terms-of-service.md`, both in English and Vietnamese |
| `06_Data/` | `facts.json` (read from the game), `heroes.md` (the 24 heroes in the game today and their skills), `bosses.md`, `friends.csv` (66), `relics.csv` (204) |
| `07_Art/` | The game's own character art, transparent PNG, cropped: `heroes/` (24), `friends/` (66, the ones in `friends.csv`), `bosses/` (2: the Coin Widow and the Chair Porter only), `enemies/` (51), `relics/` (204, the ones in `relics.csv`). Secret relics and special guests are left out on purpose: they are surprises in the game |

## File names

- `menu-…`: the menus (main, hero select, continue, collection, journal, records, settings, how to play)
- `hub-…`: the Waiting Room and each station (Lamp Tree, Wardrobe, Postbox, Museum, Night Pact, Window, Bell)
- `shop-…`, `market-…`, `secret-…`: the shop, the dream market (blood and Dreamsand prices, the ferry) and a secret room
- `fight-…`: nights 5, 14 and 18, a chest
- `boss-night-04…20`: the boss of each fourth night; `-a` is the arrival, `-b` the fight
- `place-…`: the six dream places
- `hero-lantern-knight-…`, `hero-comet-runner-…`: the two lead heroes' skills landing in a late-night crowd, and their transformations (the best pictures of play)
- `skill-NN-<HeroId>`: the signature skill of each of the 24 heroes in the game; `transform-…`: the two lead heroes transformed
- `result-…`: a won run, a lost run, the night's summary
- Clips: `clip-01-buy-and-star-up`, `clip-02/03-fight-wave-14/18`, `clip-04/05/06-boss-night-4/16/20`, `clip-hero-lantern-knight`, `clip-hero-comet-runner` (skill again and again, then the transformation), `clip-place-…` (six places)
- Gameplay: `gameplay-01` the Lantern Knight on night 3, into the night-4 boss; `gameplay-02` the Comet Courier on night 7, into the night-8 boss; `gameplay-04` Velvet Regent on night 13

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

1. **Status:** the game is out on Google Play, the App Store and Steam (the owner's instruction for the site's launch). Show all three store buttons. Never write "coming soon". See *Platforms* in the copy.
2. **Price:** say "free, no ads, one optional purchase (Deluxe)". Do not hide Deluxe.
3. **Use the numbers in the copy**; they come from the game (`06_Data/facts.json`). Do not round 24 heroes up to "30+". Twelve more heroes wait for later updates and acts: never show or name them.
4. **Every page links** to the privacy policy and the terms (`05_Legal/`). Contact: apps.winka.studio@gmail.com.
5. **No made-up quotes, reviews, ratings or download counts.**
6. Clips have sound; mute them when they autoplay.
7. The gameplay videos are large (about 100 MB each) (dense particles do not compress well). Host them on YouTube or a video service and embed them, rather than serving the files from the page. On the page itself, use the 720p trailer copies.
8. **Bosses:** show only the first two, the Coin Widow (night 4) and the Chair Porter (night 8). The later bosses, and above all the last one, are surprises: never show or name them.
9. **Story:** use the short story in the copy as written. Do not explain who is waiting or why.

## Still to decide (owner)

- The website address. The privacy policy and terms then move there; today they are also at `https://github.com/Winka173/Arcane-Brigade/blob/main/PRIVACY.md` and `.../TERMS.md`.
- The terms say nothing about which country's law applies; add it if a lawyer advises it.

## Credits for a credits page

- Game by Winka Studio.
- Fonts: Noto, Be Vietnam Pro, Alegreya Sans, Caveat, Coiny, Fraunces, Lilita One, Young Serif (SIL Open Font License).
- Some sound effects use CC0 recordings by Kenney (kenney.nl).
