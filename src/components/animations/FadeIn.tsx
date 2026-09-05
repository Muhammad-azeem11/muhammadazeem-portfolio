"use client";

// src/components/animations/FadeIn.tsx
// Scroll-reveal fade in animation component.

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DEFAULT_TRANSITION } from "@/lib/constants";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  inView?: boolean;
};

/**
 * Fade-in animation wrapper using Framer Motion.
 * Respects prefers-reduced-motion — falls back to instant visibility.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration,
  direction = "up",
  distance = 20,
  inView = true,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...directionOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration ?? DEFAULT_TRANSITION.duration,
        ease: DEFAULT_TRANSITION.ease,
        delay,
      },
    },
  };

  const reducedVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={reducedMotion ? reducedVariants : variants}
    >
      {children}
    </motion.div>
  );
}
