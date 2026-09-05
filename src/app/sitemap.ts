import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static routes
  const routes = ["", "/about", "/services", "/case-studies", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic Case Studies
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: cs.updatedAt.toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...caseStudyRoutes];
}
