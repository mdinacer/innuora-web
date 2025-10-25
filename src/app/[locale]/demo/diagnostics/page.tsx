import type { Metadata } from "next";
import Link from "next/link";

import DiagnosticsTabs from "@/components/diagnostic-tabs";
import { APP_CONFIG } from "@/config/app";
import initTranslations, { type AppLocales } from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/i18n/paths";
import { buildLanguageAlternates, buildLocalizedUrl } from "@/lib/seo/url";
import { cn } from "@/lib/utils";

const BADGE_COLORS = {
  confidence: {
    high: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white",
    low: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
  },
  rigidity: {
    flexible: "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white",
    moderate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white",
    rigid: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["seo"]);

  const title = t("seo:demoDiagnostics.title", {
    app_name: APP_CONFIG.name,
  });
  const description = t("seo:demoDiagnostics.description", {
    app_name: APP_CONFIG.name,
  });

  const canonicalUrl = buildLocalizedUrl(locale, "/demo/diagnostics");
  const languageAlternates = buildLanguageAlternates("/demo/diagnostics");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: `${APP_CONFIG.domains.canonical}/og/innuora-cover.png`,
          width: 1200,
          height: 630,
          alt: t("seo:demoDiagnostics.ogImageAlt", {
            app_name: APP_CONFIG.name,
          }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${APP_CONFIG.domains.canonical}/og/innuora-cover.png`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
  };
}

export default async function DemoDiagnosticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["demo-diagnostics", "demo"]);

  const diagnostics = {
    badge: t("diagnostics.badge"),
    title: t("diagnostics.title"),
    description: t("diagnostics.description"),
    ariaLabel: t("diagnostics.ariaLabel", {
      defaultValue: "Diagnostics sections",
    }),
    labels: {
      rigidity: {
        rigid: t("diagnostics.labels.rigidity.rigid"),
        moderate: t("diagnostics.labels.rigidity.moderate"),
        flexible: t("diagnostics.labels.rigidity.flexible"),
      },
      confidence: {
        high: t("diagnostics.labels.confidence.high"),
        medium: t("diagnostics.labels.confidence.medium"),
        low: t("diagnostics.labels.confidence.low"),
      },
    },
    confidence: t("diagnostics.confidence"),
    basic: {
      title: t("diagnostics.basic.title"),
      now: {
        title: t("diagnostics.basic.now.title"),
        points: (t("diagnostics.basic.now.points", {
          returnObjects: true,
          defaultValue: "",
        }) || []) as string[],
      },
      rules: {
        title: t("diagnostics.basic.rules.title"),
        items: (t("diagnostics.basic.rules.items", {
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
        title: t("diagnostics.basic.why.title"),
        item: {
          title: t("diagnostics.basic.why.item.title"),
          body: t("diagnostics.basic.why.item.body"),
        },
      },
      meta: {
        title: t("diagnostics.basic.meta.title"),
        item: {
          title: t("diagnostics.basic.meta.item.title"),
          body: t("diagnostics.basic.meta.item.body"),
        },
      },
      leverage: {
        title: t("diagnostics.basic.leverage.title"),
        points: (t("diagnostics.basic.leverage.points", {
          returnObjects: true,
          defaultValue: "",
        }) || []) as string[],
      },
      start: {
        title: t("diagnostics.basic.start.title"),
        points: (t("diagnostics.basic.start.points", {
          returnObjects: true,
          defaultValue: "",
        }) || []) as string[],
      },
      resources: {
        title: t("diagnostics.basic.resources.title"),
        points: (t("diagnostics.basic.resources.points", {
          returnObjects: true,
          defaultValue: "",
        }) || []) as string[],
      },
    },
    advanced: {
      title: t("diagnostics.advanced.title"),
      state: {
        title: t("diagnostics.advanced.state.title"),
        labels: {
          primary: t("diagnostics.advanced.state.labels.primary"),
          secondary: t("diagnostics.advanced.state.labels.secondary"),
          risk: t("diagnostics.advanced.state.labels.risk"),
        },
        values: {
          primary: t("diagnostics.advanced.state.values.primary"),
          secondary: t("diagnostics.advanced.state.values.secondary"),
          risk_body: t("diagnostics.advanced.state.values.risk_body"),
        },
      },
      themes: {
        title: t("diagnostics.advanced.themes.title"),
        items: (t("diagnostics.advanced.themes.items", {
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
        title: t("diagnostics.advanced.distortions.title"),
        items: t("diagnostics.advanced.distortions.items", {
          returnObjects: true,
        }) as string[],
      },
      therapist_focus: {
        title: t("diagnostics.advanced.therapist_focus.title"),
        points: t("diagnostics.advanced.therapist_focus.points", {
          returnObjects: true,
        }) as string[],
      },
      clinical_interpretations: {
        title: t("diagnostics.advanced.clinical_interpretations.title"),
        points: t("diagnostics.advanced.clinical_interpretations.points", {
          returnObjects: true,
        }) as string[],
      },
      treatment_recommendations: {
        title: t("diagnostics.advanced.treatment_recommendations.title"),
        points: t("diagnostics.advanced.treatment_recommendations.points", {
          returnObjects: true,
        }) as string[],
      },
      professional_language: {
        title: t("diagnostics.advanced.professional_language.title"),
        points: t("diagnostics.advanced.professional_language.points", {
          returnObjects: true,
        }) as string[],
      },
      clinical_insights: {
        title: t("diagnostics.advanced.clinical_insights.title"),
        points: t("diagnostics.advanced.clinical_insights.points", {
          returnObjects: true,
        }) as string[],
      },
    },
  };

  const parentDemoLink = buildLocalizedPath(locale as AppLocales, "/demo");

  const contactLink = `mailto:${APP_CONFIG.contact.business}`;

  return (
    <main
      id="main-content"
      className={cn(
        "min-h-screen bg-background",
        "rtl:font-arabic-body rtl:text-lg",
      )}
    >
      <section className="py-16 md:py-20 border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
            {diagnostics.badge}
          </p>
          <h1 className="text-4xl md:text-5xl ltr:font-serif-brand rtl:font-arabic-title leading-tight">
            {diagnostics.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            {diagnostics.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
            <Link
              href={parentDemoLink}
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-foreground shadow-soft transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {t("diagnostics.backLink", { defaultValue: "Back to demo" })}
            </Link>
            <Link
              href={contactLink}
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:bg-primary/90 transition"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
          <DiagnosticsTabs
            basicLabel={diagnostics.basic.title}
            advancedLabel={diagnostics.advanced.title}
            ariaLabel={diagnostics.ariaLabel}
            basicContent={
              <div className="space-y-8 text-sm text-muted-foreground">
                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.basic.now.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {diagnostics.basic.now.points.map((point) => (
                      <li key={point} className="list-item">
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.basic.rules.title}
                  </h3>
                  <div className="space-y-4">
                    {diagnostics.basic.rules.items.map((rule) => (
                      <article
                        key={rule.title}
                        className="rounded-xl bg-muted p-4 border-l-4 border-primary/60"
                      >
                        <header className="flex items-center justify-between gap-3 mb-2">
                          <h4 className="font-semibold text-foreground">
                            {rule.title}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "rounded-md px-2 py-0.5 text-xs uppercase",
                                BADGE_COLORS.rigidity[rule.rigidity],
                              )}
                            >
                              {diagnostics.labels.rigidity[rule.rigidity] ??
                                rule.rigidity}
                            </span>
                            <span
                              className={cn(
                                "rounded-md px-2 py-0.5 text-xs uppercase",
                                BADGE_COLORS.confidence[rule.confidence],
                              )}
                            >
                              {diagnostics.labels.confidence[rule.confidence] ??
                                rule.confidence}
                            </span>
                          </div>
                        </header>
                        <p>{rule.body}</p>
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
                    {diagnostics.basic.leverage.points.map((point) => (
                      <li key={point} className="list-item">
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.basic.start.title}
                  </h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {diagnostics.basic.start.points.map((point) => (
                      <li key={point} className="list-item">
                        {point}
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.basic.resources.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {diagnostics.basic.resources.points.map((point) => (
                      <li key={`${diagnostics.basic.resources.title}-${point}`}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            }
            advancedContent={
              <div className="space-y-8 text-sm text-muted-foreground">
                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.state.title}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-xl bg-blue-100/70 p-4">
                      <h4 className="font-semibold text-blue-900">
                        {diagnostics.advanced.state.labels.primary}
                      </h4>
                      <p className="text-sm">
                        {diagnostics.advanced.state.values.primary}
                      </p>
                    </article>
                    <article className="rounded-xl bg-yellow-100/70 p-4">
                      <h4 className="font-semibold text-yellow-900">
                        {diagnostics.advanced.state.labels.secondary}
                      </h4>
                      <p className="text-sm">
                        {diagnostics.advanced.state.values.secondary}
                      </p>
                    </article>
                    <article className="rounded-xl bg-emerald-100/70 p-4">
                      <h4 className="font-semibold text-emerald-900">
                        {diagnostics.advanced.state.labels.risk}
                      </h4>
                      <p className="text-sm">
                        {diagnostics.advanced.state.values.risk_body}
                      </p>
                    </article>
                  </div>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.themes.title}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {diagnostics.advanced.themes.items.map((theme) => (
                      <article
                        key={theme.title}
                        className="rounded-xl border border-border bg-background p-4 shadow-soft space-y-2"
                      >
                        <header className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground flex-1">
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
                          {theme.points.map((point) => (
                            <li key={`${theme.title}-${point}`}>{point}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.distortions.title}
                  </h3>
                  <ul className="space-y-3">
                    {diagnostics.advanced.distortions.items.map((item) => (
                      <li
                        key={`${diagnostics.advanced.distortions.title}-${item}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.therapist_focus.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {diagnostics.advanced.therapist_focus.points.map(
                      (point) => (
                        <li
                          key={`${diagnostics.advanced.therapist_focus.title}-${point}`}
                        >
                          {point}
                        </li>
                      ),
                    )}
                  </ul>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.clinical_interpretations.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {diagnostics.advanced.clinical_interpretations.points.map(
                      (point) => (
                        <li
                          key={`${diagnostics.advanced.clinical_interpretations.title}-${point}`}
                        >
                          {point}
                        </li>
                      ),
                    )}
                  </ul>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.treatment_recommendations.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {diagnostics.advanced.treatment_recommendations.points.map(
                      (point) => (
                        <li
                          key={`${diagnostics.advanced.treatment_recommendations.title}-${point}`}
                        >
                          {point}
                        </li>
                      ),
                    )}
                  </ul>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.professional_language.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {diagnostics.advanced.professional_language.points.map(
                      (point) => (
                        <li
                          key={`${diagnostics.advanced.professional_language.title}-${point}`}
                        >
                          {point}
                        </li>
                      ),
                    )}
                  </ul>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-xl text-foreground ltr:font-serif-brand rtl:font-arabic-title">
                    {diagnostics.advanced.clinical_insights.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {diagnostics.advanced.clinical_insights.points.map(
                      (point) => (
                        <li
                          key={`${diagnostics.advanced.clinical_insights.title}-${point}`}
                        >
                          {point}
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              </div>
            }
          />
        </div>
      </section>

      <section className="border-t border-border py-16 bg-card">
        <div className="mx-auto max-w-5xl rounded-app border border-primary/20 bg-primary/5 p-10 text-center shadow-elevated space-y-5">
          <h2 className="text-3xl ltr:font-serif-brand rtl:font-arabic-title">
            {t("cta.title", { app_name: APP_CONFIG.name })}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("cta.description")}
          </p>
          <Link
            href={contactLink}
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:bg-primary/90 text-sm font-medium transition"
          >
            {t("cta.button")}
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("cta.disclaimer")}
          </p>
        </div>
      </section>
    </main>
  );
}
