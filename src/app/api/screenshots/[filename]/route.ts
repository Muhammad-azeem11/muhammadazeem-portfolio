// src/app/api/screenshots/[filename]/route.ts
// Serves generated WhatsApp testimonial PNG screenshots directly from the database
// so they work seamlessly on Vercel serverless deployments without requiring paid external object storage.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;
    const sanitized = (filename || "").trim().toLowerCase();

    if (!sanitized || !sanitized.endsWith(".png")) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const asset = await prisma.testimonialScreenshot.findUnique({
      where: { filename: sanitized },
      select: {
        imageDataUrl: true,
        updatedAt: true,
      },
    });

    if (!asset || !asset.imageDataUrl) {
      return new NextResponse("Screenshot Not Found", { status: 404 });
    }

    const base64 = asset.imageDataUrl.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Disposition": `inline; filename="${sanitized}"`,
      },
    });
  } catch (error) {
    console.error("Failed to serve screenshot asset:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
