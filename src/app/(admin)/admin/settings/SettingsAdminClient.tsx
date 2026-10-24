"use client";

// src/app/(admin)/admin/settings/SettingsAdminClient.tsx
import React, { useState, useTransition } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { updateSiteSettingsAction } from "@/app/actions/admin";

type SiteSettingsValues = {
  siteName: string;
  bookingUrl: string;
  email: string;
  whatsapp: string;
  projectsCompleted: string;
  clientsServed: string;
  statsVerified: boolean;
  showSampleTestimonials: boolean;
};

export function SettingsAdminClient({
  initialValues,
}: {
  initialValues: SiteSettingsValues;
}) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [statsVerified, setStatsVerified] = useState(
    initialValues.statsVerified
  );
  const [showSampleTestimonials, setShowSampleTestimonials] = useState(
    initialValues.showSampleTestimonials
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaved(false);
    const formData = new FormData(e.currentTarget);
    formData.set("statsVerified", statsVerified ? "true" : "false");
    formData.set(
      "showSampleTestimonials",
      showSampleTestimonials ? "true" : "false"
    );

    startTransition(async () => {
      await updateSiteSettingsAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 max-w-3xl space-y-8 shadow-xs"
    >
      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          Settings and portfolio statistics saved successfully.
        </div>
      )}

      {/* Portfolio Statistics Configuration */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-display font-bold text-navy-900">
            Portfolio Statistics
          </h2>
          <p className="text-xs text-neutral-500">
            Configure the verified project and client figures displayed in the About / Credibility section.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-900">
              Projects Completed Figure
            </label>
            <input
              name="projectsCompleted"
              type="text"
              defaultValue={initialValues.projectsCompleted}
              placeholder="22+"
              className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm font-bold text-navy-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-900">
              Clients Served Figure
            </label>
            <input
              name="clientsServed"
              type="text"
              defaultValue={initialValues.clientsServed}
              placeholder="100+"
              className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm font-bold text-navy-900"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 cursor-pointer">
            <input
              type="checkbox"
              checked={statsVerified}
              onChange={(e) => setStatsVerified(e.target.checked)}
            />
            Display Verified Portfolio Statistics on Public Website
          </label>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 cursor-pointer">
            <input
              type="checkbox"
              checked={showSampleTestimonials}
              onChange={(e) => setShowSampleTestimonials(e.target.checked)}
            />
            Show &ldquo;SAMPLE / DEMO&rdquo; Testimonials When No Verified Records Are Published
          </label>
        </div>
      </div>

      {/* General Site Settings */}
      <div className="space-y-4 pt-6 border-t border-neutral-100">
        <div>
          <h2 className="text-lg font-display font-bold text-navy-900">
            Global Site Configuration
          </h2>
          <p className="text-xs text-neutral-500">
            Core contact and booking details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-900">Site Name</label>
            <input
              name="siteName"
              type="text"
              defaultValue={initialValues.siteName}
              className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-900">
              Booking URL (Calendly)
            </label>
            <input
              name="bookingUrl"
              type="url"
              defaultValue={initialValues.bookingUrl}
              placeholder="https://calendly.com/..."
              className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-900">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={initialValues.email}
              className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy-900">WhatsApp</label>
            <input
              name="whatsapp"
              type="text"
              defaultValue={initialValues.whatsapp}
              className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-100 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-navy-800 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save size={15} />
          {isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
