import type { Metadata } from "next";
import "../globals.css";
import "@/styles/review.css";
export const metadata: Metadata = {
  title: "Winka Studio — Design directions",
  description:
    "Four visual directions for Winka Studio. Private design review.",
  robots: { index: false, follow: false },
  icons: { icon: "/brand/mark.svg" },
};
export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <a className="skip-link" href="#main">
          Đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
