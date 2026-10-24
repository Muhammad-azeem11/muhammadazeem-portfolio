"use server";

// src/app/actions/admin.ts
// Protected server actions for managing Testimonials, Client Reviews, Verification Codes, Screenshots, and Site Settings.

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { COUNTRIES_LIST, resolveCountryCode } from "@/components/ui/CountryFlag";
import {
   getInitials,
  normalizeTestimonialFilename,
  SAMPLE_TESTIMONIALS,
} from "@/lib/testimonials-data";
import {
  computeCodeLookupHash,
  generateVerificationCodePair,
  hashVerificationCode,
  maskVerificationCode,
  normalizeVerificationCode,
  requireAdmin,
} from "@/lib/security";

function revalidatePortfolioPaths() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/reviews");
  revalidatePath("/admin/verification-codes");
  revalidatePath("/admin/screenshots");
  revalidatePath("/admin/settings");
}

function getEmojiForCountryCode(code: string): string {
  const found = COUNTRIES_LIST.find((c) => c.code === code);
  return found?.emoji || "🌐";
}

// ── 1. Verification Codes Management ─────────────────────────────────────────

const createCodeSchema = z.object({
  clientName: z.string().trim().min(2, "Client name is required"),
  clientEmail: z.string().trim().optional().or(z.literal("")),
  companyName: z.string().trim().optional().or(z.literal("")),
  projectName: z.string().trim().min(2, "Project or service name is required"),
  maxUses: z.coerce.number().int().min(1).max(50).default(1),
  expiresInDays: z.coerce.number().int().min(0).max(3650).default(30),
  customCode: z.string().trim().optional().or(z.literal("")),
});

export async function createVerificationCodeAction(formData: FormData) {
  await requireAdmin();

  const parsed = createCodeSchema.safeParse({
    clientName: formData.get("clientName"),
    clientEmail: formData.get("clientEmail") || "",
    companyName: formData.get("companyName") || "",
    projectName: formData.get("projectName"),
    maxUses: formData.get("maxUses") || 1,
    expiresInDays: formData.get("expiresInDays") ?? 30,
    customCode: formData.get("customCode") || "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fill in the client name and project/service name.",
    };
  }

  const data = parsed.data;
  let rawCode = "";
  let codePrefix = "";

  if (data.customCode && data.customCode.trim().length >= 6) {
    rawCode = normalizeVerificationCode(data.customCode);
    codePrefix = maskVerificationCode(rawCode);
  } else {
    const generated = generateVerificationCodePair();
    rawCode = generated.rawCode;
    codePrefix = generated.codePrefix;
  }

  const normalized = normalizeVerificationCode(rawCode);
  const codeLookupHash = computeCodeLookupHash(normalized);
  const codeHash = await hashVerificationCode(normalized);

  const existing = await prisma.verificationCode.findUnique({
    where: { codeLookupHash },
  });

  if (existing) {
    return {
      ok: false,
      error: "A verification code with that exact value already exists.",
    };
  }

  const expiresAt =
    data.expiresInDays > 0
      ? new Date(Date.now() + data.expiresInDays * 24 * 60 * 60 * 1000)
      : null;

  const created = await prisma.verificationCode.create({
    data: {
      codePrefix,
      codeLookupHash,
      codeHash,
      clientName: data.clientName,
      clientEmail: data.clientEmail || null,
      companyName: data.companyName || null,
      projectName: data.projectName,
      maxUses: data.maxUses,
      expiresAt,
    },
  });

  revalidatePortfolioPaths();

  return {
    ok: true,
    rawCode, // Returned ONLY ONCE at creation time for admin to copy
    codeId: created.id,
    codePrefix: created.codePrefix,
  };
}

export async function revokeVerificationCodeAction(codeId: string) {
  await requireAdmin();
  await prisma.verificationCode.update({
    where: { id: codeId },
    data: { revoked: true },
  });
  revalidatePortfolioPaths();
  return { ok: true };
}

export async function deleteVerificationCodeAction(codeId: string) {
  await requireAdmin();
  await prisma.verificationCode.delete({
    where: { id: codeId },
  });
  revalidatePortfolioPaths();
  return { ok: true };
}

// ── 2. Client Reviews Management ─────────────────────────────────────────────

export async function updateClientReviewStatusAction(
  reviewId: string,
  newStatus: "approved" | "rejected" | "pending",
  adminNotes?: string
) {
  await requireAdmin();

  const updateData: {
    status: string;
    adminNotes?: string;
    approvedAt?: Date;
    published?: boolean;
  } = {
    status: newStatus,
  };

  if (typeof adminNotes === "string") {
    updateData.adminNotes = adminNotes.trim();
  }

  if (newStatus === "approved") {
    updateData.approvedAt = new Date();
  } else {
    // Non-approved reviews can NEVER be publicly visible
    updateData.published = false;
  }

  await prisma.clientReview.update({
    where: { id: reviewId },
    data: updateData,
  });

  revalidatePortfolioPaths();
  return { ok: true };
}

export async function toggleClientReviewPublishedAction(
  reviewId: string,
  shouldPublish: boolean
) {
  await requireAdmin();

  const review = await prisma.clientReview.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    return { ok: false, error: "Review not found." };
  }

  if (shouldPublish && review.status !== "approved") {
    return {
      ok: false,
      error: "Only approved client reviews can be published publicly.",
    };
  }

  await prisma.clientReview.update({
    where: { id: reviewId },
    data: { published: shouldPublish },
  });

  revalidatePortfolioPaths();
  return { ok: true };
}

export async function promoteReviewToTestimonialAction(reviewId: string) {
  await requireAdmin();

  const review = await prisma.clientReview.findUnique({
    where: { id: reviewId },
  });

  if (!review || review.status !== "approved") {
    return {
      ok: false,
      error: "Only approved reviews can be added to the Testimonials slider.",
    };
  }

  const countryCode = resolveCountryCode(review.countryCode || review.country);
  const flag = getEmojiForCountryCode(countryCode);

  const chatMessages = [
    {
      id: `rev-${review.id}-1`,
      sender: "client",
      text: review.reviewText,
      timestamp: "11:20 AM",
    },
    {
      id: `rev-${review.id}-2`,
      sender: "azeem",
      text: `Thank you so much for sharing your feedback, ${review.clientName.split(" ")[0]}! It was a pleasure working on your ${review.serviceReceived} project.`,
      timestamp: "11:24 AM",
    },
  ];

  await prisma.testimonial.create({
    data: {
      name: review.clientName,
      company: review.companyName || "Verified Client",
      role: "Client",
      country: review.country,
      countryCode,
      flag,
      rating: review.rating,
      projectCategory: review.serviceReceived,
      content: review.reviewText,
      chatMessages: JSON.stringify(chatMessages),
      isSample: false,
      isVerified: true,
      permissionConfirmed: true,
      featured: true,
      published: review.published,
    },
  });

  revalidatePortfolioPaths();
  return { ok: true };
}

export async function deleteClientReviewAction(reviewId: string) {
  await requireAdmin();
  await prisma.clientReview.delete({
    where: { id: reviewId },
  });
  revalidatePortfolioPaths();
  return { ok: true };
}

// ── 3. Testimonials Management ───────────────────────────────────────────────

const testimonialInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Client name is required"),
  company: z.string().trim().default(""),
  role: z.string().trim().default(""),
  country: z.string().trim().min(2, "Country is required"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  projectCategory: z.string().trim().min(2, "Project category is required"),
  content: z.string().trim().min(5, "Summary feedback is required"),
  chatMessagesJson: z.string().default("[]"),
  image: z.string().trim().optional().nullable(),
  screenshotId: z.string().trim().optional().nullable(),
  screenshotUrl: z.string().trim().optional().nullable(),
  isSample: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  permissionConfirmed: z.boolean().default(false),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  displayOrder: z.coerce.number().int().default(0),
});

export async function saveTestimonialAction(
  payload: z.infer<typeof testimonialInputSchema>
) {
  await requireAdmin();

  const parsed = testimonialInputSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fill out all required testimonial fields.",
    };
  }

  const data = parsed.data;

  // Guardrail: Cannot publish a non-sample testimonial without verifying authenticity & client permission
  if (data.published && !data.isSample && (!data.isVerified || !data.permissionConfirmed)) {
    return {
      ok: false,
      error:
        "To publish a real (non-sample) testimonial publicly, you must verify its authenticity and confirm client permission.",
    };
  }

  const countryCode = resolveCountryCode(data.country);
  const flag = getEmojiForCountryCode(countryCode);

  const dbData = {
    name: data.name,
    company: data.company || "",
    role: data.role || "",
    country: data.country,
    countryCode,
    flag,
    rating: data.rating,
    projectCategory: data.projectCategory,
    content: data.content,
    chatMessages: data.chatMessagesJson,
    image: data.image || null,
    screenshotId: data.screenshotId || null,
    screenshotUrl: data.screenshotUrl || null,
    isSample: data.isSample,
    isVerified: data.isSample ? false : data.isVerified,
    permissionConfirmed: data.isSample ? false : data.permissionConfirmed,
    featured: data.featured,
    published: data.published,
    displayOrder: data.displayOrder,
  };

  if (data.id) {
    await prisma.testimonial.update({
      where: { id: data.id },
      data: dbData,
    });
  } else {
    await prisma.testimonial.create({
      data: dbData,
    });
  }

  revalidatePortfolioPaths();
  return { ok: true };
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePortfolioPaths();
  return { ok: true };
}

export async function seedSampleTestimonialsAction() {
  await requireAdmin();

  const existing = await prisma.testimonial.findMany({
    select: { name: true },
  });
  const existingNames = new Set(existing.map((e) => e.name.toLowerCase()));

  let added = 0;
  for (const sample of SAMPLE_TESTIMONIALS) {
    if (!existingNames.has(sample.name.toLowerCase())) {
      await prisma.testimonial.create({
        data: {
          name: sample.name,
          company: sample.company,
          role: sample.role,
          country: sample.country,
          countryCode: sample.countryCode,
          flag: sample.flag,
          rating: sample.rating,
          projectCategory: sample.projectCategory,
          content: sample.content,
          chatMessages: JSON.stringify(sample.chatMessages),
          isSample: true,
          isVerified: false,
          permissionConfirmed: false,
          featured: sample.featured,
          published: sample.published,
          displayOrder: sample.displayOrder,
        },
      });
      added++;
    }
  }

  revalidatePortfolioPaths();
  return { ok: true, added };
}

// ── 4. Screenshot Generator Asset Persistence ────────────────────────────────

const screenshotSaveSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().trim().min(2),
  country: z.string().trim().min(2),
  countryCode: z.string().trim().optional(),
  avatarInitials: z.string().trim().optional(),
  avatarUrl: z.string().optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  projectCategory: z.string().trim().default("AI Automation"),
  messagesJson: z.string(),
  isSample: z.boolean().default(true),
  imageDataUrl: z.string().startsWith("data:image/png;base64,"),
  width: z.coerce.number().int().default(900),
  height: z.coerce.number().int().default(1100),
  testimonialId: z.string().optional().nullable(),
});

export async function saveTestimonialScreenshotAction(
  payload: z.infer<typeof screenshotSaveSchema>
) {
  await requireAdmin();

  const parsed = screenshotSaveSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid screenshot mockup payload.",
    };
  }

  const data = parsed.data;
  const countryCode = resolveCountryCode(data.countryCode || data.country);
  const initials = data.avatarInitials || getInitials(data.clientName);

  // Determine safe filename without overwriting other records
  const allExisting = await prisma.testimonialScreenshot.findMany({
    where: data.id ? { NOT: { id: data.id } } : undefined,
    select: { filename: true },
  });

  const existingFilenames = allExisting.map((r) => r.filename);
  const filename = normalizeTestimonialFilename(data.clientName, existingFilenames);

  // Default deployment-compatible database-backed serving URL
  let storageUrl = `/api/screenshots/${filename}`;

  // Extract raw PNG buffer
  const base64Data = data.imageDataUrl.replace(/^data:image\/png;base64,/, "");
  const pngBuffer = Buffer.from(base64Data, "base64");

  // 1. Optional Vercel Blob storage upload if BLOB_READ_WRITE_TOKEN is configured
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    try {
      const blobRes = await fetch(
        `https://blob.vercel-storage.com/testimonials/${filename}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${blobToken}`,
            "x-api-version": "7",
            "content-type": "image/png",
            "x-add-random-suffix": "0",
          },
          body: pngBuffer,
        }
      );
      if (blobRes.ok) {
        const blobJson = await blobRes.json();
        if (blobJson?.url) {
          storageUrl = blobJson.url;
        }
      }
    } catch (err) {
      console.warn("Vercel Blob upload skipped/failed, using DB asset route:", err);
    }
  }

  // 2. Also write to public/images/testimonials/ when filesystem is writable (local dev / self-hosted)
  try {
    const publicDir = path.join(process.cwd(), "public", "images", "testimonials");
    await fs.mkdir(publicDir, { recursive: true });
    await fs.writeFile(path.join(publicDir, filename), pngBuffer);
  } catch {
    // Expected on read-only serverless filesystems (Vercel); served via /api/screenshots/[filename]
  }

  let record;
  if (data.id) {
    record = await prisma.testimonialScreenshot.update({
      where: { id: data.id },
      data: {
        filename,
        clientName: data.clientName,
        country: data.country,
        countryCode,
        avatarInitials: initials,
        avatarUrl: data.avatarUrl || null,
        rating: data.rating,
        projectCategory: data.projectCategory,
        messagesJson: data.messagesJson,
        isSample: data.isSample,
        imageDataUrl: data.imageDataUrl,
        storageUrl,
        width: data.width,
        height: data.height,
        testimonialId: data.testimonialId || null,
      },
    });
  } else {
    record = await prisma.testimonialScreenshot.create({
      data: {
        filename,
        clientName: data.clientName,
        country: data.country,
        countryCode,
        avatarInitials: initials,
        avatarUrl: data.avatarUrl || null,
        rating: data.rating,
        projectCategory: data.projectCategory,
        messagesJson: data.messagesJson,
        isSample: data.isSample,
        imageDataUrl: data.imageDataUrl,
        storageUrl,
        width: data.width,
        height: data.height,
        testimonialId: data.testimonialId || null,
      },
    });
  }

  // If linked to a testimonial, update its screenshotUrl
  if (data.testimonialId) {
    await prisma.testimonial
      .update({
        where: { id: data.testimonialId },
        data: {
          screenshotId: record.id,
          screenshotUrl: storageUrl,
        },
      })
      .catch(() => null);
  }

  revalidatePortfolioPaths();

  return {
    ok: true,
    screenshot: {
      id: record.id,
      filename: record.filename,
      storageUrl: record.storageUrl || storageUrl,
    },
  };
}

export async function deleteTestimonialScreenshotAction(id: string) {
  await requireAdmin();

  const existing = await prisma.testimonialScreenshot.findUnique({
    where: { id },
  });

  if (existing) {
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        "images",
        "testimonials",
        existing.filename
      );
      await fs.unlink(filePath);
    } catch {
      // Ignore if file does not exist on local disk
    }

    await prisma.testimonialScreenshot.delete({ where: { id } });
  }

  revalidatePortfolioPaths();
  return { ok: true };
}

// ── 5. Site Settings & Portfolio Statistics ──────────────────────────────────

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdmin();

  const siteName = String(formData.get("siteName") || "Muhammad Azeem").trim();
  const bookingUrl = String(
    formData.get("bookingUrl") || "https://calendly.com/muhammadazeemzahid1/30min"
  ).trim();
  const email = String(
    formData.get("email") || "muhammadazeemzahid1@gmail.com"
  ).trim();
  const whatsapp = String(
    formData.get("whatsapp") || "https://wa.me/923336541388"
  ).trim();
  const projectsCompleted = String(
    formData.get("projectsCompleted") || "22+"
  ).trim();
  const clientsServed = String(formData.get("clientsServed") || "100+").trim();
  const statsVerified = formData.get("statsVerified") === "true";
  const showSampleTestimonials =
    formData.get("showSampleTestimonials") === "true";

  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {
      siteName,
      bookingUrl,
      email,
      whatsapp,
      projectsCompleted,
      clientsServed,
      statsVerified,
      showSampleTestimonials,
    },
    create: {
      id: "global",
      siteName,
      domain: "https://www.muhammadazeemzahid.com",
      bookingUrl,
      email,
      whatsapp,
      linkedin: "https://www.linkedin.com/in/muhammad-azeem-zahid-0936313b4/",
      github: "https://github.com/Muhammad-azeem11",
      instagram: "https://www.instagram.com/abdulazeem_.57",
      resumeUrl: "/documents/azeem-resume.pdf",
      projectsCompleted,
      clientsServed,
      statsVerified,
      showSampleTestimonials,
    },
  });

  revalidatePortfolioPaths();
  return { ok: true };
}
