import { dir } from "i18next";
import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import TranslationProvider from "@/components/translation-provider";
import { METADATA } from "@/config/metadata";
import { VIEWPORT } from "@/config/viewport";
import { sans, serif, arabicBody, arabicTitle } from "@/lib/fonts";
import initTranslations, { type AppLocales, i18nNamespaces } from "@/lib/i18n";
import i18nConfig from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";
import LayoutFooter from "@/components/layout/footer";
import LayoutHeader from "@/components/layout/header";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = METADATA;
export const viewport: Viewport = VIEWPORT;

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const textDirection = dir(locale);

  if (!i18nConfig.locales.includes(locale)) {
    return notFound();
  }
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const localeResources = (resources as Record<string, any>)[locale] ?? {};
  const skipLinkLabel =
    localeResources?.common?.skipToMain ?? "Skip to main content";

  return (
    <html lang={locale} dir={textDirection} suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} ${arabicTitle.variable} ${arabicBody.variable} rtl:font-arabic-body text-base antialiased bg-background ltr:font-sans text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationProvider
            locale={locale}
            resources={resources}
            namespaces={i18nNamespaces}
          >
            <a href="#main-content" className="skip-link">
              {skipLinkLabel}
            </a>
            <LayoutHeader locale={locale as AppLocales} />
            {children}
            <LayoutFooter locale={locale as AppLocales} />
          </TranslationProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
