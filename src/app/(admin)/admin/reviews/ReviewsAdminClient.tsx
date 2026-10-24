"use client";

// src/app/(admin)/admin/reviews/ReviewsAdminClient.tsx
import React, { useState, useTransition } from "react";
import {
  CheckCircle2,
  XCircle,
  Globe,
  EyeOff,
  Trash2,
  Star,
  MessageSquarePlus,
  KeyRound,
} from "lucide-react";
import { CountryFlag } from "@/components/ui/CountryFlag";
import {
  updateClientReviewStatusAction,
  toggleClientReviewPublishedAction,
  promoteReviewToTestimonialAction,
  deleteClientReviewAction,
} from "@/app/actions/admin";
import { cn } from "@/lib/utils";

type AdminReviewRecord = {
  id: string;
  clientName: string;
  companyName: string | null;
  country: string;
  countryCode: string;
  serviceReceived: string;
  rating: number;
  reviewText: string;
  status: string;
  published: boolean;
  codePrefix: string | null;
  approvedAt: string | null;
  createdAt: string;
};

export function ReviewsAdminClient({
  initialReviews,
}: {
  initialReviews: AdminReviewRecord[];
}) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [isPending, startTransition] = useTransition();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = initialReviews.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  const counts = {
    all: initialReviews.length,
    pending: initialReviews.filter((r) => r.status === "pending").length,
    approved: initialReviews.filter((r) => r.status === "approved").length,
    rejected: initialReviews.filter((r) => r.status === "rejected").length,
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleStatusChange = (
    id: string,
    newStatus: "approved" | "rejected" | "pending"
  ) => {
    startTransition(async () => {
      await updateClientReviewStatusAction(id, newStatus);
      showToast(`Review marked as ${newStatus}.`);
    });
  };

  const handleTogglePublish = (id: string, nextPublished: boolean) => {
    startTransition(async () => {
      const res = await toggleClientReviewPublishedAction(id, nextPublished);
      if (!res.ok) {
        showToast(res.error || "Could not update publish status.");
      } else {
        showToast(
          nextPublished
            ? "Review is now published on the public portfolio."
            : "Review unpublished from the public portfolio."
        );
      }
    });
  };

  const handlePromote = (id: string) => {
    startTransition(async () => {
      const res = await promoteReviewToTestimonialAction(id);
      if (res.ok) {
        showToast("Added to Testimonials slider records!");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteClientReviewAction(id);
      setConfirmDeleteId(null);
      showToast("Review deleted.");
    });
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-navy-950 text-white text-xs font-semibold shadow-lg flex items-center justify-between">
          <span>{toastMsg}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-neutral-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            { key: "all", label: `All (${counts.all})` },
            { key: "pending", label: `Pending (${counts.pending})` },
            { key: "approved", label: `Approved (${counts.approved})` },
            { key: "rejected", label: `Rejected (${counts.rejected})` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer",
              filter === tab.key
                ? "bg-navy-900 text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:text-navy-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-sm text-neutral-500">
          No client reviews in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-display font-bold text-navy-900">
                      {rev.clientName}
                    </h3>
                    {rev.companyName && (
                      <span className="text-xs font-medium text-neutral-500">
                        • {rev.companyName}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                      <CountryFlag code={rev.countryCode} country={rev.country} />
                      {rev.country}
                    </span>
                    <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2.5 py-0.5 rounded-full border border-accent-100">
                      {rev.serviceReceived}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                    <span>
                      Submitted {new Date(rev.createdAt).toLocaleString()}
                    </span>
                    {rev.codePrefix && (
                      <span className="inline-flex items-center gap-1 font-mono text-neutral-500">
                        <KeyRound size={11} />
                        Code: {rev.codePrefix}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status & Visibility Badges */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      rev.status === "approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : rev.status === "rejected"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    )}
                  >
                    {rev.status}
                  </span>

                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold",
                      rev.published
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {rev.published ? "Publicly Visible" : "Private"}
                  </span>
                </div>
              </div>

              {/* Rating & Review Text */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
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
                  <span className="ml-1.5 text-xs font-bold text-navy-900">
                    {rev.rating} / 5
                  </span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {rev.reviewText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100">
                <div className="flex flex-wrap items-center gap-2">
                  {rev.status !== "approved" && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleStatusChange(rev.id, "approved")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <CheckCircle2 size={14} />
                      Approve Review
                    </button>
                  )}

                  {rev.status !== "rejected" && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleStatusChange(rev.id, "rejected")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  )}

                  {rev.status === "approved" && (
                    <>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleTogglePublish(rev.id, !rev.published)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer",
                          rev.published
                            ? "bg-neutral-200 hover:bg-neutral-300 text-navy-900"
                            : "bg-accent-600 hover:bg-accent-500 text-white"
                        )}
                      >
                        {rev.published ? <EyeOff size={14} /> : <Globe size={14} />}
                        {rev.published ? "Unpublish" : "Publish Publicly"}
                      </button>

                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handlePromote(rev.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 text-navy-900 border border-navy-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <MessageSquarePlus size={14} />
                        Copy to Chat Testimonials
                      </button>
                    </>
                  )}
                </div>

                {/* Delete with Confirmation */}
                <div>
                  {confirmDeleteId === rev.id ? (
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDelete(rev.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
                      >
                        Confirm Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(rev.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
