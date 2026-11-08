import type { Product } from "./products";
import { text, type Translation } from "./studio";

export type LegalKind = "privacy" | "terms" | "data-deletion";
export type LegalSection = { heading: Translation; body: Translation };
export const legalTitles: Record<LegalKind, Translation> = {
  privacy: text("Privacy policy", "Chính sách quyền riêng tư"),
  terms: text("Terms of use", "Điều khoản sử dụng"),
  "data-deletion": text("Data deletion & choices", "Xóa dữ liệu & lựa chọn"),
};
// Source-backed excerpts for a PRIVATE review. These are not effective policies.
// Unknown identity, contact, audience, SDK coverage and legal terms are tracked
// in LEGAL_AUDIT_MATRIX.md, never filled with an invented public assertion.
export function legalSections(
  product: Product,
  kind: LegalKind,
): LegalSection[] {
  const bookmark = product.slug === "handy-bookmark";
  const sticky = product.slug === "sticky-wall";
  const arcane = product.slug === "arcane-brigade";
  const forge = product.slug === "asset-forge-studio";
  if (product.completion !== "complete")
    return [
      {
        heading: text("Development status", "Trạng thái phát triển"),
        body: text(
          `${product.name} is in development. Product-specific policies will accompany a future release. This page does not establish data practices for an unreleased build.`,
          `${product.name} đang phát triển. Chính sách riêng của sản phẩm sẽ đi cùng bản phát hành sau này. Trang này không xác nhận cách xử lý dữ liệu của bản chưa phát hành.`,
        ),
      },
    ];
  if (kind === "terms")
    return [
      {
        heading: text("About this preview", "Về bản xem trước"),
        body: text(
          `This is an outline of usage terms for ${product.name}. It is not an effective agreement or a grant of license. The product owner must approve the final terms before public release.`,
          `Đây là khung điều khoản sử dụng cho ${product.name}. Nội dung này chưa là thỏa thuận có hiệu lực hay giấy phép sử dụng. Chủ sản phẩm cần duyệt điều khoản cuối trước khi phát hành công khai.`,
        ),
      },
      {
        heading: text("Your files and content", "Tệp và nội dung của bạn"),
        body: text(
          "Keep copies of files and content you want to retain before deleting app data, replacing a backup or uninstalling. Creating or importing content does not establish permission to use material owned by someone else.",
          "Giữ bản sao các tệp và nội dung cần lưu trước khi xóa dữ liệu, thay thế bản sao lưu hoặc gỡ ứng dụng. Việc tạo hay nhập nội dung không mặc nhiên cho phép sử dụng tài sản của người khác.",
        ),
      },
      {
        heading: text("Product availability", "Tình trạng sản phẩm"),
        body: text(
          "Features, platforms and purchase conditions must be read against the actual build and its official distribution channel. This website currently provides product information without a verified store download.",
          "Tính năng, nền tảng và điều kiện mua hàng cần được đối chiếu với bản thực tế và kênh phân phối chính thức. Website hiện cung cấp thông tin sản phẩm, chưa có link tải từ store được xác nhận.",
        ),
      },
      ...(forge
        ? [
            {
              heading: text(
                "Models and third-party tools",
                "Model và công cụ bên thứ ba",
              ),
              body: text(
                "Asset Forge Studio uses external model weights, local tools and Blender. Their licenses and any rights in generated assets must be checked separately; this page does not grant commercial rights in those components or outputs.",
                "Asset Forge Studio dùng trọng số model, công cụ cục bộ và Blender bên ngoài. Cần kiểm tra riêng giấy phép và quyền sử dụng tài sản được tạo; trang này không cấp quyền thương mại cho các thành phần hay đầu ra đó.",
              ),
            },
          ]
        : []),
    ];
  if (kind === "data-deletion")
    return [
      {
        heading: text(
          "Keep a backup before deleting",
          "Giữ bản sao trước khi xóa",
        ),
        body: text(
          "Deleting local data and deleting cloud copies are separate actions. Export anything you want to keep first. This static page explains choices; it does not delete files or accounts for you.",
          "Xóa dữ liệu cục bộ và xóa bản sao đám mây là hai việc riêng. Hãy xuất nội dung muốn giữ trước. Trang tĩnh này giải thích lựa chọn; trang không tự xóa tệp hay tài khoản của bạn.",
        ),
      },
      {
        heading: text("Local app data", "Dữ liệu trên thiết bị"),
        body: sticky
          ? text(
              "Notes, boards, photos, recordings and local backup files are stored on the device. The app has Trash and automatic backups; deleting an individual note is different from removing every retained copy. Android app storage can be cleared in system settings. Device backups must be managed separately.",
              "Ghi chú, bảng, ảnh, ghi âm và tệp sao lưu cục bộ nằm trên thiết bị. App có thùng rác và sao lưu tự động; xóa một ghi chú khác với xóa mọi bản còn giữ. Có thể xóa bộ nhớ app Android trong cài đặt hệ thống. Bản sao lưu của thiết bị cần được quản lý riêng.",
            )
          : bookmark
            ? text(
                "Your library is stored locally. Recently Deleted and retained offline copies must be considered separately from the visible library. On Android, clearing app storage removes local app data. Exported files and backups outside app storage need to be removed separately.",
                "Thư viện được lưu cục bộ. Cần phân biệt mục Đã xóa gần đây và các bản đọc ngoại tuyến còn giữ với thư viện đang hiển thị. Trên Android, xóa bộ nhớ ứng dụng sẽ xóa dữ liệu app cục bộ. Tệp đã xuất và bản sao lưu bên ngoài cần được xóa riêng.",
              )
            : arcane
              ? text(
                  "Game progress and settings are saved on the device. Local restore points and any exported copies are separate retained copies. The exact deletion steps depend on the platform and build.",
                  "Tiến độ và cài đặt trò chơi được lưu trên thiết bị. Điểm khôi phục và bản đã xuất là những bản dữ liệu riêng còn lưu. Các bước xóa cụ thể phụ thuộc nền tảng và phiên bản.",
                )
              : text(
                  "Project metadata, assets and output files are stored in local workspace locations. Removing the application is different from removing its projects, model weights and exported assets. Keep files you want to retain and review each storage location separately.",
                  "Thông tin dự án, tài sản và tệp đầu ra nằm trong các vị trí workspace cục bộ. Gỡ ứng dụng khác với xóa dự án, trọng số model và tài sản đã xuất. Giữ tệp cần lưu và kiểm tra từng vị trí lưu trữ riêng.",
                ),
      },
      ...(!forge
        ? [
            {
              heading: text(
                "Optional Google Drive copies",
                "Bản sao Google Drive tùy chọn",
              ),
              body: text(
                `If you connected ${product.name} to Google Drive, turning sync off does not itself delete a cloud copy. In Google Drive settings, open Manage apps, select ${product.name}, and use Delete hidden app data if shown. Disconnect access through your Google Account's third-party connections. These are separate actions; check the current provider interface.`,
                `Nếu đã kết nối ${product.name} với Google Drive, tắt đồng bộ không tự xóa bản sao trên đám mây. Trong cài đặt Google Drive, mở Quản lý ứng dụng, chọn ${product.name}, rồi dùng Xóa dữ liệu ứng dụng ẩn nếu có. Thu hồi quyền tại phần kết nối bên thứ ba của Tài khoản Google. Đây là những thao tác riêng; hãy kiểm tra giao diện nhà cung cấp hiện tại.`,
              ),
            },
          ]
        : []),
    ];
  return [
    {
      heading: text(
        "Information used by the product",
        "Thông tin sản phẩm sử dụng",
      ),
      body: bookmark
        ? text(
            "The source includes local storage for saved links, collections, tags, article copies and preferences. Fetching a link or article makes a network request to the relevant website. Optional Google sign-in is used for Drive synchronization.",
            "Source có lưu trữ cục bộ cho link, bộ sưu tập, thẻ, bản sao bài viết và tùy chọn. Tải link hoặc bài viết tạo yêu cầu mạng tới website liên quan. Đăng nhập Google tùy chọn phục vụ đồng bộ Drive.",
          )
        : sticky
          ? text(
              "Notes, checklists, drawings, boards, reminders, photos and voice recordings are stored in app storage. The source includes local automatic backups and optional Google Drive synchronization. The app lock hides content within the app; it is not encryption.",
              "Ghi chú, checklist, hình vẽ, bảng, nhắc nhở, ảnh và ghi âm được lưu trong bộ nhớ app. Source có sao lưu cục bộ tự động và đồng bộ Google Drive tùy chọn. Khóa ứng dụng giúp ẩn nội dung trong app; đây không phải mã hóa.",
            )
          : arcane
            ? text(
                "The repository policy describes local progress and settings, optional Google Drive cloud saves and store-managed Deluxe purchases. This preview does not repeat a blanket “nothing collected” claim: the final text must account for every enabled integration.",
                "Chính sách trong repo mô tả tiến độ, cài đặt cục bộ, lưu đám mây Google Drive tùy chọn và gói Deluxe do store xử lý. Bản xem trước không dùng tuyên bố chung “không thu thập gì”; văn bản cuối cần tính đến từng tích hợp được bật.",
              )
            : text(
                "The workbench stores project metadata and generated assets locally and starts a packaged local backend in the desktop build. External AI model weights and Blender are separate tools. Network and update behavior must be audited for the actual distributed package.",
                "Xưởng làm việc lưu thông tin dự án và tài sản được tạo trên máy, đồng thời khởi động backend cục bộ đi kèm bản desktop. Trọng số AI và Blender là công cụ riêng. Hành vi mạng và cập nhật cần được kiểm tra trên đúng gói phân phối.",
              ),
    },
    ...(!forge
      ? [
          {
            heading: text("Optional cloud storage", "Lưu trữ đám mây tùy chọn"),
            body: text(
              "The Google Drive integration requests the drive.appdata scope for a hidden app-data folder. Connecting a Google account involves Google as a provider. Local storage, Drive copies and operating-system backups are separate storage locations.",
              "Tích hợp Google Drive yêu cầu phạm vi drive.appdata cho thư mục dữ liệu app ẩn. Kết nối Tài khoản Google có Google tham gia với vai trò nhà cung cấp. Bộ nhớ cục bộ, bản Drive và bản sao lưu hệ điều hành là các vị trí riêng.",
            ),
          },
        ]
      : []),
    ...(bookmark || sticky
      ? [
          {
            heading: text("Permissions", "Quyền truy cập"),
            body: bookmark
              ? text(
                  "The Android manifest declares internet, biometrics, notifications and boot-completed access. These declarations are not evidence that every permission is used in every workflow. Product settings and the operating system control the relevant choices.",
                  "Manifest Android khai báo internet, sinh trắc học, thông báo và quyền nhận sự kiện khởi động. Các khai báo không chứng minh mọi quyền đều được dùng trong mọi luồng. Cài đặt sản phẩm và hệ điều hành điều khiển các lựa chọn liên quan.",
                )
              : text(
                  "The app uses the microphone for voice notes, the system photo picker for selected pictures, notifications for reminders and local authentication for app or board locks. Purchases use the in_app_purchase package; Google sign-in and HTTP packages support optional Drive sync.",
                  "App dùng micro cho ghi âm, trình chọn ảnh hệ thống cho ảnh được chọn, thông báo cho nhắc nhở và xác thực cục bộ cho khóa app hoặc bảng. Mua hàng dùng gói in_app_purchase; Google sign-in và HTTP hỗ trợ đồng bộ Drive tùy chọn.",
                ),
          },
        ]
      : []),
    {
      heading: text("Retention and your choices", "Thời gian lưu và lựa chọn"),
      body: text(
        "Local data, trash, automatic backups, exported files and cloud copies may have different retention. Use the data-deletion page to distinguish them. No claim of encryption, absolute security or legal compliance is made by this preview.",
        "Dữ liệu cục bộ, thùng rác, sao lưu tự động, tệp đã xuất và bản sao đám mây có thể được giữ khác nhau. Trang xóa dữ liệu giúp phân biệt các trường hợp. Bản xem trước không đưa ra bảo đảm mã hóa, an toàn tuyệt đối hay tuân thủ pháp lý.",
      ),
    },
  ];
}
