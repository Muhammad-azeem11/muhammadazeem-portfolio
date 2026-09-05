// src/lib/constants.ts
// Shared constants and configuration values.

/** Animation presets for Framer Motion — used across all animated components */
export const ANIMATION_VARIANTS = {
  /** Fade in from invisible */
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  /** Slide up and fade in */
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },

  /** Slide in from left */
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },

  /** Slide in from right */
  slideRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },

  /** Scale up from slightly smaller */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

/** Default transition settings for Framer Motion */
export const DEFAULT_TRANSITION = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94], // ease-elegant
} as const;

/** Stagger children configuration */
export const STAGGER_CHILDREN = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
} as const;

/** Breakpoints matching Tailwind defaults (in px) */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** Max width for the main content container */
export const CONTAINER_MAX_WIDTH = 1280;

/** Header height (used for scroll offset calculations) */
export const HEADER_HEIGHT = 72;

/** Service categories */
export const SERVICE_CATEGORIES = [
  "AI Automation",
  "AI Agents",
  "CRM & Process Automation",
  "SaaS Development",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
