// src/lib/testimonials-data.ts
// Sample WhatsApp-style testimonial presets, filename normalization, and helper utilities.

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
 * Clearly marked SAMPLE / DEMO testimonial records for development and preview.
 * Never presented as authentic client reviews unless replaced and verified by the administrator.
 */
export const SAMPLE_TESTIMONIALS: WhatsAppTestimonial[] = [
  {
    id: "sample-nicola-michael",
    name: "Nicola Michael",
    company: "Operations Team (Sample)",
    role: "Operations Director",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    rating: 5,
    projectCategory: "AI Document Processing",
    content:
      "SAMPLE PREVIEW: Automated inbox monitoring and AI document extraction pipeline eliminated manual CRM data entry across our daily operations.",
    chatMessages: [
      {
        id: "nm-1",
        sender: "client",
        text: "Hi Muhammad! Just checked the new AI document extraction workflow with our ops team this morning.",
        timestamp: "09:14 AM",
      },
      {
        id: "nm-2",
        sender: "azeem",
        text: "Morning Nicola! Glad you got to test it. How is the structured CRM sync performing with the incoming PDFs?",
        timestamp: "09:16 AM",
      },
      {
        id: "nm-3",
        sender: "client",
        text: "It processed all 45 attachments into PostgreSQL without a single manual entry. This is going to save us hours every single day.",
        timestamp: "09:19 AM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: true,
    isVerified: false,
    permissionConfirmed: false,
    featured: true,
    published: true,
    displayOrder: 1,
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-01T09:00:00.000Z",
  },
  {
    id: "sample-michael-anderson",
    name: "Michael Anderson",
    company: "B2B Consultancy (Sample)",
    role: "Managing Partner",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    rating: 5,
    projectCategory: "Workflow & CRM Automation",
    content:
      "SAMPLE PREVIEW: End-to-end n8n workflow connecting email triggers, CRM records, and automated team task routing.",
    chatMessages: [
      {
        id: "ma-1",
        sender: "client",
        text: "Hi Azeem, quick update from London — the automated lead routing and CRM sync has been running smoothly all week.",
        timestamp: "02:30 PM",
      },
      {
        id: "ma-2",
        sender: "azeem",
        text: "That's great to hear, Michael! Are the webhook notifications and error-handling alerts working as expected for the team?",
        timestamp: "02:33 PM",
      },
      {
        id: "ma-3",
        sender: "client",
        text: "Spot on. Zero dropped leads and follow-ups go out in under a minute now. Really appreciate how clearly you structured the handoff.",
        timestamp: "02:36 PM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: true,
    isVerified: false,
    permissionConfirmed: false,
    featured: true,
    published: true,
    displayOrder: 2,
    createdAt: "2026-09-02T14:00:00.000Z",
    updatedAt: "2026-09-02T14:00:00.000Z",
  },
  {
    id: "sample-james-wilson",
    name: "James Wilson",
    company: "Service Group (Sample)",
    role: "Founder",
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    rating: 5,
    projectCategory: "AI Voice Receptionist",
    content:
      "SAMPLE PREVIEW: Low-latency conversational AI voice agent integrated with Twilio and automated SMS follow-ups.",
    chatMessages: [
      {
        id: "jw-1",
        sender: "client",
        text: "Hey Muhammad, we just reviewed the call logs from the AI Voice Agent setup.",
        timestamp: "11:05 AM",
      },
      {
        id: "jw-2",
        sender: "azeem",
        text: "Hi James! How did the Twilio voice pipeline and SMS follow-up links perform during peak hours?",
        timestamp: "11:07 AM",
      },
      {
        id: "jw-3",
        sender: "client",
        text: "Answered every inbound call immediately and sent the booking links via SMS right after. Huge relief for our front desk.",
        timestamp: "11:10 AM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: true,
    isVerified: false,
    permissionConfirmed: false,
    featured: true,
    published: true,
    displayOrder: 3,
    createdAt: "2026-09-03T11:00:00.000Z",
    updatedAt: "2026-09-03T11:00:00.000Z",
  },
  {
    id: "sample-daniel-thompson",
    name: "Daniel Thompson",
    company: "Logistics & Ops (Sample)",
    role: "Head of Operations",
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    rating: 5,
    projectCategory: "API & System Integration",
    content:
      "SAMPLE PREVIEW: Unified disconnected backend databases and REST APIs into a single real-time synchronized system.",
    chatMessages: [
      {
        id: "dt-1",
        sender: "client",
        text: "Hello Muhammad, the Python + n8n API bridge between our ERP and PostgreSQL database is live in production now.",
        timestamp: "04:12 PM",
      },
      {
        id: "dt-2",
        sender: "azeem",
        text: "Fantastic news, Daniel! Is the real-time validation catching duplicate entries properly?",
        timestamp: "04:15 PM",
      },
      {
        id: "dt-3",
        sender: "client",
        text: "Yes, data is completely consistent across all three systems now. No more manual spreadsheet reconciliations on Fridays!",
        timestamp: "04:18 PM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: true,
    isVerified: false,
    permissionConfirmed: false,
    featured: true,
    published: true,
    displayOrder: 4,
    createdAt: "2026-09-04T16:00:00.000Z",
    updatedAt: "2026-09-04T16:00:00.000Z",
  },
  {
    id: "sample-oliver-bennett",
    name: "Oliver Bennett",
    company: "Digital Agency (Sample)",
    role: "Agency Director",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    rating: 5,
    projectCategory: "Client Onboarding Automation",
    content:
      "SAMPLE PREVIEW: Automated client intake qualification, document collection, CRM syncing, and internal task creation.",
    chatMessages: [
      {
        id: "ob-1",
        sender: "client",
        text: "G'day Muhammad! Our first three clients just went through the automated onboarding flow.",
        timestamp: "10:22 AM",
      },
      {
        id: "ob-2",
        sender: "azeem",
        text: "Awesome Oliver! Did the document collection portal and automatic CRM task creation trigger smoothly?",
        timestamp: "10:25 AM",
      },
      {
        id: "ob-3",
        sender: "client",
        text: "Seamless from start to finish. Files uploaded, CRM updated, and welcome emails sent without us lifting a finger.",
        timestamp: "10:28 AM",
      },
    ],
    image: null,
    screenshotId: null,
    screenshotUrl: null,
    isSample: true,
    isVerified: false,
    permissionConfirmed: false,
    featured: true,
    published: true,
    displayOrder: 5,
    createdAt: "2026-09-05T10:00:00.000Z",
    updatedAt: "2026-09-05T10:00:00.000Z",
  },
];
