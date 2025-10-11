import LayoutHeader from "@/components/layout/header";
import initTranslations from "@/lib/i18n";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["content"]);

  return (
    <div className="w-full min-h-full pt-30">
      <LayoutHeader className="fixed top-0 inset-x-0" />
      {children}
      <footer className="border-t border-border-light mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center text-xs rtl:text-sm rtl:sm:text-base sm:text-sm text-secondary-foreground">
          <p className="mb-3">{t("layout.educationalNotice")}</p>
        </div>
      </footer>
    </div>
  );
}
