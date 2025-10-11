"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { AppLocales } from "@/lib/i18n";
import i18nConfig from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const LOCALES = [
  {
    label: "English",
    abbreviation: "EN",
    value: "en",
  },
  {
    label: "العربية",
    abbreviation: "AR",
    value: "ar",
  },
  {
    label: "Français",
    abbreviation: "FR",
    value: "fr",
  },
];

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
  const [selectedLang, setSelectedLang] = useState("English");
  const [isSwitching, setIsSwitching] = useState(false);
  const router = useRouter();

  const currentPathname = usePathname();

  const isMobile = useIsMobile();

  const handleChange = useCallback(
    (newLocale: AppLocales) => {
      // set cookie for next-i18n-router
      setIsSwitching(true);
      const days = 30;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = date.toUTCString();
      document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

      // redirect to the new locale path
      if (
        currentLocale === i18nConfig.defaultLocale &&
        !i18nConfig.prefixDefault
      ) {
        router.push("/" + newLocale + currentPathname);
      } else {
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
        );
      }

      setIsSwitching(false);
      router.refresh();
    },
    [currentLocale, currentPathname, router],
  );
  return (
    <div className="relative rtl:font-arabic-body">
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="langDropdownTrigger"
        className="flex items-center gap-2 rounded-2xl border border-inn-border-light bg-inn-bg-card px-3 py-2 hover:border-inn-bg-accent transition"
        aria-label="Select language"
      >
        {/* <!-- Globe Icon --> */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-inn-text-secondary"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        {/* <!-- Selected Language --> */}
        <span
          id="selectedLang"
          className={cn("text-sm font-sans font-medium hidden sm:inline", {
            "font-arabic": currentLocale === "ar",
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
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* <!-- Language Dropdown --> */}
      <div
        id="langDropdown"
        className={cn(
          "absolute top-[calc(100%_+_8px)] ltr:right-0 rtl:left-0 min-w-[200px] ",
          "lang-dropdown rounded-2xl border border-inn-border-light bg-background shadow-floating",
          "transition-all duration-200 ease-in-out z-10",
          isOpen
            ? "opacity-100  visible translate-y-0"
            : "opacity-0 hidden -translate-y-2.5 pointer-events-none",
        )}
      >
        <div className="p-2">
          {LANGUAGES_DATA.map((lang) => (
            <button
              key={lang.locale}
              onClick={() => handleChange(lang.locale as AppLocales)}
              className={cn(
                "lang-option active w-full flex items-center justify-between px-4 py-3 rounded-xl text-left hover:bg-secondary",
                { "bg-primary": lang.locale === currentLocale },
              )}
              data-lang={lang.locale}
              data-name={lang.nativeName}
              data-short={lang.short}
            >
              <div
                className={cn(
                  "flex items-center gap-3 w-full",
                  lang.locale === "ar" ? "flex-row-reverse" : "flex-row",
                )}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div
                  className={cn(
                    "flex-1",
                    lang.locale === "ar" ? "text-right" : "text-left",
                  )}
                >
                  <div
                    className={cn(
                      "font-medium font-sans text-sm sm:rtl:font-arabic",
                    )}
                  >
                    {lang.label}
                  </div>
                  <div className="text-xs text-inn-text-primary/70 font-sans">
                    {lang.nativeName}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePicker;
