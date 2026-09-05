"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function HeroSection() {
  const shouldReduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.15,
        delayChildren: shouldReduce ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.8, ease: EASE },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex flex-col pt-24 lg:pt-28 pb-12 lg:pb-16"
      style={{
        background:
          "linear-gradient(135deg, #060c18 0%, #0a1628 50%, #0f2040 100%)",
      }}
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute top-0 right-16 w-px h-64 pointer-events-none origin-top bg-gradient-to-b from-transparent via-accent-400/20 to-transparent"
        initial={shouldReduce ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start w-full">
          
          {/* ── Left Content (Text & CTA) ─────────────────────────── */}
          <motion.div
            className="flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm text-neutral-300 border border-white/10 bg-black/20 backdrop-blur-sm shadow-xl">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  style={shouldReduce ? {} : { animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                  aria-hidden="true"
                />
                Helping Businesses Work Smarter with AI Automation
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="relative mb-6">
              {/* Optional background glow for extra contrast */}
              <div className="absolute -inset-4 bg-navy-950/40 blur-xl rounded-full mix-blend-multiply" aria-hidden="true" />
              <h1
                id="hero-heading"
                className="relative text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] text-balance"
                style={{ color: "#ffffff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
              >
                Automate the Work. Accelerate the Business.
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl text-pretty mb-8"
            >
              Hi, I'm Muhammad Azeem, an AI Automation Engineer. I help international businesses eliminate repetitive workflows, connect their systems, and build intelligent automation that saves time and reduces operational costs.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
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
              <Button asChild size="xl" variant="outline-inverse" className="w-full sm:w-auto border-white/20 hover:bg-white/10 group shadow-none">
                <Link href="/case-studies" onClick={() => import("@/lib/analytics").then(m => m.trackEvent("view_case_studies_click"))}>
                  <span className="mr-2">View Case Studies</span>
                  <ArrowRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right Content (Profile Image) ─────────────────────── */}
          <motion.div
            className="flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px]">
              {/* Premium Background Glow Effect */}
              <div className="absolute inset-0 bg-accent-500/20 blur-[80px] rounded-full mix-blend-screen" />
              
              {/* Subtle animated ring */}
              {!shouldReduce && (
                <div 
                  className="absolute -inset-4 border border-white/10 rounded-full"
                  style={{ animation: 'spin 20s linear infinite' }}
                />
              )}

              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-white/5 to-white/20 backdrop-blur-md shadow-2xl border border-white/10 overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-navy-900 border border-white/5">
                  <Image
                    src="/images/azeempic.jpg"
                    alt="Muhammad Azeem - AI Automation Engineer"
                    fill
                    priority
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 420px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
              
              {/* Floating capability badge */}
              <motion.div 
                className="absolute bottom-4 -left-4 sm:bottom-8 sm:-left-8 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6, ease: EASE }}
              >
                <span className="w-2 h-2 rounded-full bg-accent-400" />
                AI Automation Expert
              </motion.div>
            </div>
          </motion.div>

        </div>
      </Container>

      {!shouldReduce && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" style={{ animationDuration: "2s" }} />
        </motion.div>
      )}
    </section>
  );
}
