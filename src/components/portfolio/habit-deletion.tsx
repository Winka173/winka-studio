import type { Locale } from "@/content/studio";

export function HabitDeletion({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const steps = vi
    ? [
        [
          "Xóa dữ liệu trên máy",
          "Mở Handy Habit › Cài đặt › Dữ liệu › Xóa toàn bộ dữ liệu, hoặc gỡ app để xóa mọi thứ app lưu trong bộ nhớ riêng trên máy.",
        ],
        [
          "Phân biệt Thùng rác",
          "Xóa riêng thói quen hoặc quy trình sẽ đưa chúng vào Thùng rác và giữ 30 ngày. Đây là dữ liệu trên máy, không phải bản nhà phát triển giữ.",
        ],
        [
          "Xóa những tệp bạn đã tạo",
          "Tệp sao lưu, bản xuất và trang quy trình đã chia sẻ vẫn ở nơi bạn đặt. Tự xóa chúng và các bản sao bạn đã gửi hoặc lưu ở nơi khác khi không còn cần.",
        ],
        [
          "Xóa bản Drive nếu đã bật đồng bộ",
          "Google Drive › Cài đặt › Quản lý ứng dụng › Handy Habit › Xóa dữ liệu ẩn của ứng dụng. Chỉ tắt đồng bộ không xóa bản trên Drive.",
        ],
      ]
    : [
        [
          "Delete the data on your phone",
          "Open Handy Habit › Settings › Data › Delete all data, or uninstall the app to remove everything it stored in private device storage.",
        ],
        [
          "Understand Trash",
          "Deleting an individual habit or routine keeps it in Trash for 30 days. This is on-device data, not a copy held by the developer.",
        ],
        [
          "Delete files you created",
          "Backups, exports and shared routine pages stay where you put them. Delete those files and any copies you saved or sent elsewhere when you no longer need them.",
        ],
        [
          "Remove the Drive copy if you enabled sync",
          "Google Drive › Settings › Manage apps › Handy Habit › Delete hidden app data. Turning sync off alone does not delete the Drive copy.",
        ],
      ];
  return (
    <section className="habit-deletion-guide">
      <h2>
        {vi
          ? "Không có tài khoản Handy Habit để xóa."
          : "There is no Handy Habit account to delete."}
      </h2>
      <p>
        {vi
          ? "Handy Habit không có máy chủ riêng và nhà phát triển không giữ dữ liệu của bạn. Bạn xóa dữ liệu trực tiếp trên máy và ở những nơi bạn đã tự tạo bản sao; không có dữ liệu lưu tại nhà phát triển để yêu cầu xóa."
          : "Handy Habit has no server of its own and the developer holds none of your data. Delete it on your device and wherever you created copies; there is no developer-held data to request deletion of."}
      </p>
      <ol>
        {steps.map(([title, body]) => (
          <li key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <p>
        {vi
          ? "Chính sách quyền riêng tư đầy đủ, nguyên văn theo ngôn ngữ đã chọn, ở bên dưới."
          : "The complete supplied privacy policy for your selected language follows below."}
      </p>
    </section>
  );
}
