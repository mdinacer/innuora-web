import Markdown from "markdown-to-jsx";
import type { Metadata } from "next";
import Link from "next/link";

import { APP_CONFIG } from "@/config/app";
import type { AppLocales } from "@/lib/i18n";
import initTranslations from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/i18n/paths";
import { buildLanguageAlternates, buildLocalizedUrl } from "@/lib/seo/url";
import { cn } from "@/lib/utils";

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["seo"]);

  const title = t("seo:about.title", { app_name: APP_CONFIG.name });
  const description = t("seo:about.description", { app_name: APP_CONFIG.name });

  const canonicalUrl = buildLocalizedUrl(locale, "/about");
  const languageAlternates = buildLanguageAlternates("/about");

  return {
    title,
    description,
    keywords: [
      "Innuora about",
      "about Innuora",
      "AI emotional wellness platform",
      "empathic intelligence design",
      "CBT-informed AI approach",
      "mental health technology innovation",
      "privacy-first emotional AI",
      "zero-knowledge AI architecture",
      "therapeutic AI company",
      "emotional clarity technology",
      ...APP_CONFIG.seo.primaryKeywords,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      siteName: APP_CONFIG.name,
      url: canonicalUrl,
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
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["about"]);

  const { hero, mission, founding, principles, cta } = {
    hero: {
      badge: t("hero.badge"),
      title: t("hero.title"),
      description: t("hero.description", { app_name: APP_CONFIG.name }),
    },
    mission: {
      title: t("mission.title"),
      paragraphs: (t("mission.paragraphs", {
        returnObjects: true,
        defaultValue: "",
        app_name: APP_CONFIG.name,
      }) || []) as string[],
    },
    founding: {
      title: t("founding.title"),
      body: t("founding.body", {
        app_name: APP_CONFIG.name,
      }),
    },
    principles: {
      badge: t("principles.badge"),
      title: t("principles.title", { app_name: APP_CONFIG.name }),
      items: (t("principles.items", {
        returnObjects: true,
        defaultValue: "",
        app_name: APP_CONFIG.name,
      }) || []) as { title: string; body: string }[],
    },
    cta: {
      title: t("cta.title"),
      description: t("cta.description", { app_name: APP_CONFIG.name }),
      button: t("cta.button"),
    },
  };
  return (
    <main
      id="main-content"
      className={cn(
        "relative",
        "min-h-screen flex flex-col",
        "rtl:font-arabic-body rtl:text-lg",
        "[&_section]:relative",
      )}
    >
      {/* Hero Section */}
      <section className="py-20 border-b bg-card">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {hero.badge}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif-brand">
            {hero.title}
          </h1>

          <Markdown
            options={{
              forceBlock: true,
              disableParsingRawHTML: true,
              overrides: {
                strong: {
                  props: { className: "font-bold" },
                },

                em: {
                  props: {
                    className: "italic",
                  },
                },

                p: {
                  props: {
                    className:
                      "text-muted-foreground text-lg max-w-2xl mx-auto",
                  },
                },
              },
            }}
          >
            {hero.description}
          </Markdown>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-serif-brand">{mission.title}</h2>
            {mission.paragraphs.map((paragraph, idx) => (
              <Markdown
                key={`${idx}-${paragraph.slice(0, 24)}`}
                options={{
                  forceBlock: true,
                  disableParsingRawHTML: true,
                  overrides: {
                    strong: {
                      props: { className: "font-bold" },
                    },
                    em: {
                      props: {
                        className: "italic ",
                      },
                    },
                    p: { props: { className: "mb-4 text-muted-foreground" } },
                  },
                }}
              >
                {paragraph}
              </Markdown>
            ))}
          </div>
          <div className="rounded-app bg-brand-gradient opacity-10 blur-3xl h-64 md:h-full"></div>
        </div>
      </section>

      {/* Founding Section */}
      <section className="py-16 border-t bg-card">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-serif-brand">{founding.title}</h2>
          <Markdown
            options={{
              forceBlock: true,
              disableParsingRawHTML: true,
              overrides: {
                strong: {
                  props: { className: "font-semibold text-foreground" },
                },
                em: {
                  props: { className: "italic text-foreground/90 text-lg" },
                },
                p: { props: { className: "mb-4" } },
              },
            }}
          >
            {founding.body}
          </Markdown>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-16 border-t bg-background">
        <div className="mx-auto max-w-6xl px-4 space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {principles.badge}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif-brand">
              {principles.title}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {principles.items.map((item) => (
              <article
                key={item.title}
                className="rounded-app border bg-card p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <Markdown
                  options={{
                    forceBlock: true,
                    disableParsingRawHTML: true,
                    overrides: {
                      strong: {
                        props: { className: "font-bold" },
                      },
                      em: {
                        props: {
                          className: "italic ",
                        },
                      },
                      p: { props: { className: "mt-2 text-muted-foreground" } },
                    },
                  }}
                >
                  {item.body}
                </Markdown>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 rounded-app bg-flame-gradient p-1 shadow-elevated">
          <div className="bg-card rounded-app p-10 md:p-12 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif-brand">
              {cta.title}
            </h2>

            <Markdown
              options={{
                forceBlock: true,
                disableParsingRawHTML: true,
                overrides: {
                  strong: {
                    props: { className: "font-bold" },
                  },
                  em: {
                    props: {
                      className: "italic ",
                    },
                  },
                  p: { props: { className: "text-muted-foreground" } },
                },
              }}
            >
              {cta.description}
            </Markdown>
            <Link
              href={buildLocalizedPath(locale as AppLocales, "/join")}
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:opacity-90"
            >
              {cta.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
