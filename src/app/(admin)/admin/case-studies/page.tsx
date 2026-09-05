import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy-900">
            Case Studies
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage portfolio case studies.
          </p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-navy-800 transition-colors"
        >
          <Plus size={18} />
          New Case Study
        </Link>
      </div>

      {caseStudies.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center">
          <p className="text-neutral-500">No case studies found. Create one to get started.</p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-navy-900">Title</th>
                <th className="px-6 py-4 font-semibold text-navy-900">Client</th>
                <th className="px-6 py-4 font-semibold text-navy-900">Status</th>
                <th className="px-6 py-4 font-semibold text-navy-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {caseStudies.map((cs) => (
                <tr key={cs.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-navy-900">{cs.title}</td>
                  <td className="px-6 py-4 text-neutral-600">{cs.client}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      cs.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-600"
                    }`}>
                      {cs.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/case-studies/${cs.id}`}
                      className="text-accent-600 hover:text-accent-700 font-medium"
                    >
                      Edit
                    </Link>
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
