// src/lib/utils.ts
// General-purpose utility functions used across the application.

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind conflict resolution.
 * Use this everywhere instead of template literals for class names.
 *
 * @example cn("px-4 py-2", isActive && "bg-navy-900", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string.
 * @example formatDate("2024-01-15") → "January 2024"
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

/**
 * Slugify a string for use in URLs.
 * @example slugify("AI Workflow Automation") → "ai-workflow-automation"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a max character count with an ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

/**
 * Pick a random item from an array (useful for placeholder data variation).
 */
export function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Delay execution (useful for staggered animations in async contexts).
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a range of numbers.
 * @example range(1, 5) → [1, 2, 3, 4, 5]
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Check if running in browser environment.
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Absolute URL builder — ensures absolute URLs for metadata etc.
 */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
