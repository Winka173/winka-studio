"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import type { Locale } from "@/content/studio";

const subscribe = (listener: () => void) => {
  window.addEventListener("winka-theme", listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("winka-theme", listener);
    window.removeEventListener("storage", listener);
  };
};
const getTheme = () => {
  try {
    return localStorage.getItem("winka-theme") || "default";
  } catch {
    return "default";
  }
};
export function useThemePreference() {
  return useSyncExternalStore(subscribe, getTheme, () => "default");
}

export function Experience({
  direction = "addy",
  children,
}: {
  direction?: string;
  children: React.ReactNode;
}) {
  const preference = useThemePreference();
  return (
    <div className={`site site--${direction}`} data-preference={preference}>
      {children}
    </div>
  );
}

export function ThemeSwitch({ locale }: { locale: Locale }) {
  const preference = useThemePreference();
  return (
    <button
      className="icon-button theme-switch"
      aria-label={
        locale === "vi" ? "Đổi giao diện sáng tối" : "Change color theme"
      }
      onClick={(event) => {
        const color = getComputedStyle(
          event.currentTarget.closest(".site") || document.body,
        )
          .getPropertyValue("--scheme")
          .trim();
        const next =
          preference === "dark" ||
          (preference === "default" && color === "dark")
            ? "light"
            : "dark";
        try {
          localStorage.setItem("winka-theme", next);
        } catch {
          /* still usable without storage */
        }
        window.dispatchEvent(new Event("winka-theme"));
      }}
    >
      <Sun size={18} className="sun-icon" />
      <Moon size={18} className="moon-icon" />
    </button>
  );
}

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const path = usePathname();
  const other = locale === "en" ? "vi" : "en";
  const destination = /^\/(en|vi)(?=\/|$)/.test(path)
    ? path.replace(/^\/(en|vi)(?=\/|$)/, `/${other}`)
    : `/${other}/`;
  return (
    <Link
      className="locale-switch"
      href={destination}
      hrefLang={other}
      lang={other}
      aria-label={
        other === "vi" ? "Chuyển sang tiếng Việt" : "Switch to English"
      }
    >
      {other.toUpperCase()}
    </Link>
  );
}

export function SiteHeader({
  locale,
  direction = "addy",
}: {
  locale: Locale;
  direction?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    ["apps", locale === "vi" ? "Ứng dụng" : "Apps"],
    ["games", locale === "vi" ? "Trò chơi" : "Games"],
    ["lab", "Lab"],
    ["about", locale === "vi" ? "Studio" : "About"],
    ["support", locale === "vi" ? "Hỗ trợ" : "Support"],
  ];
  return (
    <header
      className={`site-header header--${direction} ${direction === "taste" ? "nav" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          event.currentTarget
            .querySelector<HTMLButtonElement>(".menu-toggle")
            ?.focus();
        }
      }}
    >
      <a className="skip-link" href="#main">
        {locale === "vi" ? "Đến nội dung chính" : "Skip to content"}
      </a>
      <div className="header-inner wrap">
        <Link
          href={`/${locale}/`}
          className="wordmark"
          aria-label="Winka Studio home"
        >
          <span className="brand-mark" aria-hidden="true">
            w<span>·</span>
          </span>
          <span>
            winka<span className="wordmark-studio">studio</span>
          </span>
        </Link>
        <nav
          className="desktop-nav"
          aria-label={locale === "vi" ? "Điều hướng chính" : "Main navigation"}
        >
          {links.map(([href, label]) => (
            <Link
              href={`/${locale}/${href}/`}
              key={href}
              aria-current={
                pathname === `/${locale}/${href}/` ? "page" : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LocaleSwitch locale={locale} />
          <ThemeSwitch locale={locale} />
          <Link href={`/${locale}/apps/`} className="header-cta">
            {locale === "vi" ? "Khám phá" : "Explore work"}
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              open
                ? locale === "vi"
                  ? "Đóng menu"
                  : "Close menu"
                : locale === "vi"
                  ? "Mở menu"
                  : "Open menu"
            }
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label={
            locale === "vi" ? "Điều hướng di động" : "Mobile navigation"
          }
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          {links.map(([href, label]) => (
            <Link
              href={`/${locale}/${href}/`}
              onClick={() => setOpen(false)}
              key={href}
            >
              {label}
              <ArrowUpRight />
            </Link>
          ))}
          <Link href={`/${locale}/contact/`} onClick={() => setOpen(false)}>
            {locale === "vi" ? "Liên hệ" : "Contact"}
            <ArrowUpRight />
          </Link>
        </nav>
      )}
    </header>
  );
}
