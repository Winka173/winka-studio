import { text, type Translation } from "./studio";
import { mediaFor } from "./portfolio-media";

export type ProductStatus =
  "released" | "beta" | "in-development" | "coming-soon" | "hidden";
export type Product = {
  slug: string;
  name: string;
  kind: "app" | "game";
  family: "handy" | "sticky" | "creative" | "games";
  description: Translation;
  category: Translation;
  status: ProductStatus;
  completion: "complete" | "in-progress";
  accent: string;
  platforms: string[];
  features: Translation[];
  image: string | null;
  icon: string | null;
  mediaKind: "screenshot" | "composite" | "artwork" | null;
  gallery: string[];
  storeLinks: { label: string; url: string; verified: boolean }[];
  source: string;
  legalReviewed: boolean;
  featured: boolean;
};

function product(
  p: Pick<Product, "slug" | "name" | "description" | "category" | "source"> &
    Partial<Product>,
): Product {
  const captures = mediaFor(p.slug);
  const hero =
    captures.find(
      (item) => item.device === "desktop" || item.device === "gameplay",
    ) || captures[0];
  return {
    kind: "app",
    family: "handy",
    status: "in-development",
    completion: "in-progress",
    accent: "#46685a",
    platforms: [],
    features: [],
    image: hero?.src || null,
    icon: null,
    gallery: captures.map((item) => item.src),
    storeLinks: [],
    mediaKind: null,
    legalReviewed: false,
    featured: false,
    ...p,
  };
}

// Completion is confirmed by the owner on 2026-11-07. Completion is separate
// from a verified public/store release. No store URL has been confirmed.
export const products: Product[] = [
  product({
    slug: "handy-bookmark",
    name: "Handy Bookmark",
    family: "handy",
    status: "coming-soon",
    completion: "complete",
    featured: true,
    category: text("Reading & organization", "Đọc & sắp xếp"),
    description: text(
      "Save from any app, picture included. Organize links, reels, videos and photos in your own library, then find and revisit them. Free, with optional one-time Pro.",
      "Lưu từ mọi app, kèm hình. Xếp link, reel, video và ảnh vào thư viện riêng, rồi tìm và xem lại. Miễn phí, Pro tùy chọn mua một lần.",
    ),
    accent: "#0e7490",
    platforms: ["Android"],
    image: "/products/handy-bookmark/kit/screenshots/desktop/desktop-en-02-home-item-open.webp",
    icon: "/products/handy-bookmark/kit/brand/icon/icon-rounded-1024.webp",
    mediaKind: "screenshot",
    gallery: [
      "/products/handy-bookmark/phone.webp",
      "/products/handy-bookmark/collection.webp",
      "/products/handy-bookmark/focus.webp",
    ],
    features: [
      text(
        "Organize links in collections and tags",
        "Sắp xếp link bằng bộ sưu tập và thẻ",
      ),
      text(
        "Save articles for offline reading",
        "Lưu bài viết để đọc ngoại tuyến",
      ),
      text(
        "Focus reading and local backups",
        "Đọc tập trung và sao lưu cục bộ",
      ),
      text(
        "Share-to-save, automatic backups and app lock",
        "Chia sẻ để lưu, tự sao lưu và khóa ứng dụng",
      ),
    ],
    source:
      "Owner-supplied Handy-Website-Kit/handy-bookmark: copy/*/features.md, platforms-and-links.md, FAQ, legal and media. Android closed testing; Drive sync is not shipped in the store build.",
  }),
  product({
    slug: "sticky-wall",
    name: "Sticky Wall",
    family: "sticky",
    status: "coming-soon",
    completion: "complete",
    featured: true,
    category: text("Notes & memory boards", "Ghi chú & bảng kỷ niệm"),
    description: text(
      "A wall for the things on your mind. Pin notes, photos and drawings, then make the board your own.",
      "Một bức tường cho những điều bạn muốn giữ. Ghim ghi chú, ảnh và hình vẽ, rồi tạo góc riêng của bạn.",
    ),
    accent: "#a5572e",
    platforms: ["Android"],
    image: "/products/sticky-wall/kit/screenshots/phone/en/01_wall_home.webp",
    icon: "/products/sticky-wall/kit/brand/logo/app-icon-1024.webp",
    mediaKind: "screenshot",
    gallery: [
      "/products/sticky-wall/editor.webp",
      "/products/sticky-wall/night.webp",
      "/products/sticky-wall/grid.webp",
    ],
    features: [
      text("Move, rotate and connect notes", "Di chuyển, xoay và nối ghi chú"),
      text(
        "Pin photos, drawings and voice notes",
        "Ghim ảnh, hình vẽ và ghi âm",
      ),
      text(
        "Personalize boards, papers and themes",
        "Tùy chỉnh bảng, giấy và giao diện",
      ),
      text(
        "Local backups and optional Drive sync",
        "Sao lưu cục bộ và đồng bộ Drive tùy chọn",
      ),
    ],
    source:
      "Sticky-Wall: README.md, PRIVACY.md (2026-11-06), pubspec.yaml, lib, android/app/src/main/AndroidManifest.xml",
  }),
  product({
    slug: "asset-forge-studio",
    name: "Asset Forge Studio",
    family: "creative",
    status: "coming-soon",
    completion: "complete",
    featured: true,
    category: text("Local 3D workbench", "Xưởng 3D cục bộ"),
    description: text(
      "From a reference image to a 3D asset. Generate, inspect and export with a workbench built around local tools.",
      "Từ ảnh tham chiếu đến tài sản 3D. Tạo, kiểm tra và xuất model trong một xưởng làm việc với công cụ cục bộ.",
    ),
    accent: "#c59955",
    platforms: ["Windows"],
    image: "/products/asset-forge-studio/workspace.webp",
    mediaKind: "screenshot",
    gallery: ["/products/asset-forge-studio/create.webp"],
    features: [
      text(
        "Prompt or reference to generation",
        "Tạo từ mô tả hoặc ảnh tham chiếu",
      ),
      text(
        "Inspect geometry and material diagnostics",
        "Kiểm tra hình học và vật liệu",
      ),
      text(
        "Manage asset versions in a local library",
        "Quản lý phiên bản trong thư viện cục bộ",
      ),
      text(
        "Export assets through a Blender pipeline",
        "Xuất tài sản qua quy trình Blender",
      ),
    ],
    source:
      "Asset-Forge-Studio: README.md, docs/PRODUCTION_WORKSPACE.md, docs/ASSET_MANAGEMENT_WORKFLOW.md. External model weights and licenses require separate review.",
  }),
  product({
    slug: "arcane-brigade",
    name: "Arcane Brigade",
    kind: "game",
    family: "games",
    status: "coming-soon",
    completion: "complete",
    featured: true,
    category: text("Storybook auto-battler", "Auto-battler truyện tranh"),
    description: text(
      "Lead odd little friends through twenty storybook nights. You move; your hero and companions attack automatically. Free, no ads, optional Deluxe.",
      "Dẫn đội bạn nhỏ qua hai mươi đêm truyện tranh. Bạn di chuyển; anh hùng và đồng đội tự đánh. Miễn phí, không quảng cáo, Deluxe tùy chọn.",
    ),
    accent: "#f0c060",
    platforms: ["Android", "iOS", "PC (Steam)"],
    image: "/products/arcane-brigade/kit/02_Screenshots/pc/hero-comet-runner-skill-a.webp",
    mediaKind: "screenshot",
    features: [
      text(
        "Move your champion while allies attack",
        "Di chuyển tướng trong khi đồng minh tự đánh",
      ),
      text(
        "Recruit allies and combine weapons",
        "Chiêu mộ đồng minh và kết hợp vũ khí",
      ),
      text("Shop between combat halls", "Ghé quầy hàng giữa các đấu trường"),
      text(
        "English and Vietnamese interface",
        "Giao diện tiếng Anh và tiếng Việt",
      ),
    ],
    source:
      "Arcane-Brigade: README.md; PreviewExports/LocalizationUIFix/07-combat-vi.png. Owner says complete; source still lists production/device acceptance gates. No published release verified.",
  }),
  ...[
    [
      "boards",
      "Boards",
      "Tasks & planning",
      "Công việc & kế hoạch",
      "Category-first tasks, Kanban and planning.",
      "Quản lý công việc theo danh mục, Kanban và kế hoạch.",
    ],
    [
      "habit",
      "Habit",
      "Habits & routines",
      "Thói quen & quy trình",
      "A place to track habits and build routines.",
      "Theo dõi thói quen và xây dựng quy trình hằng ngày.",
    ],
    [
      "spend",
      "Spend",
      "Personal finance",
      "Tài chính cá nhân",
      "Track spending, budgets and financial plans.",
      "Theo dõi thu chi, ngân sách và kế hoạch tài chính.",
    ],
    [
      "keep",
      "Keep",
      "Everyday inventory",
      "Quản lý đồ dùng",
      "Keep track of belongings, receipts and loans.",
      "Theo dõi đồ dùng, hóa đơn và đồ cho mượn.",
    ],
    [
      "recall",
      "Recall",
      "Learning & revision",
      "Học & ôn tập",
      "Flashcards and spaced repetition for study.",
      "Thẻ ghi nhớ và ôn tập ngắt quãng.",
    ],
    [
      "tools",
      "Tools",
      "Everyday utilities",
      "Tiện ích hằng ngày",
      "Calculators, converters, passwords and QR tools.",
      "Máy tính, chuyển đổi đơn vị, mật khẩu và mã QR.",
    ],
    [
      "docs",
      "Docs",
      "Documents & reading",
      "Tài liệu & đọc",
      "Markdown, scanning, PDFs and reading tools.",
      "Markdown, quét tài liệu, PDF và công cụ đọc.",
    ],
    [
      "media",
      "Media",
      "Creative utilities",
      "Tiện ích sáng tạo",
      "Tools for capturing, annotating and working with media.",
      "Công cụ chụp, chú thích và xử lý nội dung đa phương tiện.",
    ],
    [
      "dev",
      "Dev",
      "Developer tools",
      "Công cụ lập trình",
      "Data tools and an HTTPS API client.",
      "Công cụ dữ liệu và trình gửi yêu cầu HTTPS API.",
    ],
    [
      "trip",
      "Trip",
      "Travel & journals",
      "Du lịch & nhật ký",
      "Offline itineraries, places and travel journals.",
      "Lịch trình, địa điểm và nhật ký du lịch ngoại tuyến.",
    ],
    [
      "forms",
      "Forms",
      "Offline forms",
      "Biểu mẫu ngoại tuyến",
      "Build forms and collect responses offline.",
      "Thiết kế biểu mẫu và thu thập dữ liệu ngoại tuyến.",
    ],
    [
      "card",
      "Card",
      "Card design",
      "Thiết kế thẻ",
      "Design cards, manage projects and export your work.",
      "Thiết kế thẻ, quản lý dự án và xuất sản phẩm.",
    ],
    [
      "widget",
      "Widget",
      "Home-screen widgets",
      "Widget màn hình chính",
      "Themes and a studio for home-screen widgets.",
      "Giao diện và xưởng thiết kế widget màn hình chính.",
    ],
  ].map(([slug, name, en, vi, descriptionEn, descriptionVi]) =>
    product({
      slug: `handy-${slug}`,
      name: `Handy ${name}`,
      category: text(en, vi),
      description: text(descriptionEn, descriptionVi),
      source: `Handy-Suite/README.md; apps/handy_${slug}. Owner confirms in development.`,
    }),
  ),
  product({
    slug: "autonomous-creative-studio",
    name: "Autonomous Creative Studio",
    family: "creative",
    category: text("Local creative workspace", "Không gian sáng tạo cục bộ"),
    description: text(
      "A creative and marketing workspace for scripts, app captures and video production using local AI.",
      "Không gian sáng tạo và marketing cho kịch bản, quay ứng dụng và sản xuất video bằng AI cục bộ.",
    ),
    source:
      "mmo/README.md; docs/LOCAL_REPO_ADS.md. mmo is a folder name, not an MMO game.",
  }),
  product({
    slug: "aetherward",
    name: "Aetherward",
    kind: "game",
    family: "games",
    category: text("Crystal defense roguelike", "Roguelike thủ thành pha lê"),
    description: text(
      "Defend a crystal with a team of heroes. Plan formations and elemental combinations between automatic battles.",
      "Bảo vệ pha lê cùng đội anh hùng. Sắp xếp đội hình và phối hợp nguyên tố giữa các trận tự động.",
    ),
    image: "/products/aetherward/runtime-battle.webp",
    mediaKind: "screenshot",
    accent: "#4e9b9a",
    source:
      "Aetherward/README.md; actual Windows build captured 2026-11-08 using the source awCapture hook (Direct3D 11).",
  }),
  product({
    slug: "forgebound",
    name: "Forgebound",
    kind: "game",
    family: "games",
    category: text("Weapon engineering roguelike", "Roguelike chế tạo vũ khí"),
    description: text(
      "Assemble weapons, connect them on a Forge Board and test your designs in side-view automatic battles.",
      "Lắp ráp vũ khí, kết nối trên Forge Board và thử thiết kế trong các trận tự động góc nhìn ngang.",
    ),
    image: "/products/forgebound/runtime-forge.webp",
    mediaKind: "screenshot",
    accent: "#bd7d46",
    source:
      "Forgebound/README.md; actual Windows build captured 2026-11-08 using fbCapture. Working title; in development.",
  }),
  product({
    slug: "machine-brigade",
    name: "Machine Brigade",
    kind: "game",
    family: "games",
    category: text("Real-time tactics", "Chiến thuật thời gian thực"),
    description: text(
      "Choose a vehicle loadout, spend Command Points to deploy, and direct automatic attacks around battlefield objectives. In development for mobile.",
      "Chọn bộ thẻ xe quân sự, dùng điểm chỉ huy để triển khai và điều phối các đơn vị tự tấn công quanh mục tiêu chiến trường. Đang phát triển cho mobile.",
    ),
    accent: "#8d995c",
    image: "/products/machine-brigade/gallery/android-battle.webp",
    mediaKind: "screenshot",
    source:
      "MachineBrigade/README.md; Docs/GAME_PLAN.md; actual Android build captured using OpenGL ES 3 on 2026-11-08. Android/iOS targets do not establish public releases.",
  }),
  product({
    slug: "runavelle",
    name: "Runavelle",
    kind: "game",
    family: "games",
    category: text(
      "Kingdom defense roguelite",
      "Roguelite thủ thành vương quốc",
    ),
    description: text(
      "Build the kingdom with Gold and Mana by day. Control one general at night while soldiers, allied generals and towers defend automatically.",
      "Dùng Vàng và Mana xây vương quốc ban ngày. Điều khiển một tướng ban đêm trong khi lính, tướng đồng minh và tháp tự phòng thủ.",
    ),
    accent: "#68845d",
    image: "/products/runavelle/runtime-day.webp",
    mediaKind: "screenshot",
    source:
      "Runavelle/README.md; Docs/GDD.md; actual Windows day/night captures 2026-11-08 using runavelleCapture.",
  }),
];

export const featuredProducts = products.filter((p) => p.featured);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug && p.status !== "hidden");
export const productPath = (p: Product, locale: string) =>
  `/${locale}/${p.kind === "game" ? "games" : "apps"}/${p.slug}/`;
