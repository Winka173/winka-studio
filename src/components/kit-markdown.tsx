import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/content/studio";
import type { Product } from "@/content/products";
import { productPath } from "@/content/products";

/** Only bundled editorial Markdown is rendered. Raw HTML is never enabled. */
export function KitMarkdown({
  children,
  locale,
  product,
}: {
  children: string;
  locale: Locale;
  product?: Product;
}) {
  return (
    <div className="kit-markdown">
      <Markdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h2>{children}</h2>,
          table: ({ children }) => (
            <div
              className="markdown-table"
              tabIndex={0}
              role="region"
              aria-label={
                locale === "vi"
                  ? "Bảng thông tin có thể cuộn"
                  : "Scrollable information table"
              }
            >
              <table>{children}</table>
            </div>
          ),
          a: ({ href, children }) => {
            let target = href;
            if (
              product &&
              href &&
              /^(privacy-policy|privacy|terms-of-service|terms)\.md$/.test(href)
            )
              target =
                productPath(product, locale) +
                (href.startsWith("privacy") ? "privacy/" : "terms/");
            return <a href={target}>{children}</a>;
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
