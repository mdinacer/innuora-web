import { MetadataRoute } from "next";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

import { APP_CONFIG } from "@/config/app";
import { initializeContentRegistry } from "@/lib/content/content-loader";
import { contentRegistry } from "@/lib/content/content-registry";
import { SEOGenerator } from "@/lib/content/seo-generator";

function withTrailingSlash(path: string) {
  return path.endsWith("/") ? path : path + "/";
}

//const baseUrl = APP_CONFIG.domains.primary;
const baseUrl = APP_CONFIG.domains.primary.replace(/\/+$/, "");

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/join", changeFrequency: "weekly", priority: 0.9 },
  { path: "/demo", changeFrequency: "weekly", priority: 0.9 },
  { path: "/content", changeFrequency: "weekly", priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/eula", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
];

const locales = ["en", "fr", "ar"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Initialize content registry
  await initializeContentRegistry();

  // Get all content
  const allContent = contentRegistry.getAll();

  // Generate static route entries
  const staticRoutes = routes.flatMap((route) =>
    locales.map((locale) => {
      const routePath = route.path.startsWith("/")
        ? route.path
        : "/" + route.path;
      const isHomepage = routePath === "/" || routePath === "";

      // For English (default locale with prefixDefault: false), don't add /en/ prefix
      const localePrefix = locale === "en" ? "" : `/${locale}`;
      const url = isHomepage
        ? `${baseUrl}${localePrefix}/`
        : `${baseUrl}${localePrefix}${withTrailingSlash(routePath)}`;

      return {
        url,
        lastModified,
        changeFrequency:
          route.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
        priority: route.priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales
                .filter((l) => l !== locale)
                .map((l) => {
                  const altPrefix = l === "en" ? "" : `/${l}`;
                  return [
                    l,
                    isHomepage
                      ? `${baseUrl}${altPrefix}/`
                      : `${baseUrl}${altPrefix}${withTrailingSlash(routePath)}`,
                  ];
                }),
            ),
            "x-default": isHomepage
              ? `${baseUrl}/`
              : `${baseUrl}${withTrailingSlash(routePath)}`,
          } as Languages<string>,
        },
      };
    }),
  );

  // Get unique categories
  const categories = [
    ...new Set(allContent.map((item) => item.metadata.category)),
  ];

  // Generate category page entries
  const categoryRoutes = categories.flatMap((category) =>
    locales.map((locale) => {
      const localePrefix = locale === "en" ? "" : `/${locale}`;
      const path = withTrailingSlash(`/content/${category}`);
      const url = `${baseUrl}${localePrefix}${path}`;

      return {
        url,
        lastModified,
        changeFrequency:
          "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
        priority: 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales
                .filter((l) => l !== locale)
                .map((l) => {
                  const altPrefix = l === "en" ? "" : `/${l}`;
                  return [l, `${baseUrl}${altPrefix}${path}`];
                }),
            ),
            "x-default": `${baseUrl}${path}`,
          } as Languages<string>,
        },
      };
    }),
  );

  // Generate content article entries
  const contentRoutes = allContent.flatMap((item) => {
    const sitemapEntry = SEOGenerator.generateSitemapEntry(item.metadata);

    return locales.map((locale) => {
      const localePrefix = locale === "en" ? "" : `/${locale}`;
      const url = `${baseUrl}${localePrefix}${withTrailingSlash(sitemapEntry.url)}`;

      return {
        url,
        lastModified: sitemapEntry.lastModified,
        changeFrequency: sitemapEntry.changeFrequency,
        priority: sitemapEntry.priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales
                .filter((l) => l !== locale)
                .map((l) => {
                  const altPrefix = l === "en" ? "" : `/${l}`;
                  return [
                    l,
                    `${baseUrl}${altPrefix}${withTrailingSlash(sitemapEntry.url)}`,
                  ];
                }),
            ),
            "x-default": `${baseUrl}${withTrailingSlash(sitemapEntry.url)}`,
          } as Languages<string>,
        },
      };
    });
  });

  return [...staticRoutes, ...categoryRoutes, ...contentRoutes];
}
