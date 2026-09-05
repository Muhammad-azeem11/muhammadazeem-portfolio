"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const VIEWPORT = { once: true, margin: "-15%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function AboutFinalCtaSection() {
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
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(135deg, #060c18 0%, #0a1628 50%, #0f2040 100%)",
      }}
    >
      <Container className="relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.h2
            className="text-5xl sm:text-6xl font-display font-extrabold leading-[1.1] text-balance mb-8"
            style={{ color: "#ffffff" }}
            variants={itemVariants}
          >
            Ready to Build?
          </motion.h2>

          <motion.div
            className="text-xl text-neutral-300 leading-relaxed text-pretty max-w-2xl mx-auto mb-12 space-y-4"
            variants={itemVariants}
          >
            <p>I partner with:</p>
            <ul className="list-disc text-left inline-block space-y-2">
              <li>Business owners who want to automate workflows.</li>
              <li>Startups that need technical development support.</li>
            </ul>
          </motion.div>

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
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
