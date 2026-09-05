import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = genMeta({
  title: "Privacy Policy",
  description: "Privacy policy for Muhammad Azeem's AI automation consultancy portfolio.",
  alternates: { canonical: "/privacy" },
});

export default function PrivacyPage() {
  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-24">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-navy">
          <h1 className="text-4xl font-display font-extrabold text-navy-900 mb-8">Privacy Policy</h1>
          <p className="text-neutral-600 leading-relaxed mb-6">
            This portfolio website is operated by Muhammad Azeem. Your privacy is important, and this page explains how information is handled when you interact with this website.
          </p>
          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Information Collected</h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            When you submit the contact form, the information you provide (name, email, company, message) is collected solely to respond to your inquiry. This information is not sold, shared, or used for marketing purposes.
          </p>
          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Third-Party Services</h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            This website may use third-party services such as Calendly for scheduling meetings. These services have their own privacy policies governing data they collect.
          </p>
          <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">Contact</h2>
          <p className="text-neutral-600 leading-relaxed">
            If you have questions about this privacy policy, please contact me at muhammadazeemzahid1@gmail.com.
          </p>
        </div>
      </Container>
    </section>
  );
}
