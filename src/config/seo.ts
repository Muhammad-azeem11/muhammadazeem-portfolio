// src/config/seo.ts
// SEO metadata helpers. Used by all pages via Next.js Metadata API.

import type { Metadata, Viewport } from "next";
import { siteConfig } from "./site";

/**
 * Generate canonical metadata for any page.
 * Pass page-specific overrides; defaults come from siteConfig.
 */
export function generateMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title
    ? `${String(overrides.title)} | ${siteConfig.name}`
    : siteConfig.title;

  const description = overrides.description ?? siteConfig.description;

  return {
    title,
    description,
    // Spread readonly array into mutable via Array.from
    keywords: Array.from(siteConfig.keywords),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
      ...(overrides.alternates ?? {}),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: siteConfig.og.image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      ...(typeof overrides.openGraph === "object" && overrides.openGraph !== null
        ? overrides.openGraph
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.og.image],
      ...(typeof overrides.twitter === "object" && overrides.twitter !== null
        ? overrides.twitter
        : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      ...(typeof overrides.robots === "object" && overrides.robots !== null
        ? overrides.robots
        : {}),
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    ...overrides,
  };
}

/** Shared viewport configuration */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1628" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1628" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/** JSON-LD Person schema for structured data */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  jobTitle: "AI Automation Engineer",
  knowsAbout: Array.from(siteConfig.techStack),
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.instagram,
  ],
};

/** JSON-LD WebSite schema */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    "@type": "Person",
    name: siteConfig.name,
  },
};
