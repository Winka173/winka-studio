import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Box,
  Compass,
  Flame,
  Layers,
  Shield,
  Video,
  BookOpen,
  Wallet,
  Calendar,
  Code,
  FileText,
  MapPin,
  Grid2X2,
  Lightbulb,
  SquareStack,
} from "lucide-react";
import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { LandingNav, ProductOutro } from "./common";
import { RevealWords } from "./motion";

type Props = { product: Product; locale: Locale };
const handySymbols = {
  boards: Layers,
  habit: Calendar,
  spend: Wallet,
  keep: Box,
  recall: BookOpen,
  tools: Compass,
  docs: FileText,
  media: Video,
  dev: Code,
  trip: MapPin,
  forms: Grid2X2,
  card: SquareStack,
  widget: Lightbulb,
};

export function HandyDevelopment({ product: p, locale }: Props) {
  const vi = locale === "vi";
  const short = p.slug.replace("handy-", "");
  const Icon = handySymbols[short as keyof typeof handySymbols] || Layers;
  const words = {
    boards: ["Make room for the plan.", "Dành chỗ cho kế hoạch."],
    habit: ["A rhythm of your own.", "Một nhịp điệu của bạn."],
    spend: ["Your money, in view.", "Nhìn rõ tiền của bạn."],
    keep: ["Keep track of the little things.", "Theo dõi những điều nhỏ."],
    recall: ["Make it stick.", "Để điều học được ở lại."],
    tools: ["A tool for the task.", "Một công cụ cho việc cần."],
    docs: ["A place for every page.", "Một nơi cho từng trang."],
    media: ["Work with what you capture.", "Tạo từ những gì bạn ghi lại."],
    dev: ["Tools for your next build.", "Công cụ cho lần xây tiếp."],
    trip: ["Bring the journey together.", "Giữ chuyến đi cùng nhau."],
    forms: ["Questions, with a place to go.", "Một nơi cho câu hỏi."],
    card: ["Give your card a character.", "Tạo cá tính cho tấm thẻ."],
    widget: ["Make the home screen yours.", "Màn hình chính, theo bạn."],
  }[short] || [p.name, p.name];
  return (
    <main id="main" className={`world-page handy-development handy-${short}`}>
      <LandingNav product={p} locale={locale} />
      <section className="handy-dev-opening wrap" data-scene>
        <div className="handy-dev-copy">
          <span className="development-tag">
            <i />
            {vi
              ? "Đang phát triển trong Handy Suite"
              : "In the Handy Suite workshop"}
          </span>
          <h1>
            <RevealWords>{p.name}</RevealWords>
          </h1>
          <p className="handy-dev-headline">{words[vi ? 1 : 0]}</p>
          <p>{p.description[locale]}</p>
          <a className="text-action" href="#experience">
            {vi ? "Về dự án này" : "About this project"}
            <ArrowDown size={18} />
          </a>
        </div>
        <div className="handy-typographic-art" aria-hidden="true">
          <span className="handy-art-word">{p.name.replace("Handy ", "")}</span>
          <div className="handy-art-symbol">
            <Icon strokeWidth={1} size={140} />
          </div>
          <span className="handy-art-edition">HANDY SUITE / IN THE MAKING</span>
          <span className="handy-art-lines">
            <i />
            <i />
            <i />
          </span>
        </div>
      </section>
      <section id="experience" className="handy-dev-note wrap">
        <div data-reveal>
          <span className="chapter-kicker">
            {vi ? "Một phần của gia đình Handy" : "Part of the Handy family"}
          </span>
          <h2>
            {vi
              ? "Đang thành hình, từng chút một."
              : "Taking shape, a little at a time."}
          </h2>
        </div>
        <div data-reveal>
          <p>
            {vi
              ? "Đây là dự án đang được phát triển. Tính năng, nền tảng và giao diện cuối có thể thay đổi; studio chưa công bố lịch phát hành hoặc link tải."
              : "This project is in development. Features, platforms and the final interface may change; the studio has not announced a release date or a public download."}
          </p>
          <Link href={`/${locale}/apps/handy-bookmark/`}>
            {vi
              ? "Khám phá Handy Bookmark đã hoàn thiện"
              : "Explore the completed Handy Bookmark"}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ProductOutro product={p} locale={locale} />
    </main>
  );
}

export function DevelopmentLanding({ product: p, locale }: Props) {
  if (p.family === "handy")
    return <HandyDevelopment product={p} locale={locale} />;
  const vi = locale === "vi";
  const development = (
    <span className="development-tag">
      <i />
      {vi
        ? "Đang phát triển · Chưa công bố ngày phát hành"
        : "In development · No release date announced"}
    </span>
  );
  if (p.slug === "autonomous-creative-studio")
    return (
      <main id="main" className="world-page acs-world">
        <LandingNav product={p} locale={locale} />
        <section className="acs-opening wrap" data-scene>
          {development}
          <h1>
            <RevealWords>
              {vi
                ? "Từ kịch bản đến khung hình."
                : "From the script to the frame."}
            </RevealWords>
          </h1>
          <div className="acs-title-row">
            <span>
              Autonomous
              <br />
              Creative Studio
            </span>
            <p>{p.description[locale]}</p>
          </div>
          <div className="acs-film-frame">
            <div className="film-perforation" />
            <img
              src="/products/autonomous-creative-studio/runtime-home.webp"
              alt={
                vi
                  ? "Ảnh mới chụp Autonomous Creative Studio đang chạy"
                  : "New capture of the running Autonomous Creative Studio"
              }
              width={1600}
              height={1000}
            />
            <div className="film-perforation" />
          </div>
        </section>
        <section id="experience" className="acs-story wrap">
          <div data-reveal>
            <span className="chapter-kicker">LOCAL CREATIVE WORKSPACE</span>
            <h2>
              {vi
                ? "Một nơi cho quy trình sáng tạo."
                : "A place for the creative process."}
            </h2>
            <p>
              {vi
                ? "Workspace cho kịch bản, quay app thật và sản xuất video bằng AI cục bộ. Dự án đang phát triển, chưa phải bộ công cụ đã phát hành đầy đủ."
                : "A workspace for scripts, real app capture and local-AI video production. The project is in development, not a fully released toolset."}
            </p>
          </div>
          <div
            className="acs-timeline"
            aria-label={
              vi
                ? "Quy trình được mô tả trong source"
                : "Workflow described in source"
            }
          >
            {["BRIEF", "SCRIPT", "CAPTURE", "EDIT", "REVIEW"].map((s, i) => (
              <span data-reveal key={s}>
                <b>0{i + 1}</b>
                {s}
              </span>
            ))}
          </div>
          <img
            data-reveal
            src="/products/autonomous-creative-studio/runtime-create.webp"
            alt="Autonomous Creative Studio create screen"
            width={1600}
            height={1000}
          />
        </section>
        <ProductOutro product={p} locale={locale} />
      </main>
    );
  if (p.slug === "forgebound")
    return (
      <main id="main" className="world-page forgebound-world">
        <LandingNav product={p} locale={locale} />
        <section className="forgebound-opening wrap" data-scene>
          {development}
          <h1>
            Forge<span>bound</span>
          </h1>
          <div className="forgebound-title-card">
            <Flame size={32} />
            <p>{p.description[locale]}</p>
          </div>
          <img
            className="forgebound-title-shot"
            src="/products/forgebound/runtime-title.webp"
            width={1920}
            height={1080}
            alt="Forgebound actual title screen capture"
          />
        </section>
        <section id="experience" className="forgebound-workshop wrap">
          <div data-reveal>
            <span className="chapter-kicker">WEAPON ENGINEERING ROGUELIKE</span>
            <h2>
              {vi
                ? "Một bàn rèn. Nhiều cách kết hợp."
                : "One forge. Many combinations."}
            </h2>
            <p>
              {vi
                ? "Lắp ráp khung, lõi, bộ biến đổi và rune trên Forge Board. Sau đó theo dõi chúng trong các trận tự động góc nhìn ngang."
                : "Assemble frames, cores, modifiers and runes on the Forge Board. Then watch the results in side-view automatic battles."}
            </p>
          </div>
          <div className="forgebound-shot-pair">
            <img
              data-reveal
              src="/products/forgebound/runtime-forge.webp"
              width={1920}
              height={1080}
              alt="Forgebound actual Forge Board capture"
            />
            <img
              data-reveal
              src="/products/forgebound/runtime-combat.webp"
              width={1920}
              height={1080}
              alt="Forgebound actual automatic battle capture"
            />
          </div>
        </section>
        <ProductOutro product={p} locale={locale} />
      </main>
    );
  if (p.slug === "runavelle")
    return (
      <main id="main" className="world-page runavelle-world">
        <LandingNav product={p} locale={locale} />
        <section className="runavelle-opening" data-scene>
          <div className="wrap">
            {development}
            <h1>Runavelle</h1>
            <p>
              {vi
                ? "Ban ngày xây vương quốc. Ban đêm bảo vệ lâu đài."
                : "Build the kingdom by day. Defend the castle by night."}
            </p>
            <a href="#experience" className="world-button">
              {vi ? "Ghé vương quốc" : "Visit the kingdom"}
              <ArrowDown size={18} />
            </a>
          </div>
          <img
            src="/products/runavelle/runtime-day.webp"
            width={1920}
            height={1080}
            alt="Runavelle actual Windows daytime capture"
          />
        </section>
        <section id="experience" className="runavelle-day-night">
          <div className="wrap">
            <div className="runavelle-day-copy" data-reveal>
              <span className="chapter-kicker">
                DAY / {vi ? "Xây dựng" : "Build"}
              </span>
              <h2>{vi ? "Một ngày để chuẩn bị." : "A day to prepare."}</h2>
              <p>{p.description[locale]}</p>
            </div>
            <div className="runavelle-night-copy" data-reveal>
              <span className="chapter-kicker">
                NIGHT / {vi ? "Phòng thủ" : "Defend"}
              </span>
              <h2>{vi ? "Một đêm để giữ vững." : "A night to hold on."}</h2>
              <img
                src="/products/runavelle/runtime-night.webp"
                width={1920}
                height={1080}
                alt="Runavelle actual Windows night capture"
              />
            </div>
          </div>
        </section>
        <ProductOutro product={p} locale={locale} />
      </main>
    );
  if (p.slug === "aetherward")
    return (
      <main id="main" className="world-page aetherward-world">
        <LandingNav product={p} locale={locale} />
        <section className="aether-opening wrap" data-scene>
          {development}
          <div className="aether-heading">
            <div className="aether-sigil" aria-hidden="true">
              <i />
              <i />
              <span>◇</span>
            </div>
            <h1>Aetherward</h1>
            <p>
              {vi
                ? "Giữ pha lê. Chọn đội hình. Phối hợp nguyên tố."
                : "Guard the crystal. Choose the formation. Combine the elements."}
            </p>
          </div>
          <div className="aether-battle-window">
            <img
              src="/products/aetherward/runtime-battle.webp"
              width={1920}
              height={1080}
              alt="Aetherward actual Windows battle capture"
            />
          </div>
        </section>
        <section id="experience" className="aether-oath wrap">
          <Shield size={50} />
          <div data-reveal>
            <span className="chapter-kicker">CRYSTAL DEFENSE ROGUELIKE</span>
            <h2>
              {vi
                ? "Chiến thuật nằm giữa các đợt đánh."
                : "The strategy lives between the waves."}
            </h2>
            <p>{p.description[locale]}</p>
            <p>
              {vi
                ? "Ảnh trên được chụp từ build Windows thực tế trong lượt kiểm tra website. Dự án vẫn đang phát triển."
                : "The image above was captured from the actual Windows build during this website pass. The project remains in development."}
            </p>
          </div>
        </section>
        <ProductOutro product={p} locale={locale} />
      </main>
    );
  return (
    <main id="main" className="world-page machine-world">
      <LandingNav product={p} locale={locale} />
      <section className="machine-opening wrap" data-scene>
        {development}
        <div className="machine-title">
          <span>MB / FIELD OPERATIONS</span>
          <h1>
            Machine
            <br />
            Brigade
          </h1>
          <p>{p.description[locale]}</p>
        </div>
        <div
          className="tactical-visual"
          aria-label={
            vi
              ? "Đồ họa giới thiệu dự án, không phải gameplay"
              : "Project identity graphic, not gameplay"
          }
          role="img"
        >
          <div className="tactical-scan" />
          <span className="tactical-cross cross-1">+</span>
          <span className="tactical-cross cross-2">+</span>
          <span className="tactical-cross cross-3">+</span>
          <span className="tactical-coordinate">
            TACTICAL SYSTEMS / PROJECT IN DEVELOPMENT
          </span>
          <span className="tactical-word">MB</span>
          <div className="tactical-route">
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>
      <section id="experience" className="machine-brief wrap">
        <span className="chapter-kicker">MISSION BRIEF / 01</span>
        <div data-reveal>
          <h2>
            {vi
              ? "Những trận đánh ngắn. Lựa chọn có trọng lượng."
              : "Short battles. Deliberate decisions."}
          </h2>
          <p>
            {vi
              ? "Game chiến thuật thời gian thực về chỉ huy phương tiện quân sự chống AI, hướng tới mobile. Chưa có ngày phát hành được công bố."
              : "A real-time tactics game about commanding military vehicles against AI, targeting mobile. No release date has been announced."}
          </p>
          <p className="capture-disclosure">
            {vi
              ? "Đồ họa nhận diện dự án. Hình ảnh gameplay sẽ được bổ sung khi sẵn sàng."
              : "Project identity artwork. Gameplay previews will be added when available."}
          </p>
        </div>
      </section>
      <ProductOutro product={p} locale={locale} />
    </main>
  );
}
