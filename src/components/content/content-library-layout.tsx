/* eslint-disable @typescript-eslint/no-use-before-define */
"use client";

import { BookOpen, Clock, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { ContentCategory, ContentItem } from "@/types/content.types";

// =========================
// Component Props
// =========================

interface ContentLibraryLayoutProps {
  contentByCategory: Record<string, ContentItem[]>;
  featuredContent: ContentItem[];
  totalArticles: number;
}

// =========================
// Category Information
// =========================

const CATEGORY_ICONS: Record<ContentCategory, string> = {
  "cognitive-behavioral-therapy": "🧠",
  "anxiety-management": "🌊",
  "depression-support": "🌱",
  "stress-management": "🧘",
  "relationship-patterns": "💝",
  "self-compassion": "🤗",
  "mindfulness-techniques": "🧘‍♀️",
  "mood-tracking": "📈",
};

// =========================
// Content Library Layout
// =========================

export default function ContentLibraryLayout({
  contentByCategory,
  featuredContent,
  totalArticles,
}: ContentLibraryLayoutProps) {
  const { t } = useTranslation("content");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-0">
        {/* Header */}
        <header className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-serif-brand text-foreground md:text-6xl">
            {t("library.heading")}
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t("library.intro")}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
              <BookOpen className="h-4 w-4 text-primary" />
              {t("shared.articles", { count: totalArticles })}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              {t("library.stats.categories", {
                count: Object.keys(contentByCategory).length,
              })}
            </div>
            {featuredContent.length > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
                <Star className="h-4 w-4 text-primary" />
                {t("shared.featured", { count: featuredContent.length })}
              </div>
            )}
          </div>
        </header>

        {/* Featured Content */}
        {featuredContent.length > 0 && (
          <section className="mb-12 space-y-6">
            <h2 className="flex items-center gap-3 text-2xl font-serif-brand text-foreground">
              <Star className="h-6 w-6 text-primary" />
              {t("library.featuredHeading")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredContent.slice(0, 6).map((item) => (
                <FeaturedContentCard key={item.metadata.slug} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Categories Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-serif-brand text-foreground">
            {t("library.browseHeading")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(contentByCategory).map(([category, articles]) => (
              <CategoryCard
                key={category}
                category={category as ContentCategory}
                articles={articles}
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 rounded-app border border-border bg-card p-10 text-center shadow-soft">
          <h3 className="text-2xl font-serif-brand text-foreground">
            {t("library.cta.title")}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("library.cta.description")}
          </p>
          <Link
            href="/sessions"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            {t("library.cta.button")}
          </Link>
        </section>
      </div>
    </div>
  );
}

// =========================
// Featured Content Card
// =========================

interface FeaturedContentCardProps {
  item: ContentItem;
}

function FeaturedContentCard({ item }: FeaturedContentCardProps) {
  const { metadata, excerpt } = item;
  const { t } = useTranslation("content");

  return (
    <Link
      href={`/content/${metadata.category}/${metadata.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft ring-1 ring-primary/20 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
    >
      {/* Featured Badge */}
      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-primary">
        <Star className="h-4 w-4" />
        {t("shared.featuredBadge")}
      </div>

      {/* Title */}
      <h3 className="mb-3 line-clamp-2 font-semibold text-foreground leading-snug">
        {metadata.title}
      </h3>

      {/* Description */}
      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {excerpt || metadata.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="capitalize opacity-80">
          {t(`library.categories.${metadata.category}.title`, {
            defaultValue: metadata.category.replace(/-/g, " "),
          })}
        </span>
        {metadata.readingTime && (
          <span className="inline-flex items-center gap-2 opacity-80">
            <Clock className="h-3 w-3" />
            {t("shared.minutes", { count: metadata.readingTime })}
          </span>
        )}
      </div>
    </Link>
  );
}

// =========================
// Category Card
// =========================

interface CategoryCardProps {
  category: ContentCategory;
  articles: ContentItem[];
}

function CategoryCard({ category, articles }: CategoryCardProps) {
  const { t } = useTranslation("content");
  const icon = CATEGORY_ICONS[category];
  const featuredCount = articles.filter(
    (article) => article.metadata.featured,
  ).length;

  return (
    <Link
      href={`/content/${category}`}
      className="group block rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
    >
      {/* Icon and Title */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {t(`library.categories.${category}.title`, {
            defaultValue: category.replace(/-/g, " "),
          })}
        </h3>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {t(`library.categories.${category}.description`, {
          defaultValue: "",
        })}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2 opacity-80">
          <BookOpen className="h-3 w-3" />
          {t("shared.articles", { count: articles.length })}
        </div>
        {featuredCount > 0 && (
          <div className="flex items-center gap-2 opacity-80">
            <Star className="h-3 w-3" />
            {t("shared.featured", { count: featuredCount })}
          </div>
        )}
      </div>
    </Link>
  );
}
