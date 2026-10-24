import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/security";
import { SettingsAdminClient } from "./SettingsAdminClient";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" },
  });

  const initialValues = {
    siteName: settings?.siteName || "Muhammad Azeem",
    bookingUrl:
      settings?.bookingUrl || "https://calendly.com/muhammadazeemzahid1/30min",
    email: settings?.email || "muhammadazeemzahid1@gmail.com",
    whatsapp: settings?.whatsapp || "https://wa.me/923336541388",
    projectsCompleted: settings?.projectsCompleted || "22+",
    clientsServed: settings?.clientsServed || "100+",
    statsVerified: settings?.statsVerified ?? true,
    showSampleTestimonials: settings?.showSampleTestimonials ?? true,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">
          Site Settings & Portfolio Statistics
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Manage global site configuration, URLs, and verified portfolio impact figures.
        </p>
      </div>

      <SettingsAdminClient initialValues={initialValues} />
    </div>
  );
}
