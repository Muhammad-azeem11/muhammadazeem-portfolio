"use client";

// src/components/animations/StaggerChildren.tsx
// Stagger children animation — each child animates in sequence.

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type StaggerChildrenProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  inView?: boolean;
};

/**
 * Container that staggers its direct children's animations.
 * Pair with FadeIn children for scroll reveals.
 */
export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0.05,
  inView = true,
}: StaggerChildrenProps) {
  const reducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerDelay,
        delayChildren: reducedMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

/** Pre-built child variants for use inside StaggerChildren */
export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};
