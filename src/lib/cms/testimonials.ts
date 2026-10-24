// src/lib/cms/testimonials.ts
// Server-side data access for Testimonials, Approved Client Reviews, and Portfolio Statistics.

import type { Testimonial as PrismaTestimonial } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { SAMPLE_TESTIMONIALS } from "@/lib/testimonials-data";
import type { ChatMessage, PublicClientReview, WhatsAppTestimonial } from "@/types";

function safeParseMessages(raw: string | null | undefined): ChatMessage[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((m, idx) => ({
        id: String(m?.id || `msg-${idx}`),
        sender: m?.sender === "azeem" ? "azeem" : "client",
        text: String(m?.text || ""),
        timestamp: String(m?.timestamp || "10:00 AM"),
      }));
    }
    return [];
  } catch {
    return [];
  }
}

export function mapPrismaTestimonial(t: PrismaTestimonial): WhatsAppTestimonial {
  const messages = safeParseMessages(t.chatMessages);
  // Fallback single incoming message if chatMessages was empty
  const finalMessages: ChatMessage[] =
    messages.length > 0
      ? messages
      : [
          {
            id: `msg-${t.id}`,
            sender: "client",
            text: t.content,
            timestamp: "10:30 AM",
          },
        ];

  return {
    id: t.id,
    name: t.name,
    company: t.company || "",
    role: t.role || "",
    country: t.country || "United States",
    countryCode: t.countryCode || "US",
    flag: t.flag || "🇺🇸",
    rating: typeof t.rating === "number" ? Math.min(5, Math.max(1, t.rating)) : 5,
    projectCategory: t.projectCategory || "AI Automation",
    content: t.content,
    chatMessages: finalMessages,
    image: t.image || null,
    screenshotId: t.screenshotId || null,
    screenshotUrl: t.screenshotUrl || null,
    isSample: Boolean(t.isSample),
    isVerified: Boolean(t.isVerified),
    permissionConfirmed: Boolean(t.permissionConfirmed),
    featured: Boolean(t.featured),
    published: Boolean(t.published),
    displayOrder: typeof t.displayOrder === "number" ? t.displayOrder : 0,
    createdAt: t.createdAt instanceof Date ? t.createdAt.toISOString() : String(t.createdAt),
    updatedAt: t.updatedAt instanceof Date ? t.updatedAt.toISOString() : String(t.updatedAt),
  };
}

export async function getPublicTestimonials(): Promise<WhatsAppTestimonial[]> {
  try {
    const [dbRecords, settings] = await Promise.all([
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.siteSettings.findUnique({ where: { id: "global" } }),
    ]);

    const showSamples = settings?.showSampleTestimonials ?? true;

    // Filter DB records: non-sample records must be verified & permissionConfirmed to appear publicly
    const validDbTestimonials = dbRecords
      .map(mapPrismaTestimonial)
      .filter((t) => {
        if (t.isSample) {
          return showSamples;
        }
        return t.isVerified && t.permissionConfirmed;
      });

    if (validDbTestimonials.length > 0) {
      return validDbTestimonials;
    }

    if (showSamples) {
      return SAMPLE_TESTIMONIALS;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch testimonials from database:", error);
    return SAMPLE_TESTIMONIALS;
  }
}

export async function getPublicClientReviews(): Promise<PublicClientReview[]> {
  try {
    const reviews = await prisma.clientReview.findMany({
      where: {
        status: "approved",
        published: true,
      },
      orderBy: [{ approvedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        clientName: true,
        companyName: true,
        country: true,
        countryCode: true,
        serviceReceived: true,
        rating: true,
        reviewText: true,
        approvedAt: true,
        createdAt: true,
      },
    });

    return reviews.map((r) => ({
      id: r.id,
      clientName: r.clientName,
      companyName: r.companyName || null,
      country: r.country,
      countryCode: r.countryCode || "US",
      serviceReceived: r.serviceReceived,
      rating: r.rating,
      reviewText: r.reviewText,
      approvedAt: r.approvedAt ? r.approvedAt.toISOString() : null,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch approved client reviews:", error);
    return [];
  }
}

export type PortfolioStatsConfig = {
  verified: boolean;
  projectsCompleted: string;
  clientsServed: string;
};

export async function getPublicPortfolioStats(): Promise<PortfolioStatsConfig> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (settings) {
      return {
        verified: settings.statsVerified ?? siteConfig.stats.verified,
        projectsCompleted:
          settings.projectsCompleted || siteConfig.stats.projectsCompleted.value,
        clientsServed:
          settings.clientsServed || siteConfig.stats.clientsServed.value,
      };
    }
  } catch (error) {
    console.error("Failed to fetch portfolio stats from settings:", error);
  }

  return {
    verified: siteConfig.stats.verified,
    projectsCompleted: siteConfig.stats.projectsCompleted.value,
    clientsServed: siteConfig.stats.clientsServed.value,
  };
}
