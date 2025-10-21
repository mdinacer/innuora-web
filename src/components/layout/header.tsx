"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "@/config/app";
import type { AppLocales } from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";
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
  const { t } = useTranslation("layout", { keyPrefix: "header" });
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const firstLinkRef = React.useRef<HTMLAnchorElement | null>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const mobileMenuTitleId = React.useId();
  const mobileMenuSubtitleId = React.useId();

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
      // {
      //   href: buildLocalizedPath(locale, "/demo"),
      //   label: t("links.demo"),
      //   variant: "link",
      // },
      {
        href: buildLocalizedPath(locale, "/features"),
        label: t("links.features"),
        variant: "link",
      },
      {
        href: buildLocalizedPath(locale, "/content"),
        label: t("links.library"),
        variant: "link",
      },
      // {
      //   href: buildLocalizedPath(locale, "/faq"),
      //   label: t("links.faq"),
      //   variant: "link",
      // },
      {
        href: buildLocalizedPath(locale, "/about"),
        label: t("links.about"),
        variant: "link",
      },
      // {
      //   href: buildLocalizedPath(locale, "/contact"),
      //   label: t("links.contact"),
      //   variant: "link",
      // },

      {
        href: buildLocalizedPath(locale, "/join"),
        label: t("links.join"),
        variant: "button",
      },
    ];
  }, [links, locale, t]);

  const closeMenu = React.useCallback((options?: { focusToggle?: boolean }) => {
    setIsMenuOpen(false);
    if (options?.focusToggle !== false) {
      window.setTimeout(() => {
        toggleButtonRef.current?.focus();
      }, 0);
    }
  }, []);

  React.useEffect(() => {
    if (pathname !== undefined) {
      closeMenu({ focusToggle: false });
    }
  }, [pathname, closeMenu]);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((open) => {
      if (open) {
        window.setTimeout(() => {
          toggleButtonRef.current?.focus();
        }, 0);
        return false;
      }
      return true;
    });
  }, []);

  const handleDialogKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableSelectors =
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusable =
          dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors);

        if (focusable.length === 0) {
          return;
        }

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];
        const currentElement = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (
            currentElement === firstElement ||
            !dialogRef.current.contains(currentElement)
          ) {
            event.preventDefault();
            lastElement.focus();
          }
        } else if (currentElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [closeMenu],
  );

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
            onClick={() => closeMenu({ focusToggle: false })}
            ref={
              !isDesktop && index === 0
                ? (node) => {
                    firstLinkRef.current = node;
                  }
                : undefined
            }
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
        !isDesktop && "text-base",
      );

      return (
        <Link
          key={`${link.href}-${index}`}
          href={link.href}
          className={cn(linkClasses, "rtl:font-arabic-title")}
          onClick={() => closeMenu({ focusToggle: false })}
          ref={
            !isDesktop && index === 0
              ? (node) => {
                  firstLinkRef.current = node;
                }
              : undefined
          }
        >
          {link.label}
        </Link>
      );
    },
    [isActiveLink, closeMenu],
  );

  React.useEffect(() => {
    if (isMenuOpen && typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    if (!isMenuOpen && typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  React.useEffect(() => {
    if (isMenuOpen) {
      const timer = window.setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [isMenuOpen]);

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
                  In<span>nu</span>ora
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
                ref={toggleButtonRef}
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
            <>
              <div
                className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-200 lg:hidden"
                aria-hidden="true"
                onClick={() => closeMenu()}
              />
              <div
                className="fixed inset-x-4 top-4 z-50 origin-top rounded-3xl border border-border/70 bg-card/95 p-5 shadow-[0_20px_60px_-28px_rgba(99,102,241,0.55)] transition-transform duration-200 lg:hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby={mobileMenuTitleId}
                aria-describedby={mobileMenuSubtitleId}
                ref={dialogRef}
                onKeyDown={handleDialogKeyDown}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span
                      id={mobileMenuTitleId}
                      className="text-sm font-medium uppercase tracking-[0.38em] text-muted-foreground"
                    >
                      {t("mobileMenu.title")}
                    </span>
                    <span
                      id={mobileMenuSubtitleId}
                      className="text-base font-semibold text-foreground"
                    >
                      {t("mobileMenu.subtitle")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => closeMenu()}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    aria-label={t("closeMenu", { defaultValue: "Close menu" })}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="mt-5 flex flex-col gap-2">
                  {navLinks.map((link, index) =>
                    renderLink(link, index, false),
                  )}
                </nav>

                <div className="mt-6 grid gap-3 rounded-2xl border border-border/60 bg-background/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("mobileMenu.cta")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <LanguagePicker />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
