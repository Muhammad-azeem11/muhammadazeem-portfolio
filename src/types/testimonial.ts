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
