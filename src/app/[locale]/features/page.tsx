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

  const title = t("seo:features.title", { app_name: APP_CONFIG.name });
  const description = t("seo:features.description", {
    app_name: APP_CONFIG.name,
  });

  const canonicalUrl = buildLocalizedUrl(locale, "/features");
  const languageAlternates = buildLanguageAlternates("/features");

  return {
    title,
    description,
    keywords: [
      "Innuora features",
      "therapeutic AI technology",
      "CBT-informed AI tools",
      "encrypted self-reflection platform",
      "zero-knowledge AI architecture",
      "empathic intelligence engine",
      "AI emotional wellness system",
      "cognitive behavioral AI framework",
      "reflective AI diagnostics",
      "secure emotional AI companion",
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

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["features"]);

  const data = {
    hero: {
      badge: t("hero.badge"),
      title: t("hero.title"),
      description: t("hero.description", {
        app_name: APP_CONFIG.name,
      }),
    },
    core: {
      badge: t("core.badge"),
      title: t("core.title"),
      items: (t("core.items", {
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    privacy: {
      badge: t("privacy.badge"),
      title: t("privacy.title"),
      items: (t("privacy.items", {
        app_name: APP_CONFIG.name,
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    insight: {
      badge: t("insight.badge"),
      title: t("insight.title"),
      items: (t("insight.items", {
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    interaction: {
      badge: t("interaction.badge"),
      title: t("interaction.title", {
        app_name: APP_CONFIG.name,
      }),
      items: (t("interaction.items", {
        app_name: APP_CONFIG.name,
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    experience: {
      badge: t("experience.badge"),
      title: t("experience.title"),
      items: (t("experience.items", {
        returnObjects: true,
        defaultValue: "",
        app_name: APP_CONFIG.name,
      }) || []) as DataType[],
    },
    cta: {
      title: t("cta.title"),
      description: t("cta.description"),
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
        "[&_section]:relative"
      )}
    >
      {/* Hero */}
      <section className="py-20 border-b bg-card text-center space-y-6">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm ltr:text-base rtl:mb-1 uppercase tracking-[0.3em] text-muted-foreground">
            {data.hero.badge}
          </p>
          <h1 className="text-4xl md:text-5xl ltr: rtl:font-arabic-title">
            {data.hero.title}
          </h1>
          <div className="text-lg text-muted-foreground mt-4">
            <Markdown>{data.hero.description}</Markdown>
          </div>
        </div>
      </section>

      {/* Core Experience */}
      <FeatureSection data={data.core} />

      {/* Privacy & Trust */}
      <FeatureSection data={data.privacy} background="bg-card" />

      {/* Insight & Awareness */}
      <FeatureSection data={data.insight} />

      {/* Interaction */}
      <FeatureSection data={data.interaction} />

      {/* Access & Ease */}
      <FeatureSection data={data.experience} background="bg-card" />

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 rounded-app bg-flame-gradient p-1 shadow-elevated">
          <div className="bg-card rounded-app p-10 md:p-12 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl ">{data.cta.title}</h2>
            <div className="text-muted-foreground text-lg">
              <Markdown>{data.cta.description}</Markdown>
            </div>
            <Link
              href={buildLocalizedPath(locale as AppLocales, "/demo")}
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:opacity-90"
            >
              {data.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

type DataType = { title: string; body: string };

/**
 * Reusable Section Renderer
 */
function FeatureSection({
  data,
  background,
}: {
  data: {
    badge: string;
    title: string;
    items: DataType[];
  };
  background?: string;
}) {
  return (
    <section className={cn("py-16 border-b", background)}>
      <div className="mx-auto max-w-6xl px-4 space-y-10">
        <div className="text-center space-y-4">
          <p className="text-sm ltr:text-base ltr:mb-1 uppercase tracking-[0.3em] text-muted-foreground">
            {data.badge}
          </p>
          <h2 className="text-3xl md:text-4xl ">{data.title}</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {data.items.map((item, i) => (
            <article
              key={i}
              className="rounded-app border bg-background p-6 shadow-soft ltr:text-left rtl:text-right"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <div className="mt-2 text-muted-foreground ltr:text-sm  ltr:leading-loose">
                <Markdown>{item.body}</Markdown>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
