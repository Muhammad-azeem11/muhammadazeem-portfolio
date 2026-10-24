// src/lib/security.ts
// Server-only cryptographic hashing, verification code generation, rate limiting, and admin guard.

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // Unambiguous uppercase alphanumeric

function getServerPepper(): string {
  return process.env.AUTH_SECRET || "muhammad-azeem-portfolio-verification-pepper";
}

/**
 * Normalizes a verification code for consistent hashing and comparison.
 */
export function normalizeVerificationCode(raw: string): string {
  return (raw || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

/**
 * Computes a deterministic HMAC-SHA256 lookup hash so codes can be indexed in the DB
 * without storing plaintext verification codes.
 */
export function computeCodeLookupHash(normalizedCode: string): string {
  return crypto
    .createHmac("sha256", getServerPepper())
    .update(normalizedCode)
    .digest("hex");
}

/**
 * Computes a slow bcrypt hash of the normalized verification code.
 */
export async function hashVerificationCode(normalizedCode: string): Promise<string> {
  return bcrypt.hash(normalizedCode, 10);
}

/**
 * Verifies a normalized verification code against its stored bcrypt hash.
 */
export async function verifyCodeHash(
  normalizedCode: string,
  storedBcryptHash: string
): Promise<boolean> {
  return bcrypt.compare(normalizedCode, storedBcryptHash);
}

/**
 * Generates a high-entropy, human-friendly verification code (e.g., MAZ-8K4P-9R2W)
 * and a masked prefix for safe display in the admin table.
 */
export function generateVerificationCodePair(): {
  rawCode: string;
  codePrefix: string;
} {
  const bytes = crypto.randomBytes(8);
  let part1 = "";
  let part2 = "";
  for (let i = 0; i < 4; i++) {
    part1 += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
    part2 += CODE_ALPHABET[bytes[i + 4] % CODE_ALPHABET.length];
  }
  const rawCode = `MAZ-${part1}-${part2}`;
  const codePrefix = `MAZ-****-${part2}`;
  return { rawCode, codePrefix };
}

/**
 * Creates a safe masked prefix for a custom verification code.
 */
export function maskVerificationCode(normalizedCode: string): string {
  if (normalizedCode.length <= 6) {
    return `****-${normalizedCode.slice(-2)}`;
  }
  const prefix = normalizedCode.slice(0, 3);
  const suffix = normalizedCode.slice(-4);
  return `${prefix}-****-${suffix}`;
}

/**
 * Anonymizes an IP address via HMAC-SHA256 so raw visitor IPs are not stored.
 */
export function hashIpAddress(ip: string): string {
  return crypto
    .createHmac("sha256", getServerPepper())
    .update(ip || "unknown")
    .digest("hex")
    .slice(0, 32);
}

// In-memory fallback map for rate limiting
const memoryRateLimits = new Map<string, { count: number; resetAt: number }>();

/**
 * Checks and increments rate limit for a given key.
 * Uses Prisma RateLimitEntry with graceful fallback to in-memory map.
 */
export async function checkRateLimit(
  key: string,
  maxRequests = 5,
  windowSeconds = 900 // 15 minutes default
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const now = Date.now();
  const resetAtMs = now + windowSeconds * 1000;

  // 1. Check in-memory first for fast protection
  const mem = memoryRateLimits.get(key);
  if (mem && mem.resetAt > now && mem.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((mem.resetAt - now) / 1000),
    };
  }

  try {
    const existing = await prisma.rateLimitEntry.findUnique({ where: { key } });
    if (existing) {
      if (existing.resetAt.getTime() > now) {
        if (existing.count >= maxRequests) {
          const retryAfterSeconds = Math.ceil(
            (existing.resetAt.getTime() - now) / 1000
          );
          memoryRateLimits.set(key, {
            count: existing.count,
            resetAt: existing.resetAt.getTime(),
          });
          return { allowed: false, retryAfterSeconds };
        }
        const updated = await prisma.rateLimitEntry.update({
          where: { key },
          data: { count: { increment: 1 } },
        });
        memoryRateLimits.set(key, {
          count: updated.count,
          resetAt: updated.resetAt.getTime(),
        });
        return { allowed: true, retryAfterSeconds: 0 };
      } else {
        // Window expired, reset counter
        await prisma.rateLimitEntry.update({
          where: { key },
          data: { count: 1, resetAt: new Date(resetAtMs) },
        });
        memoryRateLimits.set(key, { count: 1, resetAt: resetAtMs });
        return { allowed: true, retryAfterSeconds: 0 };
      }
    } else {
      await prisma.rateLimitEntry.create({
        data: {
          key,
          count: 1,
          resetAt: new Date(resetAtMs),
        },
      });
      memoryRateLimits.set(key, { count: 1, resetAt: resetAtMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }
  } catch {
    // Fallback to in-memory if DB is temporarily unavailable
    if (!mem || mem.resetAt <= now) {
      memoryRateLimits.set(key, { count: 1, resetAt: resetAtMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }
    mem.count += 1;
    memoryRateLimits.set(key, mem);
    return {
      allowed: mem.count <= maxRequests,
      retryAfterSeconds:
        mem.count > maxRequests ? Math.ceil((mem.resetAt - now) / 1000) : 0,
    };
  }
}

/**
 * Verifies the current request is performed by an authenticated admin user.
 */
export async function requireAdmin() {
  const session = await auth();
  const userRole = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || userRole !== "admin") {
    throw new Error("Unauthorized: Admin privileges required.");
  }
  return session.user;
}
