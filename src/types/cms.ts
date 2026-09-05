// src/types/cms.ts
// CMS management types — covers all admin-managed content structures.

import type { BaseDocument } from "./index";

/** Content categories for filtering services / case studies */
export type Category = BaseDocument & {
  name: string;
  slug: string;
  description?: string;
  color?: string;     // hex color for UI badge
  order: number;
};

/** Featured content config — controlled from admin */
export type FeaturedContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  featuredServiceIds: string[];
  featuredCaseStudyIds: string[];
  featuredTestimonialIds: string[];
};

/** Individual pricing plan feature */
export type PricingFeature = {
  label: string;
  included: boolean;
  tooltip?: string;
};

/** Full pricing plan */
export type PricingPlan = BaseDocument & {
  name: string;
  slug: string;
  description: string;
  price: string;
  period?: string;
  isPopular: boolean;
  isCustom: boolean;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  order: number;
};
