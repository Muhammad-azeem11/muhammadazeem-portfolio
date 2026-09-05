// src/types/case-study.ts
// Expanded data model for full storytelling structure and CMS integration.

import type { BaseDocument, MediaImage } from "./index";

export type CaseStudyStatus = "published" | "draft";
export type ProjectType = "Real Client" | "Demo Project" | "Concept Project";

export type WorkflowStep = {
  id: string;
  label: string;
  description: string;
  icon?: string; // lucide-react icon name string
};

export type CaseStudyResult = {
  metric: string;       // e.g. "Cost Reduction"
  value: string;        // e.g. "40%"
  description?: string; // e.g. "in operational overhead"
};

export type CaseStudy = BaseDocument & {
  title: string;
  slug: string;
  status: CaseStudyStatus;
  projectType: ProjectType;
  category: string;
  isFeatured: boolean;
  date: string; // ISO date string or generic "2024"

  /** Client info */
  client: {
    name: string;
    industry: string;
  };

  /** High-level summary for list views */
  summary: string;

  /** Storytelling Fields */
  problem: string;
  existingWorkflow?: string;
  bottlenecks?: string[];
  automationStrategy?: string;
  solution: string;

  /** Architecture/Workflow steps */
  architecture?: WorkflowStep[];

  /** Measurable outcomes */
  results?: CaseStudyResult[];

  /** Technologies used */
  technologies: string[];

  /** New Explicit Fields for Detail Page */
  myRole?: string;
  businessValue?: string;
  confidentiality?: string;
  videoUrl?: string;

  /** Cover image and screenshots */
  coverImage?: MediaImage;
  gallery?: MediaImage[];
};
