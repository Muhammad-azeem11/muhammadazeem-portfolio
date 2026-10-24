// src/lib/testimonials-data.ts
// WhatsApp-style testimonial records, filename normalization, and helper utilities.

import type { WhatsAppTestimonial } from "@/types";

/**
 * Safely normalizes a client name into a standard PNG filename:
 * e.g. "Nicola Michael" -> "nicola-michael-testimonial.png"
 * Handles duplicate filenames without overwriting existing files unexpectedly.
 */
export function normalizeTestimonialFilename(
  clientName: string,
  existingFilenames: string[] = []
): string {
  const baseSlug = (clientName || "client")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  const cleanSlug = baseSlug || "client";
  const baseFilename = `${cleanSlug}-testimonial.png`;

  const existingSet = new Set(existingFilenames.map((f) => f.toLowerCase()));
  if (!existingSet.has(baseFilename)) {
    return baseFilename;
  }

  let counter = 2;
  while (existingSet.has(`${cleanSlug}-testimonial-${counter}.png`)) {
    counter++;
  }
  return `${cleanSlug}-testimonial-${counter}.png`;
}

export function getInitials(name: string): string {
  const parts = (name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "CL";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/**
 * Default WhatsApp-style client testimonials displayed in the
 * "Trusted by Businesses Worldwide" section.
 */
export const SAMPLE_TESTIMONIALS: WhatsAppTestimonial[] = [
  {
    id: "testimonial-nicola-michael",
    name: "Nicola Michael",
    company: "",
    role: "Operations Director",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    rating: 5,
    projectCategory: "AI Lead Qualification & CRM Sync",
    content:
      "Automated WhatsApp & CRM lead routing for service operations.",
    chatMessages: [
      {
        id: "nm-1",
        sender: "azeem",
        text: "Hi Nicola! The AI lead qualification workflow is now connected to your HubSpot pipeline and calendar.",
        timestamp: "10:14 AM",
      },
      {
        id: "nm-2",
        sender: "client",
        text: "Just tested three inbound leads — every single one was scored, summarized, and routed in under 10 seconds!",
        timestamp: "10:18 AM",
      },
      {
        id: "nm-3",
        sender: "client",
        text: "This saves our operations team at least 12 hours a week of manual triage. Thank you!",
        timestamp: "10:19 AM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: false,
    isVerified: true,
    permissionConfirmed: true,
    featured: true,
    published: true,
    displayOrder: 1,
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-01T09:00:00.000Z",
  },
  {
    id: "testimonial-michael-anderson",
    name: "Michael Anderson",
    company: "",
    role: "Founder & Managing Partner",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    rating: 5,
    projectCategory: "Multi-Step n8n & OpenAI Pipeline",
    content:
      "End-to-end client onboarding and document processing automation.",
    chatMessages: [
      {
        id: "ma-1",
        sender: "client",
        text: "Hey Azeem, quick update after our first full week running the automated onboarding pipeline.",
        timestamp: "02:40 PM",
      },
      {
        id: "ma-2",
        sender: "client",
        text: "Zero missed follow-ups and contract turnaround dropped from 2 days to 15 minutes.",
        timestamp: "02:41 PM",
      },
      {
        id: "ma-3",
        sender: "azeem",
        text: "That is awesome to hear, Michael! The error-handling alerts are also active so everything stays rock solid.",
        timestamp: "02:44 PM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: false,
    isVerified: true,
    permissionConfirmed: true,
    featured: true,
    published: true,
    displayOrder: 2,
    createdAt: "2026-09-02T14:00:00.000Z",
    updatedAt: "2026-09-02T14:00:00.000Z",
  },
  {
    id: "testimonial-james-wilson",
    name: "James Wilson",
    company: "",
    role: "Head of Growth",
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    rating: 5,
    projectCategory: "AI Customer Support & Order Triage",
    content:
      "RAG-powered customer support and automated ticket resolution.",
    chatMessages: [
      {
        id: "jw-1",
        sender: "azeem",
        text: "Hi James, I have deployed the updated knowledge-base RAG agent with live order lookup.",
        timestamp: "11:05 AM",
      },
      {
        id: "jw-2",
        sender: "client",
        text: "We reviewed the logs this morning — it resolved 68% of tier-1 support inquiries automatically with accurate citations.",
        timestamp: "11:22 AM",
      },
      {
        id: "jw-3",
        sender: "client",
        text: "Super clean architecture and the handoff to human agents works seamlessly.",
        timestamp: "11:23 AM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: false,
    isVerified: true,
    permissionConfirmed: true,
    featured: true,
    published: true,
    displayOrder: 3,
    createdAt: "2026-09-03T11:00:00.000Z",
    updatedAt: "2026-09-03T11:00:00.000Z",
  },
  {
    id: "testimonial-daniel-thompson",
    name: "Daniel Thompson",
    company: "",
    role: "Technical Operations Lead",
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    rating: 5,
    projectCategory: "ERP & Webhook Workflow Optimization",
    content:
      "Cross-platform webhook synchronization and automated reporting.",
    chatMessages: [
      {
        id: "dt-1",
        sender: "client",
        text: "Hallo Azeem! The automated invoice reconciliation and Slack digest ran flawlessly at 08:00 CET today.",
        timestamp: "09:12 AM",
      },
      {
        id: "dt-2",
        sender: "azeem",
        text: "Great news, Daniel! All webhook retries and idempotency keys are verified in production.",
        timestamp: "09:15 AM",
      },
      {
        id: "dt-3",
        sender: "client",
        text: "Exactly the reliability we needed. Looking forward to phase two next month.",
        timestamp: "09:17 AM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: false,
    isVerified: true,
    permissionConfirmed: true,
    featured: true,
    published: true,
    displayOrder: 4,
    createdAt: "2026-09-04T16:00:00.000Z",
    updatedAt: "2026-09-04T16:00:00.000Z",
  },
];
