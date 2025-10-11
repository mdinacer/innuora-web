"use client";

import { APP_CONFIG } from "@/config/app";
import type { AppLocales } from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import LanguagePicker from "../language-dropdown";
import ThemeToggle from "../theme-toggle";

type HeaderLink = {
  href: string;
  label: string;
  variant?: "link" | "button";
};

interface Props {
  className?: string;
  locale?: AppLocales;
  links?: HeaderLink[];
}

const LayoutHeader: React.FC<Props> = ({ className, links, locale = "en" }) => {
  const { t } = useTranslation("pages", { keyPrefix: "header" });
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = React.useMemo<HeaderLink[]>(() => {
    if (links && links.length > 0) {
      return links.map((link) => ({
        ...link,
        variant: link.variant ?? "link",
      }));
    }

    return [
      {
        href: buildLocalizedPath(locale, "/"),
        label: t("links.home"),
        variant: "link",
      },
      {
        href: buildLocalizedPath(locale, "/demo"),
        label: t("links.demo"),
        variant: "link",
      },
      {
        href: buildLocalizedPath(locale, "/content"),
        label: t("links.library"),
        variant: "link",
      },
      {
        href: buildLocalizedPath(locale, "/faq"),
        label: t("links.faq"),
        variant: "link",
      },
      {
        href: buildLocalizedPath(locale, "/join"),
        label: t("links.join"),
        variant: "button",
      },
    ];
  }, [links, locale, t]);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((open) => !open);
  }, []);

  const normalize = React.useCallback((value: string) => {
    if (!value) {
      return "/";
    }
    if (value.length > 1 && value.endsWith("/")) {
      return value.slice(0, -1);
    }
    return value;
  }, []);

  const isActiveLink = React.useCallback(
    (href: string) => {
      if (!href.startsWith("/")) return false;

      // Normalize helper
      const normalizePath = (p: string) => {
        let clean = p.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
        // Strip locale prefix like /en or /ar or /fr
        clean = clean.replace(/^\/(en|ar|fr)(?=\/|$)/, "");
        return clean === "" ? "/" : clean;
      };

      const target = normalizePath(href);
      const current = normalizePath(pathname || "/");

      // ✅ Case 1: Home must be strictly /
      if (target === "/") return current === "/";

      // ✅ Case 2: Exact or nested match (e.g. /content or /content/article)
      return current === target || current.startsWith(`${target}/`);
    },
    [pathname],
  );

  const renderLink = React.useCallback(
    (link: HeaderLink, index: number, isDesktop = false) => {
      const isButton = link.variant === "button";
      const active = isActiveLink(link.href);

      if (isButton) {
        const buttonClasses = cn(
          "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
          "shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
          isDesktop
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "w-full bg-primary text-primary-foreground hover:bg-primary/90",
          active && "ring-2 ring-primary/50",
        );

        return (
          <Link
            key={`${link.href}-${index}`}
            href={link.href}
            className={cn(buttonClasses, "rtl:font-arabic-title")}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        );
      }

      const linkClasses = cn(
        "relative inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium transition",
        isDesktop
          ? "text-muted-foreground hover:text-foreground"
          : "w-full justify-start text-muted-foreground hover:text-foreground",
        active && "text-foreground",
        isDesktop &&
          "after:absolute after:bottom-[2px] after:left-1/2 after:h-[2px] after:w-[70%] after:-translate-x-1/2 after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100",
        isDesktop && active && "after:scale-x-100",
      );

      return (
        <Link
          key={`${link.href}-${index}`}
          href={link.href}
          className={cn(linkClasses, "rtl:font-arabic-title")}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    },
    [isActiveLink],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className,
      )}
    >
      <div className="border-b border-border/60 bg-background/80">
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href={buildLocalizedPath(locale, "/")}
              className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/80 px-3 rtl:pl-5 py-2 shadow-soft transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                <Image
                  src="/assets/images/logo.png"
                  alt={APP_CONFIG.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-semibold text-foreground">
                  In<span className="text-primary">nu</span>ora
                </span>
                <span className="text-[0.68rem] sr-only sm:not-sr-only rtl:font-arabic-title rtl:text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground group-hover:text-foreground/80">
                  {t("wordmark", { defaultValue: "AI Companion" })}
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link, index) => renderLink(link, index, true))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:inline-flex">
                <ThemeToggle />
              </div>
              <LanguagePicker />
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 lg:hidden"
                aria-label={
                  isMenuOpen
                    ? t("closeMenu", { defaultValue: "Close menu" })
                    : t("openMenu", { defaultValue: "Open menu" })
                }
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="mt-4 lg:hidden">
              <nav className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-card/95 p-3 shadow-soft">
                {navLinks.map((link, index) => renderLink(link, index, false))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
