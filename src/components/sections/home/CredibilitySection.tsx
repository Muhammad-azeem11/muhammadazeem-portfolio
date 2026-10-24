"use client";

// src/components/sections/home/CredibilitySection.tsx
// Professional credibility & About summary on the homepage.
// Reuses core positioning from the dedicated About page.

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Building2, MapPin, Zap, ArrowRight, ExternalLink, Sparkles, Briefcase, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { PortfolioStatsConfig } from "@/lib/cms/testimonials";

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function CredibilitySection({ stats }: { stats?: PortfolioStatsConfig }) {
  const shouldReduce = useReducedMotion();
  const projectsValue = stats?.projectsCompleted ?? siteConfig.stats.projectsCompleted.value;
  const clientsValue = stats?.clientsServed ?? siteConfig.stats.clientsServed.value;
  const showStats = stats ? stats.verified : siteConfig.stats.verified;

  const containerVariants: Variants = {
    hidden: {},
    visible: { 
      transition: { staggerChildren: shouldReduce ? 0 : 0.15 } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE } 
    },
  };

  return (
    <section
      id="about"
      className="bg-neutral-50 py-16 lg:py-24 border-t border-neutral-100"
      aria-labelledby="about-heading"
    >
      <Container>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          {/* ── Left Content (Positioning & Bio) ─────────────────────────────────── */}
          <motion.div className="lg:col-span-5 flex flex-col items-start" variants={itemVariants}>
            <div className="inline-flex items-center gap-3 sm:gap-4 mb-4">
              <span className="w-8 sm:w-12 h-px bg-accent-500" />
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
                About Me
              </p>
            </div>
            
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-display font-extrabold text-navy-900 text-balance leading-[1.1] tracking-tight mb-4"
            >
              I Build Technology Around Business Problems.
            </h2>
            
            <div className="space-y-3.5 mb-6">
              <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                I help businesses automate inefficient workflows and scale their operations through intelligent systems.
              </p>
              <p className="text-base text-neutral-500 leading-relaxed">
                As a business-focused engineer, I understand that technology is merely a tool. The real goal is solving the underlying business problem—whether that means eliminating manual data entry, accelerating customer onboarding, or deploying autonomous AI agents that act as a tireless digital workforce.
              </p>
            </div>

            {/* ── Portfolio Statistics (22+ Projects Completed & 100+ Clients Served) ── */}
            {showStats && (
              <div
                className="grid grid-cols-2 gap-4 w-full mb-8"
                aria-label="Portfolio impact statistics"
              >
                <motion.div
                  variants={itemVariants}
                  className="group relative bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs hover:shadow-md hover:border-accent-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-400 opacity-80" aria-hidden="true" />
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-8 h-8 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 group-hover:scale-105 transition-transform">
                      <Briefcase size={15} aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                      Delivered
                    </span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight leading-none mb-1.5">
                    {projectsValue}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-600">
                    {siteConfig.stats.projectsCompleted.label}
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="group relative bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs hover:shadow-md hover:border-accent-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-navy-800 to-accent-500 opacity-80" aria-hidden="true" />
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-8 h-8 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-800 group-hover:scale-105 transition-transform">
                      <Users size={15} aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                      Worldwide
                    </span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight leading-none mb-1.5">
                    {clientsValue}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-600">
                    {siteConfig.stats.clientsServed.label}
                  </p>
                </motion.div>
              </div>
            )}
            
            <Button asChild variant="outline" className="group rounded-full px-8 h-12 border-navy-200 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-300">
              <Link href="/about">
                View Full Profile
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* ── Right Content (Professional Experience Card) ─────────────────────── */}
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <div className="bg-white rounded-[2rem] border border-neutral-200 p-8 md:p-12 shadow-sm hover:shadow-2xl transition-shadow duration-700 group relative overflow-hidden">
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-neutral-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">
                  Current Professional Experience
                </p>

                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  {/* Company icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center shadow-md group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500">
                      <Building2 size={28} className="text-white" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-display font-bold text-navy-900">
                        Wilsden
                      </h3>
                      <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                          aria-hidden="true"
                        />
                        Active Engagement
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                      <MapPin size={14} aria-hidden="true" />
                      <span>United Kingdom</span>
                    </div>

                    <p className="text-neutral-600 leading-relaxed text-sm">
                      Currently working with this UK-based company to automate their business tasks—identifying manual processes and building automation solutions to improve operational efficiency.
                    </p>
                  </div>
                </div>

                {/* Divider & Focus Area */}
                <div className="border-t border-neutral-100 mt-8 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-100 transition-colors duration-500">
                      <Zap size={16} className="text-accent-600" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                      <span className="font-bold text-navy-900">Core Focus:</span>{" "}
                      Business workflow automation—identifying repetitive manual processes and building intelligent systems to reduce operational overhead.
                    </p>
                  </div>
                </div>

                {/* ── Engagement Proof ────────────────────────────────────────── */}
                <div className="border-t border-neutral-100 mt-8 pt-8">
                  <div className="rounded-2xl bg-neutral-50/80 border border-neutral-200/80 p-5 sm:p-6 transition-all duration-300 hover:border-neutral-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent-700">
                            Engagement Proof
                          </p>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-navy-900 mt-1">
                          Technical Partner — Wilsden
                        </h4>
                        <p className="text-xs text-neutral-500">
                          Official engagement confirmation
                        </p>
                      </div>

                      <a
                        href="/images/wilsden.png"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 transition-colors group/link self-start sm:self-auto"
                      >
                        <span>View Engagement Proof</span>
                        <ExternalLink size={13} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>

                    {/* Document Preview */}
                    <a
                      href="/images/wilsden.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/img relative block w-full rounded-xl overflow-hidden border border-neutral-200/90 bg-white shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                      aria-label="View official engagement proof document"
                    >
                      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-neutral-100">
                        <Image
                          src="/images/wilsden.png"
                          alt="Official Wilsden Engagement Confirmation Document"
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-navy-900 text-xs font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                            <ExternalLink size={14} className="text-accent-600" />
                            View Full Document
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── AI/Technology Banner with Smooth Left-to-Right Reveal ──────────────── */}
        <motion.div
          className="mt-10 lg:mt-14 w-full max-w-4xl mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-navy-800/80 shadow-lg px-6 py-4 sm:px-8 sm:py-5"
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -60 }}
          whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: shouldReduce ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle ambient technology glow & top hairline accent */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-500/30 via-transparent to-transparent" 
            aria-hidden="true" 
          />
          <div 
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" 
            aria-hidden="true" 
          />

          <motion.div 
            className="relative z-10 flex items-center justify-center gap-3 text-center"
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <Sparkles size={16} className="text-accent-400 shrink-0 hidden sm:block" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed tracking-wide text-center whitespace-normal md:whitespace-nowrap">
              Explore how thoughtful automation can transform complex workflows into scalable systems.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
