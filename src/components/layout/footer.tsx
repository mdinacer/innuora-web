import { X } from "lucide-react";
import Link from "next/link";
import { APP_CONFIG } from "@/config/app";
import initTranslations, { type AppLocales } from "@/lib/i18n";
import { buildLocalizedPath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

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
  const { t } = await initTranslations(locale, ["layout", "home"]);

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

  const heroBadge = t("hero.badge", { ns: "home" });

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
              <span className="text-xl font-semibold ltr:font-serif-brand text-foreground">
                {APP_CONFIG.name}
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("header.wordmark", {
                  defaultValue: "Reflective intelligence",
                })}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{heroBadge}</p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/innuora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="X (Twitter)"
              >
                <X className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">X (Twitter)</span>
              </a>
              <a
                href="https://www.linkedin.com/company/innuora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/innuora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Instagram"
              >
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/innuora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Facebook"
              >
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.youtube.com/@Innuora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="YouTube"
              >
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="sr-only">YouTube</span>
              </a>
            </div>

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
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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

        <div className="mt-10 flex flex-col gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-1">
            <span>{contactLabel}</span>
            <Link
              href={`mailto:${contactEmail}`}
              className="font-medium text-primary hover:text-primary/80"
            >
              {contactEmail}
            </Link>
          </p>
          <p className="text-center sm:text-right">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
