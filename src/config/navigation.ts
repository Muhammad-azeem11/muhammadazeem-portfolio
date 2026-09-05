// Navigation structure.

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

import { siteConfig } from "./site";

/** Primary navigation links */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

/** CTA navigation item */
export const ctaNav: NavItem = {
  label: siteConfig.cta.primary.label,
  href: siteConfig.cta.primary.href,
};

/** Footer navigation groups */
export const footerNav: NavGroup[] = [
  {
    label: "Pages",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "AI Automation", href: "/services" },
      { label: "AI Agents", href: "/services" },
      { label: "CRM & Process Automation", href: "/services" },
      { label: "SaaS Development", href: "/services" },
    ],
  },
  {
    label: "Connect",
    items: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/muhammad-azeem-zahid-0936313b4/",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/Muhammad-azeem11",
        external: true,
      },
      {
        label: "Email",
        href: "mailto:muhammadazeemzahid1@gmail.com",
        external: true,
      },
    ],
  },
];
