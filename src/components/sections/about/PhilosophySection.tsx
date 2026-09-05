"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Lightbulb, Target, Layers, Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const philosophySteps = [
  {
    icon: Lightbulb,
    title: "Understand the Business",
    description: "Technology is the means, not the starting point. I begin by understanding your goals, current workflows, bottlenecks, and operational challenges.",
    colorClass: "bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-100 group-hover:border-amber-300",
  },
  {
    icon: Target,
    title: "Identify the Opportunity",
    description: "I analyze your systems to find repetitive work, manual processes, disconnected data silos, and high-impact automation opportunities.",
    colorClass: "bg-sky-50 text-sky-600 border-sky-200/80 group-hover:bg-sky-100 group-hover:border-sky-300",
  },
  {
    icon: Layers,
    title: "Design the Solution",
    description: "I select the appropriate combination of automation tools (like n8n), AI, custom APIs, databases, and software to solve the exact problem.",
    colorClass: "bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-100 group-hover:border-purple-300",
  },
  {
    icon: Rocket,
    title: "Build & Improve",
    description: "I implement the solution cleanly, deploy it securely, and refine the architecture based on real business requirements and feedback.",
    colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-100 group-hover:border-emerald-300",
  },
];

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function PhilosophySection() {
  const shouldReduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE } },
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-display font-extrabold text-navy-900 mb-6"
          >
            My Approach to Problem Solving
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
          >
            I do not write code for the sake of writing code. Every technical architecture is built to serve a specific business outcome.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          {philosophySteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-neutral-50 rounded-3xl p-8 h-full border border-neutral-100 hover:border-navy-200 hover:shadow-xl transition-all duration-300">
                <div className={cn(
                  "w-12 h-12 rounded-xl border flex items-center justify-center mb-6 shadow-sm transition-all duration-300 group-hover:scale-110",
                  step.colorClass
                )}>
                  <step.icon
                    size={22}
                    strokeWidth={2.2}
                    className="transition-transform duration-300"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-xs font-bold text-accent-600 mb-2 tracking-widest uppercase">
                  Phase 0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
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
