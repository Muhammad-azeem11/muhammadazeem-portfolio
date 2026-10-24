"use client";

// src/components/sections/home/ClientReviewSection.tsx
// "Share Your Experience" — Secure verified client review submission section.

import React, { useActionState, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Send,
  KeyRound,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { COUNTRIES_LIST, CountryFlag } from "@/components/ui/CountryFlag";
import {
  submitVerifiedClientReview,
  type ReviewSubmissionState,
} from "@/app/actions/reviews";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const initialReviewState: ReviewSubmissionState = {
  status: "idle",
  message: "",
};

const SERVICE_OPTIONS = [
  "AI Workflow Automation (n8n / Make)",
  "AI Document Processing & Extraction",
  "AI Voice Agent / Receptionist",
  "Client Onboarding Automation",
  "CRM & API System Integration",
  "Business Automation & AI Audit",
  "Technical Developer Partner Retainer",
  "Full-Stack / SaaS Application Development",
] as const;

export function ClientReviewSection() {
  const shouldReduce = useReducedMotion();
  const [state, formAction, isPending] = useActionState(
    submitVerifiedClientReview,
    initialReviewState
  );

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<string>("United States");
  const [formLoadedAt, setFormLoadedAt] = useState<number>(0);

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE },
    },
  };

  return (
    <section
      id="share-experience"
      className="bg-white py-16 lg:py-24 border-t border-neutral-100 relative overflow-hidden"
      aria-labelledby="share-experience-heading"
    >
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* ── Section Header ───────────────────────────────────────── */}
          <motion.div
            className="text-center mb-12 space-y-4 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUpVariants}
          >
            <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-1">
              <span
                className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-accent-500/80 to-accent-500"
                aria-hidden="true"
              />
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
                Verified Client Portal
              </p>
              <span
                className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent via-accent-500/80 to-accent-500"
                aria-hidden="true"
              />
            </div>

            <h2
              id="share-experience-heading"
              className="text-4xl md:text-5xl font-display font-extrabold text-navy-900 text-balance leading-[1.1] tracking-tight"
            >
              Share Your Experience
            </h2>

            <p className="text-lg text-neutral-600 text-pretty leading-relaxed font-medium">
              Have we worked together? Share your feedback and help others understand your experience.
            </p>
          </motion.div>

          {/* ── Form Card ────────────────────────────────────────────── */}
          <motion.div
            className="bg-neutral-50/70 rounded-[2rem] border border-neutral-200/90 p-6 sm:p-10 lg:p-12 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUpVariants}
          >
            {state.status === "success" ? (
              <div
                className="bg-white rounded-2xl border border-emerald-200 p-8 sm:p-10 text-center max-w-xl mx-auto space-y-4 shadow-xs"
                role="status"
                aria-live="polite"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-navy-900">
                  Review Submitted for Verification
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {state.message}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                    <ShieldCheck size={14} />
                    Verification Code Validated • Status: Pending Approval
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Column: Verification Explanation */}
                <div className="lg:col-span-4 space-y-6 bg-navy-950 text-white rounded-2xl p-6 sm:p-7 border border-navy-800 shadow-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30 text-[11px] font-bold uppercase tracking-wider">
                    <ShieldCheck size={13} />
                    Authentic Reviews Only
                  </div>

                  <h3
                    className="text-xl font-display font-bold leading-snug"
                    style={{ color: "#ffffff" }}
                  >
                    How Client Verification Works
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Every review published on this portfolio is backed by a verified client engagement. Public visitors cannot post unverified feedback.
                  </p>

                  <ol className="space-y-3.5 text-xs text-neutral-300">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Enter the <strong className="text-white">private verification code</strong> provided with your service agreement or project handover.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        The server cryptographically validates your one-time code and records your submission.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        Once reviewed and approved by the administrator, your feedback is published on the portfolio.
                      </span>
                    </li>
                  </ol>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-2.5 text-[11px] text-neutral-400">
                    <Lock size={14} className="text-accent-400 shrink-0" />
                    <span>One-time code protection & encrypted validation</span>
                  </div>
                </div>

                {/* Right Column: Review Submission Form */}
                <form
                  action={formAction}
                  onFocusCapture={() => {
                    if (!formLoadedAt) setFormLoadedAt(Date.now());
                  }}
                  className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-5 shadow-xs"
                  noValidate
                >
                  {/* Honeypot & Timing fields */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="review_website_url">Website</label>
                    <input
                      id="review_website_url"
                      name="website_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <input type="hidden" name="formLoadedAt" value={formLoadedAt} />
                  <input type="hidden" name="rating" value={rating} />

                  {state.status === "error" && state.message && (
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-medium"
                      role="alert"
                    >
                      <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                      <span>{state.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Client Name */}
                    <div>
                      <label
                        htmlFor="review-clientName"
                        className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="review-clientName"
                        name="clientName"
                        type="text"
                        required
                        placeholder="e.g. Michael Anderson"
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-neutral-50/60 text-sm text-navy-900 focus:bg-white focus:border-accent-500 focus:outline-none transition-colors"
                      />
                      {state.errors?.clientName && (
                        <p className="text-xs text-red-600 mt-1">
                          {state.errors.clientName[0]}
                        </p>
                      )}
                    </div>

                    {/* Company Name (Optional) */}
                    <div>
                      <label
                        htmlFor="review-companyName"
                        className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2"
                      >
                        Company Name{" "}
                        <span className="text-neutral-400 font-normal lowercase">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="review-companyName"
                        name="companyName"
                        type="text"
                        placeholder="e.g. Acme Operations Ltd"
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-neutral-50/60 text-sm text-navy-900 focus:bg-white focus:border-accent-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Country */}
                    <div>
                      <label
                        htmlFor="review-country"
                        className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 pointer-events-none">
                          <CountryFlag country={selectedCountry} />
                        </span>
                        <select
                          id="review-country"
                          name="country"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-neutral-300 bg-neutral-50/60 text-sm text-navy-900 focus:bg-white focus:border-accent-500 focus:outline-none transition-colors"
                        >
                          {COUNTRIES_LIST.map((c) => (
                            <option key={c.code} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                          <option value="Other">Other International</option>
                        </select>
                      </div>
                      {state.errors?.country && (
                        <p className="text-xs text-red-600 mt-1">
                          {state.errors.country[0]}
                        </p>
                      )}
                    </div>

                    {/* Project or Service Received */}
                    <div>
                      <label
                        htmlFor="review-serviceReceived"
                        className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2"
                      >
                        Project or Service Received{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="review-serviceReceived"
                        name="serviceReceived"
                        required
                        defaultValue={SERVICE_OPTIONS[0]}
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-300 bg-neutral-50/60 text-sm text-navy-900 focus:bg-white focus:border-accent-500 focus:outline-none transition-colors"
                      >
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {state.errors?.serviceReceived && (
                        <p className="text-xs text-red-600 mt-1">
                          {state.errors.serviceReceived[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Star Rating (1 to 5) */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                      Star Rating <span className="text-red-500">*</span>
                    </span>
                    <div
                      className="inline-flex items-center gap-2 bg-neutral-50 px-4 py-2.5 rounded-xl border border-neutral-200"
                      role="radiogroup"
                      aria-label="Star rating from 1 to 5"
                    >
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            role="radio"
                            aria-checked={rating === star}
                            aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                          >
                            <Star
                              size={22}
                              className={cn(
                                "transition-colors",
                                active
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-neutral-300"
                              )}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 text-xs font-bold text-navy-900">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Written Review */}
                  <div>
                    <label
                      htmlFor="review-reviewText"
                      className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2"
                    >
                      Written Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="review-reviewText"
                      name="reviewText"
                      rows={4}
                      required
                      placeholder="Share details about the business problem solved, workflow automation results, and your experience working together..."
                      className="w-full p-3.5 rounded-xl border border-neutral-300 bg-neutral-50/60 text-sm text-navy-900 focus:bg-white focus:border-accent-500 focus:outline-none transition-colors resize-y"
                    />
                    {state.errors?.reviewText && (
                      <p className="text-xs text-red-600 mt-1">
                        {state.errors.reviewText[0]}
                      </p>
                    )}
                  </div>

                  {/* Private Verification Code */}
                  <div className="p-4 rounded-xl bg-accent-50/60 border border-accent-200/80">
                    <label
                      htmlFor="review-verificationCode"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5"
                    >
                      <KeyRound size={14} className="text-accent-600" />
                      Private Verification Code <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-neutral-600 mb-3">
                      Enter the one-time verification code provided when your service agreement was completed.
                    </p>
                    <input
                      id="review-verificationCode"
                      name="verificationCode"
                      type="text"
                      required
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="e.g. MAZ-XXXX-XXXX"
                      className="w-full sm:max-w-xs h-11 px-3.5 rounded-xl border border-accent-300 bg-white font-mono text-sm font-bold tracking-wider uppercase text-navy-900 focus:border-accent-600 focus:outline-none"
                    />
                    {state.errors?.verificationCode && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">
                        {state.errors.verificationCode[0]}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-neutral-500">
                      Submissions are verified and reviewed before appearing publicly.
                    </p>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isPending}
                      className="bg-navy-900 hover:bg-navy-800 text-white rounded-xl px-7 h-12 font-bold text-sm shrink-0 cursor-pointer"
                    >
                      <Send size={15} className="mr-2" />
                      {isPending ? "Verifying & Submitting..." : "Submit Verified Review"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
