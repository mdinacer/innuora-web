import type { MetadataRoute } from "next";

import { APP_CONFIG } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: APP_CONFIG.domains.primary,
    sitemap: `${APP_CONFIG.domains.primary}/sitemap.xml`,
  };
}
