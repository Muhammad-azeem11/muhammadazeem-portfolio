// src/app/(marketing)/services/page.tsx
// Dedicated Services & Pricing page.

import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { ServicesSection } from "@/components/sections/home/ServicesSection";

export const metadata: Metadata = genMeta({
  title: "Services & Pricing",
  description:
    "Explore business automation packages, AI audits, and technical engineering services tailored for scaling organizations.",
  alternates: { canonical: "/services" },
});

export default function ServicesPage() {
  return (
    <div className="pt-4 sm:pt-8 bg-white">
      <ServicesSection />
    </div>
  );
}

