// next.config.ts
// Next.js configuration for the Muhammad Azeem portfolio.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Performance ───────────────────────────────────────────
  compress: true,

  // ── Images ───────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add CDN/CMS image domains here when integrated
      // Example: { hostname: "cdn.yourdomain.com" }
    ],
  },

  // ── Logging ──────────────────────────────────────────────
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  // ── Security Headers ─────────────────────────────────────
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(fonts|images|icons)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────
  async redirects() {
    return [
      // Example: legacy URL redirect
      // { source: "/portfolio", destination: "/case-studies", permanent: true },
    ];
  },
};

export default nextConfig;
