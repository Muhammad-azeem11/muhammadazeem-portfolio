-- Migration: 20261024000000_testimonials_reviews_verification
-- Adds WhatsApp testimonial fields, VerificationCode, ClientReview, TestimonialScreenshot, RateLimitEntry, and Portfolio Statistics in SiteSettings.

-- AlterTable: Testimonial
ALTER TABLE "Testimonial" ADD COLUMN "country" TEXT NOT NULL DEFAULT 'United States';
ALTER TABLE "Testimonial" ADD COLUMN "countryCode" TEXT NOT NULL DEFAULT 'US';
ALTER TABLE "Testimonial" ADD COLUMN "flag" TEXT NOT NULL DEFAULT '🇺🇸';
ALTER TABLE "Testimonial" ADD COLUMN "rating" INTEGER NOT NULL DEFAULT 5;
ALTER TABLE "Testimonial" ADD COLUMN "projectCategory" TEXT NOT NULL DEFAULT 'AI Automation';
ALTER TABLE "Testimonial" ADD COLUMN "chatMessages" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Testimonial" ADD COLUMN "screenshotId" TEXT;
ALTER TABLE "Testimonial" ADD COLUMN "screenshotUrl" TEXT;
ALTER TABLE "Testimonial" ADD COLUMN "isSample" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Testimonial" ADD COLUMN "isVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Testimonial" ADD COLUMN "permissionConfirmed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Testimonial" ADD COLUMN "displayOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable: SiteSettings
ALTER TABLE "SiteSettings" ADD COLUMN "projectsCompleted" TEXT NOT NULL DEFAULT '22+';
ALTER TABLE "SiteSettings" ADD COLUMN "clientsServed" TEXT NOT NULL DEFAULT '100+';
ALTER TABLE "SiteSettings" ADD COLUMN "statsVerified" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "SiteSettings" ADD COLUMN "showSampleTestimonials" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable: VerificationCode
CREATE TABLE "VerificationCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codePrefix" TEXT NOT NULL,
    "codeLookupHash" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT,
    "companyName" TEXT,
    "projectName" TEXT NOT NULL,
    "maxUses" INTEGER NOT NULL DEFAULT 1,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" DATETIME,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "VerificationCode_codeLookupHash_key" ON "VerificationCode"("codeLookupHash");

-- CreateTable: ClientReview
CREATE TABLE "ClientReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "companyName" TEXT,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT 'US',
    "serviceReceived" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "reviewText" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "verificationCodeId" TEXT,
    "ipHash" TEXT,
    "adminNotes" TEXT,
    "approvedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ClientReview_verificationCodeId_fkey" FOREIGN KEY ("verificationCodeId") REFERENCES "VerificationCode" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable: TestimonialScreenshot
CREATE TABLE "TestimonialScreenshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'United States',
    "countryCode" TEXT NOT NULL DEFAULT 'US',
    "avatarInitials" TEXT NOT NULL DEFAULT '',
    "avatarUrl" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "projectCategory" TEXT NOT NULL DEFAULT 'AI Automation',
    "messagesJson" TEXT NOT NULL DEFAULT '[]',
    "isSample" BOOLEAN NOT NULL DEFAULT true,
    "imageDataUrl" TEXT NOT NULL,
    "storageUrl" TEXT,
    "width" INTEGER NOT NULL DEFAULT 900,
    "height" INTEGER NOT NULL DEFAULT 1100,
    "testimonialId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "TestimonialScreenshot_filename_key" ON "TestimonialScreenshot"("filename");

-- CreateTable: RateLimitEntry
CREATE TABLE "RateLimitEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "resetAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "RateLimitEntry_key_key" ON "RateLimitEntry"("key");
