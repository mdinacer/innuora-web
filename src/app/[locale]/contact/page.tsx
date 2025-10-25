import type { Metadata } from "next";
import Link from "next/link";
import { APP_CONFIG, EMAIL_ADDRESSES } from "@/config/app";
import initTranslations from "@/lib/i18n";
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

  const title = t("seo:contact.title", { app_name: APP_CONFIG.name });
  const description = t("seo:contact.description", {
    app_name: APP_CONFIG.name,
  });

  const canonicalUrl = buildLocalizedUrl(locale, "/contact");
  const languageAlternates = buildLanguageAlternates("/contact");

  return {
    title,
    description,
    keywords: [
      "Innuora contact",
      "contact Innuora team",
      "AI emotional wellness support",
      "customer support Innuora",
      "press and partnership inquiries",
      "privacy and data questions",
      "therapeutic AI assistance",
      "encrypted reflection support",
      "business collaboration Innuora",
      "AI companion help center",
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

export default async function ContactPage() {
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
      <section className="py-20 border-b bg-card text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Reach out securely
          </p>
          <h1 className="text-4xl md:text-5xl font-serif-brand">
            We listen — even here
          </h1>
          <p className="text-lg text-muted-foreground">
            Whether you’re a user, partner, or researcher, every message to
            Innuora is treated with confidentiality and care.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-3xl px-4 space-y-8">
          <form className="rounded-app border bg-card p-8 shadow-soft space-y-6">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 h-32"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-6 py-3 text-primary-foreground shadow-soft hover:bg-primary/90"
            >
              Send Message
            </button>
          </form>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Or reach us directly:</p>
            <p>
              Support:{" "}
              <Link
                href={`mailto:${EMAIL_ADDRESSES.support}`}
                className="underline hover:text-primary"
              >
                {EMAIL_ADDRESSES.support}
              </Link>
            </p>
            <p>
              Privacy:{" "}
              <Link
                href={`mailto:${EMAIL_ADDRESSES.privacy}`}
                className="underline hover:text-primary"
              >
                {EMAIL_ADDRESSES.privacy}
              </Link>
            </p>
            <p>
              Business:{" "}
              <Link
                href={`mailto:${EMAIL_ADDRESSES.business}`}
                className="underline hover:text-primary"
              >
                {EMAIL_ADDRESSES.business}
              </Link>
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em]">
              {APP_CONFIG.company.legalName} · {APP_CONFIG.legal.jurisdiction}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
