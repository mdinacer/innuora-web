import { Metadata } from "next";

import ContentLibraryLayout from "@/components/content/content-library-layout";
import { initializeContentRegistry } from "@/lib/content/content-loader";
import { contentRegistry } from "@/lib/content/content-registry";

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

  return {
    title: t("seo:content.title"),
    description: t("seo:content.description"),
    openGraph: {
      title: t("seo:content.title"),
      description: t("seo:content.description"),
      type: "website",
      siteName: "Innuora",
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : "en_US",
    },
    alternates: {
      canonical: `/${locale}/content`,
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
