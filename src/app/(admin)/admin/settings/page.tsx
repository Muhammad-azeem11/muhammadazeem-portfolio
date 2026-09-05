import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-navy-900">
          Site Settings
        </h1>
        <p className="text-neutral-500 mt-1">
          Manage global site configuration and URLs.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-8 max-w-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy-900">Site Name</label>
              <input type="text" className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50" defaultValue={settings?.siteName || "Muhammad Azeem"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy-900">Booking URL (Calendly)</label>
              <input type="url" className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50" defaultValue={settings?.bookingUrl || ""} placeholder="https://calendly.com/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy-900">Email Address</label>
              <input type="email" className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50" defaultValue={settings?.email || "muhammadazeemzahid1@gmail.com"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy-900">WhatsApp</label>
              <input type="text" className="w-full h-10 px-3 rounded-lg border border-neutral-300 bg-neutral-50" defaultValue={settings?.whatsapp || "https://wa.me/923336541388"} />
            </div>
          </div>
          
          <div className="pt-4 border-t border-neutral-100 flex justify-end">
            <button type="button" className="bg-navy-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-navy-800 transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
