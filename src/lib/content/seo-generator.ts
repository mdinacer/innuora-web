import type { Metadata } from "next";

import { APP_CONFIG } from "@/config/app";
import type { ContentMetadata } from "@/types/content.types";

// =========================
// SEO Metadata Generator
// =========================

function generateMetadata(contentMetadata: ContentMetadata): Metadata {
  const { title, description, keywords, category, slug, draft } =
    contentMetadata;

  const seoTitle = generateSEOTitle(title);
  const seoDescription = generateSEODescription(description);
  const canonicalUrl = `/content/${category}/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.join(", "),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      siteName: APP_CONFIG.name,
      url: canonicalUrl,
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
      title: seoTitle,
      description: seoDescription,
      images: [`${APP_CONFIG.domains.canonical}/og/innuora-cover.png`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        ar: `/ar${canonicalUrl}`,
        fr: `/fr${canonicalUrl}`,
        "x-default": canonicalUrl,
      },
    },
    other: {
      "article:author": "Innuora",
      "article:section": getCategoryDisplayName(category),
      "article:tag": keywords.join(","),
    },
    robots: {
      index: !draft,
      follow: true,
      googleBot: {
        index: !draft,
        follow: true,
      },
    },
  };
}

function generateStructuredData(
  contentMetadata: ContentMetadata,
  content?: string,
): Record<string, unknown> {
  const {
    title,
    description,
    keywords,
    category,
    slug,
    publishedAt,
    updatedAt,
    readingTime,
  } = contentMetadata;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || APP_CONFIG.domains.primary;
  const articleUrl = `${baseUrl}/content/${category}/${slug}`;

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `${baseUrl}/api/og?title=${encodeURIComponent(
      title,
    )}&category=${category}`,
    url: articleUrl,
    datePublished: publishedAt?.toISOString(),
    dateModified: (updatedAt ?? publishedAt)?.toISOString(),
    author: {
      "@type": "Organization",
      name: "Innuora",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Innuora",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/og/innuora-cover.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: keywords.join(", "),
    about: {
      "@type": "Thing",
      name: getCategoryDisplayName(category),
    },
  };

  if (readingTime) {
    structuredData.timeRequired = `PT${readingTime}M`;
  }

  if (content) {
    const wordCount = content.split(/\s+/).length;
    structuredData.wordCount = wordCount;
  }

  return structuredData;
}

function generateSitemapEntry(contentMetadata: ContentMetadata) {
  const { category, slug, priority, publishedAt, updatedAt } = contentMetadata;

  const priorityMap: Record<ContentMetadata["priority"], number> = {
    high: 0.8,
    medium: 0.6,
    low: 0.4,
  };

  return {
    url: `/content/${category}/${slug}`,
    lastModified: updatedAt || publishedAt || new Date(),
    priority: priorityMap[priority],
    changeFrequency: "monthly" as const,
  };
}

export const SEOGenerator = {
  generateMetadata,
  generateStructuredData,
  generateSitemapEntry,
};

function generateSEOTitle(title: string): string {
  const brandSuffix = " | Innuora";
  const maxLength = 60 - brandSuffix.length;

  if (title.length <= maxLength) {
    return `${title}${brandSuffix}`;
  }

  const truncated = `${title.substring(0, maxLength - 3)}...`;
  return `${truncated}${brandSuffix}`;
}

function generateSEODescription(description: string): string {
  const maxLength = 160;

  if (description.length <= maxLength) {
    return description;
  }

  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.8) {
    return `${truncated.substring(0, lastSpace)}...`;
  }

  return `${truncated}...`;
}

function getCategoryDisplayName(category: string): string {
  const categoryNames: Record<string, string> = {
    "cognitive-behavioral-therapy": "Cognitive Behavioral Therapy",
    "anxiety-management": "Anxiety Management",
    "depression-support": "Depression Support",
    "stress-management": "Stress Management",
    "relationship-patterns": "Relationship Patterns",
    "self-compassion": "Self-Compassion",
    "mindfulness-techniques": "Mindfulness Techniques",
    "mood-tracking": "Mood Tracking",
  };

  return categoryNames[category] || category.replace(/-/g, " ");
}

// =========================
// Internal Linking Helper
// =========================

function generateLinkSuggestions(
  contentMetadata: ContentMetadata,
  availableContent: ContentMetadata[],
): Array<{
  anchor: string;
  url: string;
  title: string;
  relevance: number;
}> {
  const suggestions: Array<{
    anchor: string;
    url: string;
    title: string;
    relevance: number;
  }> = [];

  const { keywords, relatedCbtModules, targetEmotions, category } =
    contentMetadata;

  for (const otherContent of availableContent) {
    if (otherContent.slug === contentMetadata.slug) continue;

    let relevance = 0;

    if (otherContent.category === category) {
      relevance += 0.3;
    }

    if (relatedCbtModules && otherContent.relatedCbtModules) {
      const matchingModules = relatedCbtModules.filter(
        (cbtModule) =>
          otherContent.relatedCbtModules?.includes(cbtModule) ?? false,
      );
      relevance += matchingModules.length * 0.2;
    }

    if (targetEmotions && otherContent.targetEmotions) {
      const matchingEmotions = targetEmotions.filter(
        (emotion) => otherContent.targetEmotions?.includes(emotion) ?? false,
      );
      relevance += matchingEmotions.length * 0.15;
    }

    const keywordOverlap = keywords.filter((keyword) =>
      otherContent.keywords.includes(keyword),
    );
    relevance += keywordOverlap.length * 0.1;

    if (relevance > 0.2) {
      suggestions.push({
        anchor: generateAnchorText(otherContent),
        url: `/content/${otherContent.category}/${otherContent.slug}`,
        title: otherContent.title,
        relevance,
      });
    }
  }

  return suggestions.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
}

function generateAnchorText(contentMetadata: ContentMetadata): string {
  const { title, intent } = contentMetadata;

  if (intent === "actionable") {
    if (title.includes("How to")) {
      return title;
    }
    return `learn ${title.toLowerCase()}`;
  }

  if (title.includes("What is")) {
    return title;
  }

  return `${title.toLowerCase()} guide`;
}

export const InternalLinkingHelper = {
  generateLinkSuggestions,
};
