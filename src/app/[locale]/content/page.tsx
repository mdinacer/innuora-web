import { Metadata } from "next";

import ContentLibraryLayout from "@/components/content/content-library-layout";
import { initializeContentRegistry } from "@/lib/content/content-loader";
import { contentRegistry } from "@/lib/content/content-registry";
import { APP_CONFIG } from "@/config/app";

// =========================
// Page Props
// =========================

interface ContentLibraryPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// =========================
// Metadata Generation
// =========================

export async function generateMetadata({
  params,
}: ContentLibraryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { default: initTranslations } = await import("@/lib/i18n");
  const { t } = await initTranslations(locale, ["seo"]);

  const title = t("seo:content.title", { app_name: APP_CONFIG.name });
  const description = t("seo:content.description", {
    app_name: APP_CONFIG.name,
  });

  // Build locale-aware URLs (respecting prefixDefault: false for English)
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const currentUrl = `${localePrefix}/content`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: APP_CONFIG.name,
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: `${APP_CONFIG.domains.canonical}/og/innuora-cover.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${APP_CONFIG.domains.canonical}/og/innuora-cover.png`],
      creator: APP_CONFIG.social.twitter.creator,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: "/en/content",
        ar: "/ar/content",
        fr: "/fr/content",
        "x-default": "/en/content",
      },
    },
  };
}

// =========================
// Page Component
// =========================

export default async function ContentLibraryPage({
  params,
}: ContentLibraryPageProps) {
  const { locale } = await params;

  // Initialize content registry
  await initializeContentRegistry();

  // Get all content organized by category
  const allContent = contentRegistry.getAll();
  const featuredContent = contentRegistry.getFeatured();

  const localizedContent = contentRegistry.applyLocaleOverrides(
    allContent,
    locale,
  );
  const localizedFeatured = contentRegistry.applyLocaleOverrides(
    featuredContent,
    locale,
  );

  // Group localized content by category
  const contentByCategory = localizedContent.reduce(
    (acc, item) => {
      const category = item.metadata.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, typeof localizedContent>,
  );

  return (
    <ContentLibraryLayout
      contentByCategory={contentByCategory}
      featuredContent={localizedFeatured}
      totalArticles={localizedContent.length}
    />
  );
}
