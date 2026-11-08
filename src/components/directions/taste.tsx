import type { Locale } from "@/content/studio";
import { Action, ArrowLink } from "../shared";
import { TasteMotion } from "../taste-motion";

export function TasteHome({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  return (
    <main id="main" className="home-taste">
      <TasteMotion />
      <section className="taste-hero hero hero--split" data-enter>
        <div className="wrap">
          <div className="hero-text grid hero__grid taste-split">
            <div className="taste-hero-copy hero__text span-5">
              <h1>
                {vi ? (
                  <>
                    Ứng dụng. Game.
                    <br />
                    Từ Winka.
                  </>
                ) : (
                  <>
                    Apps. Games.
                    <br />
                    By Winka.
                  </>
                )}
              </h1>
              <p className="hero__lead">
                {vi
                  ? "Lưu bài viết với Handy Bookmark. Ghim ảnh và ghi chú trong Sticky Wall. Cả hai ứng dụng đã hoàn thiện."
                  : "Save articles with Handy Bookmark. Pin photos and notes in Sticky Wall. Both apps are complete."}
              </p>
              <div className="taste-actions btn-row">
                <Action href={`/${locale}/apps/`} className="btn btn--primary">
                  {vi ? "Khám phá ứng dụng" : "Explore apps"}
                </Action>
                <Action
                  href={`/${locale}/games/`}
                  secondary
                  className="btn btn--secondary"
                >
                  {vi ? "Xem trò chơi" : "Explore games"}
                </Action>
              </div>
            </div>
            <div className="taste-hero-visual hero__media span-6" data-visual>
              <img
                src="/products/handy-bookmark/phone.webp"
                alt={
                  vi
                    ? "Giao diện thư viện Handy Bookmark"
                    : "Handy Bookmark library interface"
                }
                width={780}
                height={1688}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="taste-products">
        <div className="wrap">
          <h2>
            {vi ? "Dành chỗ cho ý tưởng của bạn." : "Keep your ideas in view."}
          </h2>
          <div className="taste-product-pair">
            <div className="taste-detail">
              <img
                src="/products/sticky-wall/icon.webp"
                alt=""
                width={56}
                height={56}
              />
              <h3>Sticky Wall</h3>
              <p>
                {vi
                  ? "Kéo ghi chú, ghim ảnh, vẽ và nối ý tưởng trên những bảng mang dấu ấn của bạn."
                  : "Drag notes, pin photos, draw and connect ideas on boards you can make your own."}
              </p>
              <ArrowLink href={`/${locale}/apps/sticky-wall/`}>
                {vi ? "Khám phá Sticky Wall" : "Explore Sticky Wall"}
              </ArrowLink>
            </div>
            <div className="taste-product-visual">
              <div className="taste-wall-preview">
                <img
                  src="/products/sticky-wall/wall.webp"
                  alt={
                    vi
                      ? "Bảng ghi chú trong Sticky Wall"
                      : "Notes on a Sticky Wall board"
                  }
                  width={924}
                  height={1800}
                  loading="lazy"
                />
                <img
                  src="/products/sticky-wall/editor.webp"
                  alt={
                    vi
                      ? "Trình sửa ghi chú Sticky Wall"
                      : "Sticky Wall note editor"
                  }
                  width={924}
                  height={1800}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="taste-forge">
        <div className="wrap">
          <h2>
            {vi
              ? "Tạo tài sản 3D trên máy của bạn."
              : "Make 3D assets on your machine."}
          </h2>
          <div className="taste-forge-layout">
            <div>
              <h3>Asset Forge Studio</h3>
              <p>
                {vi
                  ? "Một xưởng làm việc Windows cho tạo, kiểm tra và xuất model 3D. Dùng công cụ AI cục bộ và quy trình Blender."
                  : "A Windows workbench for generating, inspecting and exporting 3D models with local AI tools and a Blender pipeline."}
              </p>
              <ArrowLink href={`/${locale}/apps/asset-forge-studio/`}>
                {vi ? "Xem Asset Forge Studio" : "Explore Asset Forge Studio"}
              </ArrowLink>
            </div>
            <img
              src="/products/asset-forge-studio/workspace.webp"
              alt={
                vi
                  ? "Không gian Production trong Asset Forge Studio"
                  : "Asset Forge Studio Production workspace"
              }
              width={1800}
              height={1225}
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section className="taste-statement" data-moment="letters-assemble">
        <div className="wrap">
          <h2>{vi ? "Ứng dụng. Game. Winka." : "Apps. Games. Winka."}</h2>
          <p>
            {vi
              ? "Công cụ cho ngày thường, những thế giới để khám phá."
              : "Tools for everyday tasks, and worlds to explore."}
          </p>
          <Action href={`/${locale}/apps/`} className="btn btn--primary">
            {vi ? "Khám phá ứng dụng" : "Explore apps"}
          </Action>
        </div>
      </section>
    </main>
  );
}
