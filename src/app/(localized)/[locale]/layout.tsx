import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import "@/styles/addy.css";
import "@/styles/taste.css";
import "@/styles/uipro.css";
import "@/styles/gstack.css";
import "@/styles/pages.css";
import "@/styles/review.css";
import "@/styles/worlds.css";
import "@/styles/development.css";
import "@/styles/portfolio.css";
import "@/styles/portfolio-home.css";
import "@/styles/portfolio-products.css";
import "@/styles/portfolio-development.css";
import "@/styles/project-collection.css";
import "@/styles/product-guide.css";
import "@/styles/website-kits.css";
import "@/styles/workbench.css";
import "../../../../public/taste/motion/motion.css";

export const metadata: Metadata = {
  title: { default: "Winka Studio", template: "%s · Winka Studio" },
  description: "Independent apps and games by Winka Studio.",
  robots: { index: false, follow: false },
  icons: { icon: "/brand/mark.svg" },
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "vi") notFound();
  return (
    <html lang={locale} data-type="software">
      <head>
        <meta name="page-type" content="software" />
        <meta name="site-kind" content="software" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.pathname.includes('/directions/taste')){document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
