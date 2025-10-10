// /lib/fonts.ts
import {
  Noto_Sans_Arabic as ArabicBodyFont,
  Cairo as ArabicTitleFont,
  Inter as SansFont,
  DM_Serif_Display as SerifFont,
} from "next/font/google";

export const arabicTitle = ArabicTitleFont({
  variable: "--font-arabic-title",
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  display: "swap",
});
export const arabicBody = ArabicBodyFont({
  variable: "--font-arabic-body",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const sans = SansFont({
  subsets: ["latin"],
  variable: "--font-Inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const serif = SerifFont({
  subsets: ["latin"],
  variable: "--font-DM_Serif_Display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
