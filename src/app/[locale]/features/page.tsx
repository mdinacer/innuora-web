import { APP_CONFIG } from "@/config/app";
import initTranslations from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Markdown from "markdown-to-jsx";

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

  // Build locale-aware URLs (respecting prefixDefault: false for English)
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const currentUrl = `${localePrefix}/features`;

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
      url: currentUrl,
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
        en: "/features", // Default locale, no prefix
        ar: "/ar/features",
        fr: "/fr/features",
        "x-default": "/features", // Default uses English (no prefix)
      },
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["pages"]);

  const data = {
    hero: {
      badge: t("features.hero.badge"),
      title: t("features.hero.title"),
      description: t("features.hero.description", {
        app_name: APP_CONFIG.name,
      }),
    },
    core: {
      badge: t("features.core.badge"),
      title: t("features.core.title"),
      items: (t("features.core.items", {
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    privacy: {
      badge: t("features.privacy.badge"),
      title: t("features.privacy.title"),
      items: (t("features.privacy.items", {
        app_name: APP_CONFIG.name,
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    insight: {
      badge: t("features.insight.badge"),
      title: t("features.insight.title"),
      items: (t("features.insight.items", {
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    interaction: {
      badge: t("features.interaction.badge"),
      title: t("features.interaction.title", {
        app_name: APP_CONFIG.name,
      }),
      items: (t("features.interaction.items", {
        app_name: APP_CONFIG.name,
        returnObjects: true,
        defaultValue: "",
      }) || []) as DataType[],
    },
    experience: {
      badge: t("features.experience.badge"),
      title: t("features.experience.title"),
      items: (t("features.experience.items", {
        returnObjects: true,
        defaultValue: "",
        app_name: APP_CONFIG.name,
      }) || []) as DataType[],
    },
    cta: {
      title: t("features.cta.title"),
      description: t("features.cta.description"),
      button: t("features.cta.button"),
    },
  };
  return (
    <main
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
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {data.hero.badge}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif-brand">
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
            <h2 className="text-2xl md:text-3xl font-serif-brand">
              {data.cta.title}
            </h2>
            <div className="text-muted-foreground text-lg">
              <Markdown>{data.cta.description}</Markdown>
            </div>
            <a
              href="/demo"
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:opacity-90"
            >
              {data.cta.button}
            </a>
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
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {data.badge}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif-brand">
            {data.title}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {data.items.map((item, i) => (
            <article
              key={i}
              className="rounded-app border bg-background p-6 shadow-soft text-left"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <div className="mt-2 text-muted-foreground text-sm">
                <Markdown>{item.body}</Markdown>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
