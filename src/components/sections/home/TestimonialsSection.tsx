"use client";

// src/components/sections/home/TestimonialsSection.tsx
// Professional sliding WhatsApp-inspired chat testimonials section.

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Image as ImageIcon,
  X,
  MessageSquareQuote,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { getInitials, SAMPLE_TESTIMONIALS } from "@/lib/testimonials-data";
import { cn } from "@/lib/utils";
import type { PublicClientReview, WhatsAppTestimonial } from "@/types";

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const AUTO_SLIDE_INTERVAL_MS = 5000;

type TestimonialsSectionProps = {
  testimonials?: WhatsAppTestimonial[];
  verifiedReviews?: PublicClientReview[];
};

export function TestimonialsSection({
  testimonials,
  verifiedReviews = [],
}: TestimonialsSectionProps) {
  const shouldReduce = useReducedMotion();
  const items =
    testimonials && testimonials.length > 0 ? testimonials : SAMPLE_TESTIMONIALS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive cards per view: 1 on mobile, 2 on tablet (md), 3 on desktop (lg)
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1120) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount, { passive: true });
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const clamped = Math.min(prev, maxIndex);
      return clamped >= maxIndex ? 0 : clamped + 1;
    });
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const clamped = Math.min(prev, maxIndex);
      return clamped <= 0 ? maxIndex : clamped - 1;
    });
  }, [maxIndex]);

  // Smooth automatic horizontal sliding; pauses on hover, focus, or touch interaction
  useEffect(() => {
    if (shouldReduce || isPaused || items.length <= visibleCount) return;
    const timer = setInterval(handleNext, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [shouldReduce, isPaused, items.length, visibleCount, handleNext]);

  // Touch / swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (Math.abs(deltaX) > 45) {
        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE },
    },
  };

  return (
    <section
      id="testimonials"
      className="bg-neutral-50 py-16 lg:py-24 border-t border-neutral-100 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle ambient background accents matching the Navy & Blue theme */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-100/30 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-navy-100/25 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* ── Section Header ───────────────────────────────────────── */}
        <motion.div
          className="text-center mb-12 lg:mb-14 space-y-4 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={headerVariants}
        >
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-1">
            <span
              className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-accent-500/80 to-accent-500"
              aria-hidden="true"
            />
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
              Client Feedback
            </p>
            <span
              className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent via-accent-500/80 to-accent-500"
              aria-hidden="true"
            />
          </div>

          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-display font-extrabold text-navy-900 text-balance leading-[1.1] tracking-tight"
          >
            Trusted by Businesses Worldwide
          </h2>

          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto text-pretty leading-relaxed font-medium">
            Real feedback from clients on AI automation, workflow optimization, and intelligent business solutions.
          </p>
        </motion.div>

        {/* ── Sliding WhatsApp-Style Chat Cards ─────────────────────── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials carousel"
        >
          {/* Slider Viewport */}
          <div className="overflow-hidden py-3 px-1 -mx-1">
            <motion.div
              className="flex"
              animate={{
                x: `-${safeIndex * (100 / visibleCount)}%`,
              }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 30 }
              }
            >
              {items.map((item) => {
                const initials = getInitials(item.name);
                return (
                  <div
                    key={item.id}
                    className="shrink-0 px-3"
                    style={{ width: `${100 / visibleCount}%` }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Testimonial from ${item.name}, ${item.country}`}
                  >
                    <article className="h-full flex flex-col rounded-[1.75rem] overflow-hidden bg-white border border-neutral-200/90 shadow-md hover:shadow-xl hover:border-accent-200 transition-all duration-500">
                      {/* ── WhatsApp-Inspired Top Header Bar ──────────── */}
                      <div className="bg-gradient-to-r from-[#075E54] to-[#0A6B5F] text-white px-5 py-3.5 flex items-center justify-between gap-3 border-b border-emerald-950/20">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Profile Image or Initials */}
                          <div className="relative w-11 h-11 rounded-full bg-emerald-800 border-2 border-white/25 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-display font-bold tracking-wider text-white">
                                {initials}
                              </span>
                            )}
                            <span
                              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#075E54]"
                              aria-hidden="true"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3
                                className="text-[15px] font-display font-bold truncate"
                                style={{ color: "#ffffff" }}
                              >
                                {item.name}
                              </h3>
                              <CountryFlag
                                code={item.countryCode}
                                country={item.country}
                              />
                            </div>
                            <p className="text-[11px] text-emerald-100/90 truncate">
                              {item.role ? `${item.role} • ${item.country}` : `${item.country} • online`}
                            </p>
                          </div>
                        </div>

                        {/* Authentic WhatsApp Header Action Icons */}
                        <div
                          className="flex items-center gap-3 text-white/75 shrink-0"
                          aria-hidden="true"
                        >
                          <Video size={15} />
                          <Phone size={14} />
                          <MoreVertical size={15} />
                        </div>
                      </div>

                      {/* ── WhatsApp Chat Conversation Window ─────────── */}
                      <div
                        className="flex-1 p-4 sm:p-5 space-y-3 flex flex-col justify-between"
                        style={{
                          backgroundColor: "#EFEAE2",
                          backgroundImage:
                            "radial-gradient(rgba(10, 22, 40, 0.045) 1px, transparent 0)",
                          backgroundSize: "18px 18px",
                        }}
                      >
                        <div className="space-y-2.5">
                          {/* Subtle Project Context Pill */}
                          <div className="flex justify-center mb-2">
                            <span className="px-3 py-1 rounded-lg bg-white/85 text-[#54656F] text-[10px] font-semibold tracking-wide shadow-2xs border border-neutral-200/70 text-center">
                              {item.projectCategory}
                            </span>
                          </div>

                          {/* Chat Bubbles */}
                          {item.chatMessages.map((msg) => {
                            const isOutgoing = msg.sender === "azeem";
                            return (
                              <div
                                key={msg.id}
                                className={cn(
                                  "flex flex-col",
                                  isOutgoing ? "items-end" : "items-start"
                                )}
                              >
                                <div
                                  className={cn(
                                    "relative max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs",
                                  isOutgoing
                                      ? "bg-[#D9FDD3] text-[#111B21] rounded-tr-xs border border-emerald-200/60"
                                      : "bg-white text-[#111B21] rounded-tl-xs border border-neutral-200/70"
                                  )}
                                >
                                  <p
                                    className={cn(
                                      "text-[10px] font-bold mb-0.5",
                                      isOutgoing
                                        ? "text-[#075E54]"
                                        : "text-accent-600"
                                    )}
                                  >
                                    {isOutgoing ? "Muhammad Azeem" : item.name}
                                  </p>
                                  <p className="text-[#111B21] leading-snug break-words">
                                    {msg.text}
                                  </p>
                                  <div className="flex items-center justify-end gap-1 mt-1">
                                    <span className="text-[10px] text-[#667781] leading-none">
                                      {msg.timestamp}
                                    </span>
                                    <CheckCheck
                                      size={13}
                                      className="text-[#53BDEB] shrink-0"
                                      aria-label="Read"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {item.screenshotUrl && (
                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setLightboxImage({
                                  url: item.screenshotUrl!,
                                  name: item.name,
                                })
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-navy-900 text-[11px] font-semibold shadow-xs border border-neutral-200/80 transition-colors cursor-pointer"
                            >
                              <ImageIcon size={12} className="text-accent-600" />
                              View Screenshot
                            </button>
                          </div>
                        )}
                      </div>

                      {/* ── Card Footer (Rating & Short Project Feedback) ── */}
                      <div className="bg-white px-5 py-4 border-t border-neutral-200/80">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div
                            className="flex items-center gap-0.5 text-amber-400"
                            aria-label={`${item.rating} out of 5 stars`}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={cn(
                                  i < item.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-neutral-300"
                                )}
                              />
                            ))}
                            <span className="ml-1.5 text-xs font-bold text-navy-900">
                              {item.rating}.0
                            </span>
                          </div>

                          <span className="text-[11px] font-semibold text-accent-600 bg-accent-50 px-2.5 py-0.5 rounded-full border border-accent-100 truncate">
                            {item.projectCategory}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Slider Controls (Prev / Next + Pagination Dots) ──────── */}
          {items.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white border border-neutral-200 text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 shadow-xs transition-all duration-200 flex items-center justify-center cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Testimonial slides"
              >
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                        isActive
                          ? "w-8 bg-accent-600"
                          : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                      )}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white border border-neutral-200 text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 shadow-xs transition-all duration-200 flex items-center justify-center cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* ── Approved & Published Client Reviews Grid ─────────────── */}
        {verifiedReviews.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-600">
                  <MessageSquareQuote size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-navy-900">
                    Client Reviews
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Direct feedback shared by clients following project completion.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={cn(
                              i < rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-neutral-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                      &ldquo;{rev.reviewText}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-navy-900 truncate">
                          {rev.clientName}
                        </p>
                        <CountryFlag code={rev.countryCode} country={rev.country} />
                      </div>
                      <p className="text-xs text-neutral-500 truncate">
                        {rev.companyName ? `${rev.companyName} • ` : ""}
                        {rev.country}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-lg border border-accent-100 shrink-0">
                      {rev.serviceReceived}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* ── Screenshot Lightbox Modal ──────────────────────────────── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[400] bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 bg-navy-950 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{lightboxImage.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-1 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 bg-neutral-100 max-h-[80vh] overflow-y-auto flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxImage.url}
                  alt={`${lightboxImage.name} testimonial screenshot`}
                  className="max-w-full h-auto rounded-xl shadow-md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
