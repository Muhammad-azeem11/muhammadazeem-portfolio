// src/app/(marketing)/contact/page.tsx
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/lib/social-icons";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = genMeta({
  title: "Contact",
  description:
    "Get in touch to discuss business automation, workflow optimization, or your next technical product.",
  alternates: { canonical: "/contact" },
});

export default function ContactPage() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-neutral-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Context & Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy-800">
                Start a Conversation
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-navy-900 leading-tight">
                Let&apos;s talk about your <span className="text-accent-600">workflows.</span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                Whether you need a comprehensive business automation audit or a dedicated technical partner, I am here to help you reduce operational costs and build scalable systems.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-navy-900 border-b border-neutral-200 pb-3">
                How it works
              </h3>
              <ol className="space-y-6 relative border-l-2 border-neutral-200 ml-3">
                <li className="pl-8 relative">
                  <div className="absolute w-3 h-3 bg-accent-500 rounded-full -left-[7px] top-1.5" />
                  <h4 className="font-bold text-navy-900">1. Tell me what you&apos;re trying to improve</h4>
                  <p className="text-sm text-neutral-600 mt-1">Fill out the form or book a free consultation directly.</p>
                </li>
                <li className="pl-8 relative">
                  <div className="absolute w-3 h-3 bg-neutral-300 rounded-full -left-[7px] top-1.5" />
                  <h4 className="font-bold text-navy-900">2. I&apos;ll understand the requirement</h4>
                  <p className="text-sm text-neutral-600 mt-1">We will discuss your bottlenecks and goals.</p>
                </li>
                <li className="pl-8 relative">
                  <div className="absolute w-3 h-3 bg-neutral-300 rounded-full -left-[7px] top-1.5" />
                  <h4 className="font-bold text-navy-900">3. Determine next steps</h4>
                  <p className="text-sm text-neutral-600 mt-1">I&apos;ll propose a technical strategy tailored to your business.</p>
                </li>
              </ol>
            </div>

            <div className="pt-8 border-t border-neutral-200 space-y-4">
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="flex items-center gap-4 group p-4 rounded-xl bg-white border border-neutral-200 hover:border-navy-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center group-hover:bg-navy-900 transition-colors">
                  <Mail className="text-navy-900 group-hover:text-white" size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Email</p>
                  <p className="text-sm font-medium text-navy-900">{siteConfig.social.email}</p>
                </div>
              </a>

              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 rounded-xl bg-white border border-neutral-200 hover:border-green-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <WhatsAppIcon className="text-green-700 group-hover:text-white" size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Direct Message</p>
                  <p className="text-sm font-medium text-navy-900">Message on WhatsApp</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <div className="sticky top-24">
              <ContactForm />
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
