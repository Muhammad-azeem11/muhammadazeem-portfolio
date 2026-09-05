import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [caseStudies, services, testimonials, categories] = await Promise.all([
    prisma.caseStudy.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { label: "Case Studies", value: caseStudies, href: "/admin/case-studies" },
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
    { label: "Categories", value: categories, href: "/admin/categories" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-navy-900">
          Dashboard Overview
        </h1>
        <p className="text-neutral-500 mt-2">
          Manage your portfolio content and site settings from here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow group block"
          >
            <p className="text-sm font-medium text-neutral-500 group-hover:text-navy-900 transition-colors">{stat.label}</p>
            <p className="text-4xl font-bold text-navy-900 mt-2">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center max-w-2xl">
        <h3 className="text-lg font-bold text-navy-900 mb-2">Welcome to your new CMS!</h3>
        <p className="text-neutral-600 mb-6">
          Navigate using the sidebar to manage your content. Changes made here will automatically reflect on the public website.
        </p>
        <Link href="/admin/settings" className="inline-block bg-navy-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-navy-800 transition-colors">
          Configure Site Settings
        </Link>
      </div>
    </div>
  );
}
