import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Cloud,
  HardDrive,
  LockKeyhole,
  Smartphone,
} from "lucide-react";
import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { mediaFor } from "@/content/portfolio-media";
import { websiteKits } from "@/content/website-kits";
import { PortfolioProduct } from "./shared";
import { ProductGuide } from "./product-guide";
import { KitDetails } from "./kit-details";
import { MediaLibraryLink } from "./media-library";
import { HabitCapture, HabitGallery } from "./habit-capture";
import { HabitBeads } from "./habit-beads";
import { ProductStores } from "../product-stores";

export function HabitPortfolio({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  const kit = websiteKits[product.slug];
  const highlight = (scene: string) => ({
    light: kit.assets[`highlights/${scene}-${locale}.png`],
    dark: kit.assets[`highlights/${scene}-dark-${locale}.png`],
  });
  const capture = (scene: string, form: "desktop" | "mobile" = "desktop") => ({
    light: `/products/handy-habit/kit/screenshots/${form}/${form}-${locale}-${scene}.webp`,
    dark: `/products/handy-habit/kit/screenshots/${form}/${form}-dark-${locale}-${scene}.webp`,
    form,
  });
  return (
    <PortfolioProduct product={product} locale={locale} theme="habit">
      <section className="habit-hero portfolio-wrap" data-scene>
        <div className="habit-brand">
          <img src={kit.assets.icon} width={46} height={46} alt="" />
          <span>Handy Habit</span>
          <small>
            ANDROID / {vi ? "THÓI QUEN & QUY TRÌNH" : "HABITS & ROUTINES"}
          </small>
        </div>
        <div className="habit-hero-layout">
          <div className="habit-hero-copy">
            <span className="habit-eyebrow">
              {vi
                ? "MỘT NHỊP NHỎ, CHO NGÀY CỦA BẠN."
                : "A SMALL RHYTHM, FOR YOUR EVERYDAY."}
            </span>
            <h1>
              {vi ? "Việc nhỏ," : "Small things,"}
              <em>{vi ? "giữ đều." : "kept."}</em>
            </h1>
            <p className="habit-hero-line">
              {vi ? "Mỗi ngày một hạt." : "One bead a day."}
            </p>
            <p>
              {vi
                ? "Thói quen thành chuỗi hạt. Quy trình đi từng bước. Ghi nhận bằng một chạm, cả từ màn hình chính. Không tài khoản, không cần mạng."
                : "Habits as bead strings. Routines, step by step. Check in with one tap, even from your home screen. No account. Works offline."}
            </p>
            <div className="habit-actions">
              <a className="folio-button" href="#experience">
                {vi ? "Gặp nhịp ngày của bạn" : "Find your daily rhythm"}
                <ArrowDown size={18} />
              </a>
              <a className="habit-quiet-link" href="#gallery">
                {vi ? "Xem giao diện thật" : "Explore the real interface"}
                <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="product-actions habit-release">
              <Smartphone size={20} />
              <div>
                <strong>
                  Google Play · {vi ? "Sắp ra mắt" : "Coming soon"}
                </strong>
                <span>
                  {vi
                    ? "Android · Đang thử nghiệm kín · 1.0.0 (5)"
                    : "Android · Closed testing · 1.0.0 (5)"}
                </span>
              </div>
              <ProductStores product={product} locale={locale} />
            </div>
            <HabitBeads locale={locale} />
          </div>
          <div className="habit-hero-art">
            <div className="habit-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <HabitCapture
              {...highlight("01-today")}
              alt={
                vi
                  ? "Handy Habit — Hôm nay với chuỗi hạt và tâm trạng"
                  : "Handy Habit — Today with bead strings and optional mood"
              }
              eager
            />
            <span className="habit-art-note">
              {vi
                ? "Ảnh từ giao diện thật · Dữ liệu minh họa"
                : "Real interface · Demonstration data"}
            </span>
          </div>
        </div>
      </section>
      <section
        className="habit-daily portfolio-wrap"
        id="experience"
        data-scene
      >
        <div className="habit-section-heading">
          <span className="habit-chapter">
            01 / {vi ? "MỘT CHẠM MỖI NGÀY" : "ONE TAP A DAY"}
          </span>
          <h2>
            {vi ? "Một ngày mới." : "A fresh day."}
            <em>{vi ? "Một hạt để bắt đầu." : "A bead to begin."}</em>
          </h2>
          <p>
            {vi
              ? "Uống nước, đọc vài trang, bước ra ngoài. Theo dõi lần, phút hay số lượng; hạt đầy dần theo mục tiêu. Có Hoàn tác, có ngày nghỉ, và có chỗ cho ngày chưa ghi."
              : "Drink water, read a few pages, step outside. Track times, minutes or amounts; the bead fills toward your goal. There is Undo, room for days off, and room for days not recorded."}
          </p>
        </div>
        <HabitCapture
          {...capture("01-today")}
          alt={
            vi
              ? "Bố cục màn hình lớn Android của Handy Habit"
              : "Handy Habit wide-screen Android layout"
          }
        />
        <p className="habit-capture-context">
          {vi
            ? "Bố cục màn hình lớn từ giao diện Android; không phải bản Windows hay web."
            : "Wide-screen Android UI layout; not a Windows or web release."}
        </p>
      </section>
      <section className="habit-widgets" data-scene>
        <div className="habit-widgets-layout portfolio-wrap">
          <div>
            <span className="habit-chapter">
              02 /{" "}
              {vi ? "NGAY NGOÀI MÀN HÌNH CHÍNH" : "RIGHT ON YOUR HOME SCREEN"}
            </span>
            <h2>
              {vi ? "Không cần mở app." : "No need to open the app."}
              <em>{vi ? "Hạt vẫn lấp đầy." : "The bead still fills."}</em>
            </h2>
            <p>
              {vi
                ? "Chạm một hạt trên widget để ghi nhận. Loại đếm cộng một mỗi chạm; số phút, số lượng và ngày đã đủ mở app để bạn ghi đúng phần cần ghi."
                : "Tap a widget bead to check in. Counts add one per tap; minutes, amounts and completed days open the app so you can record what you need."}
            </p>
            <ul className="habit-free-widgets">
              {(vi
                ? ["Hôm nay", "Một thói quen", "Quy trình"]
                : ["Today", "One habit", "Routine"]
              ).map((name) => (
                <li key={name}>
                  <Check size={16} />
                  <span>{name}</span>
                  <small>{vi ? "Miễn phí" : "Free"}</small>
                </li>
              ))}
            </ul>
            <p className="habit-widget-note">
              {vi
                ? "Ảnh bên cạnh là bản xem trước trong app, không phải ảnh launcher. Tâm trạng và ghi chú không bao giờ hiện trên widget hoặc thông báo."
                : "The picture is an in-app preview, not a launcher capture. Mood and notes never appear in widgets or notifications."}
            </p>
          </div>
          <HabitCapture
            {...highlight("07-widgets")}
            alt={
              vi
                ? "Bản xem trước widget trong Handy Habit; Tuần này và 16 tuần thuộc Pro"
                : "In-app widget previews; This week and 16 weeks require Pro"
            }
          />
        </div>
      </section>
      <section className="habit-paths portfolio-wrap">
        <article className="habit-reduce" data-scene>
          <div>
            <span className="habit-chapter">
              03 / {vi ? "XÂY DỰNG HAY BỚT DẦN" : "BUILD IT, OR CUT IT DOWN"}
            </span>
            <h2>
              {vi ? "Thêm điều hay." : "More of the good."}
              <em>{vi ? "Bớt điều muốn bớt." : "Less of the rest."}</em>
            </h2>
            <p>
              {vi
                ? "Đặt giới hạn theo ngày hoặc tuần, hay chọn không lần nào. “Hôm nay không có” ghi rõ số 0; một ngày để trống không tự tính là đạt. Ngày mai là một khởi đầu mới."
                : "Set a daily or weekly limit, or none at all. “None today” records an explicit zero; a blank day is not counted as success. Tomorrow is a fresh start."}
            </p>
          </div>
          <HabitCapture
            {...capture("03-habit-reduce", "mobile")}
            alt={
              vi
                ? "Giảm thói quen với giới hạn theo ngày"
                : "Cutting down a habit with a daily limit"
            }
          />
        </article>
        <article className="habit-routine" data-scene>
          <div>
            <span className="habit-chapter">
              04 / {vi ? "QUY TRÌNH TỪNG BƯỚC" : "ROUTINES, STEP BY STEP"}
            </span>
            <h2>
              {vi ? "Cứ bước này," : "This step,"}
              <em>{vi ? "rồi bước tiếp theo." : "then the next."}</em>
            </h2>
            <p>
              {vi
                ? "Một vòng đếm giờ, một nút Xong, bước tiếp theo ở ngay dưới. Tạm dừng khi cần; xong bước có thể ghi nhận thói quen. Gửi quy trình cho bạn bè dưới dạng một trang — chỉ các bước đi theo."
                : "A timer ring, one Done button, and the next step just below. Pause when you need to; finishing a step can check in a habit. Share the routine as one page — only the steps travel."}
            </p>
          </div>
          <HabitCapture
            {...highlight("03-runner")}
            alt={
              vi
                ? "Màn chạy quy trình với vòng đếm giờ"
                : "The routine runner with its timer ring"
            }
          />
        </article>
      </section>
      <section className="habit-progress portfolio-wrap" data-scene>
        <div className="habit-section-heading">
          <span className="habit-chapter">
            05 / {vi ? "NHÌN LẠI MỘT CHẶNG" : "LOOK BACK A LITTLE"}
          </span>
          <h2>
            {vi ? "Không chỉ một chuỗi dài." : "More than a long streak."}
            <em>
              {vi ? "Cả năm, theo màu của bạn." : "A year, in your colours."}
            </em>
          </h2>
          <p>
            {vi
              ? "Xem tuần, tháng, năm và bản đồ nhiệt cho từng thói quen. Độ đều đặn được đếm từ những gì bạn đã ghi. Nhìn lại tuần với một bước nhỏ, rồi xuất CSV, Markdown hoặc PDF khi cần."
              : "See the week, month and year, with a heatmap for each habit. Consistency is counted from what you actually recorded. Look back on the week with one small step, then export CSV, Markdown or PDF."}
          </p>
        </div>
        <HabitCapture
          {...capture("11-progress-year")}
          alt={
            vi
              ? "Bản đồ nhiệt cả năm theo màu thói quen"
              : "Yearly heatmaps in each habit's colour"
          }
        />
        <div className="habit-progress-foot">
          <span>44 {vi ? "mẫu thói quen" : "habit templates"}</span>
          <span>11 {vi ? "mẫu quy trình" : "routine templates"}</span>
          <span>
            {vi
              ? "Sáng, tối · Tiếng Việt, English"
              : "Light, dark · English, Tiếng Việt"}
          </span>
        </div>
      </section>
      <section className="habit-data portfolio-wrap" data-scene>
        <HabitCapture
          {...highlight("08-settings")}
          alt={
            vi
              ? "Cài đặt dữ liệu, sao lưu và quyền riêng tư"
              : "Data, backup and privacy settings"
          }
        />
        <div>
          <span className="habit-chapter">
            06 / {vi ? "CỦA BẠN, TRÊN MÁY BẠN" : "YOURS, ON YOUR PHONE"}
          </span>
          <h2>
            {vi ? "Giữ thói quen." : "Keep your habits."}
            <em>{vi ? "Giữ cả quyền riêng tư." : "Keep your privacy, too."}</em>
          </h2>
          <p>
            {vi
              ? "Không tài khoản, không máy chủ riêng, không quảng cáo ở phiên bản này. Sao lưu ra tệp bạn giữ, khôi phục có xem trước, Thùng rác giữ 30 ngày."
              : "No account, no server of our own, no ads in this version. Back up to files you keep, preview before restoring, and recover from a 30-day Trash."}
          </p>
          <div className="habit-data-facts">
            <div>
              <HardDrive size={20} />
              <span>
                {vi
                  ? "Dùng ngoại tuyến; tự sao lưu giữ bảy bản trên máy."
                  : "Works offline; automatic backups keep seven local copies."}
              </span>
            </div>
            <div>
              <Cloud size={20} />
              <span>
                {vi
                  ? "Drive tùy chọn: dữ liệu đi thẳng vào Drive của bạn, không qua nhà phát triển. Không mã hóa đầu-cuối."
                  : "Optional Drive sync goes straight to your Drive, not through the developer. It is not end-to-end encrypted."}
              </span>
            </div>
            <div>
              <LockKeyhole size={20} />
              <span>
                {vi
                  ? "Tâm trạng và ghi chú không hiện trong widget hay thông báo."
                  : "Mood and notes stay out of widgets and notifications."}
              </span>
            </div>
          </div>
          <Link
            className="folio-text-link"
            href={`/${locale}/apps/handy-habit/privacy/`}
          >
            {vi ? "Đọc chính sách quyền riêng tư" : "Read the privacy policy"}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="habit-pro portfolio-wrap" data-scene>
        <div>
          <span className="kit-pro-label">HANDY HABIT PRO</span>
          <h2>
            {vi ? "Phần thêm," : "A little extra,"}
            <em>{vi ? "khi bạn muốn." : "when you want it."}</em>
          </h2>
          <p>
            {vi
              ? "Quy trình nâng cao, so sánh tiến bộ, xưởng giao diện, quy tắc và widget Tuần này / 16 tuần. Một lần trả, không thuê bao. Ghi nhận, lịch sử và dữ liệu của bạn vẫn miễn phí."
              : "Advanced routines, progress comparisons, the personalization studio, rules and This week / 16 weeks widgets. One payment, no subscription. Tracking, history and your data stay free."}
          </p>
          <a className="folio-text-link" href="#pricing">
            {vi ? "Xem quyền lợi miễn phí & Pro" : "Compare Free & Pro"}
            <ArrowDown size={17} />
          </a>
        </div>
        <HabitCapture
          {...highlight("09-pro")}
          alt={
            vi
              ? "Quyền lợi Handy Habit Pro — gói mua một lần tùy chọn"
              : "Handy Habit Pro — an optional one-time purchase"
          }
        />
        <HabitCapture
          {...capture("31-studio", "mobile")}
          alt={
            vi
              ? "Xưởng giao diện — tính năng Pro"
              : "Personalization studio — Pro feature"
          }
        />
      </section>
      <ProductGuide product={product} locale={locale} />
      <MediaLibraryLink product={product} locale={locale} />
      <HabitGallery items={mediaFor(product.slug, locale)} locale={locale} />
      <KitDetails product={product} locale={locale} />
    </PortfolioProduct>
  );
}
