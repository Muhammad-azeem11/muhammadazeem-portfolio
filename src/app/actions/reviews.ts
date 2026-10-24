"use server";

// src/app/actions/reviews.ts
// Secure server action for verified client review submissions.

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resolveCountryCode } from "@/components/ui/CountryFlag";
import {
  checkRateLimit,
  computeCodeLookupHash,
  hashIpAddress,
  normalizeVerificationCode,
  verifyCodeHash,
} from "@/lib/security";

const reviewSubmissionSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name cannot exceed 100 characters."),
  companyName: z
    .string()
    .trim()
    .max(100, "Company name cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .trim()
    .min(2, "Please select or enter your country.")
    .max(80, "Country name is too long."),
  serviceReceived: z
    .string()
    .trim()
    .min(2, "Please specify the project or service you received.")
    .max(120, "Project/service description cannot exceed 120 characters."),
  rating: z.coerce
    .number()
    .int("Rating must be a whole number.")
    .min(1, "Please select a star rating from 1 to 5.")
    .max(5, "Rating cannot exceed 5 stars."),
  reviewText: z
    .string()
    .trim()
    .min(15, "Please write at least 15 characters sharing your experience.")
    .max(1500, "Review cannot exceed 1500 characters."),
  verificationCode: z
    .string()
    .trim()
    .min(4, "Please enter your private verification code.")
    .max(64, "Invalid verification code format."),
});

export type ReviewSubmissionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitVerifiedClientReview(
  _prevState: ReviewSubmissionState,
  formData: FormData
): Promise<ReviewSubmissionState> {
  try {
    // 1. Basic anti-spam honeypot check
    const honeypot = formData.get("website_url");
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      // Silently reject bots without leaking mechanism
      return {
        status: "error",
        message: "Unable to process submission. Please try again.",
      };
    }

    // 2. Minimum human interaction time check (1.5s)
    const formLoadedAt = Number(formData.get("formLoadedAt") || 0);
    if (formLoadedAt > 0 && Date.now() - formLoadedAt < 1200) {
      return {
        status: "error",
        message: "Submission was too fast. Please review your details and try again.",
      };
    }

    // 3. Rate limit per anonymized IP hash
    const headerList = await headers();
    const rawIp =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headerList.get("x-real-ip") ||
      "local-client";
    const ipHash = hashIpAddress(rawIp);

    const rateLimit = await checkRateLimit(`review_submit:${ipHash}`, 5, 900);
    if (!rateLimit.allowed) {
      const minutes = Math.max(1, Math.ceil(rateLimit.retryAfterSeconds / 60));
      return {
        status: "error",
        message: `Too many submission attempts. Please wait ${minutes} minute(s) before trying again.`,
      };
    }

    // 4. Validate all inputs on the server
    const rawInput = {
      clientName: formData.get("clientName"),
      companyName: formData.get("companyName") || "",
      country: formData.get("country"),
      serviceReceived: formData.get("serviceReceived"),
      rating: formData.get("rating"),
      reviewText: formData.get("reviewText"),
      verificationCode: formData.get("verificationCode"),
    };

    const parsed = reviewSubmissionSchema.safeParse(rawInput);
    if (!parsed.success) {
      return {
        status: "error",
        message: "Please check the highlighted fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;
    const normalizedCode = normalizeVerificationCode(data.verificationCode);
    const codeLookupHash = computeCodeLookupHash(normalizedCode);

    // 5. Look up verification code securely
    const codeRecord = await prisma.verificationCode.findUnique({
      where: { codeLookupHash },
      include: { reviews: { select: { id: true } } },
    });

    if (!codeRecord) {
      return {
        status: "error",
        message:
          "Invalid verification code. Please check the private code provided with your service agreement.",
        errors: {
          verificationCode: ["Invalid verification code."],
        },
      };
    }

    // Cryptographically verify bcrypt hash
    const hashValid = await verifyCodeHash(normalizedCode, codeRecord.codeHash);
    if (!hashValid) {
      return {
        status: "error",
        message:
          "Invalid verification code. Please check the private code provided with your service agreement.",
        errors: {
          verificationCode: ["Invalid verification code."],
        },
      };
    }

    // 6. Check if code is revoked, expired, or already used
    if (codeRecord.revoked) {
      return {
        status: "error",
        message:
          "This verification code has been revoked and can no longer be used.",
        errors: {
          verificationCode: ["This verification code has been revoked."],
        },
      };
    }

    if (codeRecord.expiresAt && codeRecord.expiresAt.getTime() < Date.now()) {
      return {
        status: "error",
        message:
          "This verification code has expired. Please contact Muhammad Azeem if you need a replacement code.",
        errors: {
          verificationCode: ["This verification code has expired."],
        },
      };
    }

    if (
      codeRecord.usedCount >= codeRecord.maxUses ||
      codeRecord.reviews.length >= codeRecord.maxUses
    ) {
      return {
        status: "error",
        message:
          "This verification code has already been used to submit a review. Duplicate submissions are not permitted.",
        errors: {
          verificationCode: ["This verification code has already been used."],
        },
      };
    }

    // 7. Prevent duplicate content submissions
    const duplicateReview = await prisma.clientReview.findFirst({
      where: {
        OR: [
          {
            verificationCodeId: codeRecord.id,
          },
          {
            clientName: data.clientName,
            reviewText: data.reviewText,
          },
        ],
      },
    });

    if (duplicateReview && codeRecord.maxUses <= 1) {
      return {
        status: "error",
        message:
          "A review has already been submitted using this verification code.",
      };
    }

    const countryCode = resolveCountryCode(data.country);

    // 8. Atomically mark code used and store review with "pending" status (never auto-published!)
    await prisma.$transaction(async (tx) => {
      const updated = await tx.verificationCode.updateMany({
        where: {
          id: codeRecord.id,
          revoked: false,
          usedCount: { lt: codeRecord.maxUses },
        },
        data: {
          usedCount: { increment: 1 },
          usedAt: new Date(),
        },
      });

      if (updated.count === 0) {
        throw new Error("CODE_ALREADY_USED");
      }

      await tx.clientReview.create({
        data: {
          clientName: data.clientName,
          companyName: data.companyName || null,
          country: data.country,
          countryCode,
          serviceReceived: data.serviceReceived,
          rating: data.rating,
          reviewText: data.reviewText,
          status: "pending",
          published: false,
          verificationCodeId: codeRecord.id,
          ipHash,
        },
      });
    });

    revalidatePath("/admin");
    revalidatePath("/admin/reviews");
    revalidatePath("/admin/verification-codes");

    return {
      status: "success",
      message:
        "Thank you! Your verified review has been securely submitted and is now pending administrator approval before appearing publicly.",
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "CODE_ALREADY_USED") {
      return {
        status: "error",
        message:
          "This verification code has already been used. Duplicate submissions are not permitted.",
      };
    }
    console.error("Error processing client review submission:", error);
    return {
      status: "error",
      message:
        "We encountered a temporary server error while saving your review. Please try again shortly.",
    };
  }
}
