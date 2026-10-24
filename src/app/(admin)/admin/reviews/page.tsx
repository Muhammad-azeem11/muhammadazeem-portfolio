// src/app/(admin)/admin/reviews/page.tsx
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/security";
import { ReviewsAdminClient } from "./ReviewsAdminClient";

export default async function AdminReviewsPage() {
  await requireAdmin();

  const reviews = await prisma.clientReview.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      verificationCode: {
        select: {
          codePrefix: true,
        },
      },
    },
  });

  const safeReviews = reviews.map((r) => ({
    id: r.id,
    clientName: r.clientName,
    companyName: r.companyName,
    country: r.country,
    countryCode: r.countryCode || "US",
    serviceReceived: r.serviceReceived,
    rating: r.rating,
    reviewText: r.reviewText,
    status: r.status,
    published: r.published,
    codePrefix: r.verificationCode?.codePrefix || null,
    approvedAt: r.approvedAt ? r.approvedAt.toISOString() : null,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">
          Client Reviews
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Review, approve, reject, and publish verified client review submissions.
        </p>
      </div>

      <ReviewsAdminClient initialReviews={safeReviews} />
    </div>
  );
}
