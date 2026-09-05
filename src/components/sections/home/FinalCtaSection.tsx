"use client";

// src/components/sections/home/FinalCtaSection.tsx
// Strong, minimal closing CTA focused on booking a call.

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/lib/social-icons";
import { siteConfig } from "@/config/site";

const VIEWPORT = { once: true, margin: "-15%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function FinalCtaSection() {
  const shouldReduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { 
      transition: { staggerChildren: shouldReduce ? 0 : 0.15 } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: shouldReduce ? 0 : 0.7, ease: EASE } 
    },
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(135deg, #060c18 0%, #0a1628 50%, #0f2040 100%)",
      }}
      aria-labelledby="final-cta-heading"
    >
      {/* ── Background Elements ────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.5, ease: "easeOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute top-0 left-[30%] w-px h-48 pointer-events-none origin-top"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(29,111,232,0.2), transparent)",
        }}
        initial={shouldReduce ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-[20%] h-px w-64 pointer-events-none origin-left"
        style={{
          background: "linear-gradient(to right, transparent, rgba(29,111,232,0.2), transparent)",
        }}
        initial={shouldReduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        aria-hidden="true"
      />

      {/* ── Main Content ───────────────────────────────────────────── */}
      <Container className="relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400 mb-6"
            variants={itemVariants}
          >
            Let&apos;s Talk
          </motion.p>

          <motion.h2
            id="final-cta-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] text-balance mb-8"
            style={{ color: "#ffffff" }}
            variants={itemVariants}
          >
            Ready to Reduce Your Operational Costs?
          </motion.h2>

          <motion.p
            className="text-xl text-neutral-300 leading-relaxed text-pretty max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            Let&apos;s discuss your business, challenges, and opportunities for AI automation. No pressure, no generic pitch — just a focused conversation about your business.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10 w-full sm:w-auto"
            variants={itemVariants}
          >
            <Button
              asChild
              variant="inverse"
              size="xl"
              className="group shadow-2xl shadow-white/5 hover:shadow-white/10 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              <Link href={siteConfig.cta.primary.href} onClick={() => import("@/lib/analytics").then(m => m.trackEvent("book_call_click"))}>
                <CalendarCheck size={18} aria-hidden="true" />
                {siteConfig.cta.primary.label}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <a
              href={siteConfig.social.whatsapp} onClick={() => import("@/lib/analytics").then(m => m.trackEvent("whatsapp_click"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 w-full sm:w-auto justify-center"
              aria-label="Message on WhatsApp"
            >
              <WhatsAppIcon size={18} />
              Message on WhatsApp
            </a>
          </motion.div>

          <motion.p 
            className="text-sm text-neutral-500" 
            variants={itemVariants}
          >
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.social.email}`} onClick={() => import("@/lib/analytics").then(m => m.trackEvent("email_click"))}
              className="text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            >
              {siteConfig.social.email}
            </a>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
