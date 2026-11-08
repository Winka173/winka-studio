import type { Locale } from "@/content/studio";

export function BoardsUpdateNote({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  return (
    <aside className="boards-update-note" aria-label={vi ? "Thông tin bản xem trước" : "Preview information"}>
      <strong>{vi ? "Bản cập nhật tới" : "Next-update preview"}</strong>
      <p>{vi
        ? "Ảnh và clip được kết xuất từ giao diện Flutter thật, mới hơn Google Play 1.0.0 (3). Dòng thời gian mới, chọn nhiều nhóm và trường gợi ý của mẫu là phần xem trước cho bản cập nhật kế tiếp."
        : "Captures and films are rendered from the real Flutter UI, newer than Google Play 1.0.0 (3). The new timeline, multi-category selection and suggested template fields preview the next update."}</p>
    </aside>
  );
}
