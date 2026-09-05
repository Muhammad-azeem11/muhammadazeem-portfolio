"use client";

// src/components/sections/home/ProcessSection.tsx
// 4-step process: Understand → Analyze → Automate → Improve

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    title: "Understand",
    description: "We start with your business, not with technology. I learn how your operations currently work — what your team does daily, where the friction is, and what a better outcome looks like.",
  },
  {
    title: "Analyze",
    description: "Every workflow is mapped and evaluated. I identify exactly where time is being lost, which tasks are automatable, and which integrations would deliver the most value.",
  },
  {
    title: "Automate",
    description: "The right tools are selected and the automation is built — integrating with your existing systems without disrupting what already works well.",
  },
  {
    title: "Improve",
    description: "After deployment, the automation is monitored, measured, and refined. Business needs change, and the systems should adapt accordingly.",
  },
];

const VIEWPORT = { once: true, margin: "-15%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const; // Elegant custom easing

export function ProcessSection() {
  const shouldReduce = useReducedMotion();

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE } 
    },
  };

  const processContainerVariants: Variants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: shouldReduce ? 0 : 0.3, 
        delayChildren: shouldReduce ? 0 : 0.2 
      } 
    },
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: shouldReduce ? 0 : 0.7, ease: EASE } 
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: shouldReduce ? 0 : 0.7, ease: EASE } 
    },
  };

  return (
    <section
      className="bg-neutral-50 py-16 lg:py-24 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <Container>
        {/* ── Section header ─────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={headerVariants}
        >
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
              How I Work
            </p>
            <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
          </div>
          <h2
            id="process-heading"
            className="text-4xl md:text-5xl font-display font-extrabold text-navy-900 text-balance leading-tight"
          >
            From Business Problem to Automation
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-pretty">
            A structured process that starts with understanding your
            business — not selecting technology.
          </p>
        </motion.div>

        {/* ── Steps sequence ─────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={processContainerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={stepVariants}
              className="relative group"
            >
              {/* Animated Connector line (desktop) */}
              {index < steps.length - 1 && (
                <motion.div
                  variants={lineVariants}
                  className="hidden lg:block absolute top-7 left-[calc(100%-20px)] w-[calc(100%+20px)] h-[2px] z-0 origin-left"
                  style={{
                    background: "linear-gradient(to right, #e5e5e5 0%, #1d6fe8 100%)",
                  }}
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10 bg-white rounded-3xl border border-neutral-200 p-8 h-full flex flex-col hover:border-accent-200 hover:shadow-xl transition-all duration-500">
                {/* Step indicator */}
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-navy-900 group-hover:bg-accent-600 transition-colors duration-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-xs font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-navy-900 mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
