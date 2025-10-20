import type { Metadata } from "next";
import JoinTesterForm from "@/components/tester/join-tester-form";
import { APP_CONFIG } from "@/config/app";
import initTranslations, { type AppLocales } from "@/lib/i18n";
import { buildLanguageAlternates, buildLocalizedUrl } from "@/lib/seo/url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale = "en" } = await params;

  const title = `Join Beta - ${APP_CONFIG.tagline} | ${APP_CONFIG.name}`;
  const description = `Get early access to ${APP_CONFIG.name}, the AI emotional companion for high-functioning women. Join the beta program for burnout recovery, emotional clarity, and overwhelm support.`;
  const canonicalUrl = buildLocalizedUrl(locale, "/join");
  const languageAlternates = buildLanguageAlternates("/join");

  return {
    title,
    description,
    keywords: [
      "emotional burnout support beta",
      "women burnout recovery app beta",
      "high-functioning women support beta",
      "AI emotional companion beta",
      "emotional overwhelm relief beta",
      "perfectionist burnout help beta",
      "safe space for women beta",
      "emotional clarity app beta",
      "support for overwhelmed women beta",
      "emotional companion for women beta",
    ],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: APP_CONFIG.name,
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

export default async function TesterJoinRoute({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["join", "common"]);
  const formCopy = {
    labels: {
      email: {
        label: t("form.email.label"),
        placeholder: t("form.email.placeholder"),
        required: t("form.email.required"),
      },
      occupation: {
        label: t("form.occupation.label"),
        placeholder: t("form.occupation.placeholder"),
        helpText: t("form.occupation.helpText"),
      },
      struggles: {
        label: t("form.struggles.label"),
        placeholder: t("form.struggles.placeholder"),
        helpText: t("form.struggles.helpText"),
      },
      coping: {
        label: t("form.coping.label"),
        placeholder: t("form.coping.placeholder"),
        helpText: t("form.coping.helpText"),
      },
      source: {
        label: t("form.source.label", {
          app_name: APP_CONFIG.name,
        }),
        placeholder: t("form.source.placeholder"),
        helpText: t("form.source.helpText"),
      },
      notes: {
        label: t("form.notes.label"),
        placeholder: t("form.notes.placeholder", {
          app_name: APP_CONFIG.name,
        }),
        helpText: t("form.notes.helpText"),
      },
      submitButton: t("form.submitButton"),
    },
    messages: {
      successTitle: t("messages.success"),
      error: t("messages.error"),
      thankYou: t("form.thankYouNote", {
        app_name: APP_CONFIG.name,
      }),
    },
    nextSteps: {
      viewDemo: t("nextSteps.viewDemo"),
      browseLibrary: t("nextSteps.browseLibrary"),
      submitAnother: t("nextSteps.submitAnother"),
    },
  };

  return (
    <main className="mt-20 min-h-screen w-full bg-background pb-24">
      <section className="mx-auto max-w-4xl px-6 py-12 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {t("hero.badge")}
        </p>
        <h1 className="mt-4 text-3xl font-serif-brand leading-tight md:text-5xl">
          {t("hero.title", { app_name: APP_CONFIG.name })}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("hero.description", { app_name: APP_CONFIG.name })}
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <JoinTesterForm locale={locale as AppLocales} copy={formCopy} />
        </div>
      </section>
    </main>
  );
}
