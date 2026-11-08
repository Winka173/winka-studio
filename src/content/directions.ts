export const directions = [
  {
    id: "addy",
    letter: "A",
    title: "The Independent",
    skill: "Addy Osmani",
    subtitle: "Editorial / Paper / Persimmon",
    description:
      "Gọn, có chiều sâu như một ấn phẩm độc lập. Chữ serif tương phản với giao diện sản phẩm thật.",
    color: "#a23e28",
    bg: "#f3f0e8",
    theme: "light",
  },
  {
    id: "taste",
    letter: "B",
    title: "Product, in Focus",
    skill: "Taste Frontend",
    subtitle: "Immersive / Cyan / Product first",
    description:
      "Mỗi màn hình một ý chính. Nền tối, chữ Funnel và khoảng thở dành cho sản phẩm.",
    color: "#93f1f7",
    bg: "#080b0b",
    theme: "dark",
  },
  {
    id: "uipro",
    letter: "C",
    title: "After Hours",
    skill: "UI/UX Pro Max",
    subtitle: "Monochrome / Cinematic / Gallery",
    description:
      "Portfolio thiên về hình ảnh. Chữ Archivo lớn, bảng màu đơn sắc và bố cục như một phòng trưng bày.",
    color: "#f4f1e9",
    bg: "#161719",
    theme: "dark",
  },
  {
    id: "gstack",
    letter: "D",
    title: "The Play Department",
    skill: "gstack Design",
    subtitle: "Cobalt / Expressive / Studio",
    description:
      "Một studio có cá tính: màu cobalt, chữ Bricolage và bố cục mở, vui nhưng rõ ràng.",
    color: "#254fda",
    bg: "#f4f4ed",
    theme: "light",
  },
] as const;
export type DirectionId = (typeof directions)[number]["id"];
