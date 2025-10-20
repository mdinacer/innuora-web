/* eslint-disable @typescript-eslint/no-use-before-define */
"use client";

import { BookOpen, Clock, Star, StarIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import type { AppLocales } from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/i18n/paths";
import type { ContentCategory, ContentItem } from "@/types/content.types";

// =========================
// Component Props
// =========================

interface CategoryLayoutProps {
  category: ContentCategory;
  categoryInfo: {
    title: string;
    description: string;
  };
  content: ContentItem[];
  featuredContent: ContentItem[];
  currentLocale: AppLocales;
}

// =========================
// Category Layout Component
// =========================

export default function CategoryLayout({
  category,
  categoryInfo,
  content,
  featuredContent,
  currentLocale,
}: CategoryLayoutProps) {
  const { t } = useTranslation("content");

  // Sort content by priority and reading time
  const sortedContent = [...content].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.metadata.priority];
    const bPriority = priorityOrder[b.metadata.priority];

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    return (a.metadata.readingTime || 0) - (b.metadata.readingTime || 0);
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-0">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link
            href={buildLocalizedPath(currentLocale, "/content")}
            className="transition hover:text-primary"
          >
            {t("shared.libraryRoot")}
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="capitalize">{category.replace(/-/g, " ")}</span>
        </nav>

        {/* Category Header */}
        <header className="mb-12 space-y-4 rounded-app border border-border bg-card p-10 shadow-soft">
          <h1 className="text-4xl font-serif-brand text-foreground md:text-5xl">
            {t(`library.categories.${category}.title`, {
              defaultValue: categoryInfo.title,
            })}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t(`library.categories.${category}.description`, {
              defaultValue: categoryInfo.description,
            })}
          </p>

          {/* Category Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1">
              <BookOpen className="h-4 w-4 text-primary" />
              {t("shared.articles", { count: content.length })}
            </div>
            {featuredContent.length > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1">
                <Star className="h-4 w-4 text-primary" />
                {t("shared.featured", { count: featuredContent.length })}
              </div>
            )}
          </div>
        </header>

        {/* Featured Content */}
        {featuredContent.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-serif-brand text-foreground">
              {t("category.featuredHeading")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredContent.map((item) => (
                <ContentCard
                  key={item.metadata.slug}
                  item={item}
                  featured
                  locale={currentLocale}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Content */}
        <section>
          <h2 className="mb-6 text-2xl font-serif-brand text-foreground">
            {t("category.allHeading")}
          </h2>

          {sortedContent.length === 0 ? (
            <div className="rounded-app border border-border bg-card p-10 text-center shadow-soft">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {t("category.empty.title")}
              </h3>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                {t("category.empty.description")}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedContent.map((item) => (
                <ContentCard
                  key={item.metadata.slug}
                  item={item}
                  locale={currentLocale}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// =========================
// Content Card Component
// =========================

interface ContentCardProps {
  item: ContentItem;
  featured?: boolean;
  locale: AppLocales;
}

function ContentCard({ item, featured = false, locale }: ContentCardProps) {
  const { metadata, excerpt } = item;
  const { t } = useTranslation("content");

  return (
    <Link
      href={buildLocalizedPath(
        locale,
        `/content/${metadata.category}/${metadata.slug}`,
      )}
      className={`group block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ${
        featured ? "ring-1 ring-primary/30" : ""
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex-1">
          {featured && (
            <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <StarIcon className="h-4 w-4" />
              {t("shared.featuredBadge")}
            </span>
          )}
          <h3 className="line-clamp-2 font-semibold text-foreground">
            {metadata.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {excerpt || metadata.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 capitalize ${getPriorityColor(
              metadata.priority,
            )} font-medium`}
          >
            {t(`shared.priority.${metadata.priority}`, {
              defaultValue: metadata.priority,
            })}
          </span>
          <span className="capitalize text-sm opacity-80">
            {t(`shared.intent.${metadata.intent}`, {
              defaultValue: metadata.intent,
            })}
          </span>
        </div>
        {metadata.readingTime && (
          <div className="flex items-center gap-2 opacity-80">
            <Clock className="h-3 w-3" />
            {t("shared.minutes", { count: metadata.readingTime })}
          </div>
        )}
      </div>
    </Link>
  );
}

// =========================
// Helper Functions
// =========================

function getPriorityColor(priority: string): string {
  const colors = {
    high: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200",
    medium:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200",
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200",
  };

  return colors[priority as keyof typeof colors] || colors.medium;
}
