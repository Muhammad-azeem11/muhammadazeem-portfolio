// src/app/(marketing)/about/page.tsx
// About page — Phase 5 implementation.

import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { PhilosophySection } from "@/components/sections/about/PhilosophySection";
import { CapabilitiesSection } from "@/components/sections/about/CapabilitiesSection";
import { ExperienceSection } from "@/components/sections/about/ExperienceSection";
import { AboutFinalCtaSection } from "@/components/sections/about/AboutFinalCtaSection";

export const metadata: Metadata = genMeta({
  title: "About",
  description:
    "I am a business-focused developer who understands the business problem first, then builds the appropriate technical solution.",
  alternates: { canonical: "/about" },
});

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "AI Automation Engineer",
    url: siteConfig.url,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.instagram,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutHeroSection />
      <PhilosophySection />
      <CapabilitiesSection />
      <ExperienceSection />
      <AboutFinalCtaSection />
    </>
  );
}
