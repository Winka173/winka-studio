"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/content/studio";

type Entry = {
  slug: string;
  name: string;
  kind: string;
  category: string;
  summary: string;
  image?: string | null;
  href: string;
};
export function LabIndex({
  items,
  locale,
}: {
  items: Entry[];
  locale: Locale;
}) {
  const [filter, setFilter] = useState("all");
  const vi = locale === "vi";
  return (
    <section className="lab-index">
      <div
        className="lab-filters"
        role="group"
        aria-label={vi ? "Lọc dự án" : "Filter projects"}
      >
        {[
          ["all", vi ? "Tất cả" : "All"],
          ["game", vi ? "Thế giới game" : "Game worlds"],
          ["app", vi ? "Công cụ" : "Tools"],
        ].map(([key, label]) => (
          <button
            key={key}
            aria-pressed={key === filter}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="lab-project-grid">
        {items
          .filter((p) => filter === "all" || p.kind === filter)
          .map((p) => (
            <Link
              href={p.href}
              key={p.slug}
              className={`lab-project lab-${p.slug}`}
            >
              <div className="lab-project-capture">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    width={1200}
                    height={750}
                    loading="lazy"
                  />
                )}
                <span>
                  {vi ? "BUILD ĐANG PHÁT TRIỂN" : "BUILD IN DEVELOPMENT"}
                </span>
              </div>
              <span className="folio-kicker">{p.category}</span>
              <h2>
                {p.name}
                <ArrowUpRight size={25} />
              </h2>
              <p>{p.summary}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}
