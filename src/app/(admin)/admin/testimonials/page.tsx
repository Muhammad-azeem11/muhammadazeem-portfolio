// src/app/(admin)/admin/testimonials/page.tsx
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/security";
import { mapPrismaTestimonial } from "@/lib/cms/testimonials";
import { TestimonialsAdminClient } from "./TestimonialsAdminClient";

export default async function AdminTestimonialsPage() {
  await requireAdmin();

  const [records, screenshots] = await Promise.all([
    prisma.testimonial.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.testimonialScreenshot.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        filename: true,
        clientName: true,
        storageUrl: true,
      },
    }),
  ]);

  const testimonials = records.map(mapPrismaTestimonial);
  const screenshotOptions = screenshots.map((s) => ({
    id: s.id,
    filename: s.filename,
    clientName: s.clientName,
    storageUrl: s.storageUrl || `/api/screenshots/${s.filename}`,
  }));

  return (
    <TestimonialsAdminClient
      initialTestimonials={testimonials}
      screenshotOptions={screenshotOptions}
    />
  );
}
