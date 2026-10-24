// src/app/(marketing)/page.tsx
// Home page — production implementation.

import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { siteConfig } from "@/config/site";

import { personSchema, websiteSchema } from "@/config/seo";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { BusinessValueSection } from "@/components/sections/home/BusinessValueSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { CaseStudiesSection } from "@/components/sections/home/CaseStudiesSection";
import { TechStackSection } from "@/components/sections/home/TechStackSection";
import { CredibilitySection } from "@/components/sections/home/CredibilitySection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { ClientReviewSection } from "@/components/sections/home/ClientReviewSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";

export const metadata: Metadata = genMeta({
  title: undefined, // Use root title (no "Home | ..." prefix for home page)
  description: siteConfig.description,
  alternates: { canonical: "/" },
});

export default async function HomePage() {
  const { getCaseStudies } = await import("@/lib/cms/case-studies");
  const {
    getPublicTestimonials,
    getPublicClientReviews,
    getPublicPortfolioStats,
  } = await import("@/lib/cms/testimonials");

  const [caseStudies, testimonials, verifiedReviews, portfolioStats] =
    await Promise.all([
      getCaseStudies(),
      getPublicTestimonials(),
      getPublicClientReviews(),
      getPublicPortfolioStats(),
    ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema]),
        }}
      />

      {/* ── Page Sections ──────────────────────────────────────── */}
      <HeroSection />
      <BusinessValueSection />
      <CredibilitySection stats={portfolioStats} />
      <ServicesSection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <TechStackSection />
      <ProcessSection />
      <TestimonialsSection
        testimonials={testimonials}
        verifiedReviews={verifiedReviews}
      />
      <ClientReviewSection />
      <FinalCtaSection />
    </>
  );
}
