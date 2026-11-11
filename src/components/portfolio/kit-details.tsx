import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import type { Product } from "@/content/products";
import { productPath } from "@/content/products";
import type { Locale } from "@/content/studio";
import {
  websiteKits,
  kitPageTitles,
  type KitPage,
} from "@/content/website-kits";
import { KitMarkdown } from "../kit-markdown";

export function KitFAQ({
  product,
  locale,
  limit,
}: {
  product: Product;
  locale: Locale;
  limit?: number;
}) {
  const kit = websiteKits[product.slug];
  if (!kit) return null;
  return (
    <div className="kit-faq-list">
      {kit.faq[locale].slice(0, limit).map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <KitMarkdown locale={locale} product={product}>
            {item.answer}
          </KitMarkdown>
        </details>
      ))}
    </div>
  );
}
export function KitDetails({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const kit = websiteKits[product.slug];
  if (!kit) return null;
  const vi = locale === "vi";
  return (
    <>
      <section id="pricing" className="kit-pricing portfolio-wrap" data-scene>
        <div>
          <span className="folio-kicker">
            {vi ? "MIỄN PHÍ / THÊM MỘT CHÚT RIÊNG" : "FREE / MAKE IT YOURS"}
          </span>
          <h2>
            {product.slug === "arcane-brigade"
              ? vi
                ? "Cả giấc mơ. Miễn phí."
                : "The whole dream. Free."
              : vi
                ? "Dùng miễn phí. Thêm cá tính."
                : "Free to use. More room for you."}
          </h2>
          <p>
            {vi
              ? "Không quảng cáo. Gói mua thêm là tùy chọn, trả một lần. Giá được cửa hàng hiển thị trước khi mua."
              : "No ads. The extra purchase is optional and paid once. The store shows your price before purchase."}
          </p>
        </div>
        <div className="kit-price-content">
          <span className="kit-pro-label">
            {product.slug === "arcane-brigade" ? "DELUXE" : "PRO"} /{" "}
            {vi ? "KHÔNG THUÊ BAO" : "NO SUBSCRIPTION"}
          </span>
          <details className="pricing-full">
            <summary>
              {vi
                ? "Xem đầy đủ quyền lợi miễn phí & mua thêm"
                : "Compare every free and paid inclusion"}{" "}
              <span>+</span>
            </summary>
            <KitMarkdown locale={locale} product={product}>
              {kit.pricing[locale]}
            </KitMarkdown>
          </details>
        </div>
      </section>
      <section className="kit-faq portfolio-wrap" id="faq">
        <div>
          <span className="folio-kicker">
            {vi ? "TRƯỚC KHI BẮT ĐẦU" : "BEFORE YOU BEGIN"}
          </span>
          <h2>{vi ? "Có thể bạn đang hỏi." : "A few things you might ask."}</h2>
        </div>
        <div>
          <KitFAQ product={product} locale={locale} limit={4} />
          <Link
            className="folio-text-link"
            href={`/${locale}/support/${product.slug}/`}
          >
            {vi
              ? "Đọc toàn bộ câu hỏi & hướng dẫn"
              : "All questions & product support"}{" "}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="kit-resources portfolio-wrap">
        <div>
          <span className="folio-kicker">
            {vi ? "ĐỌC THÊM / GIỮ LIÊN LẠC" : "READ MORE / STAY IN TOUCH"}
          </span>
          <h2>{vi ? "Mọi chi tiết, ở đây." : "Every detail, right here."}</h2>
        </div>
        <div className="kit-resource-links">
          {(Object.keys(kitPageTitles) as KitPage[])
            .filter((k) => Boolean(kit.pages[locale][k]))
            .map((k) => (
              <Link href={`${productPath(product, locale)}${k}/`} key={k}>
                {kitPageTitles[k][locale]}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          <Link href={`${productPath(product, locale)}privacy/`}>
            {vi ? "Chính sách quyền riêng tư" : "Privacy policy"}
            <ArrowUpRight size={18} />
          </Link>
          <Link href={`${productPath(product, locale)}terms/`}>
            {vi ? "Điều khoản sử dụng" : "Terms of use"}
            <ArrowUpRight size={18} />
          </Link>
          <a href="mailto:apps.winka.studio@gmail.com">
            <Mail size={16} />
            apps.winka.studio@gmail.com
          </a>
        </div>
        <p className="kit-capture-note">
          {product.slug === "handy-habit"
            ? vi
              ? "Ảnh kết xuất từ giao diện Flutter thật với dữ liệu minh họa vào ngày cố định 2/11/2026, không phải ảnh chụp thiết bị. Ảnh màn hình lớn thể hiện bố cục Android, không phải bản Windows hay web. Ảnh widget là bản xem trước trong app, không phải ảnh launcher."
              : "Images are host renders of the real Flutter UI with demonstration data dated 2 November 2026, not device captures. Wide-screen views show an Android layout, not Windows or web. Widget images are in-app previews, not launcher captures."
            : product.slug === "handy-boards"
              ? vi
                ? "Ảnh và clip kết xuất từ giao diện Flutter thật với dữ liệu minh họa, không phải bản quay thiết bị. Một số phần xem trước thuộc bản cập nhật kế tiếp. Ảnh màn hình lớn thể hiện bố cục, không xác nhận phát hành Windows hay web."
                : "Images and clips are rendered from the real Flutter UI with demonstration data, not device recordings. Some previews show the next update. Large-screen layouts do not establish a Windows or web release."
              : product.slug === "handy-bookmark"
                ? vi
                  ? "Ảnh và clip được kết xuất từ giao diện thật của app với dữ liệu minh họa; không phải bản quay trên điện thoại. Ảnh bên trong có giấy phép Creative Commons — xem đầy đủ tác giả và giấy phép tại Nguồn ảnh."
                  : "Images and clips are rendered from the real app UI with demonstration data; they are not phone recordings. Photos inside use Creative Commons licenses — see Credits for all authors and licenses."
                : product.slug === "arcane-brigade"
                  ? vi
                    ? "Ảnh và video từ build Windows của trò chơi; có bố cục PC và bố cục điện thoại với điều khiển cảm ứng. Đây không phải xác nhận phát hành công khai trên các nền tảng."
                    : "Images and footage come from the Windows game build, in PC and touch-control phone layouts. They do not establish a public platform release."
                  : vi
                    ? "Ảnh và video được chụp/quay từ app Android thật với dữ liệu minh họa. Màn hình lớn là bố cục ngang; Sticky Wall không có bản web công khai. Clip hiện có giao diện tiếng Anh."
                    : "Images and videos are captured from the real Android app with demonstration data. Large-screen views are landscape layouts; Sticky Wall has no public web product. The supplied clips use English UI."}
        </p>
      </section>
    </>
  );
}
