import type { Product } from "@/content/products";
import type { Locale } from "@/content/studio";
import { mediaFor, mediaImage } from "@/content/portfolio-media";
import { PortfolioProduct, ProductAction, Screen, FeatureLink } from "./shared";
import { MediaGallery } from "./gallery";
import { ForgeTurntable } from "../worlds/interactions";
import { Box, ArrowDownRight } from "lucide-react";
import {ProductGuide} from './product-guide';

export function ForgePortfolio({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const vi = locale === "vi";
  const items = mediaFor(product.slug);
  return (
    <PortfolioProduct product={product} locale={locale} theme="forge">
      <section className="forge-lab-intro portfolio-wrap" data-scene>
        <div className="forge-lab-top">
          <span>
            <Box size={20} /> ASSET FORGE STUDIO
          </span>
          <span>LOCAL 3D WORKBENCH / WINDOWS</span>
        </div>
        <h1>
          {vi ? "Cho ý tưởng" : "Give an idea"}
          <br />
          <em>{vi ? "một hình hài." : "another dimension."}</em>
        </h1>
        <div className="forge-lab-description">
          <span className="forge-bracket" aria-hidden="true">
            [ 3D ]
          </span>
          <p>
            {vi
              ? "Từ ảnh tham chiếu đến tài sản 3D. Một workspace cho tạo, kiểm tra, quản lý và xuất model với công cụ AI cục bộ cùng Blender."
              : "From a reference image to a 3D asset. A workspace for generation, inspection, library management and export with local AI tools and Blender."}
          </p>
          <ProductAction product={product} locale={locale} />
        </div>
        <div className="forge-lab-wall">
          <Screen
            src={mediaImage(product.slug, "workspace_production-export_v093")!}
            alt={
              vi
                ? "Production workspace Asset Forge Studio"
                : "Asset Forge Studio production workspace"
            }
            eager
          />
          <span className="forge-hud" aria-hidden="true">
            <i />
            REFERENCE → GENERATE → INSPECT → EXPORT
          </span>
          <div className="forge-laser" aria-hidden="true" />
        </div>
      </section>
      <section
        id="experience"
        className="forge-inspection-chapter portfolio-wrap"
        data-scene
      >
        <div>
          <span className="folio-kicker">
            01 / {vi ? "KIỂM TRA TỪNG GÓC" : "EVERY ANGLE, CONSIDERED"}
          </span>
          <h2>
            {vi ? "Nhìn gần hơn." : "Get closer."}
            <em>{vi ? "Xoay góc nhìn." : "Change perspective."}</em>
          </h2>
          <p>
            {vi
              ? "Các góc chụp thật trong trình kiểm tra của Asset Forge. Chuyển mặt trước, bên và sau để xem model trong chính giao diện làm việc."
              : "Actual views from the Asset Forge inspector. Switch between front, side and back to see the model inside the workbench itself."}
          </p>
          <FeatureLink product={product} locale={locale} />
        </div>
        <ForgeTurntable locale={locale} />
      </section>
      <section className="forge-workflow portfolio-wrap">
        <div className="forge-workflow-title">
          <span className="folio-kicker">
            02 / {vi ? "TỪ ĐẦU ĐẾN CUỐI" : "FROM INPUT TO OUTPUT"}
          </span>
          <h2>
            {vi
              ? "Một quy trình. Nhiều góc nhìn."
              : "One workflow. Different perspectives."}
          </h2>
          <ArrowDownRight size={60} />
        </div>
        <div className="forge-screen-grid">
          <article>
            <Screen
              src={mediaImage(product.slug, "ui_refinement_create")!}
              alt={
                vi
                  ? "Tạo tài sản Asset Forge"
                  : "Create an asset in Asset Forge"
              }
            />
            <h3>01 / {vi ? "Tạo tài sản" : "Create"}</h3>
          </article>
          <article>
            <Screen
              src={mediaImage(product.slug, "workspace_library-export_v093")!}
              alt={vi ? "Thư viện Asset Forge" : "Asset Forge library"}
            />
            <h3>
              02 / {vi ? "Giữ công việc cùng nhau" : "Keep the work together"}
            </h3>
          </article>
        </div>
        <p className="forge-license-copy">
          {vi
            ? "Model AI và các công cụ ngoài được cấu hình riêng. Quyền sử dụng model, thành phần và đầu ra phụ thuộc giấy phép tương ứng."
            : "AI models and external tools are configured separately. Model, component and output rights depend on their respective licenses."}
        </p>
      </section>
      <ProductGuide product={product} locale={locale}/>
      <MediaGallery items={items} locale={locale} name={product.name} />
    </PortfolioProduct>
  );
}
