// src/lib/fonts.ts
// Font loading configuration using next/font/google.
// Loaded once here and applied in root layout.

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Inter — body text font
 * Clean, highly legible, industry-standard for tech/SaaS.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
});

/**
 * Plus Jakarta Sans — display/heading font
 * Modern, premium, distinctive for tech & business contexts.
 * Strong personality while remaining professional & international.
 */
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
  weight: ["500", "600", "700", "800"],
  style: ["normal"],
});

/**
 * Combined font class names for the html element.
 * Usage: className={fontVariables}
 */
export const fontVariables = `${inter.variable} ${plusJakartaSans.variable}`;
