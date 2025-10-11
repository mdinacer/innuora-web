import i18nConfig from "@/lib/i18n/config";
import type { AppLocales } from "@/lib/i18n";

const ROOT = "/";

/**
 * Builds a locale-aware path while respecting the default locale configuration.
 */
export function buildLocalizedPath(
  locale: AppLocales,
  path: string = ROOT,
): string {
  const normalized =
    path && path !== ROOT
      ? path.startsWith(ROOT)
        ? path
        : `${ROOT}${path}`
      : ROOT;

  if (locale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
    return normalized;
  }

  if (normalized === ROOT) {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
}
