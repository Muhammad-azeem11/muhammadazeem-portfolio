import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    caseStudies,
    testimonials,
    pendingReviews,
    approvedReviews,
    verificationCodes,
    screenshots,
  ] = await Promise.all([
    prisma.caseStudy.count(),
    prisma.testimonial.count(),
    prisma.clientReview.count({ where: { status: "pending" } }),
    prisma.clientReview.count({ where: { status: "approved", published: true } }),
    prisma.verificationCode.count({ where: { revoked: false } }),
    prisma.testimonialScreenshot.count(),
  ]);

  const stats = [
    {
      label: "Testimonials",
      value: testimonials,
      sublabel: "WhatsApp chat cards",
      href: "/admin/testimonials",
    },
    {
      label: "Pending Reviews",
      value: pendingReviews,
      sublabel: `${approvedReviews} approved & published`,
      href: "/admin/reviews",
    },
    {
      label: "Verification Codes",
      value: verificationCodes,
      sublabel: "Issued client codes",
      href: "/admin/verification-codes",
    },
    {
      label: "Generated Screenshots",
      value: screenshots,
      sublabel: "Exported PNG mockups",
      href: "/admin/screenshots",
    },
    {
      label: "Case Studies",
      value: caseStudies,
      sublabel: "Portfolio projects",
      href: "/admin/case-studies",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-navy-900">
          Dashboard Overview
        </h1>
        <p className="text-neutral-500 mt-2">
          Manage your portfolio testimonials, verified client reviews, verification codes, WhatsApp screenshot generator, and site settings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md hover:border-accent-300 transition-all group block"
          >
            <p className="text-sm font-semibold text-neutral-500 group-hover:text-navy-900 transition-colors">
              {stat.label}
            </p>
            <p className="text-4xl font-display font-extrabold text-navy-900 mt-2">
              {stat.value}
            </p>
            <p className="text-xs text-neutral-400 mt-1">{stat.sublabel}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
          <h2 className="text-lg font-display font-bold text-navy-900">
            Client Review & Verification Workflow
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Issue a private one-time verification code when completing a client engagement. When the client submits their review on the public website, review and approve it before publishing.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/admin/verification-codes"
              className="inline-block bg-navy-900 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              Generate Verification Code
            </Link>
            <Link
              href="/admin/reviews"
              className="inline-block bg-neutral-100 text-navy-900 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors"
            >
              Review Submissions ({pendingReviews} Pending)
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
          <h2 className="text-lg font-display font-bold text-navy-900">
            WhatsApp Testimonials & Screenshot Generator
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Create high-resolution WhatsApp-style testimonial screenshots, manage chat messages, and publish verified client testimonials to the homepage slider.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/admin/screenshots"
              className="inline-block bg-accent-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-accent-500 transition-colors"
            >
              Open Screenshot Generator
            </Link>
            <Link
              href="/admin/testimonials"
              className="inline-block bg-neutral-100 text-navy-900 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors"
            >
              Manage Testimonials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
