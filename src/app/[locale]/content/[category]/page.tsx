import { Metadata } from "next";
import { notFound } from "next/navigation";

import CategoryLayout from "@/components/content/category-layout";
import { initializeContentRegistry } from "@/lib/content/content-loader";
import { contentRegistry } from "@/lib/content/content-registry";
import { ContentCategory } from "@/types/content.types";

// =========================
// Page Props
// =========================

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

// =========================
// Category Metadata
// =========================

const fallbackCategoryInfo: Record<
  string,
  { title: string; description: string }
> = {
  "cognitive-behavioral-therapy": {
    title: "Cognitive Behavioral Therapy (CBT) Resources",
    description:
      "Learn evidence-based CBT techniques and strategies for mental health and emotional wellbeing.",
  },
  "anxiety-management": {
    title: "Anxiety Management Techniques",
    description:
      "Practical strategies and exercises to manage anxiety, worry, and panic effectively.",
  },
  "depression-support": {
    title: "Depression Support and Resources",
    description:
      "Understanding and coping with depression through proven therapeutic approaches.",
  },
  "stress-management": {
    title: "Stress Management Strategies",
    description:
      "Effective techniques for reducing stress and preventing burnout in daily life.",
  },
  "relationship-patterns": {
    title: "Healthy Relationship Patterns",
    description:
      "Understanding interpersonal dynamics and building healthier relationships.",
  },
  "self-compassion": {
    title: "Self-Compassion and Kindness",
    description:
      "Developing a kinder relationship with yourself through self-compassion practices.",
  },
  "mindfulness-techniques": {
    title: "Mindfulness and Meditation",
    description:
      "Present-moment awareness techniques and mindfulness practices for mental clarity.",
  },
  "mood-tracking": {
    title: "Mood Tracking and Emotional Awareness",
    description:
      "Understanding and monitoring your emotional patterns for better mental health.",
  },
};

// =========================
// Dynamic Metadata Generation
// =========================

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { locale = "en", category } = await params;

  const info = fallbackCategoryInfo[category];

  if (!info) {
    return {
      title: "Category Not Found",
      description: "The requested content category could not be found.",
    };
  }

  const { default: initTranslations } = await import("@/lib/i18n");
  const { t } = await initTranslations(locale, ["content"]);

  const localizedTitle = t(`library.categories.${category}.title`, {
    defaultValue: info.title,
  });
  const localizedDescription = t(`library.categories.${category}.description`, {
    defaultValue: info.description,
  });

  return {
    title: `${localizedTitle} | Innuora`,
    description: localizedDescription,
    openGraph: {
      title: localizedTitle,
      description: localizedDescription,
      type: "website",
      siteName: "Innuora",
      url: `/${locale}/content/${category}`,
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : "en_US",
    },
    alternates: {
      canonical: `/${locale}/content/${category}`,
      languages: {
        en: `/en/content/${category}`,
        ar: `/ar/content/${category}`,
        fr: `/fr/content/${category}`,
        "x-default": `/en/content/${category}`,
      },
    },
  };
}

// =========================
// Static Params Generation
// =========================

export async function generateStaticParams() {
  return Object.keys(fallbackCategoryInfo).map((category) => ({
    category,
  }));
}

// =========================
// Page Component
// =========================

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;

  // Validate category
  if (!fallbackCategoryInfo[category]) {
    notFound();
  }

  const { default: initTranslations } = await import("@/lib/i18n");
  const { t } = await initTranslations(locale, ["content"]);

  const localizedCategoryInfo = {
    title: t(`library.categories.${category}.title`, {
      defaultValue: fallbackCategoryInfo[category].title,
    }),
    description: t(`library.categories.${category}.description`, {
      defaultValue: fallbackCategoryInfo[category].description,
    }),
  };

  // Initialize content registry
  await initializeContentRegistry();

  // Get content for this category
  const categoryContent = contentRegistry.getByCategory(
    category as ContentCategory,
  );

  const localizedContent = contentRegistry.applyLocaleOverrides(
    categoryContent,
    locale,
  );

  const featuredContent = localizedContent.filter(
    (item) => item.metadata.featured,
  );

  return (
    <CategoryLayout
      category={category as ContentCategory}
      categoryInfo={localizedCategoryInfo}
      content={localizedContent}
      featuredContent={featuredContent}
    />
  );
}
