import type { Locale } from "./studio";

/** Observable product decisions; no invented research, outcome metrics or release claims. */
export const caseStudies: Record<string, Record<Locale, string>[]> = {
  "handy-boards": [
    {
      vi: "Công việc cần được nhóm lại để biết điều gì nên làm tiếp theo.",
      en: "Tasks need grouping to make the next step clear.",
    },
    {
      vi: "Dùng danh mục, cột Kanban và kế hoạch để sắp xếp công việc.",
      en: "Use categories, Kanban columns and plans to organize the work.",
    },
    {
      vi: "Giao diện từ build đang phát triển; chưa mở tải công khai.",
      en: "Screens from the current development build; public download is coming soon.",
    },
  ],
  "handy-bookmark": [
    {
      vi: "Link nằm rải rác trong nhiều app; lưu xong rất dễ quên.",
      en: "Links are scattered across apps, and a saved link is easy to forget.",
    },
    {
      vi: "Dùng trang Chia sẻ để lưu nhanh, thư viện có hình để nhận ra và Focus để xem lại.",
      en: "Use the share sheet for capture, pictures for recognition, and Focus for revisiting.",
    },
    {
      vi: "Bộ sưu tập lồng nhau, tìm không dấu và bản đọc đã lưu dùng ngoại tuyến.",
      en: "Nested collections, accent-insensitive search and saved offline reading copies.",
    },
  ],
  "sticky-wall": [
    {
      vi: "Ghi chú và kỷ niệm không phải lúc nào cũng vừa một danh sách.",
      en: "Notes and memories do not always belong in a list.",
    },
    {
      vi: "Cho giấy có vị trí và góc xoay, cho ý tưởng có dây nối; vẫn có lưới và danh sách.",
      en: "Give paper a position and an angle, and ideas a thread; keep grid and list views.",
    },
    {
      vi: "Bảy loại ghi chú, sticker, tìm xuyên bảng và xuất nguyên bức tường.",
      en: "Seven note kinds, stickers, cross-board search and whole-board export.",
    },
  ],
  "asset-forge-studio": [
    {
      vi: "Một model cần đi qua nhiều công cụ trước khi có thể dùng trong dự án.",
      en: "A model passes through several tools before it can be used in a project.",
    },
    {
      vi: "Đặt tạo tài sản, Production, kiểm tra phiên bản và xuất tệp trong cùng workspace.",
      en: "Bring creation, Production, version inspection and export into one workspace.",
    },
    {
      vi: "Giao diện chạy cục bộ với công cụ đã cấu hình; ảnh repo ghi lại Create, Library và Inspector.",
      en: "A local workspace with configured tools; repository captures document Create, Library and Inspector.",
    },
  ],
  "arcane-brigade": [
    {
      vi: "Đọc trận chiến và xây đội cần có chỗ thở giữa những đợt hỗn loạn.",
      en: "Reading a fight and building a brigade need room between the chaos.",
    },
    {
      vi: "Bạn điều khiển di chuyển, tổ đội tự đánh; tiệm mua bán là một nơi có thể bước vào.",
      en: "You control movement, the brigade attacks automatically, and the shop is a place you walk into.",
    },
    {
      vi: "Hai mươi đêm, boss mỗi bốn đêm; gộp sao và liên kết làm thay đổi đội hình.",
      en: "Twenty nights, a boss every fourth night, and star merges and bonds that reshape the brigade.",
    },
  ],
};
