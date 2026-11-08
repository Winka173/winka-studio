import Link from "next/link";
import "./globals.css";
import "@/styles/pages.css";
export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page not found · Winka Studio</title>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <main className="not-found">
          <span>WINKA STUDIO / 404</span>
          <h1>A small detour.</h1>
          <p>
            This page could not be found. Explore the studio or return to the
            design comparison.
          </p>
          <Link href="/en/">Explore Winka Studio ↗</Link>
          <Link href="/review/">Design comparison ↗</Link>
        </main>
      </body>
    </html>
  );
}
