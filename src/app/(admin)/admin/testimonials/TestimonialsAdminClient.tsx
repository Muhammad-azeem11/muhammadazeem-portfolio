"use client";

// src/app/(admin)/admin/testimonials/TestimonialsAdminClient.tsx
import React, { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  Sparkles,
  CheckCheck,
  Star,
  Save,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { COUNTRIES_LIST, CountryFlag } from "@/components/ui/CountryFlag";
import { getInitials } from "@/lib/testimonials-data";
import {
  saveTestimonialAction,
  deleteTestimonialAction,
  seedSampleTestimonialsAction,
} from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import type { ChatMessage, WhatsAppTestimonial } from "@/types";

type ScreenshotOption = {
  id: string;
  filename: string;
  clientName: string;
  storageUrl: string;
};

type FormState = {
  id?: string;
  name: string;
  company: string;
  role: string;
  country: string;
  rating: number;
  projectCategory: string;
  content: string;
  messages: ChatMessage[];
  image: string;
  screenshotId: string;
  screenshotUrl: string;
  isSample: boolean;
  isVerified: boolean;
  permissionConfirmed: boolean;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

const DEFAULT_FORM: FormState = {
  name: "",
  company: "",
  role: "",
  country: "United States",
  rating: 5,
  projectCategory: "AI Workflow Automation",
  content: "",
  messages: [
    {
      id: "msg-1",
      sender: "client",
      text: "Hi Muhammad, the new automation workflow is running smoothly in production.",
      timestamp: "10:15 AM",
    },
    {
      id: "msg-2",
      sender: "azeem",
      text: "Glad to hear that! Let me know if the team needs any adjustments.",
      timestamp: "10:18 AM",
    },
  ],
  image: "",
  screenshotId: "",
  screenshotUrl: "",
  isSample: false,
  isVerified: true,
  permissionConfirmed: false,
  featured: true,
  published: false,
  displayOrder: 0,
};

export function TestimonialsAdminClient({
  initialTestimonials,
  screenshotOptions,
}: {
  initialTestimonials: WhatsAppTestimonial[];
  screenshotOptions: ScreenshotOption[];
}) {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState<FormState | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const openNew = () => {
    setFeedback(null);
    setEditing({
      ...DEFAULT_FORM,
      displayOrder: initialTestimonials.length + 1,
    });
  };

  const openEdit = (t: WhatsAppTestimonial) => {
    setFeedback(null);
    setEditing({
      id: t.id,
      name: t.name,
      company: t.company,
      role: t.role,
      country: t.country,
      rating: t.rating,
      projectCategory: t.projectCategory,
      content: t.content,
      messages:
        t.chatMessages.length > 0
          ? t.chatMessages
          : [
              {
                id: "m-1",
                sender: "client",
                text: t.content,
                timestamp: "10:00 AM",
              },
            ],
      image: t.image || "",
      screenshotId: t.screenshotId || "",
      screenshotUrl: t.screenshotUrl || "",
      isSample: t.isSample,
      isVerified: t.isVerified,
      permissionConfirmed: t.permissionConfirmed,
      featured: t.featured,
      published: t.published,
      displayOrder: t.displayOrder,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setFeedback(null);

    startTransition(async () => {
      const res = await saveTestimonialAction({
        id: editing.id,
        name: editing.name,
        company: editing.company,
        role: editing.role,
        country: editing.country,
        rating: editing.rating,
        projectCategory: editing.projectCategory,
        content: editing.content,
        chatMessagesJson: JSON.stringify(editing.messages),
        image: editing.image || null,
        screenshotId: editing.screenshotId || null,
        screenshotUrl: editing.screenshotUrl || null,
        isSample: editing.isSample,
        isVerified: editing.isVerified,
        permissionConfirmed: editing.permissionConfirmed,
        featured: editing.featured,
        published: editing.published,
        displayOrder: editing.displayOrder,
      });

      if (!res.ok) {
        setFeedback({
          type: "error",
          text: res.error || "Could not save testimonial.",
        });
        return;
      }

      setFeedback({
        type: "success",
        text: editing.id
          ? "Testimonial updated successfully."
          : "Testimonial created successfully.",
      });
      setEditing(null);
    });
  };

  const handleSeedSamples = () => {
    startTransition(async () => {
      const res = await seedSampleTestimonialsAction();
      if (res.ok) {
        setFeedback({
          type: "success",
          text:
            res.added > 0
              ? `Loaded ${res.added} clearly marked SAMPLE testimonials into the database.`
              : "Sample testimonials are already present in the database.",
        });
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteTestimonialAction(id);
      setConfirmDeleteId(null);
      setFeedback({ type: "success", text: "Testimonial record deleted." });
    });
  };

  const addMessage = (sender: "client" | "azeem") => {
    if (!editing) return;
    setEditing({
      ...editing,
      messages: [
        ...editing.messages,
        {
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sender,
          text: "",
          timestamp: "10:30 AM",
        },
      ],
    });
  };

  const updateMessage = (
    idx: number,
    field: keyof ChatMessage,
    value: string
  ) => {
    if (!editing) return;
    const copy = [...editing.messages];
    copy[idx] = { ...copy[idx], [field]: value };
    setEditing({ ...editing, messages: copy });
  };

  const removeMessage = (idx: number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      messages: editing.messages.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">
            Testimonials Manager
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Create, preview, verify, and publish WhatsApp-style client testimonials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isPending}
            onClick={handleSeedSamples}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Sparkles size={15} className="text-amber-600" />
            Load 5 Sample Presets
          </button>

          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus size={16} />
            New Testimonial
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={cn(
            "p-4 rounded-xl text-xs font-semibold border flex items-center justify-between",
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          )}
        >
          <span>{feedback.text}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-current opacity-70 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Create / Edit Drawer & Live Preview ──────────────────── */}
      {editing && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <h2 className="text-lg font-display font-bold text-navy-900">
              {editing.id ? `Edit Testimonial — ${editing.name}` : "Create New Testimonial"}
            </h2>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-navy-900 hover:bg-neutral-100 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    placeholder="e.g. Nicola Michael"
                    className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Country *
                  </label>
                  <select
                    value={editing.country}
                    onChange={(e) =>
                      setEditing({ ...editing, country: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm bg-white"
                  >
                    {COUNTRIES_LIST.map((c) => (
                      <option key={c.code} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editing.company}
                    onChange={(e) =>
                      setEditing({ ...editing, company: e.target.value })
                    }
                    placeholder="e.g. Wilsden"
                    className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={editing.role}
                    onChange={(e) =>
                      setEditing({ ...editing, role: e.target.value })
                    }
                    placeholder="e.g. Operations Director"
                    className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Project Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={editing.projectCategory}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        projectCategory: e.target.value,
                      })
                    }
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
                      value={editing.rating}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          rating: Number(e.target.value),
                        })
                      }
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
                      Order
                    </label>
                    <input
                      type="number"
                      value={editing.displayOrder}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          displayOrder: Number(e.target.value),
                        })
                      }
                      className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Short Project Feedback Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editing.content}
                  onChange={(e) =>
                    setEditing({ ...editing, content: e.target.value })
                  }
                  placeholder="Short project feedback shown in the card footer..."
                  className="w-full p-3 rounded-lg border border-neutral-300 text-sm"
                />
              </div>

              {/* Associate Screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Associate Generated Screenshot
                  </label>
                  <select
                    value={editing.screenshotId}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const found = screenshotOptions.find(
                        (s) => s.id === selectedId
                      );
                      setEditing({
                        ...editing,
                        screenshotId: selectedId,
                        screenshotUrl: found ? found.storageUrl : editing.screenshotUrl,
                      });
                    }}
                    className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm bg-white"
                  >
                    <option value="">None</option>
                    {screenshotOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.filename} ({s.clientName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Approved Avatar Image URL (or leave blank for initials)
                  </label>
                  <input
                    type="text"
                    value={editing.image}
                    onChange={(e) =>
                      setEditing({ ...editing, image: e.target.value })
                    }
                    placeholder="/images/... or https://..."
                    className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
                  />
                </div>
              </div>

              {/* Chat Messages Editor */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-900">
                    Chat Messages ({editing.messages.length})
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addMessage("client")}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-navy-900 text-xs font-semibold cursor-pointer"
                    >
                      + Incoming (Client)
                    </button>
                    <button
                      type="button"
                      onClick={() => addMessage("azeem")}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold cursor-pointer"
                    >
                      + Outgoing (You)
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {editing.messages.map((m, idx) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <select
                          value={m.sender}
                          onChange={(e) =>
                            updateMessage(
                              idx,
                              "sender",
                              e.target.value as "client" | "azeem"
                            )
                          }
                          className="h-8 px-2 rounded border border-neutral-300 text-xs font-semibold bg-white"
                        >
                          <option value="client">Incoming (Client)</option>
                          <option value="azeem">Outgoing (Muhammad Azeem)</option>
                        </select>

                        <input
                          type="text"
                          value={m.timestamp}
                          onChange={(e) =>
                            updateMessage(idx, "timestamp", e.target.value)
                          }
                          placeholder="10:30 AM"
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
                        value={m.text}
                        onChange={(e) =>
                          updateMessage(idx, "text", e.target.value)
                        }
                        placeholder="Enter message text..."
                        className="w-full p-2 rounded border border-neutral-300 text-xs bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification & Publication Controls */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.isSample}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          isSample: e.target.checked,
                          isVerified: e.target.checked
                            ? false
                            : editing.isVerified,
                        })
                      }
                    />
                    Mark as SAMPLE / DEMO Record
                  </label>

                  {!editing.isSample && (
                    <>
                      <label className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editing.isVerified}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              isVerified: e.target.checked,
                            })
                          }
                        />
                        Verified Client Identity
                      </label>

                      <label className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editing.permissionConfirmed}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              permissionConfirmed: e.target.checked,
                            })
                          }
                        />
                        Client Permission Confirmed
                      </label>
                    </>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.published}
                      onChange={(e) =>
                        setEditing({ ...editing, published: e.target.checked })
                      }
                    />
                    Publish on Website Slider
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold cursor-pointer"
                    >
                      <Save size={14} />
                      {isPending ? "Saving..." : "Save Testimonial"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Card Preview */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Live Card Preview
              </p>

              <div className="rounded-[1.75rem] overflow-hidden bg-white border border-neutral-200 shadow-md flex flex-col">
                <div className="bg-[#075E54] text-white px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-800 border border-white/25 flex items-center justify-center text-xs font-bold">
                      {getInitials(editing.name || "Client")}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold truncate">
                          {editing.name || "Client Name"}
                        </span>
                        <CountryFlag country={editing.country} />
                      </div>
                      <p className="text-[11px] text-emerald-100 truncate">
                        {editing.country} • {editing.projectCategory}
                      </p>
                    </div>
                  </div>
                  {editing.isSample ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-navy-950">
                      SAMPLE
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-100">
                      Verified
                    </span>
                  )}
                </div>

                <div
                  className="p-4 space-y-2.5"
                  style={{ backgroundColor: "#EFEAE2" }}
                >
                  {editing.messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        "flex flex-col",
                        m.sender === "azeem" ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-2xs",
                          m.sender === "azeem"
                            ? "bg-[#D9FDD3] text-neutral-900"
                            : "bg-white text-neutral-900"
                        )}
                      >
                        <p>{m.text || "..."}</p>
                        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-neutral-500">
                          <span>{m.timestamp}</span>
                          {m.sender === "azeem" && (
                            <CheckCheck size={12} className="text-sky-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white border-t border-neutral-200">
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={cn(
                          i < editing.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-300"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600">
                    {editing.content || "Project feedback summary..."}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ── Existing Testimonials List ───────────────────────────── */}
      {initialTestimonials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-3">
          <p className="text-sm text-neutral-500">
            No testimonial records stored in the database yet. The public slider is currently displaying clearly marked sample placeholders.
          </p>
          <button
            type="button"
            onClick={handleSeedSamples}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold cursor-pointer"
          >
            <Sparkles size={14} />
            Load 5 Sample Testimonials Into Database
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase text-neutral-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Client</th>
                <th className="px-5 py-3.5 font-semibold">Category & Rating</th>
                <th className="px-5 py-3.5 font-semibold">Verification</th>
                <th className="px-5 py-3.5 font-semibold">Screenshot</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {initialTestimonials.map((t) => (
                <tr key={t.id} className="hover:bg-neutral-50/80">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-900">{t.name}</span>
                      <CountryFlag code={t.countryCode} country={t.country} />
                    </div>
                    <p className="text-xs text-neutral-500">
                      {t.country} • {t.chatMessages.length} chat messages
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold text-navy-900">
                      {t.projectCategory}
                    </p>
                    <p className="text-xs text-amber-500 font-bold">
                      {"★".repeat(t.rating)} ({t.rating}.0)
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {t.isSample ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        SAMPLE / DEMO
                      </span>
                    ) : t.isVerified && t.permissionConfirmed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <ShieldCheck size={12} />
                        Verified & Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600">
                        Unverified Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {t.screenshotUrl ? (
                      <a
                        href={t.screenshotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent-600 hover:underline font-semibold"
                      >
                        <ImageIcon size={13} />
                        Linked PNG
                      </a>
                    ) : (
                      <span className="text-neutral-400">None</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-bold",
                        t.published
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-600"
                      )}
                    >
                      {t.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-accent-600 hover:bg-accent-50 cursor-pointer"
                      >
                        <Edit3 size={13} />
                        Edit
                      </button>

                      {confirmDeleteId === t.id ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleDelete(t.id)}
                            className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold cursor-pointer"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 rounded-lg text-xs text-neutral-600 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(t.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          aria-label="Delete testimonial"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
