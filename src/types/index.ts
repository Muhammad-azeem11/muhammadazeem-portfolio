// src/types/index.ts
// Barrel export for all types — import from "@/types"

export type { Service, ServiceFeature, ServicePricing, ServiceTier } from "./service";
export type { CaseStudy, CaseStudyResult, ProjectType, CaseStudyStatus, WorkflowStep } from "./case-study";
export type {
  Testimonial,
  TestimonialAuthor,
  ChatMessage,
  WhatsAppTestimonial,
  PublicClientReview,
  ScreenshotMockupInput,
} from "./testimonial";
export type { Category, FeaturedContent, PricingPlan, PricingFeature } from "./cms";

/** Shared base type for all CMS-managed content */
export type BaseDocument = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

/** Reusable image type */
export type MediaImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

/** Reusable link type */
export type Link = {
  label: string;
  href: string;
  external?: boolean;
};

/** Generic API response wrapper */
export type ApiResponse<T> = {
  data: T;
  error?: string;
  message?: string;
};

/** Pagination metadata */
export type PaginationMeta = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

/** Paginated list response */
export type PaginatedResponse<T> = {
  items: T[];
  pagination: PaginationMeta;
};
