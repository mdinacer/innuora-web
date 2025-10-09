import Link from "next/link";

import LanguageDropdown from "@/components/language-dropdown";
import { APP_CONFIG } from "@/config/app";
import initTranslations, { AppLocales } from "@/lib/i18n";
import LayoutHeader from "@/components/layout/header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale = "en" } = await params;
  const { t } = await initTranslations(locale, ["common"]);

  return (
    <>
      {/* <LayoutHeader /> */}
      {children}

      {/* <Footer locale={locale as AppLocales} showDisclaimer={false} /> */}
      <div className="hidden fixed bottom-0 inset-x-0 standalone:block h-[env(safe-area-inset-bottom)] z-40  backdrop-blur-md backdrop-saturate-150 bg-mir-bg-card/50"></div>
    </>
  );
}
