import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { directions, type DirectionId } from "@/content/directions";
import type { Locale } from "@/content/studio";

export function ReviewBoard() {
  return (
    <div className="review-board">
      <header className="review-header">
        <Link href="/en/" className="review-wordmark">
          winka studio<span>Design study</span>
        </Link>
        <span>UI explorations / 01</span>
      </header>
      <main id="main" className="review-main">
        <div className="review-intro">
          <div>
            <span className="review-kicker">Một studio. Bốn góc nhìn.</span>
            <h1>
              Chọn cách Winka
              <br />
              xuất hiện <span>với thế giới.</span>
            </h1>
          </div>
          <p>
            Bốn bản thiết kế có thể trải nghiệm, cùng nội dung và hình ảnh sản
            phẩm thật. Mỗi hướng có ngôn ngữ riêng về chữ, màu sắc, bố cục và
            chuyển động.
          </p>
        </div>
        <div className="review-grid">
          {directions.map((d) => (
            <article
              className={`direction-card direction-card--${d.id}`}
              key={d.id}
            >
              <Link
                href={`/vi/directions/${d.id}/`}
                className="direction-preview"
                aria-label={`Xem hướng ${d.letter}: ${d.title}`}
              >
                <div className="direction-preview-frame">
                  <img
                    src={`/review-previews/${d.id}.webp`}
                    width={1152}
                    height={720}
                    alt=""
                    loading={
                      d.id === "addy" || d.id === "taste" ? "eager" : "lazy"
                    }
                  />
                  <span className="preview-open">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
              </Link>
              <div className="direction-details">
                <span className="direction-letter">{d.letter}</span>
                <div>
                  <span className="direction-skill">{d.skill}</span>
                  <h2>{d.title}</h2>
                  <p className="direction-subtitle">{d.subtitle}</p>
                </div>
                <Link
                  href={`/vi/directions/${d.id}/`}
                  aria-label={`Mở hướng ${d.letter}`}
                  className="direction-arrow"
                >
                  <ArrowUpRight />
                </Link>
              </div>
              <p className="direction-description">{d.description}</p>
              <div className="direction-links">
                <Link href={`/vi/directions/${d.id}/`}>
                  Trải nghiệm bản VI <ArrowRight size={15} />
                </Link>
                <Link href={`/en/directions/${d.id}/`}>
                  English <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <aside className="review-note">
          <span>Để bạn dễ so sánh</span>
          <p>
            Cả bốn hướng đều có bản mobile, chuyển sáng/tối và EN/VI. Các link
            sản phẩm dẫn đến nền trang chi tiết chung. Giao diện toàn site sẽ
            được thống nhất sau khi bạn chọn hướng.
          </p>
          <Link href="/vi/apps/">
            Xem danh mục sản phẩm <ArrowUpRight size={17} />
          </Link>
        </aside>
      </main>
      <footer className="review-footer">
        <span>Winka Studio — Design review</span>
        <span>Local preview · Chưa xuất bản</span>
      </footer>
    </div>
  );
}

export function ReviewDock({
  direction,
  locale,
}: {
  direction: DirectionId;
  locale: Locale;
}) {
  const index = directions.findIndex((d) => d.id === direction);
  const current = directions[index];
  const next = directions[(index + 1) % directions.length];
  return (
    <aside
      className="review-dock"
      aria-label={
        locale === "vi" ? "Chuyển hướng thiết kế" : "Design direction switcher"
      }
    >
      <Link
        href="/review/"
        className="dock-back"
        aria-label={locale === "vi" ? "Về trang so sánh" : "Back to comparison"}
      >
        <ArrowLeft size={17} />
        <span>{locale === "vi" ? "So sánh" : "Compare"}</span>
      </Link>
      <div>
        <b>{current.letter}</b>
        <span>
          {current.title}
          <small>{current.skill}</small>
        </span>
      </div>
      <Link
        href={`/${locale}/directions/${next.id}/`}
        aria-label={
          locale === "vi"
            ? `Xem hướng ${next.letter}`
            : `View direction ${next.letter}`
        }
      >
        <span>{locale === "vi" ? "Hướng tiếp" : "Next"}</span>
        <ArrowRight size={18} />
      </Link>
    </aside>
  );
}
