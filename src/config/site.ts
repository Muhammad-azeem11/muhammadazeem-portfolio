// src/config/site.ts
// Central configuration for the entire site.
// Update this file when brand details are confirmed.

export const siteConfig = {
  name: "Muhammad Azeem",
  title: "Muhammad Azeem — AI Automation Engineer",
  description:
    "I help international business owners and startup founders automate workflows and reduce operational costs using AI, n8n, Python, Django, and modern web technologies.",
  tagline: "Automate the Work. Accelerate the Business.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.muhammadazeemzahid.com",
  locale: "en",

  /**
   * Booking / primary conversion goal.
   * ─────────────────────────────────────────────────────────
   * Single source of truth for the booking link.
   * Every "Free Consultation" CTA across the site reads from here.
   */
  cta: {
    primary: {
      label: "Free Consultation",
      href: "/book",
      calendlyUrl: "https://calendly.com/muhammadazeemzahid1/30min",
    },
    secondary: {
      label: "View My Work",
      href: "/case-studies",
    },
  },

  /**
   * Social & contact — real, verified profiles.
   * Do not modify URLs without verifying they are correct.
   */
  social: {
    linkedin: "https://www.linkedin.com/in/muhammad-azeem-zahid-0936313b4/",
    github: "https://github.com/Muhammad-azeem11",
    instagram: "https://www.instagram.com/abdulazeem_.57",
    /** WhatsApp CTA link — international format, no raw number exposed */
    whatsapp: "https://wa.me/923336541388",
    email: "muhammadazeemzahid1@gmail.com",
  },

  /** Open Graph defaults */
  og: {
    image: "/og/og-default.png",
    type: "website" as const,
  },

  /** SEO keywords */
  keywords: [
    "AI automation developer",
    "full-stack developer",
    "n8n automation",
    "business workflow automation",
    "OpenAI integration",
    "Django developer",
    "Next.js developer",
    "startup developer",
    "freelance developer",
    "Python developer",
  ],

  /** Tech stack to feature — confirmed real stack */
  techStack: [
    "n8n",
    "OpenAI",
    "Python",
    "Django",
    "PostgreSQL",
    "Gmail / OAuth",
    "APIs",
    "Docker",
    "Next.js",
    "Node.js",
  ],

  /**
   * Editable Portfolio Statistics.
   * Can also be overridden dynamically via Admin -> Site Settings.
   */
  stats: {
    verified: true,
    projectsCompleted: {
      value: "22+",
      label: "Projects Completed",
      sublabel: "AI Automation & Workflow Systems",
    },
    clientsServed: {
      value: "100+",
      label: "Clients Served",
      sublabel: "Global B2B & Startup Engagements",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
