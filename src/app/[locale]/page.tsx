import { APP_CONFIG } from "@/config/app";
import initTranslations from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["seo"]);

  return {
    title: t("seo:home.title"),
    description: t("seo:home.description"),
    keywords: [...APP_CONFIG.seo.primaryKeywords],
    openGraph: {
      title: t("seo:home.title"),
      description: t("seo:home.description"),
      url: `/${locale}`,
      siteName: APP_CONFIG.name,
      images: [
        {
          url: `${APP_CONFIG.domains.canonical}/og/innuora-cover.png`,
          width: 1200,
          height: 630,
          alt: `${APP_CONFIG.name} Open Graph Cover`,
        },
      ],
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo:home.title"),
      description: t("seo:home.description"),
      images: [`${APP_CONFIG.domains.canonical}/og/innuora-cover.png`],
      creator: APP_CONFIG.social.twitter.creator,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        ar: "/ar",
        "x-default": "/en",
      },
    },
  };
}

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale = "en" } = await params;

  const { t } = await initTranslations(locale, ["pages"]);

  const {
    hero,
    features,
    howItWorks,
    why,
    security,
    pricing,
    testimonials,
    cta,
    quickLinks,
    about,
    testerInvite,
  } = {
    hero: {
      badge: t("home.hero.badge"),
      title: {
        main: t("home.hero.title_main"),
        sub: t("home.hero.title_sub", { app_name: APP_CONFIG.name }),
      },
      subtitle: t("home.hero.subtitle", { app_name: APP_CONFIG.name }),
      cta: {
        join: t("home.hero.cta.join"),
        demo: t("home.hero.cta.demo"),
      },
      highlights: t("home.hero.highlights", { returnObjects: true }) as {
        title: string;
        body: string;
      }[],
      demo: {
        title: t("home.hero.demo.title"),
        conversations: t("home.hero.demo.conversations", {
          returnObjects: true,
        }) as {
          user: string;
          app: string;
        }[],
        footer: t("home.hero.demo.footer", { app_name: APP_CONFIG.name }),
      },
    },

    features: {
      badge: t("home.features.badge"),
      title: t("home.features.title"),
      subtitle: t("home.features.subtitle", { app_name: APP_CONFIG.name }),
      items: t("home.features.items", {
        returnObjects: true,
        app_name: APP_CONFIG.name,
      }) as {
        title: string;
        body: string;
      }[],
    },

    howItWorks: {
      badge: t("home.howItWorks.badge"),
      title: t("home.howItWorks.title", { app_name: APP_CONFIG.name }),
      subtitle: t("home.howItWorks.subtitle", { app_name: APP_CONFIG.name }),
      steps: t("home.howItWorks.steps", {
        returnObjects: true,
        app_name: APP_CONFIG.name,
      }) as {
        stage: string;
        title: string;
        body: string;
      }[],
    },

    why: {
      badge: t("home.why.badge"),
      title: t("home.why.title", { app_name: APP_CONFIG.name }),
      subtitle: t("home.why.subtitle", { app_name: APP_CONFIG.name }),
      items: t("home.why.items", {
        returnObjects: true,
        app_name: APP_CONFIG.name,
      }) as {
        title: string;
        body: string;
      }[],
    },

    security: {
      badge: t("home.security.badge"),
      title: t("home.security.title"),
      subtitle: t("home.security.subtitle"),
      notice: t("home.security.notice", { app_name: APP_CONFIG.name }),
      items: t("home.security.items", {
        returnObjects: true,
        app_name: APP_CONFIG.name,
      }) as {
        title: string;
        body: string;
      }[],
    },

    pricing: {
      badge: t("home.pricing.badge"),
      popular: t("home.pricing.popular"),
      title: t("home.pricing.title"),
      subtitle: t("home.pricing.subtitle", { app_name: APP_CONFIG.name }),
      plans: t("home.pricing.plans", { returnObjects: true }) as {
        id: "starter" | "regular" | "premium";
        popular: boolean;
        name: string;
        credits: string;
        desc: string;
        features: string[];
      }[],
      footer: t("home.pricing.footer"),
      link: t("home.pricing.link"),
    },

    testimonials: {
      badge: t("home.testimonials.badge"),
      title: t("home.testimonials.title"),
      items: t("home.testimonials.items", {
        returnObjects: true,
        app_name: APP_CONFIG.name,
      }) as {
        quote: string;
        author: string;
      }[],
    },

    quickLinks: {
      badge: t("home.quickLinks.badge"),
      title: t("home.quickLinks.title"),
      subtitle: t("home.quickLinks.subtitle"),
      items: t("home.quickLinks.items", {
        returnObjects: true,
      }) as {
        title: string;
        body: string;
        action: string;
        href: string;
      }[],
    },

    testerInvite: {
      badge: t("home.testerInvite.badge"),
      title: t("home.testerInvite.title"),
      description: t("home.testerInvite.description", {
        app_name: APP_CONFIG.name,
      }),
      button: t("home.testerInvite.button"),
      disclaimer: t("home.testerInvite.disclaimer"),
    },

    cta: {
      title: t("home.cta.title"),
      subtitle: t("home.cta.subtitle"),
      cta: t("home.cta.cta"),
    },

    about: {
      title: t("home.about.title"),
      subtitle: t("home.about.subtitle", { app_name: APP_CONFIG.name }),
    },
  };

  return (
    <main
      className={cn(
        "relative",
        "min-h-screen flex flex-col",
        "rtl:font-arabic-body rtl:text-lg",
        "[&_section]:relative",
      )}
    >
      {/* <!-- Hero --> */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs rtl:text-sm rtl:font-arabic-title uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
              {hero.badge}
            </p>
            <h1 className="text-4xl rtl:font-arabic-title sm:text-5xl lg:text-6xl rtl:lg:text-5xl ltr:font-serif-brand leading-tight">
              {hero.title.main}
              <span className="block text-transparent bg-clip-text bg-brand-gradient">
                {hero.title.sub}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-prose">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#cta"
                className="rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:opacity-90"
              >
                {hero.cta.join}
              </Link>
              <Link
                href="#features"
                className="rounded-lg border px-6 py-3 hover:bg-muted"
              >
                {hero.cta.demo}
              </Link>
            </div>
            <dl className="grid sm:grid-cols-2 gap-6 text-sm rtl:text-base text-muted-foreground">
              {hero.highlights.map(({ title, body }, index) => (
                <div key={index}>
                  <dt className="font-semibold text-foreground">{title}</dt>
                  <dd>{body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-6 rounded-full bg-brand-gradient opacity-10 blur-3xl"></div>
            <div className="relative w-full max-w-md rounded-app border border-border bg-card/70 p-8 shadow-elevated backdrop-blur">
              <p className="text-xs rtl:text-sm rtl:font-arabic-title uppercase tracking-[0.35em] text-muted-foreground">
                {hero.demo.title}
              </p>
              <div className="mt-4 space-y-5 text-sm">
                {hero.demo.conversations.map(({ app, user }, index) => (
                  <article className="space-y-3" key={index}>
                    <p className="rounded-lg bg-muted p-3 text-foreground">
                      {user}
                    </p>
                    <div className="rounded-lg border border-primary/40 bg-primary/5 p-4">
                      <p className="font-semibold text-primary">
                        {APP_CONFIG.name}:
                      </p>
                      <p className="mt-1">{app}</p>
                    </div>
                  </article>
                ))}

                <p className="text-xs rtl:text-sm uppercase tracking-[0.3em] text-muted-foreground text-center">
                  {hero.demo.footer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Tester Invite --> */}
      <section id="join-testers" className="border-t bg-background py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-app border border-dashed border-primary/40 bg-card p-10 text-center shadow-soft">
            <p className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              {testerInvite.badge}
            </p>
            <h2 className="mt-6 text-3xl font-serif-brand text-foreground md:text-4xl">
              {testerInvite.title}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {testerInvite.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/${locale}/join`}
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                {testerInvite.button}
              </Link>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {testerInvite.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* <!-- Quick Links --> */}
      <section id="explore" className="border-t bg-background py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <p className="text-sm rtl:text-base rtl:font-arabic-title uppercase tracking-[0.3em] text-muted-foreground">
              {quickLinks.badge}
            </p>
            <h2 className="text-3xl md:text-4xl ltr:font-serif-brand rtl:font-arabic-title">
              {quickLinks.title}
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              {quickLinks.subtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {quickLinks.items.map(({ title, body, action, href }, index) => (
              <article
                key={index}
                className="flex h-full flex-col justify-between rounded-app border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold rtl:font-arabic-title text-foreground">
                    {title}
                  </h3>
                  <p className="text-muted-foreground">{body}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/${locale}${href}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    {action}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- Feature Grid --> */}
      <section id="features" className="border-t bg-card py-16 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center font-serif-brand rtl:font-arabic-title space-y-4">
            <p className="text-sm rtl:text-base rtl:font-arabic-title uppercase tracking-[0.3em] text-muted-foreground">
              {features.badge}
            </p>
            <h2 className="text-3xl md:text-4xl ltr:font-serif-brand rtl:font-arabic-title">
              {features.title}
            </h2>
            <p className="mx-auto max-w-3xl font-sans text-muted-foreground">
              {features.subtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.items.map(({ title, body }, index) => (
              <article
                key={index}
                className="rounded-app border p-6 shadow-soft bg-background"
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- How it Works --> */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-app border bg-background p-8 md:p-12 shadow-soft">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <p className="text-sm rtl:text-base uppercase tracking-[0.3em] text-muted-foreground">
                  {howItWorks.badge}
                </p>
                <h2 className="mt-3 text-3xl rtl:font-arabic-title ltr:font-serif-brand">
                  {howItWorks.title}
                </h2>
                <p className="mt-4 text-muted-foreground">
                  {howItWorks.subtitle}
                </p>
              </div>
              <ol className="md:col-span-2 space-y-6 text-sm text-muted-foreground">
                {howItWorks.steps.map(({ stage, title, body }, index) => (
                  <li key={index} className="flex gap-4 rounded-lg border p-4">
                    <span className="h-8 w-8 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs rtl:text-sm rtl:mb-0.5 uppercase tracking-[0.25em] text-muted-foreground">
                        {stage}
                      </p>
                      <h3 className="font-semibold rtl:font-arabic-title rtl:mb-1 text-foreground">
                        {title}
                      </h3>
                      <p>{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Why Innuora --> */}
      <section id="why" className="border-t bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm rtl:text-base rtl:font-arabic-title uppercase tracking-[0.3em] text-muted-foreground">
              {why.badge}
            </p>
            <h2 className="text-3xl md:text-4xl ltr:font-serif-brand rtl:font-arabic-title">
              {why.title}
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              {why.subtitle}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {why.items.map(({ title, body }, index) => (
              <article
                key={index}
                className="rounded-app border p-6 shadow-soft bg-card"
              >
                <h3 className="text-lg font-semibold rtl:font-arabic-title">
                  {title}
                </h3>
                <p className="mt-3 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- Security --> */}
      <section id="security" className="border-t bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm rtl:text-base rtl:font-arabic-title uppercase tracking-[0.3em] text-muted-foreground">
                {security.badge}
              </p>
              <h2 className="mt-2 text-3xl rtl:font-arabic-title ltr:font-serif-brand">
                {security.title}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                {security.subtitle}
              </p>
            </div>
            <span className="text-xs rtl:text-sm text-muted-foreground uppercase tracking-[0.3em]">
              {security.notice}
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {security.items.map(({ title, body }, index) => (
              <article
                key={index}
                className="rounded-app border p-6 shadow-soft bg-background"
              >
                <h3 className="text-lg font-semibold rtl:font-arabic-title">
                  {title}
                </h3>
                <p className="mt-3 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- Pricing (commented for early tester phase) --> */}
      {false && (
        <section id="pricing" className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-4">
              <p className="text-sm rtl:text-base rtl:font-arabic-title uppercase tracking-[0.3em] text-muted-foreground">
                {pricing.badge}
              </p>
              <h2 className="text-3xl md:text-4xl rtl:font-arabic-title ltr:font-serif-brand">
                {pricing.title}
              </h2>
              <p className="mx-auto max-w-3xl text-muted-foreground">
                {pricing.subtitle}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {pricing.plans.map((plan, index) => {
                if (plan.popular) {
                  return (
                    <article
                      key={index}
                      className="rounded-app border-2 border-primary p-6 shadow-elevated bg-background relative"
                    >
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground shadow-soft">
                        {pricing.popular}
                      </span>
                      <p className="text-sm rtl:text-base uppercase tracking-[0.25em] text-muted-foreground">
                        {plan.name}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold rtl:font-arabic-title text-foreground">
                        {plan.credits}
                      </h3>
                      <p className="mt-3 text-muted-foreground">{plan.desc}</p>
                      <ul className="mt-4 space-y-2 text-sm rtl:text-base text-muted-foreground list-disc list-inside">
                        {plan.features.map((feature, index) => (
                          <li className="list-item" key={index}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                }
                return (
                  <article
                    key={index}
                    className="rounded-app border p-6 shadow-soft bg-background"
                  >
                    <p className="text-sm rtl:text-base uppercase tracking-[0.25em] text-muted-foreground">
                      {plan.name}
                    </p>
                    <h3 className="mt-3 text-xl rtl:font-arabic-title font-semibold text-foreground">
                      {plan.credits}
                    </h3>
                    <p className="mt-3 text-muted-foreground">{plan.desc}</p>
                    <ul className="mt-4 space-y-2 text-sm rtl:text-base text-muted-foreground list-disc list-inside">
                      {plan.features.map((feature, index) => (
                        <li className="list-item" key={index}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
            <p className="text-center space-x-2 text-sm rtl:text-base text-muted-foreground">
              <span>{pricing.footer}</span>
              <Link
                href={`mailto:${APP_CONFIG.contact.business}`}
                className="underline underline-offset-2 decoration-dotted hover:text-primary"
              >
                {pricing.link}
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* <!-- Testimonials (commented until live user feedback) --> */}
      {false && (
        <>
          <section id="stories" className="border-t bg-card py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-4">
                <p className="text-sm rtl:text-base rtl:font-arabic-title uppercase tracking-[0.3em] text-muted-foreground">
                  {testimonials.badge}
                </p>
                <h2 className="text-3xl md:text-4xl ltr:font-serif-brand rtl:font-arabic-title">
                  {testimonials.title}
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {testimonials.items.map((item, index) => (
                  <blockquote
                    key={index}
                    className="rounded-app flex flex-col border bg-background p-6 shadow-soft text-sm rtl:text-base text-muted-foreground"
                  >
                    <div className="flex-1">
                      <p>{item.quote}</p>
                    </div>
                    <footer className="mt-4 text-xs rtl:text-sm rtl:font-arabic-title text-foreground">
                      {`- ${item.author}`}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          <section id="cta" className="py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-app bg-flame-gradient p-1 shadow-elevated">
                <div className="rounded-app bg-card p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl md:text-3xl rtl:font-arabic-title ltr:font-serif-brand">
                      {cta.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">{cta.subtitle}</p>
                  </div>
                  <div className="flex md:justify-end">
                    <Link
                      href="#"
                      className="rounded-lg bg-primary  px-6 py-3 text-primary-foreground shadow-soft hover:opacity-90"
                    >
                      {cta.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* <!-- About --> */}
      <section id="about" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl ltr:font-serif-brand rtl:font-arabic-title">
            {about.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{about.subtitle}</p>
        </div>
      </section>
    </main>
  );
}
