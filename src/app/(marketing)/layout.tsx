// src/app/(marketing)/layout.tsx
// Layout for all public-facing marketing pages.
// Wraps children with the shared Header and Footer.

import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
