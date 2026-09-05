// src/app/(admin)/layout.tsx
import type { ReactNode } from "react";
import { auth } from "@/auth";
import Link from "next/link";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();
  const isAdmin = session?.user && (session.user as any).role === "admin";

  if (!isAdmin) {
    return <>{children}</>; // Just render login page without sidebar
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-navy-950 text-white flex flex-col p-6 hidden lg:flex">
          <div className="text-white font-display font-bold text-lg mb-8">
            Portfolio Admin
          </div>
          <nav className="flex-1 space-y-2" aria-label="Admin navigation">
            <Link href="/admin" className="block px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/10">Dashboard</Link>
            <Link href="/admin/case-studies" className="block px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/10">Case Studies</Link>
            <Link href="/admin/services" className="block px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/10">Services</Link>
            <Link href="/admin/testimonials" className="block px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/10">Testimonials</Link>
            <Link href="/admin/categories" className="block px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/10">Categories</Link>
            <Link href="/admin/settings" className="block px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/10">Settings</Link>
          </nav>
          <div className="pt-8 border-t border-white/10">
            <form action={async () => {
              "use server";
              const { signOut } = await import("@/auth");
              await signOut();
            }}>
              <button type="submit" className="w-full text-left px-4 py-2 text-sm text-neutral-400 hover:text-white">
                Sign Out
              </button>
            </form>
          </div>
        </aside>
        <main className="flex-1 p-8 h-screen overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
