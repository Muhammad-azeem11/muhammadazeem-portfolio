// src/types/service.ts

import type { BaseDocument, MediaImage } from "./index";
import type { ServiceCategory } from "@/lib/constants";

export type ServiceFeature = {
  label: string;
  description?: string;
  included: boolean;
};

export type ServiceTier = "starter" | "professional" | "enterprise";

export type ServicePricing = {
  tier: ServiceTier;
  price: string; // e.g. "$2,000" or "Custom"
  currency?: string;
  period?: string; // e.g. "per project" | "per month"
  isCustom?: boolean;
  features: ServiceFeature[];
};

export type Service = BaseDocument & {
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  icon?: string; // lucide-react icon name
  image?: MediaImage;
  technologies: string[];
  deliverables: string[];
  timeline?: string; // e.g. "4–8 weeks"
  pricing?: ServicePricing[];
  isFeatured: boolean;
  order: number;
};
