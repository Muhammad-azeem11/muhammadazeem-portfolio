"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function CaseStudyFilterGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(caseStudies.map((cs) => cs.category));
    return ["All", ...Array.from(cats)];
  }, [caseStudies]);

  const filteredStudies = useMemo(() => {
    if (activeCategory === "All") return caseStudies;
    return caseStudies.filter((cs) => cs.category === activeCategory);
  }, [caseStudies, activeCategory]);

  return (
    <div className="w-full">
      {/* ── Filters ────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900",
              activeCategory === category
                ? "bg-navy-900 text-white shadow-md"
                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300"
            )}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ── Grid ───────────────────────────────────────────────── */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={study.id}
              className="group flex flex-col bg-white rounded-3xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-navy-200 transition-all duration-500"
            >
              <div className="p-8 md:p-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                  <Badge variant={study.projectType.includes("WILSDEN") || study.projectType.includes("CLIENT") ? "navy" : "outline"}>
                    {study.projectType}
                  </Badge>
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                    {study.category}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-navy-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                  {study.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed mb-8 flex-1">
                  {study.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {study.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neutral-50 text-neutral-600 text-xs font-medium rounded-lg border border-neutral-100"
                    >
                      {tech}
                    </span>
                  ))}
                  {study.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-neutral-50 text-neutral-600 text-xs font-medium rounded-lg border border-neutral-100">
                      +{study.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-3 flex-wrap">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 group-hover:text-accent-600 transition-colors duration-300"
                  >
                    View Case Study
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </Link>

                  {study.videoUrl && (
                    <a
                      href={study.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 px-3 py-1.5 rounded-lg transition-all duration-200 z-30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play size={12} className="fill-current" />
                      Watch Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {filteredStudies.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-neutral-500">No case studies found for this category.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
