import { Metadata } from "next";
import JoinTesterForm from "@/components/tester/join-tester-form";
import { APP_CONFIG } from "@/config/app";
import initTranslations, { AppLocales } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Join Beta - ${APP_CONFIG.tagline} | ${APP_CONFIG.name}`,
  description: `Get early access to ${APP_CONFIG.name}, the AI emotional companion for high-functioning women. Join the beta program for burnout recovery, emotional clarity, and overwhelm support.`,
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
  alternates: {
    canonical: `${APP_CONFIG.domains.primary}/en/join`,
    languages: {
      fr: `${APP_CONFIG.domains.primary}/fr/join`,
      ar: `${APP_CONFIG.domains.primary}/ar/join`,
      "x-default": `${APP_CONFIG.domains.primary}/en/join`,
    },
  },
};

export default async function TesterJoinRoute({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["pages", "common"]);
  const formCopy = {
    labels: {
      email: {
        label: t("advancedTester.form.email.label"),
        placeholder: t("advancedTester.form.email.placeholder"),
        required: t("advancedTester.form.email.required"),
      },
      occupation: {
        label: t("advancedTester.form.occupation.label"),
        placeholder: t("advancedTester.form.occupation.placeholder"),
        helpText: t("advancedTester.form.occupation.helpText"),
      },
      struggles: {
        label: t("advancedTester.form.struggles.label"),
        placeholder: t("advancedTester.form.struggles.placeholder"),
        helpText: t("advancedTester.form.struggles.helpText"),
      },
      coping: {
        label: t("advancedTester.form.coping.label"),
        placeholder: t("advancedTester.form.coping.placeholder"),
        helpText: t("advancedTester.form.coping.helpText"),
      },
      source: {
        label: t("advancedTester.form.source.label", { app_name: APP_CONFIG.name }),
        placeholder: t("advancedTester.form.source.placeholder"),
        helpText: t("advancedTester.form.source.helpText"),
      },
      notes: {
        label: t("advancedTester.form.notes.label"),
        placeholder: t("advancedTester.form.notes.placeholder", { app_name: APP_CONFIG.name }),
        helpText: t("advancedTester.form.notes.helpText"),
      },
      submitButton: t("advancedTester.form.submitButton"),
    },
    messages: {
      successTitle: t("advancedTester.messages.success"),
      error: t("advancedTester.messages.error"),
      thankYou: t("advancedTester.form.thankYouNote", { app_name: APP_CONFIG.name }),
    },
    nextSteps: {
      viewDemo: t("advancedTester.nextSteps.viewDemo"),
      browseLibrary: t("advancedTester.nextSteps.browseLibrary"),
      submitAnother: t("advancedTester.nextSteps.submitAnother"),
    },
  };

  return (
    <main className="mt-20 min-h-screen w-full bg-background pb-24">
      <section className="mx-auto max-w-4xl px-6 py-12 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {t("advancedTester.hero.badge")}
        </p>
        <h1 className="mt-4 text-3xl font-serif-brand leading-tight md:text-5xl">
          {t("advancedTester.hero.title", { app_name: APP_CONFIG.name })}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("advancedTester.hero.description", { app_name: APP_CONFIG.name })}
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
