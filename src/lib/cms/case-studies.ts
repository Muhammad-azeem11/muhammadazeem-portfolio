// src/lib/cms/case-studies.ts
import type { CaseStudy } from "@/types";
import { prisma } from "@/lib/prisma";

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapPrismaToCaseStudy(cs: any): CaseStudy {
  return {
    id: cs.id,
    title: cs.title,
    slug: cs.slug,
    status: cs.published ? "published" : "draft",
    projectType: cs.projectType,
    category: cs.category,
    isFeatured: cs.featured,
    date: new Date(cs.date).getFullYear().toString(),
    client: {
      name: cs.client,
      industry: cs.industry,
    },
    summary: cs.solution,
    problem: cs.businessProblem,
    existingWorkflow: cs.existingWorkflow,
    bottlenecks: safeJsonParse<string[]>(cs.bottlenecks, []),
    automationStrategy: cs.automationStrategy,
    solution: cs.solution,
    architecture: safeJsonParse<any[]>(cs.architecture, []),
    technologies: safeJsonParse<string[]>(cs.technologies, []),
    myRole: cs.myRole || "",
    businessValue: cs.businessValue || "",
    confidentiality: cs.confidentiality || "",
    videoUrl: cs.videoUrl || "",
    createdAt: cs.createdAt.toISOString(),
    updatedAt: cs.updatedAt.toISOString(),
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const studies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { date: "desc" }
  });
  return studies.map(mapPrismaToCaseStudy);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const cs = await prisma.caseStudy.findUnique({
    where: { slug }
  });
  if (!cs || !cs.published) return undefined;
  return mapPrismaToCaseStudy(cs);
}
