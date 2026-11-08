# Winka Studio — Guide cập nhật Privacy Policy và Terms cho các app

Cập nhật: **09/11/2026**, giờ Việt Nam. File này có thể gửi nguyên vẹn cho agent đang làm việc trong repo của từng app/game.

## 1. Quy ước URL

- Domain chính thức: **https://winka.top**.
- Studio: **Winka Studio**. Email hỗ trợ: **apps.winka.studio@gmail.com**.
- Dùng URL riêng của đúng sản phẩm, có HTTPS và dấu `/` cuối đường dẫn.
- Mặc định dùng bản **EN** trong cấu hình Play Console; app có thể mở bản **VI** khi giao diện đang dùng tiếng Việt. Đây là quy ước của dự án, không phải yêu cầu chọn ngôn ngữ của Google.
- Không dùng localhost, Netlify Deploy Preview, trang chủ hoặc trang danh mục thay cho Privacy Policy.
- Không tự đổi trạng thái phát hành của app/store: website hiện vẫn ghi **Coming soon**.

## 2. URL của các sản phẩm đã có toàn văn tài liệu trong source website

Các URL dưới đây có toàn văn từ bộ tài liệu do chủ sản phẩm cung cấp. Agent vẫn phải đối chiếu nội dung với **đúng bản Android đang nộp**, không coi việc có URL là bằng chứng nội dung đã phù hợp với mọi build.

### Handy Bookmark — `handy-bookmark`

| Mục | URL EN |
| --- | --- |
| Privacy Policy | https://winka.top/en/apps/handy-bookmark/privacy/ |
| Terms of Service / Terms of Use | https://winka.top/en/apps/handy-bookmark/terms/ |
| Hướng dẫn xóa dữ liệu | https://winka.top/en/apps/handy-bookmark/data-deletion/ |
| Hỗ trợ | https://winka.top/en/support/handy-bookmark/ |

### Sticky Wall — `sticky-wall`

| Mục | URL EN |
| --- | --- |
| Privacy Policy | https://winka.top/en/apps/sticky-wall/privacy/ |
| Terms of Service / Terms of Use | https://winka.top/en/apps/sticky-wall/terms/ |
| Hướng dẫn xóa dữ liệu | https://winka.top/en/apps/sticky-wall/data-deletion/ |
| Hỗ trợ | https://winka.top/en/support/sticky-wall/ |

### Arcane Brigade — `arcane-brigade`

| Mục | URL EN |
| --- | --- |
| Privacy Policy | https://winka.top/en/games/arcane-brigade/privacy/ |
| Terms of Service / Terms of Use | https://winka.top/en/games/arcane-brigade/terms/ |
| Hướng dẫn xóa dữ liệu | https://winka.top/en/games/arcane-brigade/data-deletion/ |
| Hỗ trợ | https://winka.top/en/support/arcane-brigade/ |

### Handy Boards — `handy-boards`

| Mục | URL EN |
| --- | --- |
| Privacy Policy | https://winka.top/en/apps/handy-boards/privacy/ |
| Terms of Service / Terms of Use | https://winka.top/en/apps/handy-boards/terms/ |
| Hướng dẫn xóa dữ liệu | https://winka.top/en/apps/handy-boards/data-deletion/ |
| Hỗ trợ | https://winka.top/en/support/handy-boards/ |

Handy Boards đã được chủ sản phẩm xác nhận hoàn thiện ngày 09/11/2026. Website nhập nguyên văn policy/terms từ `Handy-Website-Kit/handy-boards/legal/`; tài liệu ghi cập nhật 08/11/2026. Chỉ dùng các URL này để nộp Play sau khi bản website mới đã deploy và nội dung live là toàn văn policy/terms, không còn trang dự thảo.

Agent của Handy Boards cần cập nhật `apps/handy_boards/lib/settings/help_links.dart`, Privacy Policy trong Play Console và các URL legal ở Google Cloud OAuth branding của project Handy Boards nếu chúng còn dùng GitHub. Application ID trong kit là `com.apps.winka.handyboards`; đối chiếu lại cấu hình release trước khi sửa.

**Bản tiếng Việt:** thay đúng đoạn `/en/` đầu đường dẫn bằng `/vi/`. Ví dụ:

```text
https://winka.top/vi/apps/handy-bookmark/privacy/
https://winka.top/vi/apps/sticky-wall/terms/
https://winka.top/vi/games/arcane-brigade/data-deletion/
```

Ngày 09/11/2026 đã kiểm tra trực tiếp đủ **18 URL legal** của ba sản phẩm × hai ngôn ngữ × privacy/terms/data-deletion: tất cả trả HTTP 200 tại chính URL `winka.top`, có tiêu đề tương ứng và không có nội dung báo đang phát triển. Kết quả này chỉ xác nhận truy cập kỹ thuật tại thời điểm kiểm tra; cần kiểm tra lại trước khi nộp bản app mới.

## 3. Những sản phẩm chưa được dùng trang legal hiện tại để nộp Play

| Sản phẩm | Base path | Tình trạng trong source website |
| --- | --- | --- |
| Aetherward | `/en/games/aetherward/` | Legal còn thông báo đang phát triển |
| Forgebound | `/en/games/forgebound/` | Legal còn thông báo đang phát triển |
| Machine Brigade | `/en/games/machine-brigade/` | Legal còn thông báo đang phát triển |
| Runavelle | `/en/games/runavelle/` | Legal còn thông báo đang phát triển |

Với các sản phẩm này, chưa lấy việc ghép `privacy/` hoặc `terms/` vào base path làm URL đã sẵn sàng. Agent của app cần chuẩn bị Privacy Policy và Terms đúng với build thực tế, cung cấp bản EN/VI cho repo website, chờ nội dung thật được deploy, rồi mới cập nhật Play Console.

**Các ứng dụng đang ẩn:** những app ngoài Bookmark, Sticky Wall và Boards hiện không được export trang sản phẩm/legal/support. Nếu một app đang ẩn vẫn cần trang policy cho Google Play, phải phối hợp repo website để giữ riêng các trang legal công khai dù app không xuất hiện trong danh mục. Không tự suy ra một URL rồi nộp khi nó đang trả 404.

## 4. Công việc agent cần làm trong repo app/game

1. Xác định đúng tên app, slug và Android application ID từ cấu hình build/manifest. Không suy ra package ID từ tên hiển thị hoặc slug.
2. Đọc tài liệu và implementation của **release build**: local storage, đăng nhập, đồng bộ, backup, SDK, analytics/crash reporting, quảng cáo và thanh toán. Nội dung website phải khớp build đó. Ví dụ, không mô tả tính năng đồng bộ chỉ mới có ở nhánh thử nghiệm như thể đã phát hành.
3. Tìm URL legal cũ bằng `rg`: các khóa như `privacy`, `privacyPolicyUrl`, `terms`, `termsUrl`, `legal`, `dataDeletion`, các URL GitHub/raw Markdown hoặc domain cũ. Kiểm tra cả app, tài liệu release và store metadata nếu có.
4. Đưa ba URL riêng của app vào cấu hình/constant legal dùng chung theo convention của repo. Dùng mapping ở mục 2, hoặc thực hiện bước hoàn thiện tài liệu ở mục 3 trước.
5. Cập nhật các điểm mở link: Settings/About/Legal, màn hình onboarding hoặc mua Pro nếu có, mục trợ giúp và metadata phát hành. Giữ tên nhãn rõ ràng: **Privacy Policy**, **Terms of Service**, **Data deletion**.
6. Nếu app có EN/VI, dùng một mapping locale chung, thay vì hardcode nhiều bản URL khác nhau. Locale không hỗ trợ có thể fallback EN.
7. Chỉ thay các liên kết legal liên quan. Không thay link GitHub Issues, source code, giấy phép ảnh hoặc liên kết attribution bằng URL policy.
8. Với Markdown legal gốc, kiểm tra cả link chéo giữa Terms và Privacy Policy. Nếu link còn dẫn tới tài liệu cũ, đổi đích link tương ứng; không tự viết lại điều khoản hay thay đổi mô tả dữ liệu khi công việc chỉ là cập nhật URL.
9. Kiểm tra link bằng trình duyệt không đăng nhập trên Android và desktop; kiểm tra thao tác mở URL từ chính app. HTTP 200 phải chứa đúng tài liệu, không phải trang lỗi hoặc màn hình đăng nhập trả status 200.
10. Chạy các kiểm tra của repo, cập nhật ghi chú phát hành cần thiết và báo chính xác các file/URL đã thay. Chỉ build, submit hoặc publish release theo phạm vi đã được chủ dự án giao.

Mẫu cấu hình cho **Handy Bookmark**; đổi sang mapping đúng sản phẩm khi áp dụng cho repo khác:

```json
{
  "privacyPolicyUrl": "https://winka.top/en/apps/handy-bookmark/privacy/",
  "termsUrl": "https://winka.top/en/apps/handy-bookmark/terms/",
  "dataDeletionUrl": "https://winka.top/en/apps/handy-bookmark/data-deletion/",
  "supportUrl": "https://winka.top/en/support/handy-bookmark/"
}
```

## 5. Cập nhật trong Google Play Console

- Chọn đúng app, mở mục **Privacy policy** trong **App content / Nội dung ứng dụng**; điền URL `/privacy/` của chính app rồi lưu các thay đổi cần gửi duyệt. Link policy cũng cần truy cập được từ app. [Google Play: User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)
- Đối chiếu **Data safety** với build, SDK và policy; không tự chọn “không thu thập dữ liệu” chỉ vì đã đổi URL. Privacy Policy cần công khai, không yêu cầu đăng nhập, không giới hạn địa lý và không phải PDF. [Google Play: User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)
- Terms được cập nhật trong app và các nơi đã có liên kết điều khoản. Không giả định Play Console có một ô Terms URL riêng bắt buộc cho mọi app.
- Với app cho phép tạo tài khoản, Google yêu cầu khả năng yêu cầu xóa tài khoản trong và ngoài app. Trang ngoài app phải thực sự hỗ trợ khởi tạo yêu cầu xóa. [Google Play: Account deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)

**Lưu ý riêng về `/data-deletion/`:** các trang hiện tại trình bày chính sách và hướng dẫn xóa dữ liệu, không có backend nhận/xử lý yêu cầu xóa tài khoản. Không coi URL này là một dịch vụ đã tự xóa tài khoản. Agent phải xác định app có tạo tài khoản riêng hay không và thực hiện quy trình đúng với app trước khi khai báo trong Play Console. Không tự tạo thêm tài khoản hoặc form xóa chỉ để điền một trường URL.

## 6. Phối hợp khi policy/terms cần đổi nội dung

- Repo app/game cung cấp dữ kiện của bản phát hành và Markdown legal cập nhật, gồm EN/VI khi có, tên app/package, ngày hiệu lực và đầu mối liên hệ đã xác nhận.
- Repo website giữ route ổn định. Với Bookmark, Boards, Sticky Wall, Arcane, nội dung toàn văn hiện nằm trong `src/content/website-kits.json`, được hiển thị bởi `src/components/kit-pages.tsx`; bộ kit có quy trình import ở `scripts/import-website-kits.py`.
- `src/content/legal.ts` vẫn chứa nội dung dự thảo cho các sản phẩm khác. Không đánh dấu một trang sẵn sàng nộp Play chỉ vì route đã tồn tại.
- Thay đổi policy cần được phản ánh nhất quán ở source app, website và khai báo Data safety. Một thay đổi URL không tự chứng minh tính năng hoặc thực hành dữ liệu đã thay đổi.
- Không xóa hoặc đổi đường dẫn policy đã gắn vào một app đang được phân phối nếu chưa có phương án chuyển tiếp hoạt động.

## 7. Prompt có thể giao cho agent của app

```text
Đọc GOOGLE_PLAY_POLICY_TERMS_GUIDE.md và áp dụng cho repo app/game hiện tại.

Xác định tên app, slug và Android application ID từ source. Dùng URL winka.top
của đúng sản phẩm trong guide, kiểm tra nội dung live và đối chiếu release build.
Thay link Privacy Policy/Terms/Data deletion cũ trong cấu hình dùng chung,
Settings/About/Legal, các luồng có liên quan và metadata phát hành đang có.

Nếu guide ghi tài liệu còn dự thảo hoặc URL không có tài liệu thật, hãy chuẩn bị
nội dung đúng với app và nêu phần repo website cần cập nhật; chưa dùng URL đó
để nộp Play. Không mượn policy của app khác và không tự bịa thực hành dữ liệu.

Giữ các link source/issues/attribution không liên quan. Không tự đổi tính năng,
quyền, giá, SDK hoặc trạng thái phát hành. Kiểm tra link trên app Android và
trình duyệt không đăng nhập, rồi chạy kiểm tra thích hợp của repo.

Báo lại: package ID đã xác định, URL legal mới, file đã sửa, kết quả kiểm tra,
và mục Play Console cần cập nhật. Tách rõ việc đã làm trong code với thao tác
Play Console chưa thực hiện. Không báo đã submit nếu chưa thực sự submit.
```
