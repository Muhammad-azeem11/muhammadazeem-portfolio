import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = genMeta({
  title: "Terms of Service",
  description: "Terms of service for Muhammad Azeem's AI automation consultancy portfolio.",
  alternates: { canonical: "/terms" },
});

export default function TermsPage() {
  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-24">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-navy">
          <h1 className="text-4xl font-display font-extrabold text-navy-900 mb-8">Terms of Service</h1>
          <p className="text-neutral-600 leading-relaxed mb-6">
            By using this website, you agree to the following terms. This portfolio website is provided for informational purposes to showcase the professional services of Muhammad Azeem.
          </p>
          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Services</h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            All services described on this website are subject to individual agreements between Muhammad Azeem and the client. Pricing, timelines, and deliverables are confirmed through direct consultation before any engagement begins.
          </p>
          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Intellectual Property</h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            All content on this website, including text, design, and case study descriptions, is the intellectual property of Muhammad Azeem unless otherwise stated.
          </p>
          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Contact</h2>
          <p className="text-neutral-600 leading-relaxed">
            For questions regarding these terms, please contact me at muhammadazeemzahid1@gmail.com.
          </p>
        </div>
      </Container>
    </section>
  );
}
