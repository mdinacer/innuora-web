import { Config } from "next-i18n-router/dist/types";

const i18nConfig = {
  locales: ["en", "ar", "fr"],
  defaultLocale: "en",
  serverSetCookie: "always",
  prefixDefault: false,
  localeDetector: false,
} satisfies Config;

export default i18nConfig;

// export const fnsLocalesMap: Record<AppLocales, Locale> = {
//   en: enUS,
//   ar: ar,
//   fr: fr,
// };
