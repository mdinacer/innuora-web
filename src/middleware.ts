import { i18nRouter } from "next-i18n-router";
import i18nConfig from "@/lib/i18n/config";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    // Match all routes except API, Next internals, and common static/special files
    "/((?!api|_next|assets|videos|static|sitemap\\.xml|robots\\.txt|favicon\\.ico|manifest\\.webmanifest|.*\\.(?:html?|css|js|json|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip)).*)",

    // TRPC routes only
    "/trpc/:path*",
  ],
};
