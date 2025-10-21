import type { Viewport } from "next";

export const VIEWPORT = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
  initialScale: 1,
  width: "device-width",
  userScalable: true,
} as Viewport;
