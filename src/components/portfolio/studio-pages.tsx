import Link from "next/link";
import { ArrowUpRight, Asterisk, Mail } from "lucide-react";
import type { Locale } from "@/content/studio";
import { studio } from "@/content/studio";
import { bookmarkScreen, stickyScreen } from "@/content/website-kits";
import { StudioReel } from "./studio-reel";

export function WorkbenchStudio({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const steps = [
    {
      name: vi ? "Bắt đầu từ một thao tác." : "Start with one interaction.",
      body: vi
        ? "Lưu một link từ app khác. Đặt một tờ giấy lên tường. Chọn vị trí đứng trước một đợt quái. Mỗi sản phẩm ở đây có một hành động làm điểm tựa."
        : "Save a link from another app. Put a note on a wall. Find your footing before a wave. Every product here has an interaction to build around.",
      image: bookmarkScreen("13-share-sheet", locale),
      product: "HANDY BOOKMARK",
      href: `/${locale}/apps/handy-bookmark/`,
    },
    {
      name: vi
        ? "Cho nó một ngôn ngữ riêng."
        : "Give it a language of its own.",
      body: vi
        ? "Thư viện ấm, giấy có góc xoay, xưởng có lưới 3D, giấc mơ có đèn lồng. Hình ảnh và chuyển động đi theo cách dùng, không dùng một bộ áo cho mọi thứ."
        : "A warm library, paper at an angle, a 3D workbench, a dream lit by lanterns. The look and movement follow the use, giving each product its own character.",
      image: stickyScreen("02_wall_memory_trip", locale, "desktop"),
      product: "STICKY WALL",
      href: `/${locale}/apps/sticky-wall/`,
    },
    {
      name: vi ? "Mở build. Nhìn thật gần." : "Open the build. Look closely.",
      body: vi
        ? "Ảnh và video trên portfolio đến từ giao diện hoặc build của chính dự án. Sản phẩm đã hoàn thiện và dự án còn đang phát triển được ghi riêng; trạng thái phát hành được nói rõ ở từng trang."
        : "Portfolio images and films come from each project’s own interface or build. Completed work and developing projects are separated, with release status stated on each page.",
      image: "/products/asset-forge-studio/workspace.webp",
      product: "ASSET FORGE STUDIO",
      href: `/${locale}/apps/asset-forge-studio/`,
    },
  ];
  return (
    <main id="main" className="portfolio studio-story portfolio-wrap">
      <header className="studio-story-intro" data-scene>
        <span className="folio-kicker">WINKA / INSIDE THE STUDIO</span>
        <h1>
          {vi ? "Một bàn làm việc." : "One workbench."}
          <em>{vi ? "Nhiều thứ muốn làm." : "Many things to make."}</em>
        </h1>
        <p>
          {vi
            ? "Winka tạo ứng dụng cho những việc thường ngày và game cho những lúc muốn bước sang một thế giới khác. Đây là nơi giữ những sản phẩm đã thành hình, cùng những điều còn đang thử."
            : "Winka makes apps for everyday things and games for stepping into another world. This is a place for the work that has taken shape and the ideas still being tried."}
        </p>
        <StudioReel locale={locale} />
      </header>
      <div className="studio-process">
        {steps.map((step, i) => (
          <article key={step.product} data-scene>
            <div className="studio-process-number">
              0{i + 1}
              <Asterisk size={36} />
            </div>
            <div>
              <span className="folio-kicker">{step.product}</span>
              <h2>{step.name}</h2>
              <p>{step.body}</p>
              <Link className="folio-text-link" href={step.href}>
                {vi ? "Nhìn vào sản phẩm" : "See it in the product"}
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <Link
              href={step.href}
              className={`studio-process-picture process-picture-${i}`}
            >
              <img
                src={step.image}
                alt={step.product}
                width={1200}
                height={750}
                loading="lazy"
              />
            </Link>
          </article>
        ))}
      </div>
      <div className="studio-next">
        <Link href={`/${locale}/lab/`}>
          {vi ? "Có gì đang trên bàn?" : "What is on the desk?"}
          <ArrowUpRight size={30} />
        </Link>
        <Link href={`/${locale}/contact/`}>
          {vi ? "Gửi Winka một lời nhắn" : "Send Winka a note"}
          <ArrowUpRight size={30} />
        </Link>
      </div>
    </main>
  );
}

export function WorkbenchContact({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const email = studio.supportEmail!;
  const intents = vi
    ? ["Góp ý về sản phẩm", "Trao đổi về dự án", "Một lời chào"]
    : ["Product feedback", "Talk about a project", "Just saying hello"];
  return (
    <main id="main" className="portfolio studio-contact portfolio-wrap">
      <div className="contact-postmark" aria-hidden="true">
        W / STUDIO
        <br />
        CORRESPONDENCE
        <Asterisk size={70} strokeWidth={1} />
      </div>
      <header>
        <span className="folio-kicker">WINKA / SAY HELLO</span>
        <h1>
          {vi ? "Có điều gì" : "Something"}
          <em>{vi ? "muốn kể?" : "on your mind?"}</em>
        </h1>
        <p>
          {vi
            ? "Một ý tưởng, một chi tiết cần sửa, hay một điều bạn thích khi dùng sản phẩm. Gửi Winka một email — nhớ ghi tên sản phẩm nếu bạn cần hỗ trợ."
            : "An idea, a detail that needs fixing, or something you enjoyed using. Send Winka an email. Include the product name if you need help."}
        </p>
      </header>
      <a href={`mailto:${email}`} className="contact-address">
        <Mail size={26} />
        <span>{email}</span>
        <ArrowUpRight size={28} />
      </a>
      <div className="contact-intents">
        {intents.map((intent, i) => (
          <a
            key={intent}
            href={`mailto:${email}?subject=${encodeURIComponent(`Winka Studio — ${intent}`)}`}
          >
            <span>0{i + 1}</span>
            {intent}
            <ArrowUpRight size={18} />
          </a>
        ))}
      </div>
      <div className="contact-support-note">
        <p>
          {vi
            ? "Cần hướng dẫn sử dụng hoặc quản lý dữ liệu? Tài liệu và câu hỏi thường gặp nằm trong khu hỗ trợ của từng sản phẩm."
            : "Looking for instructions or data controls? Guides and common questions are in each product’s support area."}
        </p>
        <Link className="folio-text-link" href={`/${locale}/support/`}>
          {vi ? "Mở trung tâm hỗ trợ" : "Open product support"}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}
