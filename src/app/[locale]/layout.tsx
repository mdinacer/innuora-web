import { dir } from "i18next";
import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import TranslationProvider from "@/components/translation-provider";
import { geistMono, geistSans, tajawal, zain } from "@/lib/fonts";
import initTranslations, { AppLocales, i18nNamespaces } from "@/lib/i18n";
import i18nConfig from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";
import LayoutHeader from "@/components/layout/header";
import LayoutFooter from "@/components/layout/footer";
import { METADATA } from "@/config/metadata";
import { VIEWPORT } from "@/config/viewport";

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

  if (!i18nConfig.locales.includes(locale)) {
    return notFound();
  }
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zain.variable} ${tajawal.variable} ltr:font-sans rtl:font-arabic-body text-base rtl:text-lg antialiased bg-inn-bg-primary`}
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
            <LayoutHeader locale={locale as AppLocales} />
            {children}
            <LayoutFooter locale={locale as AppLocales} />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
