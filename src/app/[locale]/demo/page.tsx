import { Metadata } from "next";
import DiagnosticsTabs from "@/components/diagnostic-tabs";
import { APP_CONFIG } from "@/config/app";
import initTranslations from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BotIcon, BrainCircuitIcon, UserIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["seo", "pages"]);

  const title = t("seo:demo.title", { app_name: APP_CONFIG.name });
  const description = t("seo:demo.description", { app_name: APP_CONFIG.name });

  // Build locale-aware URLs (respecting prefixDefault: false for English)
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const currentUrl = `${localePrefix}/demo`;

  return {
    title,
    description,
    keywords: [
      "AI therapy demo",
      "CBT conversation example",
      "mental health AI demo",
      "emotional support AI",
      "therapy chatbot demo",
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
        en: "/demo", // Default locale, no prefix
        ar: "/ar/demo",
        fr: "/fr/demo",
        "x-default": "/demo", // Default uses English (no prefix)
      },
    },
  };
}

const TherapeuticProgressChart = dynamic(
  () => import("@/components/therapeutic-chart")
);
type Message = {
  headline: string;
  user: string;
  genericProductivity: string;
  genericWellness: string;
  app: string;
};

const BADGE_COLORS = {
  // Confidence Levels
  confidence: {
    high: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white",
    low: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
  },

  // Rigidity Levels
  rigidity: {
    flexible: "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white",
    moderate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white",
    rigid: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
  },

  // Difficulty Levels
  difficulty: {
    gentle: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white",
    moderate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white",
    challenging: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
    beginner: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white",
    intermediate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white",
    advanced: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
  },
};

const PREVIEW_COUNT = 5;

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale = "en" } = await params;

  const { t } = await initTranslations(locale, ["pages"]);
  const { messages, meta, conversation, highlights, diagnostics, cta } = {
    messages: (t("demo.messages", { returnObjects: true, defaultValue: "" }) ||
      []) as Message[],
    meta: {
      badge: t("demo.meta.badge"),
      title: t("demo.meta.title"),
      description: t("demo.meta.description", {
        app_name: APP_CONFIG.name,
      }),
    },
    conversation: {
      badge: t("demo.conversation.badge"),
      title: t("demo.conversation.title"),
      description: t("demo.conversation.description", {
        app_name: APP_CONFIG.name,
      }),
      userReflection: t("demo.conversation.userReflection"),
      appVerbatim: t("demo.conversation.appVerbatim", {
        app_name: APP_CONFIG.name,
      }),
      vs: t("demo.conversation.vs"),
      vsLabel: t("demo.conversation.vsLabel"),
      genericProductivity: t("demo.conversation.genericProductivity"),
      genericWellness: t("demo.conversation.genericWellness"),
    },
    highlights: {
      badge: t("demo.highlights.badge"),
      title: t("demo.highlights.title"),
      items: (t("demo.highlights.items", {
        returnObjects: true,
        defaultValue: "",
        app_name: APP_CONFIG.name,
      }) || []) as { title: string; body: string }[],
    },
    diagnostics: {
      badge: t("demo.diagnostics.badge"),
      title: t("demo.diagnostics.title"),
      description: t("demo.diagnostics.description"),
      labels: {
        rigidity: {
          rigid: t("demo.diagnostics.labels.rigidity.rigid"),
          moderate: t("demo.diagnostics.labels.rigidity.moderate"),
          flexible: t("demo.diagnostics.labels.rigidity.flexible"),
        },
        confidence: {
          high: t("demo.diagnostics.labels.confidence.high"),
          medium: t("demo.diagnostics.labels.confidence.medium"),
          low: t("demo.diagnostics.labels.confidence.low"),
        },
      },
      confidence: t("demo.diagnostics.confidence"),
      basic: {
        title: t("demo.diagnostics.basic.title"),
        now: {
          title: t("demo.diagnostics.basic.now.title"),
          points: (t("demo.diagnostics.basic.now.points", {
            returnObjects: true,
            defaultValue: "",
          }) || []) as string[],
        },
        rules: {
          title: t("demo.diagnostics.basic.rules.title"),
          items: (t("demo.diagnostics.basic.rules.items", {
            returnObjects: true,
            defaultValue: "",
          }) || []) as {
            title: string;
            body: string;
            rigidity: "rigid" | "moderate" | "flexible";
            confidence: "high" | "medium" | "low";
          }[],
        },
        why: {
          title: t("demo.diagnostics.basic.why.title"),
          item: {
            title: t("demo.diagnostics.basic.why.item.title"),
            body: t("demo.diagnostics.basic.why.item.body"),
          },
        },
        meta: {
          title: t("demo.diagnostics.basic.meta.title"),
          item: {
            title: t("demo.diagnostics.basic.meta.item.title"),
            body: t("demo.diagnostics.basic.meta.item.body"),
          },
        },

        leverage: {
          title: t("demo.diagnostics.basic.leverage.title"),
          points: (t("demo.diagnostics.basic.leverage.points", {
            returnObjects: true,
            defaultValue: "",
          }) || []) as string[],
        },

        start: {
          title: t("demo.diagnostics.basic.start.title"),
          points: (t("demo.diagnostics.basic.start.points", {
            returnObjects: true,
            defaultValue: "",
          }) || []) as string[],
        },
        resources: {
          title: t("demo.diagnostics.basic.resources.title"),
          points: (t("demo.diagnostics.basic.resources.points", {
            returnObjects: true,
            defaultValue: "",
          }) || []) as string[],
        },
      },
      advanced: {
        title: t("demo.diagnostics.advanced.title"),
        state: {
          title: t("demo.diagnostics.advanced.state.title"),
          labels: {
            primary: t("demo.diagnostics.advanced.state.labels.primary"),
            secondary: t("demo.diagnostics.advanced.state.labels.secondary"),
            risk: t("demo.diagnostics.advanced.state.labels.risk"),
          },
          values: {
            primary: t("demo.diagnostics.advanced.state.values.primary"),
            secondary: t("demo.diagnostics.advanced.state.values.secondary"),
            risk_body: t("demo.diagnostics.advanced.state.values.risk_body"),
          },
        },
        themes: {
          title: t("demo.diagnostics.advanced.themes.title"),
          items: (t("demo.diagnostics.advanced.themes.items", {
            returnObjects: true,
            defaultValue: "",
          }) || []) as {
            title: string;
            severity: string;
            trajectory: string;
            points: string[];
          }[],
        },
        distortions: {
          title: t("demo.diagnostics.advanced.distortions.title"),
          items: t("demo.diagnostics.advanced.distortions.items", {
            returnObjects: true,
          }) as string[],
        },
        therapist_focus: {
          title: t("demo.diagnostics.advanced.therapist_focus.title"),
          points: t("demo.diagnostics.advanced.therapist_focus.points", {
            returnObjects: true,
          }) as string[],
        },
        clinical_interpretations: {
          title: t("demo.diagnostics.advanced.clinical_interpretations.title"),
          points: t(
            "demo.diagnostics.advanced.clinical_interpretations.points",
            { returnObjects: true }
          ) as string[],
        },
        treatment_recommendations: {
          title: t("demo.diagnostics.advanced.treatment_recommendations.title"),
          points: t(
            "demo.diagnostics.advanced.treatment_recommendations.points",
            { returnObjects: true }
          ) as string[],
        },
        professional_language: {
          title: t("demo.diagnostics.advanced.professional_language.title"),
          points: t("demo.diagnostics.advanced.professional_language.points", {
            returnObjects: true,
          }) as string[],
        },
        clinical_insights: {
          title: t("demo.diagnostics.advanced.clinical_insights.title"),
          points: t("demo.diagnostics.advanced.clinical_insights.points", {
            returnObjects: true,
          }) as string[],
        },
      },
    },
    cta: {
      title: t("demo.cta.title", {
        app_name: APP_CONFIG.name,
      }),
      description: t("demo.cta.description"),
      button: t("demo.cta.button"),
      disclaimer: t("demo.cta.disclaimer"),
    },
  };

  const previewMessages = messages.slice(0, PREVIEW_COUNT);
  const remainingMessages = messages.slice(PREVIEW_COUNT);
  const quickLinks = [
    { href: "#conversation", label: conversation.badge },
    { href: "#highlights", label: highlights.badge },
    { href: "#analytics", label: t("demo.chart.header.badge") },
    { href: "#diagnostics", label: diagnostics.badge },
    { href: "#cta", label: t("demo.cta.button") },
  ];

  const renderMessageCard = (
    { headline, user, app, genericProductivity, genericWellness }: Message,
    key: number
  ) => (
    <article
      key={key}
      className="relative rounded-app border border-border bg-background p-6 md:p-8 shadow-soft"
    >
      <div className="flex gap-4">
        <div className="flex-1 space-y-6">
          <header className="space-y-2">
            <h3 className="text-lg md:text-xl font-semibold ltr:font-serif-brand rtl:font-arabic-title text-foreground leading-snug">
              {headline}
            </h3>
          </header>

          <div className="space-y-6">
            <div className="rounded-xl border border-primary/25 bg-primary/5 p-5 md:p-6 space-y-4">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-primary">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-primary-foreground text-[10px]">
                    <UserIcon className="text-primary" />
                  </span>
                  <span>{conversation.userReflection}</span>
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  {user}
                </p>
              </div>
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 shadow-[0_4px_20px_-12px_rgba(8,47,73,0.45)]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full  text-primary-foreground text-[10px]">
                    <Image
                      src={"/assets/images/logo.png"}
                      alt={APP_CONFIG.name}
                      width={16}
                      height={16}
                    />
                  </span>
                  <span>{conversation.appVerbatim}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{app}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
                <span className="uppercase inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-foreground text-[10px]">
                  {conversation.vs}
                </span>
                <span>{conversation.vsLabel}</span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-foreground text-[10px]">
                      <BotIcon className="text-primary" />
                    </span>
                    <span>{conversation.genericProductivity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {genericProductivity}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-foreground text-[10px]">
                      <BrainCircuitIcon className="text-primary" />
                    </span>
                    <span>{conversation.genericWellness}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {genericWellness}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div
      className={cn(
        "relative flex-1",
        "min-h-screen flex flex-col",
        "rtl:font-arabic-body rtl:text-lg "
      )}
    >
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground shadow-soft">
            {meta.badge}
          </p>
          <h1 className="text-4xl md:text-5xl leading-tight ltr:font-serif-brand rtl:font-arabic-title">
            {meta.title}
          </h1>
          <p className="text-lg text-muted-foreground">{meta.description}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="mailto:hello@innuora.com"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:opacity-90 text-sm font-medium transition"
            >
              {cta.button}
            </Link>
            <Link
              href="#conversation"
              className="inline-flex items-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-soft hover:border-primary/40 hover:text-primary transition"
            >
              {conversation.title}
            </Link>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {quickLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background px-3 py-2 font-semibold hover:border-primary/40 hover:text-primary transition"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section
        id="conversation"
        className="border-t border-border bg-card py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {conversation.badge}
            </p>
            <h2 className="ltr:font-serif-brand rtl:font-arabic-title text-3xl">
              {conversation.title}
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-muted-foreground">
              {conversation.description}
            </p>
          </div>
          <div id="conversation-feed" className="space-y-8">
            {previewMessages.map((message, index) =>
              renderMessageCard(message, index)
            )}
            {remainingMessages.length > 0 && (
              <details className="rounded-app border border-border bg-background p-6 shadow-soft">
                <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {conversation.badge} ·{" "}
                  {remainingMessages.length.toString().padStart(2, "0")} more
                  messages
                </summary>
                <div className="mt-6 space-y-8">
                  {remainingMessages.map((message, index) =>
                    renderMessageCard(message, index + PREVIEW_COUNT)
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </section>

      <section id="highlights" className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {highlights.badge}
            </p>
            <h2 className="ltr:font-serif-brand rtl:font-arabic-title text-3xl">
              {highlights.title}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.items.map((item, index) => (
              <article
                key={index}
                className="rounded-app border border-border bg-card p-6 shadow-soft space-y-3"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="analytics"
        className="border-t border-border bg-card/40 py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <TherapeuticProgressChart />
        </div>
      </section>

      <section
        id="diagnostics"
        className="border-t border-border bg-card py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {diagnostics.badge}
            </p>
            <h2 className="text-3xl ltr:font-serif-brand rtl:font-arabic-title">
              {diagnostics.title}
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-muted-foreground">
              {diagnostics.description}
            </p>
          </div>

          <div className="rounded-app border border-border bg-background p-6 shadow-soft space-y-6">
            <DiagnosticsTabs
              basicLabel={diagnostics.basic.title}
              advancedLabel={diagnostics.advanced.title}
              basicContent={
                <div
                  id="basic"
                  key={"basic"}
                  className="tab-content active space-y-8 text-sm text-muted-foreground"
                >
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.basic.now.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.basic.now.points.map((item, index) => (
                        <li key={index} className="list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.basic.rules.title}
                    </h3>
                    <div className="space-y-4">
                      {diagnostics.basic.rules.items.map((item, index) => (
                        <article
                          key={index}
                          className="rounded-xl bg-muted p-4 border-l-4 border-primary/60"
                        >
                          <header className="flex items-center justify-between gap-3 mb-2">
                            <h4 className="font-semibold text-foreground">
                              {item.title}
                            </h4>
                            <div className="flex items-center shrink-0 text-center grid-cols-2 gap-3">
                              <div
                                className={cn(
                                  "rounded-md px-2 py-0.5 text-xs uppercase",
                                  BADGE_COLORS.rigidity[item.rigidity]
                                )}
                              >
                                {diagnostics.labels.rigidity[item.rigidity] ??
                                  item.rigidity}
                              </div>
                              <div
                                className={cn(
                                  "rounded-md px-2 py-0.5 text-xs text-center uppercase",
                                  BADGE_COLORS.confidence[item.confidence]
                                )}
                              >
                                {diagnostics.labels.confidence[
                                  item.confidence
                                ] ?? item.confidence}
                              </div>
                            </div>
                          </header>
                          <p>{item.body}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.basic.why.title}
                    </h3>
                    <article className="rounded-xl bg-muted p-4 border-l-4 border-primary/60">
                      <h4 className="font-semibold mb-2">
                        {diagnostics.basic.why.item.title}
                      </h4>
                      <p>{diagnostics.basic.why.item.body}</p>
                    </article>
                  </section>

                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.basic.meta.title}
                    </h3>
                    <article className="rounded-xl bg-muted p-4 border-l-4 border-primary/60">
                      <h4 className="font-semibold mb-2">
                        {diagnostics.basic.meta.item.title}
                      </h4>
                      <p>{diagnostics.basic.meta.item.body}</p>
                    </article>
                  </section>

                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.basic.leverage.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.basic.leverage.points.map((item, index) => (
                        <li key={index} className="list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.basic.start.title}
                    </h3>
                    <ol className="list-decimal list-inside space-y-2">
                      {diagnostics.basic.start.points.map((item, index) => (
                        <li key={index} className="list-item">
                          {item}
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.basic.resources.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.basic.resources.points.map((item, index) => (
                        <li key={index} className="list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              }
              advancedContent={
                <div
                  key="advanced"
                  id="advanced"
                  className="tab-content space-y-8 text-sm text-muted-foreground"
                >
                  {/* === Emotional State & Risk === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.state.title}
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl bg-muted p-4">
                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.3em]">
                          {diagnostics.advanced.state.labels.primary}
                        </p>
                        <p className="text-base font-semibold capitalize">
                          {diagnostics.advanced.state.values.primary}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted p-4">
                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.3em]">
                          {diagnostics.advanced.state.labels.secondary}
                        </p>
                        <p>{diagnostics.advanced.state.values.secondary}</p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-muted p-4 border-l-4 border-primary/60">
                      <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-1">
                        {diagnostics.advanced.state.labels.risk}
                      </p>
                      <p>{diagnostics.advanced.state.values.risk_body}</p>
                    </div>
                  </section>

                  {/* === Themes === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.themes.title}
                    </h3>

                    <div className="space-y-4">
                      {diagnostics.advanced.themes.items.map((theme, index) => (
                        <article
                          key={index}
                          className="rounded-xl bg-muted p-4"
                        >
                          <header className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">
                              {theme.title}
                            </h4>
                            <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-0.5 text-xs text-red-800 uppercase">
                              {theme.severity}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-800 uppercase">
                              {theme.trajectory}
                            </span>
                          </header>

                          <ul className="list-disc list-inside space-y-1">
                            {theme.points.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </section>

                  {/* === Distortions === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.distortions.title}
                    </h3>
                    <ul className="space-y-3">
                      {diagnostics.advanced.distortions.items.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </section>

                  {/* === Therapist Focus === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.therapist_focus.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.advanced.therapist_focus.points.map(
                        (point, index) => (
                          <li key={index}>{point}</li>
                        )
                      )}
                    </ul>
                  </section>

                  {/* === Clinical Interpretations === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.clinical_interpretations.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.advanced.clinical_interpretations.points.map(
                        (point, index) => (
                          <li key={index}>{point}</li>
                        )
                      )}
                    </ul>
                  </section>

                  {/* === Treatment Recommendations === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.treatment_recommendations.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.advanced.treatment_recommendations.points.map(
                        (point, index) => (
                          <li key={index}>{point}</li>
                        )
                      )}
                    </ul>
                  </section>

                  {/* === Professional Language === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.professional_language.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.advanced.professional_language.points.map(
                        (point, index) => (
                          <li key={index}>{point}</li>
                        )
                      )}
                    </ul>
                  </section>

                  {/* === Clinical Insights === */}
                  <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                      {diagnostics.advanced.clinical_insights.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {diagnostics.advanced.clinical_insights.points.map(
                        (point, index) => (
                          <li key={index}>{point}</li>
                        )
                      )}
                    </ul>
                  </section>
                </div>
              }
            />
          </div>
        </div>
      </section>

      <section id="cta" className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl rounded-app border border-primary/20 bg-primary/5 p-10 text-center shadow-elevated space-y-5">
          <h2 className="text-3xl ltr:font-serif-brand rtl:font-arabic-title">
            {cta.title}
          </h2>
          <p className="text-sm text-muted-foreground">{cta.description}</p>
          <Link
            href="mailto:hello@innuora.com"
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:opacity-90 text-sm font-medium transition"
          >
            {cta.button}
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {cta.disclaimer}
          </p>
        </div>
      </section>
    </div>
  );
}
