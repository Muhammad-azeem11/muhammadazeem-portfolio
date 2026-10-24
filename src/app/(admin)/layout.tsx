// src/app/(admin)/layout.tsx
import type { ReactNode } from "react";
import { auth } from "@/auth";
import Link from "next/link";

type AdminLayoutProps = {
  children: ReactNode;
};

const adminNavLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/reviews", label: "Client Reviews" },
  { href: "/admin/verification-codes", label: "Verification Codes" },
  { href: "/admin/screenshots", label: "Screenshot Generator" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/settings", label: "Settings & Stats" },
];

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();
  const isAdmin =
    session?.user && (session.user as { role?: string }).role === "admin";

  if (!isAdmin) {
    return <>{children}</>; // Render login page without sidebar
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-navy-950 text-white flex-col p-6 hidden lg:flex shrink-0">
          <div className="mb-8">
            <div className="text-white font-display font-bold text-lg">
              Portfolio Admin
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Muhammad Azeem CMS
            </p>
          </div>
          <nav className="flex-1 space-y-1.5" aria-label="Admin navigation">
            {adminNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t border-white/10 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="block px-4 py-2 rounded-lg text-xs font-semibold text-accent-400 hover:text-accent-300 hover:bg-white/5"
            >
              ↗ View Live Website
            </Link>
            <form
              action={async () => {
                "use server";
                const { signOut } = await import("@/auth");
                await signOut();
              }}
            >
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:text-white cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden bg-navy-950 text-white px-4 py-3 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold text-base">
              Portfolio Admin
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-accent-400"
            >
              ↗ Live Site
            </Link>
          </div>
          <nav
            className="flex items-center gap-1.5 overflow-x-auto pb-1"
            aria-label="Mobile admin navigation"
          >
            {adminNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 p-6 lg:p-8 lg:h-screen lg:overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
