import { BotIcon, BrainCircuitIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { APP_CONFIG } from "@/config/app";
import initTranslations, { type AppLocales } from "@/lib/i18n";
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
  const { t } = await initTranslations(locale, ["seo", "demo"]);

  const title = t("seo:demo.title", { app_name: APP_CONFIG.name });
  const description = t("seo:demo.description", { app_name: APP_CONFIG.name });

  const canonicalUrl = buildLocalizedUrl(locale, "/demo");
  const languageAlternates = buildLanguageAlternates("/demo");

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

const TherapeuticProgressChart = dynamic(
  () => import("@/components/therapeutic-chart"),
);
type Message = {
  headline: string;
  user: string;
  genericProductivity: string;
  genericWellness: string;
  app: string;
};

const PREVIEW_COUNT = 5;

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale = "en" } = await params;

  const { t } = await initTranslations(locale, ["demo"]);
  const { messages, meta, conversation, highlights, diagnosticsPreview, cta } =
    {
      messages: (t("messages", { returnObjects: true, defaultValue: "" }) ||
        []) as Message[],
      meta: {
        badge: t("meta.badge"),
        title: t("meta.title"),
        description: t("meta.description", {
          app_name: APP_CONFIG.name,
        }),
      },
      conversation: {
        badge: t("conversation.badge"),
        title: t("conversation.title"),
        description: t("conversation.description", {
          app_name: APP_CONFIG.name,
        }),
        userReflection: t("conversation.userReflection"),
        appVerbatim: t("conversation.appVerbatim", {
          app_name: APP_CONFIG.name,
        }),
        vs: t("conversation.vs"),
        vsLabel: t("conversation.vsLabel"),
        genericProductivity: t("conversation.genericProductivity"),
        genericWellness: t("conversation.genericWellness"),
      },
      highlights: {
        badge: t("highlights.badge"),
        title: t("highlights.title"),
        items: (t("highlights.items", {
          returnObjects: true,
          defaultValue: "",
          app_name: APP_CONFIG.name,
        }) || []) as { title: string; body: string }[],
      },
      diagnosticsPreview: {
        badge: t("diagnosticsPreview.badge"),
        title: t("diagnosticsPreview.title"),
        description: t("diagnosticsPreview.description"),
        ctaLabel: t("diagnosticsPreview.ctaLabel"),
      },
      cta: {
        title: t("cta.title", {
          app_name: APP_CONFIG.name,
        }),
        description: t("cta.description"),
        button: t("cta.button"),
        disclaimer: t("cta.disclaimer"),
      },
    };

  const previewMessages = messages.slice(0, PREVIEW_COUNT);
  const remainingMessages = messages.slice(PREVIEW_COUNT);
  const diagnosticsLink = buildLocalizedPath(
    locale as AppLocales,
    "/demo/diagnostics",
  );
  const quickLinks = [
    { href: "#conversation", label: conversation.badge },
    { href: "#highlights", label: highlights.badge },
    { href: "#analytics", label: t("chart.header.badge") },
    { href: diagnosticsLink, label: diagnosticsPreview.badge },
    { href: "#cta", label: t("cta.button") },
  ];

  const renderMessageCard = (
    { headline, user, app, genericProductivity, genericWellness }: Message,
    key: number,
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
                <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] font-semibold text-primary">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-primary-foreground text-xs">
                    <UserIcon className="text-primary" />
                  </span>
                  <span>{conversation.userReflection}</span>
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  {user}
                </p>
              </div>
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 shadow-[0_4px_20px_-12px_rgba(8,47,73,0.45)]">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-primary font-semibold mb-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-primary-foreground text-xs">
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
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                <span className="uppercase inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-foreground text-xs">
                  {conversation.vs}
                </span>
                <span>{conversation.vsLabel}</span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]">
                  <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-foreground text-xs">
                      <BotIcon className="text-primary" />
                    </span>
                    <span>{conversation.genericProductivity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {genericProductivity}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]">
                  <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-foreground text-xs">
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
    <main
      id="main-content"
      className={cn(
        "relative flex-1",
        "min-h-screen flex flex-col",
        "rtl:font-arabic-body rtl:text-lg ",
      )}
    >
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm uppercase tracking-[0.24em] text-muted-foreground shadow-soft">
            {meta.badge}
          </p>
          <h1 className="text-4xl md:text-5xl leading-tight ltr:font-serif-brand rtl:font-arabic-title">
            {meta.title}
          </h1>
          <p className="text-lg text-muted-foreground">{meta.description}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={`mailto:${APP_CONFIG.contact.business}`}
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:bg-primary/90 text-sm font-medium transition"
            >
              {cta.button}
            </Link>
            <Link
              href="#conversation"
              className="inline-flex items-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-soft transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {conversation.title}
            </Link>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {quickLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background px-3 py-2 font-semibold transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
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
              renderMessageCard(message, index),
            )}
            {remainingMessages.length > 0 && (
              <details className="rounded-app border border-border bg-background p-6 shadow-soft">
                <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {conversation.badge} ·{" "}
                  {remainingMessages.length.toString().padStart(2, "0")} more
                  messages
                </summary>
                <div className="mt-6 space-y-8">
                  {remainingMessages.map((message, index) =>
                    renderMessageCard(message, index + PREVIEW_COUNT),
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
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              {highlights.badge}
            </p>
            <h2 className="ltr:font-serif-brand rtl:font-arabic-title text-3xl">
              {highlights.title}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.items.map((item) => (
              <article
                key={item.title}
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
        id="diagnostics-preview"
        className="border-t border-border bg-card py-16"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {diagnosticsPreview.badge}
          </p>
          <h2 className="text-3xl md:text-4xl ltr:font-serif-brand rtl:font-arabic-title">
            {diagnosticsPreview.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            {diagnosticsPreview.description}
          </p>
          <Link
            href={diagnosticsLink}
            className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary shadow-soft transition hover:border-primary/60 hover:bg-primary/10"
          >
            {diagnosticsPreview.ctaLabel}
          </Link>
        </div>
      </section>

      <section id="cta" className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl rounded-app border border-primary/20 bg-primary/5 p-10 text-center shadow-elevated space-y-5">
          <h2 className="text-3xl ltr:font-serif-brand rtl:font-arabic-title">
            {cta.title}
          </h2>
          <p className="text-sm text-muted-foreground">{cta.description}</p>
          <Link
            href={`mailto:${APP_CONFIG.contact.business}`}
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:bg-primary/90 text-sm font-medium transition"
          >
            {cta.button}
          </Link>
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {cta.disclaimer}
          </p>
        </div>
      </section>
    </main>
  );
}
