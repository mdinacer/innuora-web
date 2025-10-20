import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleLayout from "@/components/content/article-layout";
import {
  getAvailableLocales,
  initializeContentRegistry,
  loadLocalizedContent,
} from "@/lib/content/content-loader";
import { contentRegistry } from "@/lib/content/content-registry";
import type { ContentCategory } from "@/types/content.types";
import { buildLanguageAlternates, buildLocalizedUrl } from "@/lib/seo/url";

// =========================
// Page Props
// =========================

interface ContentPageProps {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
}

// =========================
// Dynamic Metadata Generation (Next.js 15)
// =========================

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const { locale = "en", slug } = await params;

  // Initialize content registry if needed
  await initializeContentRegistry();

  // Get content item
  const contentItem = contentRegistry.getBySlug(slug);

  if (!contentItem) {
    return {
      title: "Content Not Found",
      description: "The requested content could not be found.",
    };
  }

  const localizedContentItem =
    contentRegistry.getItemForLocale(slug, locale) || contentItem;

  // Use SEOGenerator for comprehensive metadata
  const { SEOGenerator } = await import("@/lib/content/seo-generator");
  const baseMetadata = SEOGenerator.generateMetadata(
    localizedContentItem.metadata,
  );
  const canonicalPath = `/content/${contentItem.metadata.category}/${contentItem.metadata.slug}`;
  const canonicalUrl = buildLocalizedUrl(locale, canonicalPath);
  const languageAlternates = buildLanguageAlternates(canonicalPath);

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
  };
}

// =========================
// Static Params Generation
// =========================

export async function generateStaticParams() {
  await initializeContentRegistry();

  return contentRegistry.getAll().map((item) => ({
    category: item.metadata.category,
    slug: item.metadata.slug,
  }));
}

// =========================
// Page Component
// =========================

export default async function ContentPage({ params }: ContentPageProps) {
  const { locale, category, slug } = await params;

  // Initialize content registry
  await initializeContentRegistry();

  // Validate category
  const validCategories = [
    "cognitive-behavioral-therapy",
    "anxiety-management",
    "depression-support",
    "stress-management",
    "relationship-patterns",
    "self-compassion",
    "mindfulness-techniques",
    "mood-tracking",
  ];

  if (!validCategories.includes(category)) {
    notFound();
  }

  // Get content item
  const contentItem = contentRegistry.getBySlug(slug);

  if (!contentItem || contentItem.metadata.category !== category) {
    notFound();
  }

  // Load the actual markdown content in user's locale (with fallback to English)
  const contentResult = loadLocalizedContent(category, slug, locale);

  if (!contentResult) {
    notFound();
  }

  const { content: markdownContent, locale: actualLocale } = contentResult;

  // Merge localized metadata for current article
  const localizedContentItem =
    contentRegistry.getItemForLocale(slug, actualLocale) || contentItem;

  // Get available locales for this article (for language switcher if needed)
  const availableLocales = getAvailableLocales(category, slug);

  // Get related content
  const relatedContent = contentRegistry.applyLocaleOverrides(
    contentRegistry.getRelated(contentItem),
    locale,
  );

  // Generate structured data for SEO
  const { SEOGenerator } = await import("@/lib/content/seo-generator");
  const structuredData = SEOGenerator.generateStructuredData(
    localizedContentItem.metadata,
    markdownContent,
  );

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ArticleLayout
        contentItem={localizedContentItem}
        relatedContent={relatedContent}
        category={category as ContentCategory}
        markdownContent={markdownContent}
        currentLocale={actualLocale}
        availableLocales={availableLocales}
      />
    </>
  );
}
