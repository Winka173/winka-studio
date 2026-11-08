# Hướng dẫn làm hình ảnh, video và đưa lên Winka Studio

Hướng dẫn này dành cho mọi sản phẩm của Winka Studio, cả game lẫn app thường. Nó gom lại quy trình đã dùng cho Arcane Brigade (tháng 11/2026):

1. Quay hình từ chính sản phẩm.
2. Dựng thành một **bộ tài liệu website** (website kit).
3. Làm trailer và video gameplay hoặc demo.
4. Cập nhật trang Google Play.
5. Nhập vào trang Winka Studio.

Các file mẫu dùng lại được nằm trong `tools/media-kit/` của repo này.

Đọc kèm:
- `docs/WEBSITE_KIT_INTEGRATION.md`: bộ tài liệu được nhập vào site thế nào.
- `CONTENT_GUIDE.md`: quy tắc danh mục sản phẩm.
- `Sticky-Wall/docs/release/PLAY_CONSOLE_API_GUIDE.md`: khoá Google Play API, fastlane, tracks.

---

## 0. Quy tắc chung (áp dụng cho mọi sản phẩm)

- **Hình thật, dữ liệu thật.**
  - Mọi ảnh và clip đều quay từ chính sản phẩm.
  - Dữ liệu trong ảnh phải trông như người dùng thật đã dùng một thời gian: lịch sử, tiến độ, nội dung có nghĩa, không "test 123".
  - Không bao giờ xoá dữ liệu thật trên máy để dựng ảnh. Dùng thư mục lưu riêng cho chế độ quay.
- **Có chuyển động.**
  - Trong clip, nhân vật hoặc con trỏ phải di chuyển như người dùng thật, không đứng yên.
  - Game: không làm nhân vật bất tử một cách lộ liễu (thanh máu luôn đầy trông giả). Cho đội đủ mạnh để tự sống, nếu cần thì chỉ đặt một mức sàn máu ẩn.
  - Thua trong footage cũng không sao, miễn là không giữ màn tổng kết đứng yên cả phút.
- **Không lộ nội dung chưa ra mắt.**
  - Không lộ nhân vật, màn chơi hay boss của bản cập nhật hoặc act sau. Với game, chỉ lộ 1–2 boss đầu, không bao giờ lộ boss cuối.
  - Kiểm tra cả các con số: số vũ khí hay số nhân vật có thể đang đếm cả nội dung ẩn.
- **Trạng thái phát hành ghi theo chỉ đạo của chủ sản phẩm.** Không tự ghi "coming soon".
  - Nút tải chỉ hiện khi có link cửa hàng thật, đã mở ra kiểm tra.
  - Không bịa link, đánh giá, lượt tải hay lời khen.
- **Chữ ngắn.** Chỉ những ý cần thiết, có cả tiếng Anh và tiếng Việt. Tên gọi phải khớp đúng bản dịch trong sản phẩm.
- **Âm thanh sạch.** Kiểm tra mọi clip bằng `tools/media-kit/scripts/audio_clicks.py`: dưới 0,2 tiếng click mỗi giây là đạt.
- **Xem lại trước khi giao.**
  - Lập tấm tổng hợp khung hình (`contact_sheet.sh`) cho mọi clip.
  - Tìm: màn hình đứng hình, popup chặn, nhân vật chết sớm, màn hình trắng, HUD lọt vào ảnh nổi bật, chữ bị cắt.

---

## 1. Quay hình

### 1a. Game (Unity): dùng bộ quay chạy trong bản build

Mẫu tham khảo: `Arcane-Brigade/Assets/ArcaneBrigade/Runtime/Core/WebsiteCapture.cs` (khoảng 900 dòng).

**Cách chạy**
- Đây là một MonoBehaviour, chỉ bật bằng cờ dòng lệnh (`-arcane-website -capturePath DIR …`) và chạy trong bản build Windows thật.
- Lưu vào **thư mục chẩn đoán riêng**, không bao giờ ghi đè save thật.
- Mỗi cờ quay mới phải được thêm vào danh sách chế độ chẩn đoán (Arcane: `RunPaths.Diagnostic`).

**Save "đã chơi thật"**
- Cho N lượt chơi đi qua chính code ghi tiến độ của game, rồi mở khoá, thắp nâng cấp và đọc thư như người chơi.

**Mỗi cảnh là một section chịu lỗi**
- Nếu một cảnh kẹt quá 45 giây, ghi `FAIL` rồi chuyển sang cảnh sau.
- Có một watchdog tổng: tắt game nếu không có tiến triển sau 150 giây.
- Kết quả ghi vào `Checks.txt` với từng dòng `PASS` hoặc `FAIL`. Đọc file này trước khi xem hình.

**Ghi hình**
- ffmpeg qua pipe, 30 fps, thời gian thực, đúng kích thước cửa sổ.
- **Ghi âm phải đếm mẫu theo đồng hồ âm thanh** (`AudioSettings.dspTime`), không theo đồng hồ khung hình. Đếm theo khung hình gây khoảng 30 tiếng click mỗi giây.
- Trong lúc quay một clip dài, phải cập nhật watchdog, nếu không nó sẽ tưởng game kẹt.

**Di chuyển như người chơi**
- Đi qua chính đường input của game (Arcane: `ArenaController.ScriptedMove`), không dịch chuyển tức thời.
- Đi vòng kéo quái theo, rẽ về phía xu và rương, tránh xa boss, bước ngang ra khỏi vùng cảnh báo.

**Đội hình và mua sắm như người chơi giỏi**
- Đội theo liên kết, có combo, sao tăng dần theo đêm, di vật mạnh.
- Mua có chủ đích: bản sao để hợp sao, bạn cùng liên kết.

**Các cờ hữu ích**
- Mỗi phần có thể quay lại riêng: `-website-sections a,b`, `-website-gameplay 01,02`.
- `-website-no-music`: chỉ tiếng hiệu ứng, để trailer đặt nhạc riêng lên.
- `-website-no-numbers`: tắt số sát thương cho cảnh điện ảnh.
- `-website-vi`: giao diện tiếng Việt.
- Bố cục điện thoại: chạy thêm `-arcane-phone` ở 2400×1080. Game chơi ngang trên điện thoại, nên quay 1 bản PC (1920×1080) và 1 bản điện thoại.

**Các bẫy đã gặp**
- Phân biệt *phase của lượt chơi* với *phase của trận*. Trong shop, phase của trận có thể vẫn là "Combat", và nhân vật tự đi tiếp sẽ chạm vào lối sang đêm sau.
- Shop cần vài giây để hiện quầy hàng. Phải chờ chuyển cảnh xong mới đi mua.
- Có thể có tầng trước shop (Arcane: chợ trong mơ mở trước cửa tiệm vàng). Phải rời tầng đó trước.
- Ở các mốc cốt truyện, popup chọn lựa có thể chặn mọi thứ. Chọn đêm hoặc màn tránh các mốc đó.
- Đòn rất mạnh có thể xuyên qua mức sàn máu. Nếu clip chết sớm, chọn đêm khác hoặc chấp nhận clip thua.
- Mỗi cửa hàng con có tiền tệ riêng (vàng, Cát Mơ, máu). Script mua phải hiểu được.
- Bản build mới cần chạy lại bộ kiểm tra bản dịch nếu có sửa file ngôn ngữ.

**Lệnh mẫu**

```bash
./Game.exe -popupwindow -screen-width 1920 -screen-height 1080 -arcane-website \
  -website-clips -ffmpegPath C:/Users/Winka/.stacher/ffmpeg.exe -capturePath C:/ABWork/web/pc
```

Năm lượt quay đầy đủ (PC, điện thoại, hai bản chỉ tiếng hiệu ứng, tiếng Việt) mất khoảng 1,5 giờ vì quay thời gian thực. Chạy ngầm, và đừng render hay nén video cùng lúc, vì sẽ làm clip giật.

### 1b. App thường (Flutter, Android, web)

- **Flutter:** golden test xuất ảnh (xem `Sticky-Wall` CLAUDE.md → "Generated assets"), có seed dữ liệu demo đẹp.
- **Android thật hoặc emulator:**
  - ảnh: `adb -s <device> exec-out screencap -p > shot.png`
  - clip: `adb shell screenrecord --bit-rate 12000000 /sdcard/a.mp4`
  - Dùng hồ sơ hoặc tài khoản demo riêng.
- **Web:** Playwright quay theo kịch bản (`page.screenshot`, `recordVideo`). Kịch bản thao tác như người dùng thật: gõ, kéo, cuộn.
- **Kích thước:** điện thoại dọc 1080×1920 trở lên; máy tính bảng hoặc màn hình ngang 1920×1080 hoặc 2560×1600.
- Sản phẩm có tiếng Việt thì quay thêm một bộ giao diện tiếng Việt.

---

## 2. Dựng bộ tài liệu website (website kit)

Đặt **ngoài repo sản phẩm**, vì ảnh và video rất nặng. Ví dụ `C:/Users/Winka/OneDrive/Documents/<Product>-Website-Kit/`. Cấu trúc đã dùng:

| Thư mục | Nội dung |
|---|---|
| `01_Brand/` | logo trong suốt, icon 1024/512/192, feature graphic 1024×500 |
| `02_Screenshots/pc`, `/mobile`, `/vietnamese` | JPEG chất lượng 92, cùng tên file giữa các bộ; `_captions.md` là bảng `| file | size | English | Tiếng Việt |` |
| `03_Clips/pc`, `/mobile`, `/gameplay/{pc,phone}` | MP4 có âm thanh; `trailer-pc.mp4`, `trailer-phone.mp4`, `trailer-web-720p.mp4`, `trailer-muted-loop-720p.mp4` |
| `04_Copy/` | `website-copy.en.md` và `.vi.md`: hero, cốt truyện hoặc câu chuyện, pitch, con số, các khối tính năng, cách chơi hoặc dùng, giá, nền tảng, FAQ, thông tin báo chí, SEO |
| `05_Legal/` | chính sách quyền riêng tư và điều khoản (EN rồi VI, ngăn cách bằng `---`) |
| `06_Data/` | `facts.json` đọc từ chính dữ liệu sản phẩm, cùng danh sách nhân vật hoặc tính năng |
| `07_Art/` | ảnh nhân vật hoặc vật phẩm gốc, PNG trong suốt; chỉ nội dung đã ra mắt |
| `README.md` | mục nào ở đâu, tên file, màu thương hiệu, font, **quy tắc cho website** (trạng thái, giá, con số, nội dung không được lộ, cốt truyện viết thế nào) |

- Ảnh phải xuất **lại toàn bộ** mỗi lần, để ảnh của nội dung đã gỡ không còn sót.
- Kiểm tra mọi con số trong copy với `facts.json`.
- Copy chỉ ghi tính năng mà bản phát hành thật có.

---

## 3. Video: trailer và gameplay hoặc demo bằng OpenMontage

**Cài đặt** (đã có sẵn ở `C:/ABWork/OpenMontage`; máy mới thì cài như sau):

```bash
git clone --depth 1 https://github.com/calesthio/OpenMontage.git C:/ABWork/OpenMontage
cd C:/ABWork/OpenMontage && python -m venv .venv && .venv/Scripts/python.exe -m pip install -r requirements.txt
cd remotion-composer && npm install
```

**Chế độ atelier (bố cục tự viết):** bộ dựng có sẵn của OpenMontage theo phong cách khoa học viễn tưởng lạnh, không hợp sản phẩm của studio.
1. Chép `tools/media-kit/remotion/*` vào `remotion-composer/projects/<slug>/`.
2. Chép ảnh, video, nhạc, font vào `projects/<slug>/public/`.
3. Sửa `Look.tsx` cho đúng thương hiệu: màu, font của sản phẩm, thẻ tên, thẻ tiêu đề, màn kết.

Các bố cục:
- `Trailer.tsx`: dòng thời gian tính bằng giây. Mỗi shot có `src, start, seconds, sfx, flash, push, speed`. Mỗi thẻ chữ có `title`, `name` hoặc `story`, kèm `at, seconds`. Có `width/height` cho bản PC và bản điện thoại.
- `Gameplay.tsx`: clip dài không cắt, có tiêu đề đầu, chú thích nhỏ ở các khoảnh khắc, logo cuối.
- Render qua video_compose của OpenMontage: `tools/media-kit/scripts/render_atelier.py <project> ArcaneTrailer|ArcaneGameplay props.json out.mp4 [scale] [crf]`. Dùng scale 0.5 cho bản nháp, 1 và crf 17–20 cho bản cuối.

**Trailer (khoảng 2 phút đã được chủ sản phẩm chấp nhận)**
1. **Nhạc trước.**
   - Dùng nhạc của chính sản phẩm. Nếu có stem, phối lại theo đoạn bằng `music_sections.py` để có mở đầu nhẹ, đoạn tăng dần, cao trào, một nhịp ngắt rồi màn kết. Nhạc lặp đều nghe phẳng.
   - Nhớ cho stem lặp (`-stream_loop`) nếu đoạn dài hơn file.
2. **Footage chỉ có tiếng hiệu ứng** (không nhạc trong game, thường tắt số sát thương), để nhạc trailer không chồng lên nhạc game.
3. **Chọn khoảnh khắc** bằng tấm tổng hợp mỗi 1 giây.
4. **Viết dòng thời gian theo nhịp** bằng một script Python (mẫu: `make_trailer2.py`). Mỗi shot dài đúng số ô nhịp hoặc phách của đoạn nhạc nó nằm trong, nên cắt cảnh luôn rơi đúng nhịp kể cả khi đổi tempo.
5. **Cấu trúc đã dùng:**
   - cốt truyện (3–4 dòng ngắn, không tiết lộ)
   - nhân vật chính, rồi vòng chơi cốt lõi (shop, hợp sao)
   - các khía cạnh khác (khách, giao dịch, phòng bí mật, liên kết, combo)
   - thư viện nhân vật khác
   - 1–2 boss đầu, các địa điểm
   - cao trào, nhịp ngắt, logo kèm trạng thái phát hành
6. **Kiểm tra:** tấm tổng hợp mỗi 2,5 giây, `audio_clicks.py`, ffprobe độ dài. Xem riêng cả bản điện thoại, vì thời điểm trong clip điện thoại có thể lệch.
7. **Xuất ra:**
   - 1080p (crf 18–19)
   - 720p cho trang web (crf 24)
   - 720p không tiếng để chạy nền (crf 26, `-an`)

**Gameplay hoặc demo**
- **Chỉ cần vài video chọn lọc** (2–3 cho mỗi bố cục), không cần đưa mọi thứ vào.
- Mỗi video 1–2 phút, liền một mạch, thể hiện trọn một vòng: đánh, chợ hoặc shop, mua, sang đêm sau (với app: một tác vụ hoàn chỉnh).
- Lấy mốc chú thích từ tấm tổng hợp mỗi 4 giây.
- Video gameplay khoảng 100 MB, nên đưa lên YouTube rồi nhúng.

---

## 4. Trang Google Play

- **Yêu cầu ảnh:**
  - icon 512×512
  - feature graphic **1024×500**, không có HUD
  - 2–8 ảnh điện thoại, mỗi cạnh từ 320 đến 3840, **tỉ lệ tối đa 2:1**. Ảnh 2400×1080 phải cắt về 2160×1080. Game nên có ảnh ngang ≥ 1920×1080 để đủ điều kiện được quảng bá.
  - ảnh máy tính bảng 7 hoặc 10 inch (tuỳ chọn, nên có)
- **Bày ảnh** theo cấu trúc fastlane: `android/fastlane/metadata/android/<lang>/images/{featureGraphic.png, phoneScreenshots/1.png…, tenInchScreenshots/…}`. Thư mục này nên nằm trong gitignore.
- **Tải lên:** `python tools/media-kit/scripts/play_store_images.py <package> <metadata/android>`.
  - Mọi thay đổi nằm trong một lượt edit, chỉ commit khi tất cả thành công.
  - Lỗi "service unavailable" thường chỉ tạm thời: chạy lại.
  - Lane fastlane chỉ tải ảnh từng báo lỗi đòi mã phiên bản, nên dùng script này.
- **Kiểm tra lại:** `python Sticky-Wall/tool/play.py check <package>`.
- **Video:** Google Play **chỉ nhận link YouTube**.
  - Chủ sản phẩm tải trailer lên YouTube (Công khai hoặc Không công khai, tắt quảng cáo, không giới hạn độ tuổi).
  - Sau đó ghi link vào `video.txt` của từng ngôn ngữ và chạy `fastlane android metadata`.
- **Luôn hỏi chủ tài khoản trước khi ghi lên cửa hàng.** Không in, chép hay commit khoá dịch vụ.

---

## 5. Đưa lên Winka Studio (repo này)

1. **Khai báo bộ tài liệu** trong `scripts/import-website-kits.py`:
   - Thêm slug vào `KITS`.
   - Thêm nhánh xử lý nếu bộ tài liệu có cấu trúc khác ba bộ hiện có (Handy Bookmark, Sticky Wall, Arcane Brigade). Cách dễ nhất là làm theo đúng cấu trúc của một bộ có sẵn.
   - Script sẽ: đổi ảnh sang WebP, tạo bản video tắt tiếng 1280px kèm ảnh poster, chép trailer có âm thanh, lưu copy và văn bản pháp lý vào `src/content/website-kits.json`, ghi `kit-media.json`, `kit-films.json` và manifest nguồn gốc.
   - Chỉ cần một bản trailer làm phim nền. Các bản trailer khác là file để tải về, không nhập thành phim riêng (nặng thêm hàng trăm MB).
2. **Xoá phần đã nhập cũ của sản phẩm** (`public/products/<slug>/kit`, `docs/website-kits/<slug>`) trước khi chạy lại, để file của nội dung đã gỡ không còn sót. Sau đó chạy `python scripts/import-website-kits.py`.
3. **Danh mục sản phẩm** `src/content/products.ts`:
   - Cập nhật mô tả, nền tảng, ảnh đại diện.
   - `status: "released"` chỉ hợp lệ khi có link cửa hàng đã xác minh và `legalReviewed: true`, nếu không trình kiểm tra sẽ báo lỗi. Muốn ghi đã phát hành theo lời chủ sản phẩm thì ghi trong phần chữ, không bịa link.
4. **Trang riêng** `src/components/portfolio/<slug>.tsx` (Arcane: `arcane.tsx`): chữ trên trang được viết tay, không tự sinh từ bộ tài liệu. Cập nhật:
   - các con số (lấy từ `kit.facts`, đừng ghi cứng)
   - phần cốt truyện hoặc câu chuyện
   - trailer, phim nền, danh sách nhân vật (Arcane: `src/content/arcane-heroes.json`)
   - tiêu đề clip trong `kit-film-shelf.tsx`
5. **Kiểm tra trước khi đẩy lên:**
   - Cập nhật số ảnh trong `scripts/validate-website-kits.ts`.
   - Thêm luật chặn nội dung chưa ra mắt cho sản phẩm (như luật đang có cho Arcane).
   - Chạy:
     ```bash
     npm run validate && npm run typecheck && npm run build && npm run qa:kits && npm run qa:workbench
     ```
   - Nếu build lỗi `EPERM` trong `out/`, một chương trình đang giữ file (tab, server). Đóng nó rồi build lại.
6. **Commit và push.** GitHub cảnh báo file trên 50 MB, chặn file trên 100 MB. Giữ video web dưới 50 MB nếu được.
7. **Ghi lại** thay đổi vào `docs/WEBSITE_KIT_INTEGRATION.md`.

---

## 6. Danh sách kiểm tra nhanh

- [ ] `Checks.txt` không có `FAIL` quan trọng; các `FAIL` còn lại đã hiểu nguyên nhân
- [ ] Tấm tổng hợp của mọi clip: nhân vật di chuyển, không đứng hình, không popup chặn, không màn hình trắng kéo dài
- [ ] `audio_clicks.py` dưới 0,2 mỗi giây cho mọi video
- [ ] Không có nhân vật, boss hay màn chơi chưa ra mắt trong ảnh, clip, ảnh nhân vật, con số
- [ ] Copy khớp `facts.json` và bản dịch trong sản phẩm; trạng thái phát hành đúng chỉ đạo của chủ sản phẩm
- [ ] Bộ tài liệu có README với quy tắc cho website
- [ ] Ảnh Google Play đúng kích thước và tỉ lệ; đã hỏi chủ tài khoản trước khi tải lên
- [ ] Winka Studio: validate, build, qa đều qua; đã commit và push
