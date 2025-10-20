import type { AppLocales } from "@/lib/i18n";
import i18nConfig from "@/lib/i18n/config";
import { buildLocalizedPath } from "@/lib/i18n/paths";

const SUPPORTED_LOCALES = i18nConfig.locales as AppLocales[];
const DEFAULT_LOCALE = i18nConfig.defaultLocale as AppLocales;

function ensureLeadingSlash(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function withTrailingSlash(path: string): string {
  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

export function normalizeLocale(locale: string): AppLocales {
  return SUPPORTED_LOCALES.includes(locale as AppLocales)
    ? (locale as AppLocales)
    : DEFAULT_LOCALE;
}

export function buildLocalizedUrl(locale: string, path: string): string {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPath = ensureLeadingSlash(path);
  const localizedPath = buildLocalizedPath(normalizedLocale, normalizedPath);

  return withTrailingSlash(localizedPath);
}

export function buildLanguageAlternates(
  path: string,
): Record<AppLocales | "x-default", string> {
  const normalizedPath = ensureLeadingSlash(path);

  const alternates = SUPPORTED_LOCALES.reduce(
    (acc, locale) => {
      acc[locale] = buildLocalizedUrl(locale, normalizedPath);
      return acc;
    },
    {} as Record<AppLocales, string>,
  );

  return {
    ...alternates,
    "x-default": alternates[DEFAULT_LOCALE],
  };
}
