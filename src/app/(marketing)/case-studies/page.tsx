// src/app/(marketing)/case-studies/page.tsx
// Case Studies list page.

import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { Container, Section } from "@/components/ui/Container";
import { getCaseStudies } from "@/lib/cms/case-studies";
import { CaseStudyFilterGrid } from "@/components/sections/case-studies/CaseStudyFilterGrid";

export const metadata: Metadata = genMeta({
  title: "Case Studies",
  description:
    "Real projects, real results. See how Muhammad Azeem has helped businesses automate workflows and reduce operational costs.",
  alternates: { canonical: "/case-studies" },
});

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <Section hero background="surface" className="pt-28 pb-16 lg:pt-36 lg:pb-20">
      <Container>
        <div className="text-center mb-12 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
            Selected Automation & AI Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-navy-900">
            Case Studies
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore selected automation and AI projects that demonstrate how I approach real business workflows and technical challenges.
          </p>
        </div>
        
        <CaseStudyFilterGrid caseStudies={caseStudies} />
      </Container>
    </Section>
  );
}
