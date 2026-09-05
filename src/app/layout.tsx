// src/app/layout.tsx
// Root layout — applies to ALL routes.
// Fonts, theme, global CSS only. No page-specific structure here.

import type { ReactNode } from "react";
import { viewport } from "@/config/seo";
import { generateMetadata } from "@/config/seo";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

import { personSchema, websiteSchema } from "@/config/seo";

export const metadata = generateMetadata();
export { viewport };

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white text-navy-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
