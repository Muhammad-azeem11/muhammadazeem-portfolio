"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Download, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function AboutHeroSection() {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.8, ease: EASE } },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy-900 text-white">
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* ── Left Content (Profile Image & Effects) ──────────────── */}
          <motion.div
            className="flex justify-center lg:justify-start relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              {/* Premium Background Glow Effect */}
              <div className="absolute inset-0 bg-accent-500/10 blur-[60px] rounded-full mix-blend-screen" />
              
              {/* Subtle animated ring */}
              {!shouldReduce && (
                <div 
                  className="absolute -inset-6 border border-white/5 rounded-full"
                  style={{ animation: 'spin 25s linear infinite reverse' }}
                />
              )}

              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-[2rem] p-3 bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-md shadow-2xl border border-white/10 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-navy-950 border border-white/5">
                  <Image
                    src="/images/azeempic.jpg"
                    alt="Muhammad Azeem - AI Automation Engineer"
                    fill
                    priority
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 450px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Floating capability badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 sm:bottom-0 sm:-right-4 bg-navy-800/90 backdrop-blur-md border border-white/10 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-2xl flex flex-col gap-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              >
                <span className="text-accent-400">Muhammad Azeem</span>
                <span className="text-neutral-400 font-normal">AI Automation Engineer</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Content (Bio & Text) ─────────────────────────── */}
          <motion.div
            className="flex flex-col items-start text-left order-1 lg:order-2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-300 ring-1 ring-inset ring-accent-500/20">
                About Me
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.15] text-balance mb-4 text-white"
              style={{ color: "#ffffff" }}
            >
              I Build Technology Around Business Problems
            </motion.h1>

            {/* Subheading / Bio */}
            <motion.div variants={itemVariants} className="space-y-3.5 mb-8">
              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed text-pretty font-medium">
                I help businesses automate inefficient workflows and help startups build technical products.
              </p>
              <p className="text-base text-neutral-400 leading-relaxed text-pretty">
                As a business-focused engineer, I understand that technology is merely a tool. The real goal is solving the underlying business problem, whether that means reducing manual data entry, accelerating customer onboarding, or building a scalable backend for a new startup.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button asChild size="xl" variant="primary" className="w-full sm:w-auto shadow-xl bg-accent-600 hover:bg-accent-500 text-white border-0">
                <Link href={siteConfig.cta.primary.href} onClick={() => import("@/lib/analytics").then(m => m.trackEvent("book_call_click"))}>
                  {siteConfig.cta.primary.label}
                  <ChevronRight size={18} />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-inverse" className="w-full sm:w-auto border-white/20 hover:bg-white/10 group">
                <a href="/documents/azeem-resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => import("@/lib/analytics").then(m => m.trackEvent("resume_download"))}>
                  <Download size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                  View Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
