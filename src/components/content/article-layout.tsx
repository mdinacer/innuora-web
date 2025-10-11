/* eslint-disable @typescript-eslint/no-use-before-define */
"use client";

import { ArrowLeft, Clock, Tag } from "lucide-react";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { ContentCategory, ContentItem } from "@/types/content.types";

// =========================
// Component Props
// =========================

interface ArticleLayoutProps {
  contentItem: ContentItem;
  relatedContent: ContentItem[];
  category: ContentCategory;
  markdownContent: string;
  currentLocale?: string; // Actual locale used (for future language switcher)
  availableLocales?: string[]; // Available translations (for future language switcher)
}

// =========================
// Article Layout Component
// =========================

export default function ArticleLayout({
  contentItem,
  relatedContent,
  category,
  markdownContent,
}: ArticleLayoutProps) {
  const { metadata } = contentItem;
  const { t } = useTranslation("content");
  const formattedCategory = t(`library.categories.${category}.title`, {
    defaultValue: category.replace(/-/g, " "),
  });
  const readingTimeLabel =
    metadata.readingTime !== undefined
      ? t("shared.readingTime", { count: metadata.readingTime })
      : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 lg:px-0">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-muted-foreground">
          <Link
            href={`/content/${category}`}
            className="inline-flex items-center gap-2 transition text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("article.breadcrumb", { category: formattedCategory })}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="space-y-6 rounded-app border border-border bg-card p-8 shadow-soft">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {/* Category Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 capitalize">
              <Tag className="h-4 w-4 text-primary" />
              {formattedCategory}
            </span>

            {/* Reading Time */}
            {readingTimeLabel && (
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readingTimeLabel}
              </span>
            )}

            {/* Intent Badge */}
            <span
              className={`px-3 py-1 rounded capitalize text-xs font-medium ${getIntentColor(
                metadata.intent
              )}`}
            >
              {t(`shared.intent.${metadata.intent}`, {
                defaultValue: metadata.intent,
              })}
            </span>
          </div>

          <h1 className="text-3xl font-serif-brand text-foreground md:text-4xl">
            {metadata.title}
          </h1>

          <p className="text-lg leading-relaxed text-muted-foreground">
            {metadata.description}
          </p>
        </header>

        {/* Content Area */}
        <main className="rounded-app border border-border bg-card p-8 shadow-soft md:p-10">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            {markdownContent ? (
              <Markdown
                options={{ forceBlock: true, disableParsingRawHTML: true }}
              >
                {markdownContent}
              </Markdown>
            ) : (
              <div className="rounded-2xl border border-border bg-background p-4">
                <h3 className="font-semibold text-foreground">
                  {t("article.loading.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("article.loading.description")}
                </p>
              </div>
            )}

            {/* Keywords */}
            {metadata.keywords.length > 0 && (
              <div className="mt-10 border-t border-border pt-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {t("article.relatedTopics")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {metadata.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm capitalize text-muted-foreground"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Related Content */}
        {relatedContent.length > 0 && (
          <section className="rounded-app border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-2xl font-serif-brand text-foreground">
              {t("article.relatedHeading")}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {relatedContent.map((item) => (
                <Link
                  key={item.metadata.slug}
                  href={`/content/${item.metadata.category}/${item.metadata.slug}`}
                  className="group block rounded-2xl border border-border bg-background p-5 transition hover:border-primary/40 hover:shadow-[0_8px_24px_-16px] hover:shadow-primary/40"
                >
                  <h3 className="mb-2 line-clamp-2 font-semibold text-foreground">
                    {item.metadata.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {item.metadata.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize opacity-80">
                      {t(
                        `library.categories.${item.metadata.category}.title`,
                        {
                          defaultValue: item.metadata.category.replace(
                            /-/g,
                            " "
                          ),
                        }
                      )}
                    </span>
                    {item.metadata.readingTime && (
                      <span className="flex items-center gap-2">
                        <span className="opacity-40">•</span>
                        <span>
                          {t("shared.minutes", {
                            count: item.metadata.readingTime,
                          })}
                        </span>
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// =========================
// Helper Functions
// =========================

function getIntentColor(intent: string): string {
  const colors = {
    informational: "bg-primary/10 text-primary",
    actionable: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
    supportive: "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200",
    therapeutic: "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200",
    emergency: "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
  };

  return colors[intent as keyof typeof colors] || colors.informational;
}
