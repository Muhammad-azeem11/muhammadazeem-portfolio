"use client";

// src/app/(admin)/admin/screenshots/ScreenshotGeneratorClient.tsx
// Admin-only WhatsApp-inspired Testimonial Screenshot Generator with High-DPI Canvas Renderer.

import React, { useState, useEffect, useRef, useTransition, useCallback } from "react";
import {
  Download,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Edit3,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { COUNTRIES_LIST, resolveCountryCode } from "@/components/ui/CountryFlag";
import {
  getInitials,
  normalizeTestimonialFilename,
  SAMPLE_TESTIMONIALS,
} from "@/lib/testimonials-data";
import {
  saveTestimonialScreenshotAction,
  deleteTestimonialScreenshotAction,
} from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

type SavedScreenshotAsset = {
  id: string;
  filename: string;
  clientName: string;
  country: string;
  countryCode: string;
  avatarInitials: string;
  avatarUrl: string | null;
  rating: number;
  projectCategory: string;
  messagesJson: string;
  isSample: boolean;
  storageUrl: string;
  width: number;
  height: number;
  testimonialId: string | null;
  createdAt: string;
};

type TestimonialSelectOption = {
  id: string;
  name: string;
  projectCategory: string;
};

// Helper to draw rounded rectangles on 2D canvas
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

// Helper to draw vector country flag on canvas
function drawCanvasCountryFlag(
  ctx: CanvasRenderingContext2D,
  countryOrCode: string,
  x: number,
  y: number,
  w = 28,
  h = 20
) {
  const code = resolveCountryCode(countryOrCode);
  ctx.save();
  drawRoundRect(ctx, x, y, w, h, 3);
  ctx.clip();

  if (code === "US") {
    ctx.fillStyle = "#B22234";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#FFFFFF";
    const stripeH = h / 13;
    for (let i = 1; i < 13; i += 2) {
      ctx.fillRect(x, y + i * stripeH, w, stripeH);
    }
    ctx.fillStyle = "#3C3B6E";
    ctx.fillRect(x, y, w * 0.42, stripeH * 7);
  } else if (code === "GB" || code === "UK") {
    ctx.fillStyle = "#012169";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y + h);
    ctx.moveTo(x + w, y);
    ctx.lineTo(x, y + h);
    ctx.stroke();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x + w / 2 - 3, y, 6, h);
    ctx.fillRect(x, y + h / 2 - 3, w, 6);
    ctx.fillStyle = "#C8102E";
    ctx.fillRect(x + w / 2 - 1.8, y, 3.6, h);
    ctx.fillRect(x, y + h / 2 - 1.8, w, 3.6);
  } else if (code === "CA") {
    ctx.fillStyle = "#D80621";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x + w * 0.25, y, w * 0.5, h);
    ctx.fillStyle = "#D80621";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (code === "DE") {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, w, h / 3);
    ctx.fillStyle = "#DD0000";
    ctx.fillRect(x, y + h / 3, w, h / 3);
    ctx.fillStyle = "#FFCE00";
    ctx.fillRect(x, y + (h * 2) / 3, w, h / 3);
  } else if (code === "AU") {
    ctx.fillStyle = "#00008B";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x + 4, y + 1, 2, h * 0.45);
    ctx.fillRect(x + 1, y + 4, w * 0.4, 2);
    ctx.fillStyle = "#C8102E";
    ctx.fillRect(x + 4.5, y + 1, 1, h * 0.45);
    ctx.fillRect(x + 1, y + 4.5, w * 0.4, 1);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(x + w * 0.25, y + h * 0.75, 2, 0, Math.PI * 2);
    ctx.arc(x + w * 0.75, y + h * 0.35, 1.5, 0, Math.PI * 2);
    ctx.arc(x + w * 0.75, y + h * 0.7, 1.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (code === "NL") {
    ctx.fillStyle = "#AE1C28";
    ctx.fillRect(x, y, w, h / 3);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y + h / 3, w, h / 3);
    ctx.fillStyle = "#21468B";
    ctx.fillRect(x, y + (h * 2) / 3, w, h / 3);
  } else if (code === "SA") {
    ctx.fillStyle = "#006C35";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x + 6, y + h * 0.6, w - 12, 2);
  } else {
    ctx.fillStyle = "#1d6fe8";
    ctx.fillRect(x, y, w, h);
  }

  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;
  drawRoundRect(ctx, x, y, w, h, 3);
  ctx.stroke();
}

// Helper to wrap text lines on canvas
function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = (text || "").split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.length > 0 ? lines : [""];
}

export function ScreenshotGeneratorClient({
  initialScreenshots,
  testimonialOptions,
}: {
  initialScreenshots: SavedScreenshotAsset[];
  testimonialOptions: TestimonialSelectOption[];
}) {
  const firstPreset = SAMPLE_TESTIMONIALS[0];

  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [clientName, setClientName] = useState(firstPreset.name);
  const [country, setCountry] = useState(firstPreset.country);
  const [avatarInitials, setAvatarInitials] = useState(
    getInitials(firstPreset.name)
  );
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [rating, setRating] = useState<number>(firstPreset.rating);
  const [projectCategory, setProjectCategory] = useState(
    firstPreset.projectCategory
  );
  const [messages, setMessages] = useState<ChatMessage[]>(
    firstPreset.chatMessages
  );
  const [isSample, setIsSample] = useState<boolean>(firstPreset.isSample);
  const [testimonialId, setTestimonialId] = useState<string>("");

  const [loadedAvatarImg, setLoadedAvatarImg] =
    useState<HTMLImageElement | null>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>(980);
  const [statusBanner, setStatusBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPending, startTransition] = useTransition();

  // Compute normalized filename preview
  const existingOtherFilenames = initialScreenshots
    .filter((s) => s.id !== editingId)
    .map((s) => s.filename);
  const previewFilename = normalizeTestimonialFilename(
    clientName,
    existingOtherFilenames
  );

  // Load optional avatar image if provided
  useEffect(() => {
    const trimmed = avatarUrl.trim();
    if (!trimmed) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setLoadedAvatarImg(img);
    img.onerror = () => setLoadedAvatarImg(null);
    img.src = trimmed;
  }, [avatarUrl]);

  // High-resolution Canvas Renderer (900px width)
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 900;
    const HEADER_H = 128;
    const FOOTER_H = 112;
    const BUBBLE_MAX_W = 620;
    const FONT_FAMILY =
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    // Pre-calculate total height based on wrapped chat messages
    ctx.font = `400 22px ${FONT_FAMILY}`;
    let totalMessagesHeight = 96; // Top encryption/label banner height + padding

    const computedBubbles = messages.map((msg) => {
      ctx.font = `400 22px ${FONT_FAMILY}`;
      const lines = wrapCanvasText(ctx, msg.text, BUBBLE_MAX_W - 56);
      const textWidth = Math.max(
        ...lines.map((l) => ctx.measureText(l).width),
        180
      );
      const bubbleW = Math.min(BUBBLE_MAX_W, Math.max(250, textWidth + 64));
      const bubbleH = 38 + lines.length * 32 + 34;
      totalMessagesHeight += bubbleH + 22;
      return {
        ...msg,
        lines,
        bubbleW,
        bubbleH,
      };
    });

    const H = Math.max(760, HEADER_H + totalMessagesHeight + FOOTER_H + 40);
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
      setCanvasHeight(H);
    }

    // 1. Background chat wallpaper (#EFEAE2)
    ctx.fillStyle = "#EFEAE2";
    ctx.fillRect(0, 0, W, H);

    // Subtle dot matrix wallpaper pattern
    ctx.fillStyle = "rgba(10, 22, 40, 0.045)";
    for (let gx = 20; gx < W; gx += 32) {
      for (let gy = HEADER_H + 20; gy < H - FOOTER_H; gy += 32) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Top WhatsApp-inspired Header (#075E54)
    ctx.fillStyle = "#075E54";
    ctx.fillRect(0, 0, W, HEADER_H);

    // Top subtle accent strip
    ctx.fillStyle = "#054c44";
    ctx.fillRect(0, 0, W, 10);

    // Avatar Circle
    const avX = 42;
    const avY = 30;
    const avR = 36;
    ctx.save();
    ctx.beginPath();
    ctx.arc(avX + avR, avY + avR, avR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "#064e3b";
    ctx.fill();
    ctx.clip();

    if (avatarUrl.trim() && loadedAvatarImg) {
      ctx.drawImage(loadedAvatarImg, avX, avY, avR * 2, avR * 2);
    } else {
      ctx.fillStyle = "#047857";
      ctx.fillRect(avX, avY, avR * 2, avR * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `700 26px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const initialsText =
        (avatarInitials || getInitials(clientName)).slice(0, 2).toUpperCase();
      ctx.fillText(initialsText, avX + avR, avY + avR + 1);
    }
    ctx.restore();

    // Avatar white border ring
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(avX + avR, avY + avR, avR, 0, Math.PI * 2);
    ctx.stroke();

    // Online green dot
    ctx.fillStyle = "#34D399";
    ctx.beginPath();
    ctx.arc(avX + avR * 2 - 8, avY + avR * 2 - 8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#075E54";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Client Name & Country Flag
    const nameX = avX + avR * 2 + 22;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `700 28px ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const displayName = clientName.trim() || "Client Name";
    ctx.fillText(displayName, nameX, 34);

    const nameWidth = ctx.measureText(displayName).width;
    drawCanvasCountryFlag(ctx, country, nameX + nameWidth + 14, 39, 30, 21);

    // Subtitle: Country • Project Category
    ctx.fillStyle = "rgba(209, 250, 229, 0.9)";
    ctx.font = `500 19px ${FONT_FAMILY}`;
    ctx.fillText(
      `${country}  •  ${projectCategory || "AI Automation"}`,
      nameX,
      72
    );

    // Top-right Badge (only shown if explicitly marked as sample)
    if (isSample) {
      const badgeText = "SAMPLE";
      ctx.font = `700 16px ${FONT_FAMILY}`;
      const badgeW = ctx.measureText(badgeText).width + 36;
      const badgeH = 38;
      const badgeX = W - badgeW - 36;
      const badgeY = (HEADER_H - badgeH) / 2;

      ctx.fillStyle = "#FBBF24";
      drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 19);
      ctx.fill();

      ctx.fillStyle = "#0A1628";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);
    }

    // 3. Top Chat Context Pill
    const pillText = isSample
      ? "SAMPLE CONVERSATION PREVIEW"
      : projectCategory || "AI Automation & Workflow Optimization";
    ctx.font = `600 15px ${FONT_FAMILY}`;
    const pillW = Math.min(W - 80, ctx.measureText(pillText).width + 44);
    const pillH = 38;
    const pillX = (W - pillW) / 2;
    const pillY = HEADER_H + 24;

    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    drawRoundRect(ctx, pillX, pillY, pillW, pillH, 12);
    ctx.fill();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#54656F";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(pillText, W / 2, pillY + pillH / 2 + 1);

    // 4. Draw Chat Message Bubbles
    let cursorY = pillY + pillH + 26;

    for (const b of computedBubbles) {
      const isOutgoing = b.sender === "azeem";
      const bx = isOutgoing ? W - b.bubbleW - 38 : 38;
      const by = cursorY;

      // Drop shadow
      ctx.save();
      ctx.shadowColor = "rgba(10, 22, 40, 0.08)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = isOutgoing ? "#D9FDD3" : "#FFFFFF";
      drawRoundRect(ctx, bx, by, b.bubbleW, b.bubbleH, 20);
      ctx.fill();
      ctx.restore();

      // Sender label
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = `700 16px ${FONT_FAMILY}`;
      ctx.fillStyle = isOutgoing ? "#065F46" : "#1D6FE8";
      ctx.fillText(
        isOutgoing ? "Muhammad Azeem" : displayName,
        bx + 22,
        by + 14
      );

      // Wrapped text lines
      ctx.font = `400 22px ${FONT_FAMILY}`;
      ctx.fillStyle = "#111B21";
      b.lines.forEach((line, lineIdx) => {
        ctx.fillText(line, bx + 22, by + 40 + lineIdx * 32);
      });

      // Timestamp & Read Checkmarks
      ctx.font = `500 15px ${FONT_FAMILY}`;
      ctx.fillStyle = "#667781";
      ctx.textAlign = "right";
      const timeRightX = isOutgoing ? bx + b.bubbleW - 46 : bx + b.bubbleW - 20;
      ctx.fillText(b.timestamp, timeRightX, by + b.bubbleH - 26);

      if (isOutgoing) {
        // Draw double blue checkmarks
        ctx.strokeStyle = "#0EA5E9";
        ctx.lineWidth = 2.2;
        const cx = bx + b.bubbleW - 36;
        const cy = by + b.bubbleH - 19;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + 4, cy + 4);
        ctx.lineTo(cx + 11, cy - 4);
        ctx.moveTo(cx + 6, cy);
        ctx.lineTo(cx + 10, cy + 4);
        ctx.lineTo(cx + 17, cy - 4);
        ctx.stroke();
      }

      cursorY += b.bubbleH + 22;
    }

    // 5. Bottom Rating & Project Category Footer
    const footerY = H - FOOTER_H;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, footerY, W, FOOTER_H);

    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, footerY);
    ctx.lineTo(W, footerY);
    ctx.stroke();

    // Draw Stars
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `700 28px ${FONT_FAMILY}`;
    ctx.fillStyle = "#F59E0B";
    const starsStr = "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
    ctx.fillText(starsStr, 40, footerY + 42);

    ctx.font = `700 22px ${FONT_FAMILY}`;
    ctx.fillStyle = "#0A1628";
    ctx.fillText(`${rating}.0 / 5.0 Rating`, 205, footerY + 42);

    ctx.font = `500 17px ${FONT_FAMILY}`;
    ctx.fillStyle = "#64748B";
    ctx.fillText(
      `Project: ${projectCategory || "AI Automation"}  •  muhammadazeemzahid.com`,
      40,
      footerY + 78
    );

    if (isSample) {
      ctx.textAlign = "right";
      ctx.font = `700 15px ${FONT_FAMILY}`;
      ctx.fillStyle = "#B45309";
      ctx.fillText("SAMPLE MOCKUP", W - 40, footerY + 60);
    }
  }, [
    clientName,
    country,
    avatarInitials,
    avatarUrl,
    loadedAvatarImg,
    rating,
    projectCategory,
    messages,
    isSample,
  ]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const loadSamplePreset = (sample: (typeof SAMPLE_TESTIMONIALS)[number]) => {
    setEditingId(undefined);
    setClientName(sample.name);
    setCountry(sample.country);
    setAvatarInitials(getInitials(sample.name));
    setAvatarUrl("");
    setRating(sample.rating);
    setProjectCategory(sample.projectCategory);
    setMessages(sample.chatMessages);
    setIsSample(sample.isSample);
    setStatusBanner(null);
  };

  const loadSavedAssetForEdit = (asset: SavedScreenshotAsset) => {
    setEditingId(asset.id);
    setClientName(asset.clientName);
    setCountry(asset.country);
    setAvatarInitials(asset.avatarInitials || getInitials(asset.clientName));
    setAvatarUrl(asset.avatarUrl || "");
    setRating(asset.rating);
    setProjectCategory(asset.projectCategory);
    try {
      const parsed = JSON.parse(asset.messagesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      // keep current
    }
    setIsSample(asset.isSample);
    setTestimonialId(asset.testimonialId || "");
    setStatusBanner({
      type: "success",
      text: `Loaded "${asset.filename}" for editing and regeneration.`,
    });
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCanvas();
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = previewFilename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveToPortfolio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCanvas();
    const imageDataUrl = canvas.toDataURL("image/png");

    startTransition(async () => {
      const res = await saveTestimonialScreenshotAction({
        id: editingId,
        clientName,
        country,
        countryCode: resolveCountryCode(country),
        avatarInitials: avatarInitials || getInitials(clientName),
        avatarUrl: avatarUrl || null,
        rating,
        projectCategory,
        messagesJson: JSON.stringify(messages),
        isSample,
        imageDataUrl,
        width: canvas.width,
        height: canvas.height,
        testimonialId: testimonialId || null,
      });

      if (!res.ok) {
        setStatusBanner({
          type: "error",
          text: res.error || "Failed to save screenshot asset.",
        });
        return;
      }

      setEditingId(res.screenshot?.id);
      setStatusBanner({
        type: "success",
        text: `Saved "${res.screenshot?.filename}" to portfolio storage (${res.screenshot?.storageUrl}).`,
      });
    });
  };

  const handleDeleteAsset = (id: string) => {
    startTransition(async () => {
      await deleteTestimonialScreenshotAction(id);
      setConfirmDeleteId(null);
      if (editingId === id) {
        setEditingId(undefined);
      }
      setStatusBanner({
        type: "success",
        text: "Screenshot asset deleted.",
      });
    });
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addMessage = (sender: "client" | "azeem") => {
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender,
        text:
          sender === "client"
            ? "New client message..."
            : "Thank you! Let me know if you need anything else.",
        timestamp: "11:45 AM",
      },
    ]);
  };

  const updateMessage = (
    index: number,
    field: keyof ChatMessage,
    value: string
  ) => {
    setMessages((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeMessage = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* ── Sample Presets Bar ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900">
            <Sparkles size={15} className="text-amber-500" />
            Editable Sample Presets (Auto-Labeled &ldquo;SAMPLE / DEMO&rdquo;)
          </div>
          <span className="text-xs text-neutral-500">
            Click a sample client to load their template & normalized filename
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_TESTIMONIALS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => loadSamplePreset(sample)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                clientName === sample.name && !editingId
                  ? "bg-navy-900 text-white border-navy-900 shadow-xs"
                  : "bg-neutral-50 text-navy-900 border-neutral-200 hover:bg-neutral-100"
              )}
            >
              {sample.name} ({sample.countryCode})
            </button>
          ))}
        </div>
      </div>

      {statusBanner && (
        <div
          className={cn(
            "p-4 rounded-xl text-xs font-semibold border flex items-center justify-between",
            statusBanner.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          )}
        >
          <span>{statusBanner.text}</span>
          <button
            type="button"
            onClick={() => setStatusBanner(null)}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Main Editor & Live High-Res Preview Grid ────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls */}
        <div className="xl:col-span-6 bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="text-base font-display font-bold text-navy-900">
              {editingId
                ? `Editing Saved Screenshot (${previewFilename})`
                : "Mockup Configuration"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={() => setEditingId(undefined)}
                className="text-xs font-semibold text-accent-600 hover:underline cursor-pointer"
              >
                + Switch to New File
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Client Name *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  setAvatarInitials(getInitials(e.target.value));
                }}
                placeholder="e.g. Nicola Michael"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
              />
              <p className="text-[11px] font-mono text-neutral-500 mt-1">
                Filename: <strong>{previewFilename}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Country & Flag *
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm bg-white"
              >
                {COUNTRIES_LIST.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Project Category
              </label>
              <input
                type="text"
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                placeholder="e.g. AI Document Processing"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Star Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm bg-white"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Stars
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Initials
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={avatarInitials}
                  onChange={(e) =>
                    setAvatarInitials(e.target.value.toUpperCase())
                  }
                  className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm uppercase font-bold"
                />
              </div>
            </div>
          </div>

          {/* Profile Image Upload or URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Approved Profile Image (Upload)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarFileUpload}
                className="w-full text-xs text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-navy-900 hover:file:bg-neutral-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Link to Existing Testimonial (Optional)
              </label>
              <select
                value={testimonialId}
                onChange={(e) => setTestimonialId(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-xs bg-white"
              >
                <option value="">Do not link automatically</option>
                {testimonialOptions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.projectCategory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chat Messages List */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
                Chat Conversation ({messages.length} Messages)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addMessage("client")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-navy-900 text-xs font-semibold cursor-pointer"
                >
                  <Plus size={12} />
                  Incoming
                </button>
                <button
                  type="button"
                  onClick={() => addMessage("azeem")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold cursor-pointer"
                >
                  <Plus size={12} />
                  Outgoing
                </button>
              </div>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={msg.sender}
                      onChange={(e) =>
                        updateMessage(
                          idx,
                          "sender",
                          e.target.value as "client" | "azeem"
                        )
                      }
                      className="h-8 px-2 rounded border border-neutral-300 text-xs font-semibold bg-white"
                    >
                      <option value="client">Incoming ({clientName})</option>
                      <option value="azeem">Outgoing (Muhammad Azeem)</option>
                    </select>

                    <input
                      type="text"
                      value={msg.timestamp}
                      onChange={(e) =>
                        updateMessage(idx, "timestamp", e.target.value)
                      }
                      placeholder="09:15 AM"
                      className="w-28 h-8 px-2 rounded border border-neutral-300 text-xs bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => removeMessage(idx)}
                      className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={msg.text}
                    onChange={(e) => updateMessage(idx, "text", e.target.value)}
                    className="w-full p-2 rounded border border-neutral-300 text-xs bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sample Watermark Toggle & Export Buttons */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <label className="flex items-start gap-2.5 text-xs font-bold text-navy-900 cursor-pointer">
              <input
                type="checkbox"
                checked={isSample}
                onChange={(e) => setIsSample(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                Label screenshot as <strong>&ldquo;SAMPLE / DEMO&rdquo;</strong>
                <span className="block font-normal text-neutral-600 mt-0.5">
                  Uncheck only when using authentic client-provided messages with explicit permission to publish.
                </span>
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadPng}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Download size={15} />
                Export PNG ({previewFilename})
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleSaveToPortfolio}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                <Save size={15} />
                {isPending
                  ? "Saving..."
                  : editingId
                  ? "Update & Regenerate Stored PNG"
                  : "Save PNG to Portfolio Storage"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live High-Res Canvas Preview */}
        <div className="xl:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              High-Resolution PNG Preview (900 × {canvasHeight}px)
            </span>
            <button
              type="button"
              onClick={renderCanvas}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:underline cursor-pointer"
            >
              <RefreshCw size={12} />
              Refresh Canvas
            </button>
          </div>

          <div className="bg-neutral-900 p-4 sm:p-6 rounded-2xl border border-neutral-800 shadow-inner flex justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={900}
              height={980}
              className="w-full max-w-[460px] h-auto rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </div>

      {/* ── Previously Generated Screenshots Library ────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-display font-bold text-navy-900">
              Generated Screenshot Assets ({initialScreenshots.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Stored in database & served via <code>/api/screenshots/[filename]</code> (plus <code>public/images/testimonials/</code> when writable).
            </p>
          </div>
        </div>

        {initialScreenshots.length === 0 ? (
          <div className="p-10 text-center text-sm text-neutral-500 border border-dashed border-neutral-200 rounded-xl">
            No screenshots saved to storage yet. Configure a mockup above and click &ldquo;Save PNG to Portfolio Storage&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {initialScreenshots.map((asset) => (
              <div
                key={asset.id}
                className="rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 flex flex-col justify-between"
              >
                <div className="p-4 bg-white border-b border-neutral-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-mono font-bold text-navy-900 truncate">
                      {asset.filename}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {asset.clientName} • {asset.country}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0",
                      asset.isSample
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    )}
                  >
                    {asset.isSample ? "SAMPLE" : "VERIFIED"}
                  </span>
                </div>

                <div className="p-3 flex justify-center bg-neutral-100 max-h-64 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.storageUrl}
                    alt={asset.filename}
                    className="h-56 w-auto object-contain rounded-lg shadow-xs"
                  />
                </div>

                <div className="p-3 bg-white border-t border-neutral-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => loadSavedAssetForEdit(asset)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-accent-50 text-accent-700 hover:bg-accent-100 text-xs font-bold cursor-pointer"
                    >
                      <Edit3 size={12} />
                      Edit & Regenerate
                    </button>

                    <a
                      href={asset.storageUrl}
                      download={asset.filename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 text-navy-900 hover:bg-neutral-200 text-xs font-semibold"
                    >
                      <ExternalLink size={12} />
                      PNG
                    </a>
                  </div>

                  {confirmDeleteId === asset.id ? (
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDeleteAsset(asset.id)}
                        className="px-2 py-1 rounded bg-red-600 text-white text-[11px] font-bold cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-1.5 py-1 rounded text-[11px] text-neutral-600 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(asset.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      aria-label="Delete screenshot"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
