# Rà giao diện bằng gstack, 08/11/2026

Đã commit/push hiện trạng tại `dbe56dd`, sau đó chạy `design-review` trên bản production export ở localhost. Phát hiện 4 nhóm vấn đề: sửa và xác minh 3, giữ 1 đề xuất bố cục cho vòng sau. Điểm theo rubric gstack: thiết kế A− → A; tính rập khuôn A → A. Điểm là đánh giá thiết kế trong phạm vi đã kiểm tra.

## Phạm vi

- 310 đường dẫn, EN/VI, toàn bộ 22 sản phẩm cùng catalog, Lab, support, media, features, legal và các hướng lưu trữ.
- Lượt cuối mở từng đường dẫn bằng Edge qua Playwright ở 320/375/768/1440px: 1.240 trường hợp.
- Xem sâu 16 trang đại diện bằng ảnh desktop/tablet/mobile; kiểm tra tương tác qua các bộ QA dự án.
- Kiểm tra bounding box header để bắt nút bị cắt ngay cả khi trang che overflow.

## Vấn đề

| ID | Mức | Quan sát | Xử lý |
| --- | --- | --- | --- |
| FINDING-001 | High | Mô tả chính ở trang chủ/dự án/Forge xuống 11px trên mobile; FAQ 13px, tài liệu 14px | Nâng các đoạn này lên 16px, sửa cả breakpoint ghi đè; verified |
| FINDING-002 | Medium | Một số nút mobile rộng 40px, footer cao 32–34px; header sản phẩm có thể cắt nút menu tại 320px | Vùng bấm tối thiểu 44px, logo gọn ở màn hình hẹp, kiểm tra từng cạnh điều khiển; verified |
| FINDING-003 | Medium | Khối tài liệu desktop rộng tới 950px | Giới hạn Markdown tài liệu ở 72ch; verified |
| FINDING-004 | Medium | Hero Sticky Wall ở 1440×900 để ảnh điện thoại gần mép dưới màn hình đầu | Đề xuất giảm khoảng cách trước ảnh/đưa một ảnh hoàn chỉnh lên cao; deferred, giữ composition đã chốt |

Các sửa đổi chỉ tác động CSS. Không thay nội dung legal, dữ liệu sản phẩm, ảnh/video gốc hay điều kiện phát hành. Review độc lập trong phiên phát hiện hai rule ghi đè ở mobile; đã sửa và đo lại thực tế.

Ba quick wins đã hoàn tất: cỡ chữ ở selector dùng chung; vùng bấm điều khiển; chiều dài dòng của tài liệu.

## Kết quả kiểm chứng

| Kiểm tra | Kết quả |
| --- | --- |
| Production build | PASS, 312 mục generated / 311 HTML / 309 segment-prefetch files |
| Typecheck / ESLint | PASS |
| Validate | PASS, 15.408 tham chiếu local, 689 ảnh có nguồn, 42 ambient films, 76 FAQ |
| Render toàn bộ route | 310/310, 1.240 layouts; không lỗi JS, tràn ngang, header bị cắt, thiếu h1 hoặc link nội bộ hỏng |
| Assertion theo finding | PASS, 56 trường hợp ở hai ngôn ngữ và bốn kích thước |
| Workbench QA | PASS, 64 layouts và các luồng demo, model, 36 hero, reel, pause, reduced motion, data saver; không lỗi/axe |
| Portfolio QA | PASS, 172 trường hợp / 43 route, palette desktop mặc định và thay thế; không lỗi/axe |
| Website-kit QA | PASS; 12 legal gốc giữ nguyên từng từ; media, attribution, gallery và trailer hoạt động |

Workbench QA sau sửa đã chạy trên bản build có ba nhóm sửa chính. Sau hai điều chỉnh cuối cho CSS ghi đè ở mobile, đã build lại, chạy 56 assertion, website-kit QA và quét lại đủ 1.240 layouts. Không báo bộ portfolio 172 trường hợp là đã chạy lại sau mọi sửa đổi: nó được dùng làm baseline trước sửa.

## Bằng chứng và giới hạn

Theo quy ước gstack, báo cáo đầy đủ, baseline JSON, kết quả đo và ảnh trước/sau nằm ngoài source tree:

`C:/Users/Winka/.gstack/projects/Winka173-winka-studio/designs/design-audit-20261108/`

File chính: `design-audit-localhost.md`, `design-baseline.before.json`, `design-baseline.json`, `rendered-audit.before.json`, `rendered-audit.json`, `fix-verification.json` và `screenshots/`.

Ảnh tiêu biểu: `home-prose-before.jpg`, `home-prose-after.jpg`, `home-prose-mobile-after.jpg`, `mobile-controls-before.jpg`, `mobile-controls-after.jpg`, `product-header-320-after.jpg`, `legal-prose-before.jpg`, `legal-prose-after.jpg`.

Aside không có trên Windows; binary trình duyệt gstack không khởi động trong 15 giây. Kiểm tra dùng Playwright/Edge đã cài trong dự án. Craft lint của gstack chạy trên 16 DOM nhưng không đọc được linked CSS ở thư mục tạm; các cảnh báo được đối chiếu bằng mắt và trong trình duyệt, không tuyên bố lint đạt. Impeccable không cài và không được tải thêm. Review độc lập nội bộ đã hoàn thành; không có Claude Code để thực hiện review ngoài.

Mobile là browser emulation, không phải thiết bị thật. axe không phải chứng nhận khả năng truy cập. Các trang cùng template được quét tự động đầy đủ và xem bằng mắt qua trang đại diện; không tuyên bố đã xem thủ công từng trạng thái của từng route. Telemetry giữ tắt theo lựa chọn người dùng. Website chưa được publish.
