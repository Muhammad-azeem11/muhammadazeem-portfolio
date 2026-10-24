// src/app/(admin)/admin/screenshots/page.tsx
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/security";
import { ScreenshotGeneratorClient } from "./ScreenshotGeneratorClient";

export default async function AdminScreenshotsPage() {
  await requireAdmin();

  const [screenshots, testimonials] = await Promise.all([
    prisma.testimonialScreenshot.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        filename: true,
        clientName: true,
        country: true,
        countryCode: true,
        avatarInitials: true,
        avatarUrl: true,
        rating: true,
        projectCategory: true,
        messagesJson: true,
        isSample: true,
        storageUrl: true,
        width: true,
        height: true,
        testimonialId: true,
        createdAt: true,
      },
    }),
    prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        projectCategory: true,
      },
    }),
  ]);

  const safeScreenshots = screenshots.map((s) => ({
    ...s,
    storageUrl: s.storageUrl || `/api/screenshots/${s.filename}`,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">
          WhatsApp Testimonial Screenshot Generator
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Create, preview, edit, and export high-resolution WhatsApp-inspired testimonial PNG mockups.
        </p>
      </div>

      <ScreenshotGeneratorClient
        initialScreenshots={safeScreenshots}
        testimonialOptions={testimonials}
      />
    </div>
  );
}
