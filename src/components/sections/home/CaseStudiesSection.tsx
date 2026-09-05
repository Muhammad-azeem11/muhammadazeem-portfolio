"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types";

const DEMO_LINKS: Record<string, string> = {
  "ai-document-processing-data-extraction": "https://youtu.be/toV23JEnABY",
  "ai-voice-receptionist-demo": "https://youtu.be/qS7_dj50Bw4",
  "ai-client-onboarding-demo": "https://youtu.be/o3E7dOJOkE8",
  "intelligent-email-document-automation": "https://youtu.be/toV23JEnABY",
  "ai-voice-agent": "https://youtu.be/qS7_dj50Bw4",
  "ai-client-onboarding-automation": "https://youtu.be/o3E7dOJOkE8",
};

// ── Animation helpers ─────────────────────────────────────────────────────────

const VIEWPORT = { once: true, margin: "-5%" } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function CaseStudiesSection({ caseStudies = [] }: { caseStudies?: CaseStudy[] }) {
  const shouldReduce = useReducedMotion();

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 1, ease: EASE } },
  };

  const staggerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.1 } },
  };

  return (
    <section id="case-studies" className="bg-white py-16 lg:py-24 relative overflow-hidden" aria-labelledby="case-studies-heading">
      {/* Premium ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, #0f172a 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-[0.03] pointer-events-none bg-accent-500 rounded-full blur-[120px]" />
      
      <Container>
        {/* ── Section Header ─────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14 space-y-5 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUpVariants}
        >
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
              Case Studies
            </p>
            <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
          </div>
          <h2
            id="case-studies-heading"
            className="text-4xl md:text-5xl lg:text-[4rem] font-display font-extrabold text-navy-900 text-balance leading-[1.05] tracking-tight"
          >
            Turning Complex Workflows<br />Into Intelligent Systems.
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto text-pretty mt-6 leading-relaxed font-medium">
            A closer look at how I architect AI-powered automation, streamline business operations, and build intelligent infrastructure around real-world client needs.
          </p>
        </motion.div>

        {/* ── Asymmetric Bento Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mb-14 relative z-10">
          {caseStudies.map((project, index) => {
            const workflowSteps = project.architecture || [];

            // Bento Grid Sizing Logic
            let colSpan = "md:col-span-12 lg:col-span-4";
            let rowSpan = "";
            let isHero = false;
            let isSecondary = false;

            if (index === 0) {
              // Primary Card (Hero)
              colSpan = "md:col-span-12 lg:col-span-8";
              rowSpan = "lg:row-span-2";
              isHero = true;
            } else if (index === 1) {
              // Secondary Tall Card
              colSpan = "md:col-span-12 lg:col-span-4";
              rowSpan = "lg:row-span-2";
              isSecondary = true;
            } else {
              // 3rd Wide Card (Full width row)
              colSpan = "md:col-span-12";
            }

            const videoUrl = project.videoUrl || DEMO_LINKS[project.slug] || "";

            return (
              <motion.article
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={fadeUpVariants}
                className={cn(
                  "group relative rounded-[2rem] overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-2xl transition-all duration-700 ease-out flex flex-col hover:-translate-y-1 bg-clip-padding",
                  colSpan,
                  rowSpan
                )}
              >
                <Link href={`/case-studies/${project.slug}`} className="absolute inset-0 z-20">
                  <span className="sr-only">View Case Study: {project.title}</span>
                </Link>

                {/* Subtle Hover Gradient Illumination */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-neutral-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* ── HERO LAYOUT (Wilsden) ──────────────────────────────────── */}
                {isHero ? (
                  <div 
                    className="flex flex-col h-full text-white relative"
                    style={{ backgroundColor: "#020817" }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[120px] transition-opacity duration-700 opacity-50 group-hover:opacity-100 pointer-events-none" />
                    
                    <div className="p-8 lg:p-14 flex flex-col justify-between h-full relative z-10">
                      
                      <div className="space-y-6 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-accent-500/20 text-accent-400 border border-accent-500/30 rounded-full flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                            {project.projectType}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                            0{index + 1}
                          </span>
                        </div>
                        
                        <h3 
                          className="text-4xl md:text-5xl font-display font-extrabold leading-[1.1] transition-colors duration-500"
                          style={{ color: "#ffffff" }}
                        >
                          {project.title}
                        </h3>
                        
                        <p 
                          className="text-lg font-medium leading-relaxed"
                          style={{ color: "#94a3b8" }}
                        >
                          {project.summary}
                        </p>
                      </div>

                      <div className="mt-16 flex flex-col lg:flex-row gap-12 lg:items-end justify-between">
                        
                        {/* Animated Workflow Preview */}
                        <div className="flex-1 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-6">Workflow Architecture</h4>
                           <motion.div 
                             className="flex flex-col gap-3"
                             variants={staggerVariants}
                             initial="hidden"
                             whileInView="visible"
                             viewport={VIEWPORT}
                           >
                             {workflowSteps.slice(0, 4).map((step, i) => {
                               const IconComponent = (LucideIcons as any)[step.icon || "Circle"] || LucideIcons.Circle;
                               return (
                                 <div key={i} className="flex items-center gap-4 relative">
                                   {i !== Math.min(workflowSteps.length, 4) - 1 && (
                                     <div className="absolute left-4 top-8 w-px h-6 bg-white/10" />
                                   )}
                                   <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/5 group-hover:border-accent-500/30 group-hover:bg-accent-500/10 transition-colors duration-500">
                                     <IconComponent size={14} className="text-white/70 group-hover:text-accent-400 transition-colors" />
                                   </div>
                                   <div className="flex-1">
                                     <span className="text-xs font-semibold text-white/90">{step.label}</span>
                                   </div>
                                 </div>
                               )
                             })}
                             {workflowSteps.length > 4 && (
                               <div className="pl-12 text-[10px] font-bold uppercase tracking-widest text-accent-400 mt-2">
                                 + {workflowSteps.length - 4} More Steps
                                </div>
                             )}
                           </motion.div>
                        </div>

                        {/* Tech Stack & CTA */}
                        <div className="flex flex-col gap-8 shrink-0">
                          <div className="flex flex-wrap gap-2 max-w-[280px]">
                            {project.technologies.map(tech => (
                              <span key={tech} className="px-3 py-1.5 bg-white/10 text-white/90 text-xs font-semibold rounded-md border border-white/5">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 flex-wrap relative z-30">
                            <Link
                              href={`/case-studies/${project.slug}`}
                              className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-white hover:text-accent-400 transition-colors"
                            >
                              View Case Study
                              <div className="w-9 h-9 rounded-full bg-accent-600 flex items-center justify-center group-hover:bg-accent-500 group-hover:scale-105 transition-all duration-300">
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                              </div>
                            </Link>

                            {videoUrl && (
                              <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 border border-red-500/80 hover:border-red-400 px-4 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-red-600/30 hover:scale-105 cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Play size={12} className="fill-current" />
                                Watch Demo
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ) : 
                
                /* ── SECONDARY / SUPPORTING LAYOUTS ──────────────────────────── */
                (
                  <div className="flex flex-col h-full p-8 lg:p-10 relative z-10 justify-between group-hover:bg-neutral-50/50 transition-colors duration-500">
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                            {project.category}
                          </span>
                          {project.projectType && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-navy-900 border border-neutral-200 px-3 py-1 rounded-full bg-white flex items-center gap-1.5 shadow-sm">
                              <span className="w-1 h-1 rounded-full bg-green-500" />
                              {project.projectType}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                          0{index + 1}
                        </span>
                      </div>
                      
                      <h3 className={cn("font-display font-bold text-navy-900 group-hover:text-accent-600 transition-colors duration-500", isSecondary ? "text-3xl lg:text-4xl leading-[1.1]" : "text-2xl")}>
                        {project.title}
                      </h3>
                      
                      <p className="text-neutral-600 font-medium leading-relaxed text-sm">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-12 flex flex-col gap-6">
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, isSecondary ? 6 : 3).map(tech => (
                          <span key={tech} className="px-2.5 py-1 bg-neutral-100 text-navy-900 text-[11px] font-bold rounded-md border border-neutral-200">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > (isSecondary ? 6 : 3) && (
                          <span className="px-2.5 py-1 text-neutral-500 text-[11px] font-bold">
                            +{project.technologies.length - (isSecondary ? 6 : 3)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-100 relative z-30 flex-wrap">
                        <Link
                          href={`/case-studies/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-accent-600 transition-colors"
                        >
                          View Case Study
                          <ArrowUpRight size={15} className="text-accent-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </Link>

                        {videoUrl && (
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 px-3.5 py-1.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Play size={11} className="fill-current" />
                            Watch Demo
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* ── View all CTA ───────────────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUpVariants}
        >
          <Button asChild variant="outline" size="lg" className="group border-navy-200 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-500 shadow-sm hover:shadow-xl rounded-full px-10 h-14 text-sm tracking-wider font-bold uppercase">
            <Link href="/case-studies">
              View All Case Studies
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
