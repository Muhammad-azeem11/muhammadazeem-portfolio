"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as Icons from "lucide-react";
import type { WorkflowStep } from "@/types";
import { cn } from "@/lib/utils";

type WorkflowDiagramProps = {
  steps: WorkflowStep[];
  className?: string;
};

export function WorkflowDiagram({ steps, className }: WorkflowDiagramProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div className={cn("relative py-8 md:py-12", className)}>
      <div className="flex flex-col space-y-12 md:space-y-0 md:flex-row md:items-start md:justify-between relative z-10">
        
        {/* Responsive Line Connector */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-100 md:hidden z-0" aria-hidden="true" />
        <div className="hidden md:block absolute top-[28px] left-8 right-8 h-0.5 bg-neutral-100 z-0" aria-hidden="true" />

        {steps.map((step, index) => {
          // Dynamically load the icon from lucide-react if provided, fallback to Zap
          const IconComponent = step.icon && (Icons as any)[step.icon] 
            ? (Icons as any)[step.icon] 
            : Icons.Zap;

          return (
            <motion.div
              key={step.id}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: shouldReduce ? 0 : index * 0.15, duration: 0.6 }}
              className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-4 md:w-1/4 z-10 group"
            >
              {/* Icon / Node */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-neutral-100 flex items-center justify-center shadow-sm group-hover:border-navy-900 group-hover:shadow-lg transition-all duration-300 relative z-10 shrink-0">
                  <IconComponent size={24} className="text-navy-900" aria-hidden="true" />
                </div>
                {/* Arrow to next step (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-[calc(50vw/4)] lg:-right-[calc(100%/1.5)] w-full h-px pointer-events-none">
                    <Icons.ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="md:text-center mt-1 md:mt-2">
                <div className="text-xs font-bold text-accent-600 mb-1 tracking-widest uppercase">
                  Step {index + 1}
                </div>
                <h4 className="text-base font-semibold text-navy-900 mb-2 leading-tight">
                  {step.label}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-[200px] md:mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
