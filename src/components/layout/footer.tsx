import { APP_CONFIG } from "@/config/app";
import initTranslations, { AppLocales } from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
  locale?: AppLocales;
  showDisclaimer?: boolean;
}

export default async function LayoutFooter({
  className,
  locale = "en",
  showDisclaimer = true,
}: Props) {
  const { t } = await initTranslations(locale, ["pages"]);

  const disclaimerLabel = t("footer.disclaimer.label");
  const disclaimerMessage = t("footer.disclaimer.message", {
    app_name: APP_CONFIG.name,
  });

  const navigationLabels = (t("header.links", {
    returnObjects: true,
  }) ?? {}) as Record<string, string>;

  const footerLinks = (t("footer.links", {
    returnObjects: true,
  }) ?? {}) as Record<string, string>;

  const navigationHeading = t("footer.navigationHeading", {
    defaultValue: "Navigate",
  });
  const legalHeading = t("footer.legalHeading", { defaultValue: "Legal" });

  const navigationLinks = [
    {
      href: buildLocalizedPath(locale, "/"),
      label: navigationLabels.home ?? "Home",
    },
    {
      href: buildLocalizedPath(locale, "/demo"),
      label: navigationLabels.demo ?? "Demo",
    },
    {
      href: buildLocalizedPath(locale, "/content"),
      label: navigationLabels.library ?? "Content library",
    },
    {
      href: buildLocalizedPath(locale, "/join"),
      label: navigationLabels.join ?? "Join beta",
    },
    {
      href: buildLocalizedPath(locale, "/faq"),
      label: navigationLabels.faq ?? "FAQ",
    },
  ];

  const legalLinks = [
    {
      href: buildLocalizedPath(locale, "/eula"),
      label: footerLinks.eula ?? "End User License Agreement",
    },
    {
      href: buildLocalizedPath(locale, "/privacy"),
      label: footerLinks.privacy ?? "Privacy Policy",
    },
    {
      href: buildLocalizedPath(locale, "/terms"),
      label: footerLinks.terms ?? "Terms of Service",
    },
  ];

  const contactLabel = t("footer.contact_email", {
    defaultValue: "Contact us at ",
  });
  const contactEmail = APP_CONFIG.contact.support;

  const heroBadge = t("home.hero.badge");

  const copyright = t("footer.copyright", {
    app_name: APP_CONFIG.company.legalName,
  });

  return (
    <footer
      className={cn(
        "relative border-t border-border/60 bg-background/90",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-5">
            <Link
              href={buildLocalizedPath(locale, "/")}
              className="inline-flex items-center gap-3 rounded-3xl border border-border/60 bg-card/90 px-4 py-3 shadow-soft transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <span className="text-xl font-semibold text-foreground">
                In<span className="text-primary">nu</span>ora
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
                {t("header.wordmark", {
                  defaultValue: "Reflective intelligence",
                })}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{heroBadge}</p>
            {showDisclaimer && (
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-primary">
                  {disclaimerLabel}
                </span>
                <span className="ltr:ml-1 rtl:mr-1">{disclaimerMessage}</span>
              </div>
            )}
          </div>

          <div className="grid w-full max-w-xl grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                {navigationHeading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                {legalHeading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-1">
            <span>{contactLabel}</span>
            <a
              href={`mailto:${contactEmail}`}
              className="font-medium text-primary hover:text-primary/80"
            >
              {contactEmail}
            </a>
          </p>
          <p className="text-center sm:text-right">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
