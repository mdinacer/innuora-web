"use client";

import { createInstance, type Resource } from "i18next";
import { memo, type PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

import initTranslations from "@/lib/i18n";

interface TranslationProviderProps {
  locale: string;
  namespaces: string[];
  resources: Resource;
}

const TranslationProvider = memo<PropsWithChildren<TranslationProviderProps>>(
  ({ children, locale, namespaces, resources }) => {
    const i18n = createInstance();

    initTranslations(locale, namespaces, i18n, resources);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  },
);

TranslationProvider.displayName = "TranslationProvider";

export default TranslationProvider;
