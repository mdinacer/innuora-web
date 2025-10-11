// app/(marketing)/faq/page.tsx
import { APP_CONFIG } from "@/config/app";
import initTranslations from "@/lib/i18n";
import Markdown from "markdown-to-jsx";
import { Metadata } from "next";

export function buildFAQStructuredData(
  sections: Record<string, any>,
  options?: { includeSections?: string[]; maxPerSection?: number },
) {
  const { includeSections, maxPerSection = 1 } = options || {};

  const mainEntity = Object.entries(sections)
    .filter(([key]) => (includeSections ? includeSections.includes(key) : true))
    .flatMap(([, section]: [string, any]) =>
      section.items.slice(0, maxPerSection).map((item: any) => ({
        "@type": "Question",
        name: item.question.replace(/{{app_name}}/g, APP_CONFIG.name),
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
            .replace(/{{app_name}}/g, APP_CONFIG.name)
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/[_*`]/g, "")
            .trim(),
        },
      })),
    );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

// Generate localized metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["seo"]);

  return {
    title: t("seo:faq.title", { app_name: APP_CONFIG.name }),
    description: t("seo:faq.description", { app_name: APP_CONFIG.name }),
    keywords: [
      "innuora faq",
      "ai therapy questions",
      "emotional support",
      "burnout clarity",
      "mental health ai",
      "privacy first app",
      "cbt reflection",
      ...APP_CONFIG.seo.primaryKeywords,
    ],
    openGraph: {
      title: t("seo:faq.title"),
      description: t("seo:faq.description"),
      url: `/${locale}/faq`,
      siteName: APP_CONFIG.name,
      images: [
        {
          url: `${APP_CONFIG.domains.canonical}/og/innuora-cover.png`, //`${APP_CONFIG.domains.canonical}/og/innuora-cover.png`,
          width: 1200,
          height: 630,
          alt: t("seo:faq.ogImageAlt", { app_name: APP_CONFIG.name }),
        },
      ],
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("seo:faq.title"),
      description: t("seo:faq.description"),
      images: [`${APP_CONFIG.domains.canonical}/og/innuora-cover.png`],
      creator: APP_CONFIG.social.twitter.creator,
    },
    alternates: {
      canonical: locale === "en" ? "/faq" : `/${locale}/faq`, // Respect prefixDefault: false
      languages: {
        en: "/faq", // Default locale, no prefix
        fr: "/fr/faq",
        ar: "/ar/faq",
        "x-default": "/faq", // Default uses English (no prefix)
      },
    },
  };
}

type FAQSections =
  | "general"
  | "use"
  | "method"
  | "philosophy"
  | "privacy"
  | "security"
  | "billing"
  | "tech"
  | "support";

type FAQSectionData = {
  badge: string;
  title: string;
  items: Array<{ question: string; answer: string }>;
};

const FAQCard = ({ id, data }: { id: string; data: FAQSectionData }) => {
  const { badge, title, items } = data;
  return (
    <div id={id} className="space-y-6">
      <div className="text-center space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] rtl:font-arabic-title text-muted-foreground">
          {badge}
        </p>
        <h2 className="text-3xl ltr:font-serif-brand rtl:font-arabic-title">
          {title}
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map(({ question, answer }, index) => (
          <article
            key={index}
            className="rounded-app border bg-background p-6 shadow-soft"
          >
            <h3 className="text-lg font-semibold">{question}</h3>
            <div className="mt-3 text-sm text-muted-foreground">
              <Markdown
                options={{ forceBlock: true, disableParsingRawHTML: true }}
              >
                {answer}
              </Markdown>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["pages"]);

  const { badge, title, subtitle, sections } = {
    badge: t("faq.badge"),
    title: t("faq.title"),
    subtitle: t("faq.subtitle", { app_name: APP_CONFIG.name }),
    sections: t("faq.sections", {
      returnObjects: true,
      app_name: APP_CONFIG.name,
    }) as Record<FAQSections, FAQSectionData>,
  };

  const faqStructuredData = buildFAQStructuredData(sections, {
    includeSections: [
      "audience",
      "general",
      "method",
      "philosophy",
      "privacy",
      "security",
      "billing",
      "support",
    ],
    maxPerSection: 1,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <main className="min-h-screen flex flex-col">
        <section className="relative isolate border-b">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground shadow-soft">
              {badge}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl rtl:font-arabic-title ltr:font-serif-brand leading-tight">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </section>

        <div className="py-20 bg-card mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-20 w-full">
          {Object.entries(sections).map(([key, value]) => (
            <FAQCard id={key} key={key} data={value} />
          ))}
        </div>
      </main>
    </>
  );
}
