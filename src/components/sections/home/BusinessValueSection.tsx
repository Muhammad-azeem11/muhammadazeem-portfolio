"use client";

// src/components/sections/home/BusinessValueSection.tsx
// High-end AI automation consultancy problem diagnosis section.

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Clock,
  Layers,
  AlertTriangle,
  Database,
  Timer,
  MessageSquare,
  Network,
  ArrowRight,
  ClipboardList,
  Workflow,
  Hourglass,
  TrendingUp,
  FileEdit,
  Zap,
  User,
  Send,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const painPoints = [
  {
    icon: Clock,
    colorClass: "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-100 group-hover:border-blue-300",
    glowClass: "bg-blue-400/30",
    title: "Repetitive Manual Work",
    description: "Your team spends hours on tasks that could be automated — time that could be spent on work that actually drives growth.",
    fromLabel: "Manual Task",
    fromIcon: ClipboardList,
    fromColorClass: "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-100",
    toLabel: "Automated Workflow",
    toIcon: Workflow,
    toColorClass: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-100",
  },
  {
    icon: Layers,
    colorClass: "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-100 group-hover:border-indigo-300",
    glowClass: "bg-indigo-400/30",
    title: "Disconnected Tools",
    description: "Data lives in different places. Your CRM doesn't talk to your email. Your spreadsheet is always out of date.",
    fromLabel: "Siloed Data",
    fromIcon: Database,
    fromColorClass: "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-100",
    toLabel: "Unified System",
    toIcon: Network,
    toColorClass: "bg-accent-50 text-accent-600 border-accent-200/80 group-hover:bg-accent-100",
  },
  {
    icon: AlertTriangle,
    colorClass: "bg-rose-50 text-rose-600 border-rose-200/80 group-hover:bg-rose-100 group-hover:border-rose-300",
    glowClass: "bg-rose-400/30",
    title: "Inefficient Workflows",
    description: "Processes that made sense when the business was smaller now create bottlenecks as you scale.",
    fromLabel: "Bottleneck",
    fromIcon: Hourglass,
    fromColorClass: "bg-rose-50 text-rose-600 border-rose-200/80 group-hover:bg-rose-100",
    toLabel: "Streamlined Process",
    toIcon: TrendingUp,
    toColorClass: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-100",
  },
  {
    icon: Database,
    colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-100 group-hover:border-emerald-300",
    glowClass: "bg-emerald-400/30",
    title: "Manual Data Entry",
    description: "Information typed manually from one system into another — a constant source of errors and wasted time.",
    fromLabel: "Manual Sync",
    fromIcon: FileEdit,
    fromColorClass: "bg-teal-50 text-teal-600 border-teal-200/80 group-hover:bg-teal-100",
    toLabel: "Real-Time Data",
    toIcon: Zap,
    toColorClass: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-100",
  },
  {
    icon: Timer,
    colorClass: "bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-100 group-hover:border-amber-300",
    glowClass: "bg-amber-400/30",
    title: "Slow Follow-Ups",
    description: "Leads and clients wait longer than they should because follow-ups depend on someone remembering to send them.",
    fromLabel: "Lead",
    fromIcon: User,
    fromColorClass: "bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-100",
    toLabel: "Automatic Follow-Up",
    toIcon: Send,
    toColorClass: "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-100",
  },
  {
    icon: MessageSquare,
    colorClass: "bg-cyan-50 text-cyan-600 border-cyan-200/80 group-hover:bg-cyan-100 group-hover:border-cyan-300",
    glowClass: "bg-cyan-400/30",
    title: "Repetitive Communication",
    description: "The same emails, the same updates, the same messages — sent manually, over and over, every day.",
    fromLabel: "Template",
    fromIcon: LayoutTemplate,
    fromColorClass: "bg-cyan-50 text-cyan-600 border-cyan-200/80 group-hover:bg-cyan-100",
    toLabel: "AI Generated",
    toIcon: Sparkles,
    toColorClass: "bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-100",
  },
  {
    icon: Network,
    colorClass: "bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-100 group-hover:border-purple-300",
    glowClass: "bg-purple-400/30",
    title: "Poorly Connected Systems",
    description: "Systems that don't communicate mean information falls through the gaps and teams work with incomplete data.",
    fromLabel: "Siloed Data",
    fromIcon: Database,
    fromColorClass: "bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-100",
    toLabel: "Unified System",
    toIcon: Network,
    toColorClass: "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-100",
  },
];

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const; // Elegant custom easing

export function BusinessValueSection() {
  const shouldReduce = useReducedMotion();

  // Header staggered sequence
  const headerContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.1 } },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.8, ease: EASE } },
  };

  const gridContainerVariants: Variants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: shouldReduce ? 0 : 0.1, 
        delayChildren: shouldReduce ? 0 : 0.3 
      } 
    },
  };

  // Subtle scale + translate for cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE },
    },
  };

  return (
    <section
      className="relative bg-white py-16 lg:py-24 overflow-hidden"
      aria-labelledby="problem-heading"
    >
      {/* ── Elegant Workflow Background ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Soft elegant gradients */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-navy-100/30 rounded-full blur-[150px]" />
        
        {/* Subtle grid pattern */}
        <svg className="absolute w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Elegant glowing nodes */}
        {!shouldReduce && (
          <>
            <motion.div
              className="absolute left-[15%] top-1/3 w-3 h-3 rounded-full bg-accent-400/40 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              animate={{ y: [0, 100, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[20%] bottom-1/3 w-2 h-2 rounded-full bg-navy-600/30 shadow-[0_0_10px_rgba(15,23,42,0.3)]"
              animate={{ y: [0, -80, 0], x: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/4 w-1.5 h-1.5 rounded-full bg-accent-500/30 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
              animate={{ scale: [1, 2, 1], opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* ── Section header ──────────────────────────────────── */}
          <motion.div
            className="text-center mb-14 space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={headerContainerVariants}
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2">
              <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
                The Business Problem
              </p>
              <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
            </motion.div>
            <motion.h2
              variants={fadeUpVariants}
              id="problem-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-navy-900 text-balance leading-[1.1] tracking-tight"
            >
              Where Businesses Lose Time and Money
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto text-pretty leading-relaxed">
              Most businesses have significant inefficiencies hidden inside their daily operations. They are not always obvious — but they have a real cost in time, energy, and growth potential.
            </motion.p>
          </motion.div>

          {/* ── Pain points grid ────────────────────────────────── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={gridContainerVariants}
          >
            {painPoints.map((point) => {
              const FromIcon = point.fromIcon;
              const ToIcon = point.toIcon;

              return (
                <motion.div
                  key={point.title}
                  variants={cardVariants}
                  className="group relative overflow-hidden flex flex-col gap-5 p-8 rounded-[2rem] bg-white border border-navy-900/5 hover:border-navy-900/10 shadow-sm hover:shadow-2xl hover:shadow-navy-900/5 hover:-translate-y-1.5 transition-all duration-500"
                >
                  {/* Accent top line revealed on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 to-accent-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
                  
                  {/* Icon & Glow */}
                  <div className={cn(
                    "relative w-14 h-14 flex-shrink-0 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-sm",
                    point.colorClass
                  )}>
                    <div className={cn("absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full", point.glowClass)} aria-hidden="true" />
                    <point.icon
                      size={26}
                      strokeWidth={2.2}
                      className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <h3 className="font-display font-bold text-navy-900 mb-3 text-xl tracking-tight transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="text-neutral-600 text-base leading-relaxed mb-8">
                      {point.description}
                    </p>
                    
                    {/* Interactive Transition Element (bottom of card) */}
                    <div className="mt-auto pt-5 border-t border-navy-900/5 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-semibold tracking-wide">
                      {/* Problem / Manual side */}
                      <div className="flex items-center gap-2 min-w-0 text-navy-900">
                        <span className={cn(
                          "w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm",
                          point.fromColorClass
                        )}>
                          <FromIcon size={12} strokeWidth={2.2} aria-hidden="true" />
                        </span>
                        <span className="truncate text-neutral-700 font-medium">{point.fromLabel}</span>
                      </div>

                      {/* Transition Arrow */}
                      <div className="w-5 h-5 rounded-full bg-accent-50 border border-accent-100 flex items-center justify-center shrink-0 text-accent-600 transition-transform duration-300 group-hover:scale-110">
                        <ArrowRight size={10} strokeWidth={2.5} aria-hidden="true" />
                      </div>

                      {/* Automated / Solution side */}
                      <div className="flex items-center gap-2 min-w-0 text-navy-900 group-hover:text-accent-600 transition-colors">
                        <span className={cn(
                          "w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm",
                          point.toColorClass
                        )}>
                          <ToIcon size={12} strokeWidth={2.2} aria-hidden="true" />
                        </span>
                        <span className="truncate font-semibold">{point.toLabel}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Closing statement / Transition ──────────────────── */}
          <motion.div
            className="text-center relative max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUpVariants}
          >
            <motion.div 
              className="inline-flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 px-6 py-3.5 rounded-full bg-white/95 border border-neutral-200/90 shadow-sm text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-8"
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: shouldReduce ? 0 : 0.6, ease: EASE }}
              aria-hidden="true"
            >
              <span className="text-neutral-500">Inefficiency</span>
              <div className="w-8 sm:w-12 h-[1.5px] bg-neutral-200 relative overflow-hidden rounded-full">
                {!shouldReduce && (
                  <motion.div 
                    className="absolute inset-y-0 left-0 w-full bg-accent-500"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
              <span className="text-accent-600 font-extrabold">Automation</span>
              <div className="w-8 sm:w-12 h-[1.5px] bg-neutral-200 relative overflow-hidden rounded-full">
                {!shouldReduce && (
                  <motion.div 
                    className="absolute inset-y-0 left-0 w-full bg-accent-500"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                  />
                )}
              </div>
              <span className="text-navy-900 font-extrabold">Better Operations</span>
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-navy-900 text-balance leading-tight">
              These inefficiencies are opportunities for automation.
            </h3>
            
            {/* Subtle animated line leading to next section */}
            <div className="mt-8 mx-auto w-px h-12 bg-gradient-to-b from-neutral-200 to-transparent relative overflow-hidden">
              {!shouldReduce && (
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-accent-500 to-transparent"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
