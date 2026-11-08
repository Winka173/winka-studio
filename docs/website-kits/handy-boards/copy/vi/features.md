# Handy Boards — toàn bộ tính năng (Tiếng Việt)

Đối chiếu với mã nguồn app ngày 09/11/2026 (`apps/handy_boards`, nhánh `ui-rebuild`, sau commit `ac4858ff`; Play đang có bản 1.0.0 (3), xem mục "Mới hơn bản trên Play" ở cuối).
Mọi thứ dưới đây đã có trong app Android, trừ khi dòng đó ghi khác.
**Pro** là phần thuộc gói Pro mua một lần; còn lại đều miễn phí.
Tên ảnh lấy trong `screenshots/` (trang tiếng Việt dùng các tệp `-vi-`).

---

## 1. Bảng, cột, thẻ

**Mỗi bảng cho một việc lớn trong đời.** Một học kỳ, một chuyến đi, việc nhà, một lần ra mắt, một sprint. Bảng có các cột cho biết việc đang ở đâu (Cần làm, Đang làm, Xong, hoặc tên bạn tự đặt) và các thẻ, mỗi thẻ là một việc.
Ảnh: `mobile-vi-01-home.png`, `…-02-board.png`, `…-02-board-trip.png`, `…-02-board-home.png`, cùng bản máy tính và máy tính bảng.

- Trên điện thoại mỗi cột gần đầy màn hình, vuốt ngang sang cột kế. Trên máy tính bảng và máy tính các cột nằm cạnh nhau.
- Kéo thẻ sang cột khác hay chỗ khác. Không muốn kéo? **Chuyển tới…** liệt kê các cột, chọn "Đầu" hoặc "Cuối" (`…-11-move-to.png`). Mọi thao tác đều có Hoàn tác.
- Đổi tên, thêm, sắp xếp, xoá cột; đánh dấu cột nào là đã xong.
- Hiện thẻ gọn, hoặc hiện việc con ngay trên thẻ.
- Trang chủ liệt kê các bảng kèm ảnh bìa, số thẻ còn mở và việc đến hạn hôm nay (`…-01-home.png`).

**Một thẻ chứa trọn một việc.** Tiêu đề, cột, nhóm, hạn, ngày định làm, nhắc, lặp lại, ảnh bìa, việc con, ghi chú và trường (`…-05-card.png`).
- Việc con: chia thẻ thành từng bước, tích dần, sắp xếp lại; thẻ hiện 2/5.
- Ghi chú: link, chi tiết, điều cần nhớ.
- Lịch sử thẻ: đổi gì, lúc nào.

**Ảnh bìa.** Mỗi bảng, mỗi thẻ đều có thể dùng ảnh bìa vẽ riêng: học tập, công việc, nhà cửa, du lịch, sự kiện, mua sắm, sức khoẻ, mục tiêu, sáng tạo, trừu tượng, hoặc ảnh của bạn. 30 bìa miễn phí, đủ 60 bìa với Pro (`…-06-cover-picker.png`).

## 2. Nhóm đi theo thẻ

Toán, Văn, Bếp, Thiết kế… Mỗi nhóm một màu, đi theo thẻ qua mọi cột.
- Dải nhóm phía trên bảng cho biết mỗi nhóm xong bao nhiêu trên tổng, kèm thanh tiến độ.
- **Chạm nhóm để chỉ xem thẻ của nhóm đó.** Chọn một, hoặc nhiều nhóm cùng lúc; chạm lại để bỏ. Thẻ khác chỉ bị ẩn, không bị đổi (`…-03-categories-two.png`, clip `categories-vi`).
- Thêm, đổi tên, đổi màu, sắp xếp, xoá nhóm trong một bảng chọn (`…-11-categories-edit.png`).

## 3. Xếp theo ngày, tuần, tháng (dòng thời gian)

Mới trong bản này. Bảng nào cũng xếp được theo thời gian, và chỉ cần một chip trên bảng: **Thời gian** (`…-04-timeline-sheet.png`).

- Chọn **Theo ngày**, **Theo tuần** hoặc **Theo tháng**. Mỗi thẻ nằm ở kỳ của ngày định làm (chưa có thì ngày tạo). Việc chưa xong từ trước được đem về kỳ hiện tại, có Hoàn tác.
- **‹ và ›** để qua lại giữa các kỳ. Thêm thẻ ở tuần sau thì thẻ được xếp cho tuần sau (`…-04-week-next.png`).
- **Kỳ đã qua chỉ để xem**: không thêm thẻ, không kéo thả. Thẻ còn mở ở đó có dải đỏ "Chưa xong" và nút **Đem qua tuần này**; đầu kỳ có "Đem tất cả qua tuần này" (`…-04-week-past.png`). Mở thẻ của kỳ cũ thì chỉ đọc, kèm "Đánh dấu xong" và "Đem qua tuần này" (`…-04-past-card.png`). Clip `timeline-vi`.
- Bảng chỉ đổi được sang kỳ dài hơn (ngày → tuần → tháng), không đổi ngược lại, nên không thẻ nào rơi sai chỗ.
- Tắt dòng thời gian thì không thẻ nào bị đổi: bảng thành Kanban thường, có lựa chọn lưu trữ thẻ đã xong. Bật lại thì thẻ nào về kỳ nấy.
- Mẫu bảng sống theo thời gian thì bật sẵn; sáu mẫu (Kế hoạch học kỳ, Ôn thi, Học ngoại ngữ, Ra mắt sản phẩm, Mục tiêu 90 ngày, Chiến dịch truyền thông) hỏi "Xếp theo: Theo tuần / Theo tháng / Không theo thời gian" lúc tạo.
- **Hạn nộp khác ngày định làm.** Hạn là hạn chót; ngày định làm là lúc bạn tính làm. Chuyển việc không bao giờ đổi hạn.
- **Ngày quan trọng**: kết thúc học kỳ, ngày ra mắt, ngày chuyển nhà: tối đa 8 ngày mỗi bảng, hiện dưới tên bảng kèm "còn 65 ngày" (`…-14-key-dates.png`).

## 4. Nhắc việc và thông báo

- Nhắc trên từng thẻ, đúng giờ bạn chọn. App chỉ xin quyền lần đầu bạn đặt nhắc.
- Thông báo bật trong Cài đặt › Thông báo (`…-31-notifications.png`): việc hôm nay, sắp đến hạn (trong ngày, trước 1 ngày hoặc 3 ngày), việc còn tồn và giờ yên lặng. "Ẩn tên thẻ" để màn hình khoá không lộ tiêu đề. Kêu đúng giờ ở nơi Android cho phép báo thức chính xác.
- **Tóm tắt các bảng** (Pro): một thông báo buổi sáng, hằng ngày hoặc mỗi tuần một lần, mỗi bảng có việc một dòng; bỏ qua bảng trống.
- **Xem lại đầu tuần** (Pro): sáng thứ Hai, những việc còn lại từ tuần trước.

## 5. Mẫu bảng: một phút là có bảng

30 mẫu chia năm nhóm (Học tập, Công việc, Cá nhân & nhà, Sáng tạo, Kế hoạch & dịp), 14 miễn phí và 16 Pro, cùng bảng trống ba cột (`…-08-templates.png`, `…-08-templates-study.png`, `…-10-blank.png`). Có ô tìm mẫu ("chuyển nhà", "chuyến đi").

Miễn phí: **Kế hoạch học kỳ, Bài tập nhóm, Ôn thi, Khóa học cá nhân, Dự án Kanban, Kế hoạch làm việc tuần, Luồng ý tưởng, Việc cá nhân, Kế hoạch mua sắm, Kế hoạch nội dung, Bảng cảm hứng, Chuẩn bị chuyến đi, Kế hoạch tháng, Việc trọng tâm hôm nay**.
Pro: **Luận văn / Đồ án, Học ngoại ngữ, Đợt phát triển, Ra mắt sản phẩm, Việc sau cuộc họp, Cải thiện nhà cửa, Chuẩn bị sự kiện, Mục tiêu 90 ngày, Sắp xếp nhà cửa, Quy trình nhiếp ảnh, Dự án viết, Phát triển trò chơi, Chiến dịch truyền thông, Chuẩn bị workshop, Chuyển nhà, Kế hoạch dịp lễ**.

- **Xem trọn bảng trước khi dùng**: cột, nhóm, ảnh bìa và thẻ ví dụ (`…-09-template-preview.png`). Mẫu Pro cũng xem trước miễn phí.
- **Smart Setup** hỏi vài câu (tên bảng, các môn, ngày kết thúc học kỳ, xếp theo gì) rồi cho xem bảng sẽ tạo trước khi tạo (`…-09-template-setup.png`, `…-09-template-plan.png`). Clip `template-vi`.
- **Trường đi kèm mẫu.** Khoảng 20 mẫu gợi ý sẵn trường cho thẻ, đã tích sẵn: chuyến đi có Chi phí, Link đặt chỗ, Đã đặt, Địa chỉ; mua sắm có Giá, Link mua; sprint có Điểm story, Người làm (`…-09-template-trip-fields.png`). Bỏ tích trường không cần. **Trường đi kèm mẫu điền miễn phí.**
- Mẫu chỉ định hình bảng mới; sửa bảng không bao giờ đổi mẫu.
- Lưu bảng bất kỳ thành mẫu của riêng bạn (menu bảng).

## 6. Trường trên thẻ

Thẻ nào cũng có mục **Trường**, nút "Thêm trường" hoặc "Sửa trường" nằm ngay đó (`…-05-card-fields.png`).
- Kiểu: chữ, số, ngày, có/không, một lựa chọn, link. Trường có thể hiện luôn ở mặt thẻ.
- Trường đi kèm mẫu thì điền miễn phí. **Tự tạo trường là Pro** (`…-24-fields.png`); giá trị đã lưu vẫn xem được khi không còn Pro.

## 7. Tìm gì cũng thấy

- **Tìm trên mọi bảng** từ Trang chủ: tiêu đề và ghi chú của thẻ (`…-12-search.png`).
- Tìm trong một bảng từ thanh công cụ của bảng.
- Bộ lọc trên bảng: theo nhóm, "Hạn trong 3 ngày", và **bộ lọc đã lưu** (Pro) như "Toán, sắp hạn" (`…-22-saved-filters.png`).

## 8. Lấy lại được

- **Thùng rác** giữ thẻ đã xoá cho tới khi bạn dọn; khôi phục thẻ nào cũng được (`…-13-trash.png`).
- **Lưu trữ** thẻ đã xong và cả bảng; lấy lại trong Cài đặt › Dữ liệu.
- **Hoàn tác** sau mỗi lần chuyển, xoá, sửa.
- **Sao lưu** thành một tệp bạn giữ, **khôi phục** từ tệp (xem trước rồi mới làm), và **tự sao lưu**: giữ bảy bản gần nhất trên máy.
- **Xoá toàn bộ dữ liệu** khi muốn bắt đầu lại.

## 9. Đưa việc vào, xuất ra

- **Chia sẻ chữ sang Handy Boards** từ app bất kỳ, chữ thành một thẻ.
- Nhập: tệp xuất từ **Trello** (kiểm tra trước khi thêm), **CSV** với cách ghép cột tự chọn, **danh sách việc** dạng chữ, tệp **mẫu bảng**, hoặc bản sao lưu.
- Xuất: bảng thành **ảnh hoặc PDF** (kiểu thường miễn phí), **CSV**, **Markdown**, lịch **ICS** cho các ngày, hoặc sao lưu đầy đủ (`…-28-export-plain.png`).

## 10. Trên màn hình chính

Năm widget (Cài đặt › Widget màn hình chính, `…-32-widgets.png`):
- Miễn phí: **Hôm nay**, **Tiến độ bảng**, **Còn tồn & sắp tới**.
- Pro: **Việc của tôi** và **Tuần**.
- 3 kiểu widget miễn phí, đủ 9 kiểu với Pro. Tắt "Hiện tên thẻ" thì widget chỉ hiện con số.

## 11. Theo ý bạn

- Sáng, tối hoặc theo hệ thống; tiếng Việt hoặc tiếng Anh.
- **Giao diện bảng**: 5 nền miễn phí, 15 nền với Pro (giấy, xô thơm, bản vẽ, phấn hồng…), làm cho cả sáng lẫn tối (`…-25-looks.png`).
- **Phần giới thiệu** ngắn cho bạn tập trên một bảng mẫu (thêm thẻ, kéo thẻ, chọn nhóm, tích việc con) trước khi bắt đầu; không lưu gì (`…-50-welcome-1.png` … `-7.png`, clip `welcome-vi`).
- **Cách dùng**: hướng dẫn trong app, từng chủ đề, có ví dụ chuyển động nhỏ (`…-33-how-to*.png`).

## 12. Đồng bộ giữa các máy Android (tuỳ chọn)

Tắt cho tới khi bạn bật trong Cài đặt › Dữ liệu › Đồng bộ. Bảng được giữ trong thư mục ẩn của **chính** Google Drive của bạn (`drive.appdata`): app không thấy tệp khác của bạn và nhà phát triển không nhận được gì. Máy Android khác cùng tài khoản Google có cùng các bảng. Tắt đồng bộ không xoá gì.
(Có từ bản 1.0.0 (3). Đã chạy thử trên hai máy ảo Android với tài khoản Google thật ngày 08/11/2026; chưa thử trên điện thoại thật. Chỉ có trên Android.)

---

## Handy Boards Pro (mua một lần)

"Trả một lần. Dùng mãi." Không thuê bao, không quảng cáo, không tài khoản. Ảnh: `…-29-pro.png`, clip `pro-vi`.

**Lên kế hoạch**
- **Việc của tôi trên mọi bảng**: hôm nay, việc còn tồn và sắp tới của mọi bảng trong một danh sách; chạm là mở thẻ ngay trong bảng của nó (`…-20-my-work.png`).
- **Tự chuyển việc tồn**: sang ngày hay tuần mới, xem lại việc còn tồn hoặc để app tự chuyển về hôm nay. Chỉ đổi ngày định làm, không bao giờ đổi hạn. Chuyển bằng tay vẫn miễn phí.
- **Thẻ lặp lại**: tiền nhà, báo cáo, họp scrum thứ Hai tự quay lại theo nhịp: mỗi vài ngày, vào các thứ đã chọn, hoặc một ngày trong tháng (`…-05-card-repeat.png`). Trên bảng có dòng thời gian, bản kế tiếp nằm ở kỳ kế tiếp. Bỏ lặp luôn miễn phí.
- Thông báo **Tóm tắt các bảng** và **Xem lại đầu tuần**.

**Tự động**
- **Luật tự động** viết như một câu: "tick việc con cuối thì chuyển thẻ sang Xong"; "thẻ vào Review thì thêm danh sách kiểm"; lưu trữ thẻ xong sau một thời gian. Mỗi luật ghi lại đã làm gì, luôn hoàn tác được (`…-21-rules.png`, `…-21-rules-editor.png`).
- **Mẫu thẻ**: thẻ hay làm lại, một chạm là có thẻ mới (`…-23-card-templates.png`).
- **Bộ lọc đã lưu** và **trường tuỳ chỉnh** (ở trên).

**Giao diện**
- Thêm 16 mẫu bảng, mọi ảnh bìa (60), mọi nền bảng (15), mọi kiểu widget (9).

**Xuất và xem lại**
- **Bản xuất đẹp**: kiểu poster, bản in, và **báo cáo** (đang mở và đã xong, số thẻ xong 8 tuần, tiến độ theo nhóm) (`…-28-export-poster.png`, `-print`, `-report`).
- **Thống kê bảng**: xong, trễ và xong trong tuần, theo từng nhóm (`…-26-insights.png`).
- **Lịch sử bảng**: chuyện gì đã xảy ra, theo từng ngày (`…-27-history.png`).

**Luôn miễn phí:** bảng, thẻ, nhóm, việc con, kéo thả, hạn, nhắc việc, dòng thời gian, tìm kiếm, sao lưu và xuất thường. Nếu không còn Pro, không gì bạn đã tạo bị xoá; kiểu Pro tạm về mặc định và trở lại khi có Pro.

---

## Mới hơn bản trên Play

Dòng thời gian (§3), chọn nhiều nhóm (§2), trường đi kèm mẫu và mục Trường trên mọi thẻ (§5–6) hoàn thành ngày 09/11/2026, **chưa có trong bản Play 1.0.0 (3)**. Lần tải lên tới sẽ có. Trước đó, hoặc tạm chưa đăng các phần này, hoặc ghi "có trong bản cập nhật tới".
