import Link from "next/link";
import { WorkbenchStudio, WorkbenchContact } from "./portfolio/studio-pages";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  FileText,
  HelpCircle,
  Mail,
  Shield,
  Trash2,
} from "lucide-react";
import { products, productPath, type Product } from "@/content/products";
import { legalSections, legalTitles, type LegalKind } from "@/content/legal";
import { websiteKits } from "@/content/website-kits";
import { KitLegal } from "./kit-pages";
import { KitFAQ } from "./portfolio/kit-details";
import type { Locale } from "@/content/studio";
import {
  ArrowLink,
  ProductCard,
  ProductGlyph,
  SectionNumber,
  Status,
} from "./shared";
import { Catalog } from "./catalog";
import { BoardsUpdateNote } from "./boards-update-note";

export function CatalogPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "app" | "game";
}) {
  const vi = locale === "vi";
  return (
    <main id="main" className="inner-main wrap">
      <div className="page-intro">
        <SectionNumber>
          Winka Studio /{" "}
          {kind === "app"
            ? vi
              ? "Ứng dụng"
              : "Apps"
            : vi
              ? "Trò chơi"
              : "Games"}
        </SectionNumber>
        <h1>
          {kind === "app"
            ? vi
              ? "Một chút hữu ích mỗi ngày."
              : "A little more useful, every day."
            : vi
              ? "Những thế giới của Winka."
              : "The worlds we are making."}
        </h1>
        <p>
          {kind === "app"
            ? vi
              ? "Lưu link, ghim ghi chú và sắp xếp kế hoạch. Khám phá Handy Bookmark, Sticky Wall và Handy Boards."
              : "Save links, pin notes and organize plans. Explore Handy Bookmark, Sticky Wall and Handy Boards."
            : vi
              ? "Những thử nghiệm về chiến thuật, tổ đội và thủ thành. Chưa có link tải công khai được xác nhận."
              : "Experiments in tactics, squads and kingdom defense. Public download links have not been confirmed."}
        </p>
      </div>
      <Catalog
        products={products.filter(
          (p) => p.kind === kind && p.status !== "hidden",
        )}
        locale={locale}
        kind={kind}
      />
    </main>
  );
}

export function ProductPage({
  product: p,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  const related = products
    .filter(
      (x) => x.kind === p.kind && x.slug !== p.slug && x.status !== "hidden",
    )
    .slice(0, 3);
  const stores = p.storeLinks.filter((s) => s.verified);
  return (
    <main id="main" className={`product-detail detail-${p.slug}`}>
      <div className="wrap">
        <Link
          className="back-link"
          href={`/${locale}/${p.kind === "game" ? "games" : "apps"}/`}
        >
          <ArrowLeft size={15} />
          {p.kind === "game"
            ? vi
              ? "Tất cả trò chơi"
              : "All games"
            : vi
              ? "Tất cả ứng dụng"
              : "All apps"}
        </Link>
        <section
          className={`detail-hero ${p.image ? "" : "detail-hero-no-image"}`}
        >
          <div className="detail-hero-copy">
            <div className="detail-eyebrow">
              <ProductGlyph product={p} size={48} />
              <Status product={p} locale={locale} />
            </div>
            <p className="detail-category">{p.category[locale]}</p>
            <h1>{p.name}</h1>
            <p className="detail-description">{p.description[locale]}</p>
            {p.platforms.length > 0 && (
              <p className="platform-line">
                {vi
                  ? "Bản được ghi nhận trong source"
                  : "Build documented in source"}
                <span>{p.platforms.join(" / ")}</span>
              </p>
            )}
            <div className="detail-actions">
              {stores.length > 0 ? (
                stores.map((s) => (
                  <a
                    className="button button-primary"
                    href={s.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    key={s.url}
                  >
                    {s.label}
                    <ArrowUpRight size={18} />
                  </a>
                ))
              ) : (
                <div className="release-note">
                  <span className="release-marker" />
                  <p>
                    {p.completion === "complete"
                      ? vi
                        ? "Đã hoàn thiện. Thông tin phát hành và link tải sẽ được cập nhật khi xác nhận."
                        : "Completed. Release details and download links will be added when confirmed."
                      : vi
                        ? "Đang phát triển. Chưa có lịch phát hành được công bố."
                        : "In development. No release date has been announced."}
                  </p>
                </div>
              )}
            </div>
            <ArrowLink href={`/${locale}/support/${p.slug}/`}>
              {vi ? "Hỗ trợ sản phẩm" : "Product support"}
            </ArrowLink>
          </div>
          {p.image && (
            <div className={`detail-hero-media media-${p.mediaKind}`}>
              <img
                src={p.image}
                alt={`${p.name} — ${p.mediaKind === "composite" ? (vi ? "ảnh dựng từ mô phỏng, không phải screenshot Unity" : "simulation composite, not a Unity screenshot") : vi ? "ảnh chụp sản phẩm thật" : "actual product screenshot"}`}
                width={1800}
                height={1125}
                fetchPriority="high"
              />
              {p.mediaKind === "composite" && (
                <p className="media-disclosure">
                  {vi
                    ? "Ảnh dựng từ mô phỏng, không phải ảnh chụp Unity."
                    : "Simulation composite, not a Unity screenshot."}
                </p>
              )}
            </div>
          )}
        </section>
        {p.features.length > 0 && (
          <section className="detail-features">
            <div>
              <SectionNumber>
                {vi ? "Cách sản phẩm hoạt động" : "What it does"}
              </SectionNumber>
              <h2>
                {vi ? "Có chỗ cho việc bạn cần." : "A place for what you do."}
              </h2>
            </div>
            <ul>
              {p.features.map((f) => (
                <li key={f.en}>
                  <Check size={18} />
                  {f[locale]}
                </li>
              ))}
            </ul>
          </section>
        )}
        {p.gallery.length > 0 && (
          <section className="detail-gallery-section">
            <div className="section-heading">
              <div>
                <SectionNumber>
                  {vi ? "Góc nhìn cận cảnh" : "A closer look"}
                </SectionNumber>
                <h2>{vi ? "Bên trong sản phẩm." : "Inside the product."}</h2>
              </div>
            </div>
            <div
              className={`detail-gallery ${p.slug === "asset-forge-studio" ? "gallery-wide" : ""}`}
            >
              {p.gallery.map((image, i) => (
                <a
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={image}
                  aria-label={`${vi ? "Mở ảnh giao diện" : "Open interface image"} ${i + 1}`}
                >
                  <img
                    src={image}
                    alt={`${p.name} — ${vi ? "giao diện" : "interface"} ${i + 1}`}
                    width={780}
                    height={1688}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </section>
        )}
        <section className="product-resources">
          <div>
            <h2>{vi ? "Thông tin bạn cần." : "Information you can find."}</h2>
            <p>
              {vi
                ? "Hướng dẫn sản phẩm và các tài liệu quyền riêng tư tại một nơi."
                : "Product help and privacy documents, together in one place."}
            </p>
          </div>
          <div>
            {(["privacy", "terms", "data-deletion"] as LegalKind[]).map(
              (kind, i) => {
                const Icon = [Shield, FileText, Trash2][i];
                return (
                  <Link href={`${productPath(p, locale)}${kind}/`} key={kind}>
                    <Icon size={18} />
                    <span>{legalTitles[kind][locale]}</span>
                    <ArrowUpRight size={18} />
                  </Link>
                );
              },
            )}
            <Link href={`/${locale}/support/${p.slug}/`}>
              <HelpCircle size={18} />
              <span>{vi ? "Trợ giúp & câu hỏi" : "Help & questions"}</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <section className="related-products">
          <div className="section-heading">
            <div>
              <SectionNumber>
                {vi ? "Khám phá tiếp" : "Keep exploring"}
              </SectionNumber>
              <h2>{vi ? "Cũng từ Winka." : "Also from Winka."}</h2>
            </div>
          </div>
          <div className="related-grid">
            {related.map((x) => (
              <ProductCard product={x} locale={locale} key={x.slug} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function LegalIndex({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  return (
    <main id="main" className="inner-main wrap">
      <div className="page-intro">
        <SectionNumber>Winka Studio / {vi ? "Pháp lý" : "Legal"}</SectionNumber>
        <h1>
          {vi
            ? "Thông tin rõ ràng, theo từng sản phẩm."
            : "Clear information, product by product."}
        </h1>
        <p>
          {vi
            ? "Chính sách quyền riêng tư, điều khoản và hướng dẫn xóa dữ liệu theo từng sản phẩm. Handy Bookmark, Handy Boards, Sticky Wall và Arcane Brigade dùng toàn văn do chủ sản phẩm cung cấp; các bản dự thảo khác được đánh dấu riêng."
            : "Product-specific privacy, terms and data choices. Handy Bookmark, Handy Boards, Sticky Wall and Arcane Brigade use the full documents supplied by the owner; other drafts are identified individually."}
        </p>
      </div>
      <div className="legal-directory">
        {products
          .filter((p) => p.status !== "hidden")
          .map((p) => (
            <div className="legal-directory-row" key={p.slug}>
              <div>
                <h2>{p.name}</h2>
                <Status product={p} locale={locale} />
              </div>
              <nav aria-label={`${p.name} ${vi ? "tài liệu" : "documents"}`}>
                {(["privacy", "terms", "data-deletion"] as LegalKind[]).map(
                  (k) => (
                    <Link href={`${productPath(p, locale)}${k}/`} key={k}>
                      {legalTitles[k][locale]}
                      <ArrowUpRight size={14} />
                    </Link>
                  ),
                )}
              </nav>
            </div>
          ))}
      </div>
    </main>
  );
}

export function LegalPage({
  product,
  locale,
  kind,
}: {
  product: Product;
  locale: Locale;
  kind: LegalKind;
}) {
  const vi = locale === "vi";
  const sections = legalSections(product, kind);
  if (websiteKits[product.slug])
    return <KitLegal product={product} locale={locale} kind={kind} />;
  return (
    <main id="main" className="legal-main wrap">
      <Link className="back-link" href={productPath(product, locale)}>
        <ArrowLeft size={15} />
        {product.name}
      </Link>
      <div className="legal-layout">
        <aside className="legal-sidebar">
          <span>{vi ? "Tài liệu sản phẩm" : "Product documents"}</span>
          {(["privacy", "terms", "data-deletion"] as LegalKind[]).map((k) => (
            <Link
              aria-current={kind === k ? "page" : undefined}
              href={`${productPath(product, locale)}${k}/`}
              key={k}
            >
              {legalTitles[k][locale]}
            </Link>
          ))}
          <Link href={`/${locale}/support/${product.slug}/`}>
            {vi ? "Hỗ trợ" : "Support"}
            <ArrowUpRight size={14} />
          </Link>
        </aside>
        <article className="legal-document">
          <SectionNumber>
            {product.name} / {locale.toUpperCase()}
          </SectionNumber>
          <h1>{legalTitles[kind][locale]}</h1>
          <div className="legal-draft">
            <Shield size={20} />
            <div>
              <strong>
                {vi
                  ? "Bản xem trước · Chưa có hiệu lực"
                  : "Document preview · Not effective"}
              </strong>
              <p>
                {vi
                  ? "Nội dung dựa trên source được kiểm tra. Chủ sản phẩm cần duyệt toàn bộ văn bản trước khi công bố chính sách chính thức."
                  : "Content is based on inspected source. The product owner must approve the full text before it becomes an official policy."}
              </p>
            </div>
          </div>
          <p className="legal-date">
            {vi
              ? "Chưa đặt ngày có hiệu lực hoặc phiên bản chính sách chính thức."
              : "No effective date or official policy version has been set."}
          </p>
          {sections.map((s, i) => (
            <section id={`section-${i + 1}`} key={s.heading.en}>
              <h2>{s.heading[locale]}</h2>
              <p>{s.body[locale]}</p>
            </section>
          ))}
          <section>
            <h2>{vi ? "Liên hệ & hỗ trợ" : "Contact & support"}</h2>
            <p>
              {product.slug === "arcane-brigade" ? (
                <>
                  {vi
                    ? "Địa chỉ hỗ trợ được ghi trong chính sách của repo: "
                    : "Support address recorded in the repository policy: "}
                  <a href="mailto:apps.winka.studio@gmail.com">
                    apps.winka.studio@gmail.com
                  </a>
                  .
                </>
              ) : vi ? (
                "Hướng dẫn và câu hỏi về sản phẩm có tại trang hỗ trợ. Kênh liên hệ chính thức của sản phẩm sẽ được cấu hình khi xác nhận."
              ) : (
                "Product guidance and questions are available on the support page. An official contact channel will be configured when confirmed."
              )}
            </p>
            <ArrowLink href={`/${locale}/support/${product.slug}/`}>
              {vi ? "Đến trang hỗ trợ" : "Open product support"}
            </ArrowLink>
          </section>
        </article>
      </div>
    </main>
  );
}

const generalFAQs = (p: Product, vi: boolean) => [
  [
    vi ? "Tôi tải sản phẩm ở đâu?" : "Where can I download it?",
    p.completion === "complete"
      ? vi
        ? "Sản phẩm đã hoàn thiện theo xác nhận của chủ studio. Link tải công khai sẽ xuất hiện trên trang sản phẩm sau khi được xác minh."
        : "The studio owner has confirmed completion. A public download will appear on the product page once its link is verified."
      : vi
        ? "Sản phẩm đang phát triển. Chưa có link tải hoặc lịch phát hành công khai."
        : "The product is in development. No public download or release date is available.",
  ],
  [
    vi
      ? "Tôi xem thông tin quyền riêng tư ở đâu?"
      : "Where can I read about privacy?",
    vi
      ? "Trang sản phẩm có link riêng đến chính sách quyền riêng tư, điều khoản và xóa dữ liệu. Các tài liệu hiện là bản xem trước, chưa có hiệu lực."
      : "Each product has dedicated privacy, terms and data-deletion pages. The documents are currently previews and are not effective policies.",
  ],
  ...(p.slug === "handy-bookmark"
    ? [
        [
          vi ? "Đồng bộ Drive có tự bật không?" : "Is Drive sync automatic?",
          vi
            ? "Drive là tính năng tùy chọn và cần kết nối Google. Tắt đồng bộ khác với xóa bản sao đã có trên Drive."
            : "Drive is optional and requires connecting Google. Turning sync off is different from deleting an existing Drive copy.",
        ],
      ]
    : []),
  ...(p.slug === "sticky-wall"
    ? [
        [
          vi
            ? "Khóa bảng có mã hóa ghi chú không?"
            : "Does locking a board encrypt its notes?",
          vi
            ? "Không. Khóa bảng dùng xác thực thiết bị để ẩn nội dung trong app; source và chính sách phân biệt rõ với mã hóa."
            : "No. Board locks use device authentication to hide content inside the app; the source and policy distinguish this from encryption.",
        ],
      ]
    : []),
  ...(p.slug === "asset-forge-studio"
    ? [
        [
          vi
            ? "Tôi cần chuẩn bị công cụ gì?"
            : "Which external tools are needed?",
          vi
            ? "Tài liệu source yêu cầu môi trường AI, trọng số model và Blender bên ngoài. Không nên xem gói desktop là đã bao gồm mọi công cụ hay quyền sử dụng thương mại."
            : "Source documentation lists external AI environments, model weights and Blender. The desktop package should not be assumed to include every tool or commercial license.",
        ],
      ]
    : []),
];

export function SupportPage({
  product,
  locale,
}: {
  product?: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  return (
    <main id="main" className="inner-main wrap">
      <div className="page-intro">
        <SectionNumber>
          Winka Studio / {vi ? "Hỗ trợ" : "Support"}
        </SectionNumber>
        <h1>
          {product
            ? product.name
            : vi
              ? "Tìm điều bạn cần."
              : "Find what you need."}
        </h1>
        <p>
          {product
            ? vi
              ? "Hướng dẫn, câu hỏi và các lựa chọn dữ liệu cho sản phẩm của bạn."
              : "Guidance, questions and data choices for your product."
            : vi
              ? "Chọn ứng dụng hoặc trò chơi để xem hướng dẫn và thông tin riêng."
              : "Choose an app or game for its own help and information."}
        </p>
      </div>
      {product ? (
        <>
          {product.slug === "handy-boards" && <BoardsUpdateNote locale={locale} />}
          {websiteKits[product.slug] ? (
            <KitFAQ product={product} locale={locale} />
          ) : (
            <div className="support-faq">
              {generalFAQs(product, vi).map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          )}
          <div className="support-resource-links">
            {(["privacy", "terms", "data-deletion"] as LegalKind[]).map((k) => (
              <ArrowLink href={`${productPath(product, locale)}${k}/`} key={k}>
                {legalTitles[k][locale]}
              </ArrowLink>
            ))}
          </div>
          {websiteKits[product.slug] && (
            <a
              className="support-email"
              href="mailto:apps.winka.studio@gmail.com"
            >
              <Mail size={24} />
              <div>
                <h2>
                  {vi ? `Hỗ trợ ${product.name}` : `${product.name} support`}
                </h2>
                <p>apps.winka.studio@gmail.com</p>
              </div>
              <ArrowUpRight />
            </a>
          )}
          <ArrowLink href={productPath(product, locale)}>
            {vi ? "Về trang sản phẩm" : "Back to the product"}
          </ArrowLink>
        </>
      ) : (
        <div className="support-directory">
          {products
            .filter((p) => p.status !== "hidden")
            .map((p) => (
              <Link href={`/${locale}/support/${p.slug}/`} key={p.slug}>
                <ProductGlyph product={p} size={28} />
                <span>
                  {p.name}
                  <small>{p.category[locale]}</small>
                </span>
                <ArrowUpRight size={20} />
              </Link>
            ))}
        </div>
      )}
    </main>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  return <WorkbenchStudio locale={locale} />;
}
export function ContactPage({ locale }: { locale: Locale }) {
  return <WorkbenchContact locale={locale} />;
}
