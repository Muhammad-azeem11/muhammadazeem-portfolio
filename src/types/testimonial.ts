// src/types/testimonial.ts

import type { BaseDocument, MediaImage } from "./index";

export type TestimonialAuthor = {
  name: string;
  title: string;          // e.g. "CEO"
  company: string;
  location?: string;      // e.g. "United States"
  avatar?: MediaImage;
  linkedin?: string;
};

export type Testimonial = BaseDocument & {
  author: TestimonialAuthor;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  project?: string;       // Related case study slug
  isFeatured: boolean;
  order: number;
};

export type ChatMessage = {
  id: string;
  sender: "client" | "azeem";
  text: string;
  timestamp: string;
};

export type WhatsAppTestimonial = {
  id: string;
  name: string;
  company: string;
  role: string;
  country: string;
  countryCode: string;
  flag: string;
  rating: number;
  projectCategory: string;
  content: string;
  chatMessages: ChatMessage[];
  image?: string | null;
  screenshotId?: string | null;
  screenshotUrl?: string | null;
  isSample: boolean;
  isVerified: boolean;
  permissionConfirmed: boolean;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type PublicClientReview = {
  id: string;
  clientName: string;
  companyName?: string | null;
  country: string;
  countryCode: string;
  serviceReceived: string;
  rating: number;
  reviewText: string;
  approvedAt?: string | null;
  createdAt: string;
};

export type ScreenshotMockupInput = {
  id?: string;
  clientName: string;
  country: string;
  countryCode: string;
  avatarInitials: string;
  avatarUrl?: string;
  rating: number;
  projectCategory: string;
  messages: ChatMessage[];
  isSample: boolean;
};
