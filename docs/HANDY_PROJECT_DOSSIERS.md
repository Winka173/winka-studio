# Hồ sơ tổng hợp 14 project Handy

Ngày rà: **09/11/2026**. Nguồn: `C:/Users/Winka/Projects/Handy-Suite`, website kit Bookmark/Boards và media lưu trong winka-studio.

**Bookmark và Boards đã hoàn thiện theo xác nhận của chủ dự án.** Mười hai app còn lại đang phát triển. Hoàn thiện và phát hành store là hai trạng thái riêng; các nút Coming soon và việc ẩn app trên website được giữ nguyên.

Mở [INDEX.html](../artifacts/handy-project-dossiers/INDEX.html) để chọn app, hoặc lấy cả bộ qua [HANDY_ALL_PROJECTS.zip](../artifacts/handy-project-dossiers/HANDY_ALL_PROJECTS.zip), khoảng 222 MB. Giải nén rồi mở INDEX.html, hoặc gửi riêng từng HTML.

Mỗi HTML tự chứa tài liệu, source, ảnh và clip, đọc offline không cần server. Có tìm kiếm, mục thu gọn, phóng to ảnh, điều khiển clip và xuất metadata JSON.

| Project | Trạng thái | Mục tài liệu | Ảnh sau gộp trùng | Clip | MB |
| --- | --- | ---: | ---: | ---: | ---: |
| [Handy Boards](../artifacts/handy-project-dossiers/HANDY_BOARDS.html) | **ĐÃ HOÀN THIỆN** | 57 | 816 | 14 | 50.0 |
| [Handy Bookmark](../artifacts/handy-project-dossiers/HANDY_BOOKMARK.html) | **ĐÃ HOÀN THIỆN** | 73 | 817 | 17 | 88.2 |
| [Handy Card](../artifacts/handy-project-dossiers/HANDY_CARD.html) | Đang phát triển | 28 | 625 | 0 | 13.7 |
| [Handy Dev](../artifacts/handy-project-dossiers/HANDY_DEV.html) | Đang phát triển | 17 | 150 | 1 | 14.4 |
| [Handy Docs](../artifacts/handy-project-dossiers/HANDY_DOCS.html) | Đang phát triển | 20 | 175 | 1 | 24.2 |
| [Handy Forms](../artifacts/handy-project-dossiers/HANDY_FORMS.html) | Đang phát triển | 32 | 240 | 0 | 10.0 |
| [Handy Habit](../artifacts/handy-project-dossiers/HANDY_HABIT.html) | Đang phát triển | 24 | 101 | 1 | 13.3 |
| [Handy Keep](../artifacts/handy-project-dossiers/HANDY_KEEP.html) | Đang phát triển | 19 | 183 | 1 | 17.6 |
| [Handy Media](../artifacts/handy-project-dossiers/HANDY_MEDIA.html) | Đang phát triển | 18 | 125 | 1 | 15.0 |
| [Handy Recall](../artifacts/handy-project-dossiers/HANDY_RECALL.html) | Đang phát triển | 17 | 137 | 1 | 12.8 |
| [Handy Spend](../artifacts/handy-project-dossiers/HANDY_SPEND.html) | Đang phát triển | 29 | 181 | 1 | 21.0 |
| [Handy Tools](../artifacts/handy-project-dossiers/HANDY_TOOLS.html) | Đang phát triển | 17 | 256 | 1 | 20.8 |
| [Handy Trip](../artifacts/handy-project-dossiers/HANDY_TRIP.html) | Đang phát triển | 34 | 182 | 0 | 8.4 |
| [Handy Widget](../artifacts/handy-project-dossiers/HANDY_WIDGET.html) | Đang phát triển | 29 | 596 | 0 | 39.1 |

Tổng: **14 hồ sơ**, **4.584 ảnh** tính theo từng hồ sơ, **39 clip**, **414 mục tài liệu**, khoảng **348 MB** HTML. Tài liệu/package dùng chung có thể lặp ở nhiều hồ sơ để mỗi file đọc độc lập. INDEX có thêm 20 contact sheet/ảnh audit chung nhiều app.

## Nội dung mỗi hồ sơ

- Chức năng riêng và chung từ FUNCTIONS; Bookmark/Boards có thêm toàn bộ chức năng EN/VI từ owner kit.
- Mục đích, trạng thái hoàn thiện, phiên bản source, Android ID, route strings, permissions khai báo và cây dependency nội bộ trực tiếp/gián tiếp.
- Toàn văn tài liệu theo app: đặc tả, feature matrix, architecture, schema/model, persistence, import/export/backup, Free/Pro, nền tảng, privacy/terms, release checklist, quyết định và giới hạn.
- Source app và package nội bộ liên quan: model, UI, adapter, storage, thuật toán và test; danh mục class/enum/mixin/extension, tên test/nhóm và dòng nguồn.
- Screenshot, ảnh trước/sau review, fixture/render, dark/light/responsive, icon, artwork và website kit. Ảnh trùng byte gộp một ô nhưng giữ mọi đường dẫn.
- Clip trong device-tours/website kit, có điều khiển phát chủ động.
- Danh mục PDF/ZIP/font gốc có đường dẫn, kích thước và SHA-256; các binary này không nhúng. Manifest/provenance của tài liệu, source, ảnh và clip.

## Độ mới và phạm vi

Dùng **working tree hiện tại**, bao gồm thay đổi chưa commit. HEAD nguồn `c730c2a4cd801569f13fcc69fe13e6c7e4dec582`, có 412 file đang thay đổi tại lúc xuất. Phiên bản source: Bookmark **1.0.0+7**, Boards **1.0.0+4**. Kit marketing/báo cáo kiểm thử cũ có thể ghi build khác; được giữ nguyên trong phụ lục lịch sử. Nhãn NOT_COMPLETE/IN_PROGRESS trong tài liệu cũ không ghi đè xác nhận hoàn thiện mới.

Đây là rà tĩnh và tổng hợp dữ liệu, không chạy lại Flutter test/build hay kiểm thử thiết bị/store cho 14 app. Test cũ và kết quả nguồn được ghi nhận đúng phạm vi. Permissions lấy từ app manifest, không khẳng định là danh sách cuối cùng sau manifest merge.

Ảnh xem trước giữ tỷ lệ, chuyển WebP tối đa 1280 × 1800; SVG giữ nguyên, GIF dùng frame đầu. Có đường dẫn/hash ảnh và animation gốc để lấy lại chất lượng gốc. Clip dùng encodes tối ưu đã có khi tìm thấy. Không đưa runtime database, dữ liệu người dùng, credentials/config local, signing keys, generated/build hay dependency bên thứ ba vào hồ sơ. Không sửa source Handy-Suite.

## Tái tạo và kiểm tra

```powershell
python -B scripts/export-handy-dossiers.py
node scripts/qa-handy-dossiers.mjs
```

Python cần `Markdown` và `Pillow`. Đổi root qua `--suite`, `--kits`, `--output`. Cache ảnh ở `.review/handy-dossier-cache`. Đầu ra `artifacts/handy-project-dossiers/` được gitignore để không đưa hàng trăm MB source/media nội bộ lên website/Netlify. Script và hướng dẫn được quản lý bằng Git.

Edge/Playwright đã kiểm tra cả 14 file: nội dung/status/count, bố cục 390/1440px, giải mã ảnh mẫu đầu/giữa/cuối, dialog/Escape, tìm kiếm, mở/thu tài liệu, xuất JSON và phát clip đầu khi có. Không có page error hay request HTTP(S) ngoài. Đây là kiểm tra khả năng sử dụng hồ sơ, không chứng nhận chức năng các app. Đã đối chiếu SHA-256 của đủ 14 HTML, đường dẫn nguồn và metadata. Xem [QA.json](../artifacts/handy-project-dossiers/QA.json) và [MANIFEST.json](../artifacts/handy-project-dossiers/MANIFEST.json).
