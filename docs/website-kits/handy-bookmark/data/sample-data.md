# The sample library shown in the screenshots and clips

Every screenshot and clip is the real app (Handy Bookmark 1.0.0, branch `ui-rebuild`) drawn by Flutter's test renderer with the app's own fonts, at fixed sizes — not a mock-up and not a phone recording. The library in them is made up but lived-in: what one person in Vietnam might have saved over a week. There is no lorem ipsum and no "test" data. The same library exists in Vietnamese and English (titles, collection names, tags and the reader article are written for each language, not machine-translated).

Renderer: `apps/handy_bookmark/tool/website_shots_test.dart` (new file, see README). Photos: `photos/CREDITS.md`.

## Collections

| id | Vietnamese | English | Icon / colour |
|---|---|---|---|
| food | Công thức nấu ăn | Recipes | restaurant, identity colour 1 |
| trip | Du lịch | Trips | luggage, colour 0 |
| dn (inside trip) | Đà Nẵng | Da Nang | inherits Trips |
| buy | Cần mua | To buy | shopping bag, colour 2 |
| read | Đọc sau | Read later | book, colour 3 |

Tags: `món-huế` / `hue-food`, `cuối-tuần` / `weekend`.
Pro extras: smart collection "Video chưa xem" / "Videos to watch" (videos not yet opened); saved searches "Đà Nẵng ăn gì" / "Da Nang eats" and "Hà Giang".

## The 17 saves

| # | Where | Vietnamese title | English title | Source | Photo |
|---|---|---|---|---|---|
| 1 | Recipes ★ | Bún bò Huế chuẩn vị: nấu nước dùng 3 tiếng | Bún bò Huế: a slow three-hour broth | YouTube | bun-bo-hue |
| 2 | Recipes | Phở bò gia truyền, nước trong mà đậm | Family-recipe beef phở, clear and rich | TikTok | pho |
| 3 | Recipes | Bún chả Hà Nội 15 phút | Hanoi bún chả in 15 minutes | TikTok | bun-cha |
| 4 | Trips | Lịch trình 3 ngày Đà Nẵng – Hội An | Da Nang & Hoi An: a 3-day plan | Facebook group | hoi-an |
| 5 | Da Nang ★ | Bánh xèo Bà Dưỡng | Bánh xèo Bà Dưỡng, Da Nang | Google Maps | banh-xeo |
| 6 | Read later | Mùa đẹp nhất để đi Hà Giang (offline copy) | The best time of year to visit Ha Giang | travel blog* | ha-giang |
| 7 | Trips | Đi tàu đêm Hà Nội – Huế: cần biết gì | Night train Hanoi to Hue: what to know | YouTube | ga-ha-noi |
| 8 | Not sorted | Học guitar: 4 hợp âm đầu tiên | Guitar for beginners: your first four chords | YouTube | guitars |
| 9 | To buy (read) | Nồi chiên không dầu 6L | Air fryer, 6 litres | Shopee / Amazon | air-fryer |
| 10 | To buy | Kệ sách gỗ 5 tầng | Five-shelf wooden bookcase | Shopee / Amazon | none (no-picture face) |
| 11 | Not sorted ★ | Cà phê trứng view hồ Tây | Egg coffee with a West Lake view | Instagram | egg-coffee |
| 12 | Not sorted | Trang trí ban công nhỏ với cây leo | Small balcony makeover with climbing plants | TikTok | balcony |
| 13 | Not sorted | Yoga 20 phút buổi sáng | 20-minute morning yoga | YouTube | yoga |
| 14 | Read later | Mẹo: chụp màn hình cuộn cả trang trên Android | Tip: capture a whole scrolling page on Android | X | none (typographic poster) |
| 15 | Read later (read) | Lần đầu đi Hà Giang bằng xe máy, cần chuẩn bị gì? | First time riding the Ha Giang loop: what to pack? | Reddit | none (Reddit gives no picture) |
| 16 | Recipes (read) | Mì Quảng gà nhà làm | Homemade chicken mì Quảng | YouTube | mi-quang |
| 17 | Da Nang | Biển Mỹ Khê: tắm giờ nào đẹp nhất | My Khe beach: the best hours for a swim | travel blog* | my-khe |

★ favourite. Saved between 3 hours and 6 days before the render, newest in Not sorted.
\* The blog is fictional ("Nhật ký đi chậm" / "Slow Travel Notes", byline "Minh Anh"), so no real publisher is credited with text it didn't write. Social links (YouTube, TikTok, Facebook, Instagram, X, Reddit, Shopee, Amazon) are made-up addresses on those sites, shown as a person's saves; no content from those sites appears.

Scene-specific additions: the share-sheet scene is a video shared from TikTok ("Bún chả Hà Nội 15 phút") over a dimmed video app; the Pocket import previews a made-up 7-row Pocket CSV; duplicates are two of the links saved again with `utm_source`/`fbclid` tails; the broken-links scene marks four links as gone (404/410), moved or could-not-tell (403); the trash scene deletes four items 1–27 days ago; a photo "Phố cổ Hội An.jpg" / "Hoi An old town.jpg" is added for the picture scenes.

## Things deliberately not shown

- Per-item reminders (the app can no longer set them; see README).
- Google Drive sync (unverified, behind a build flag).
- The Explore Pro purchase box: host renders have no store, so it would say purchases aren't set up. `40-pro` shows the top of the Pro page only.
- Pro screens were rendered with the test-only Pro switch (`debugProOverride`), never with a fake purchase.
