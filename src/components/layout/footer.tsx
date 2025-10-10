import { APP_CONFIG } from "@/config/app";
import initTranslations, { AppLocales } from "@/lib/i18n";
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

  const { disclaimer, links, copyright } = {
    disclaimer: {
      label: t("footer.disclaimer.label"),
      message: t("footer.disclaimer.message", {
        app_name: APP_CONFIG.name,
      }),
    },
    links: {
      privacy: t("footer.links.privacy"),
      terms: t("footer.links.terms"),
      contact: t("footer.links.contact"),
      help: t("footer.links.help"),
      support: t("footer.links.support"),
      eula: t("footer.links.eula"),
    },
    copyright: t("footer.copyright", {
      app_name: APP_CONFIG.company.legalName,
    }),
  };
  return (
    <footer className="relative border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center text-base rtl:text-lg text-inn-text-secondary">
        {showDisclaimer && (
          <p className="mb-3 text-primary">
            <span className="font-semibold">{disclaimer.label}</span>
            {disclaimer.message}
          </p>
        )}
        <div className="flex justify-center gap-6 flex-wrap mb-3">
          <Link href="/eula" className="hover:text-inn-text-primary">
            {links.eula}
          </Link>
          <Link href="/privacy" className="hover:text-inn-text-primary">
            {links.privacy}
          </Link>
          <Link href="/terms" className="hover:text-inn-text-primary">
            {links.terms}
          </Link>
          {/* <Link href="/contact" className="hover:text-inn-text-primary">
            {links.contact}
          </Link>
          <Link href="/help" className="hover:text-inn-text-primary">
            {links.help}
          </Link> */}
        </div>
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
