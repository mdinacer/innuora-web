"use client";

import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import type { AppLocales } from "@/lib/i18n";
import i18nConfig from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const LANGUAGES_DATA = [
  {
    locale: "en",
    label: "English",
    nativeName: "English",
    flag: "🇬🇧",
    short: "En",
  },
  {
    locale: "ar",
    label: "العربية",
    nativeName: "Arabic",
    flag: "🇸🇦",
    short: "ع",
  },
  {
    locale: "fr",
    label: "Français",
    nativeName: "French",
    flag: "🇫🇷",
    short: "FR",
  },
];

const LanguagePicker = () => {
  const { i18n, t } = useTranslation("common");
  const currentLocale = i18n.language;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const activeOptionRef = useRef<HTMLButtonElement | null>(null);
  const dropdownId = useId();
  const activeOptionId = `language-option-${currentLocale}`;

  const currentPathname = usePathname();

  const handleChange = useCallback(
    (newLocale: AppLocales) => {
      setIsOpen(false);
      triggerRef.current?.focus();

      // set cookie for next-i18n-router
      const days = 30;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expiresAt = new Date(date.getTime());
      const docWithCookieStore = document as Document & {
        cookieStore?: {
          set?: (init: {
            name: string;
            value: string;
            expires: Date;
            path: string;
          }) => Promise<void> | void;
        };
      };
      if (
        docWithCookieStore.cookieStore &&
        typeof docWithCookieStore.cookieStore.set === "function"
      ) {
        void docWithCookieStore.cookieStore.set({
          name: "NEXT_LOCALE",
          value: newLocale,
          expires: expiresAt,
          path: "/",
        });
      } else {
        // biome-ignore lint/suspicious/noDocumentCookie: Fallback for browsers without CookieStore support
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expiresAt.toUTCString()};path=/`;
      }

      // redirect to the new locale path
      if (
        currentLocale === i18nConfig.defaultLocale &&
        !i18nConfig.prefixDefault
      ) {
        router.push(`/${newLocale}${currentPathname}`);
      } else {
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
        );
      }

      router.refresh();
    },
    [currentLocale, currentPathname, router]
  );
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscapeKey);

    const focusTimer = window.setTimeout(() => {
      activeOptionRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscapeKey);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  const focusOptionByIndex = useCallback((index: number) => {
    const buttons = dropdownRef.current?.querySelectorAll<HTMLButtonElement>(
      '[data-lang-option="true"]'
    );
    if (!buttons || buttons.length === 0) {
      return;
    }
    const total = buttons.length;
    const normalizedIndex = ((index % total) + total) % total;
    buttons[normalizedIndex].focus();
  }, []);

  const handleOptionKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          focusOptionByIndex(index + 1);
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          focusOptionByIndex(index - 1);
          break;
        }
        case "Home": {
          event.preventDefault();
          focusOptionByIndex(0);
          break;
        }
        case "End": {
          event.preventDefault();
          focusOptionByIndex(LANGUAGES_DATA.length - 1);
          break;
        }
        case "Escape": {
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        }
        case "Tab": {
          setIsOpen(false);
          break;
        }
        case "Enter":
        case " ": {
          event.preventDefault();
          handleChange(LANGUAGES_DATA[index].locale as AppLocales);
          break;
        }
        default:
          break;
      }
    },
    [focusOptionByIndex, handleChange]
  );

  return (
    <div className="relative rtl:font-arabic-body" ref={containerRef}>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        id="langDropdownTrigger"
        className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 hover:border-accent transition"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`langDropdown-${dropdownId}`}
        aria-activedescendant={isOpen ? activeOptionId : undefined}
        onKeyDown={(event) => {
          if (
            (event.key === "ArrowDown" || event.key === "ArrowUp") &&
            !isOpen
          ) {
            event.preventDefault();
            setIsOpen(true);
          } else if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            setIsOpen(false);
          }
        }}
      >
        {/* <!-- Globe Icon --> */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-secondary-foreground/50"
          role="img"
        >
          <title>Language selection globe</title>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        {/* <!-- Selected Language --> */}
        <span
          id="selectedLang"
          className={cn("text-sm font-sans font-medium hidden sm:inline", {
            "font-arabic-title": currentLocale === "ar",
          })}
        >
          {t(currentLocale, { keyPrefix: "languages" })}
        </span>
        <span
          id="selectedLangShort"
          className="text-sm font-medium sm:hidden uppercase font-sans"
        >
          {currentLocale}
        </span>
        {/* <!-- Chevron --> */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-inn-text-secondary"
          role="img"
        >
          <title>Toggle language menu</title>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* <!-- Language Dropdown --> */}
      <div
        id={`langDropdown-${dropdownId}`}
        ref={dropdownRef}
        className={cn(
          "absolute top-[calc(100%_+_8px)] ltr:right-0 rtl:left-0 min-w-[200px] ",
          "lang-dropdown rounded-2xl border border-border bg-background shadow-floating",
          "transition-all duration-200 ease-in-out z-10",
          isOpen
            ? "opacity-100  visible translate-y-0"
            : "opacity-0 hidden -translate-y-2.5 pointer-events-none"
        )}
        role="listbox"
        aria-labelledby="langDropdownTrigger"
        aria-activedescendant={isOpen ? activeOptionId : undefined}
      >
        <div className="p-2">
          {LANGUAGES_DATA.map((lang, index) => (
            <button
              key={lang.locale}
              type="button"
              onClick={() => handleChange(lang.locale as AppLocales)}
              className={cn(
                "lang-option active flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                lang.locale === currentLocale
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border/60 hover:bg-secondary"
              )}
              id={`language-option-${lang.locale}`}
              role="option"
              aria-selected={lang.locale === currentLocale}
              data-lang={lang.locale}
              data-name={lang.nativeName}
              data-short={lang.short}
              data-lang-option="true"
              ref={
                lang.locale === currentLocale
                  ? (node) => {
                      activeOptionRef.current = node;
                    }
                  : undefined
              }
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <div
                className={cn(
                  "flex items-center gap-3 w-full",
                  lang.locale === "ar" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div
                  className={cn(
                    "flex-1",
                    lang.locale === "ar" ? "text-right" : "text-left"
                  )}
                >
                  <div
                    className={cn(
                      "font-medium font-sans text-sm sm:rtl:font-arabic-title"
                    )}
                  >
                    {lang.label}
                  </div>
                  <div className="text-xs text-secondary-foreground/70 font-sans">
                    {lang.nativeName}
                  </div>
                </div>
              </div>
              {/* {lang.locale === currentLocale && (
                <span
                  className="ml-3 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground"
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
              )} */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePicker;
