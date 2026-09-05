"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function TestimonialsSection() {
  const shouldReduce = useReducedMotion();

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE } 
    },
  };

  return (
    <section
      className="bg-neutral-50 py-24 lg:py-32 border-t border-neutral-100"
      aria-labelledby="testimonials-heading"
    >
      <Container size="sm">
        <motion.div
          className="text-center space-y-6 bg-white rounded-3xl p-10 md:p-16 border border-neutral-200 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={headerVariants}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
            Client Feedback
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-display font-bold text-navy-900 text-balance"
          >
            What Clients Say
          </h2>
          <p className="text-neutral-600 max-w-md mx-auto text-pretty">
            Client feedback is published with permission from real clients.
          </p>
          <div className="pt-6">
            <Button asChild variant="outline" size="lg" className="hover:bg-navy-900 hover:text-white transition-colors">
              <Link href={siteConfig.cta.primary.href}>
                Discuss a project
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
