// src/app/(admin)/admin/verification-codes/page.tsx
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/security";
import { VerificationCodesAdminClient } from "./VerificationCodesAdminClient";

async function getSafeVerificationCodes() {
  const codes = await prisma.verificationCode.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      codePrefix: true,
      clientName: true,
      clientEmail: true,
      companyName: true,
      projectName: true,
      maxUses: true,
      usedCount: true,
      expiresAt: true,
      revoked: true,
      usedAt: true,
      createdAt: true,
      _count: {
        select: { reviews: true },
      },
    },
  });

  const nowMs = Date.now();
  return codes.map((c) => ({
    id: c.id,
    codePrefix: c.codePrefix,
    clientName: c.clientName,
    clientEmail: c.clientEmail,
    companyName: c.companyName,
    projectName: c.projectName,
    maxUses: c.maxUses,
    usedCount: c.usedCount,
    expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
    isExpired: Boolean(c.expiresAt && c.expiresAt.getTime() < nowMs),
    revoked: c.revoked,
    usedAt: c.usedAt ? c.usedAt.toISOString() : null,
    createdAt: c.createdAt.toISOString(),
    reviewCount: c._count.reviews,
  }));
}

export default async function AdminVerificationCodesPage() {
  await requireAdmin();
  const safeCodes = await getSafeVerificationCodes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">
          Verification Codes
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Issue and manage private one-time verification codes for client service agreements.
        </p>
      </div>

      <VerificationCodesAdminClient initialCodes={safeCodes} />
    </div>
  );
}
