"use client";

// src/app/(admin)/admin/verification-codes/VerificationCodesAdminClient.tsx
import React, { useState, useTransition } from "react";
import {
  KeyRound,
  Plus,
  Copy,
  Check,
  Ban,
  Trash2,
  ShieldCheck,
  Clock,
} from "lucide-react";
import {
  createVerificationCodeAction,
  revokeVerificationCodeAction,
  deleteVerificationCodeAction,
} from "@/app/actions/admin";

type SafeVerificationCodeRecord = {
  id: string;
  codePrefix: string;
  clientName: string;
  clientEmail: string | null;
  companyName: string | null;
  projectName: string;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  isExpired: boolean;
  revoked: boolean;
  usedAt: string | null;
  createdAt: string;
  reviewCount: number;
};

export function VerificationCodesAdminClient({
  initialCodes,
}: {
  initialCodes: SafeVerificationCodeRecord[];
}) {
  const [isPending, startTransition] = useTransition();
  const [newlyCreatedCode, setNewlyCreatedCode] = useState<{
    rawCode: string;
    clientName: string;
    projectName: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const clientName = String(formData.get("clientName") || "");
    const projectName = String(formData.get("projectName") || "");

    startTransition(async () => {
      const res = await createVerificationCodeAction(formData);
      if (!res.ok) {
        setErrorMsg(res.error || "Failed to generate verification code.");
        return;
      }
      setNewlyCreatedCode({
        rawCode: res.rawCode!,
        clientName,
        projectName,
      });
      setCopied(false);
      form.reset();
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleRevoke = (id: string) => {
    startTransition(async () => {
      await revokeVerificationCodeAction(id);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteVerificationCodeAction(id);
      setConfirmDeleteId(null);
    });
  };

  return (
    <div className="space-y-8">
      {/* ── Newly Generated One-Time Code Reveal Banner ─────────── */}
      {newlyCreatedCode && (
        <div className="bg-navy-950 text-white rounded-2xl p-6 border border-accent-500/40 shadow-xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} />
              One-Time Verification Code Generated — Copy Now
            </div>
            <button
              type="button"
              onClick={() => setNewlyCreatedCode(null)}
              className="text-xs text-neutral-400 hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          <p className="text-sm text-neutral-300">
            Share this private verification code with{" "}
            <strong className="text-white">{newlyCreatedCode.clientName}</strong> for{" "}
            <strong className="text-white">{newlyCreatedCode.projectName}</strong>. For security, only the cryptographic hash is stored in the database — this plaintext code will not be shown again.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <code className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 font-mono text-lg font-bold tracking-widest text-accent-400 select-all">
              {newlyCreatedCode.rawCode}
            </code>
            <button
              type="button"
              onClick={() => handleCopy(newlyCreatedCode.rawCode)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied to Clipboard" : "Copy Verification Code"}
            </button>
          </div>
        </div>
      )}

      {/* ── Generate New Code Form ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-accent-50 border border-accent-100 text-accent-600 flex items-center justify-center">
            <KeyRound size={18} />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-navy-900">
              Issue Client Verification Code
            </h2>
            <p className="text-xs text-neutral-500">
              Generate a one-time verification code associated with a client project agreement.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">
                Client Name *
              </label>
              <input
                name="clientName"
                type="text"
                required
                placeholder="e.g. Michael Anderson"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">
                Company Name (Optional)
              </label>
              <input
                name="companyName"
                type="text"
                placeholder="e.g. Wilsden"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">
                Client Email (Private Admin Ref)
              </label>
              <input
                name="clientEmail"
                type="email"
                placeholder="client@company.com"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">
                Project or Service Agreement *
              </label>
              <input
                name="projectName"
                type="text"
                required
                placeholder="e.g. AI Workflow Automation"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">
                Expiration Window
              </label>
              <select
                name="expiresInDays"
                defaultValue="30"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm bg-white"
              >
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days (Recommended)</option>
                <option value="90">90 Days</option>
                <option value="0">No Expiration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1.5">
                Usage Limit
              </label>
              <select
                name="maxUses"
                defaultValue="1"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 text-sm bg-white"
              >
                <option value="1">1 Use (Strict One-Time Code)</option>
                <option value="2">2 Uses</option>
                <option value="5">5 Uses</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2 border-t border-neutral-100">
            <div className="w-full sm:max-w-xs">
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                Optional Custom Code (leave blank to auto-generate)
              </label>
              <input
                name="customCode"
                type="text"
                placeholder="Auto-generated: MAZ-XXXX-XXXX"
                className="w-full h-9 px-3 rounded-lg border border-neutral-200 font-mono text-xs uppercase"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              <Plus size={16} />
              {isPending ? "Generating..." : "Generate Verification Code"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Existing Verification Codes Table ────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="text-base font-display font-bold text-navy-900">
            Issued Verification Codes ({initialCodes.length})
          </h3>
          <span className="text-xs text-neutral-500">
            Codes are stored as cryptographic hashes
          </span>
        </div>

        {initialCodes.length === 0 ? (
          <div className="p-12 text-center text-sm text-neutral-500">
            No verification codes generated yet. Issue a code above for a client agreement.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase text-neutral-500">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Masked Code</th>
                  <th className="px-5 py-3.5 font-semibold">Client & Project</th>
                  <th className="px-5 py-3.5 font-semibold">Usage</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Expiration</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {initialCodes.map((code) => {
                  const isExpired = code.isExpired;
                  const isExhausted = code.usedCount >= code.maxUses;

                  let statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  );

                  if (code.revoked) {
                    statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                        Revoked
                      </span>
                    );
                  } else if (isExhausted) {
                    statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        Used ({code.usedCount}/{code.maxUses})
                      </span>
                    );
                  } else if (isExpired) {
                    statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        Expired
                      </span>
                    );
                  }

                  return (
                    <tr key={code.id} className="hover:bg-neutral-50/80">
                      <td className="px-5 py-4 font-mono text-xs font-bold text-navy-900">
                        {code.codePrefix}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-navy-900">
                          {code.clientName}
                          {code.companyName ? ` (${code.companyName})` : ""}
                        </p>
                        <p className="text-xs text-neutral-500">{code.projectName}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-neutral-600">
                        <span className="font-semibold">
                          {code.usedCount} / {code.maxUses}
                        </span>
                        {code.usedAt && (
                          <span className="block text-[11px] text-neutral-400">
                            Used {new Date(code.usedAt).toLocaleDateString()}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">{statusBadge}</td>
                      <td className="px-5 py-4 text-xs text-neutral-600">
                        {code.expiresAt ? (
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} className="text-neutral-400" />
                            {new Date(code.expiresAt).toLocaleDateString()}
                          </span>
                        ) : (
                          "Never"
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {!code.revoked && !isExhausted && (
                            <button
                              type="button"
                              onClick={() => handleRevoke(code.id)}
                              disabled={isPending}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 cursor-pointer"
                            >
                              <Ban size={12} />
                              Revoke
                            </button>
                          )}

                          {confirmDeleteId === code.id ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleDelete(code.id)}
                                disabled={isPending}
                                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1 rounded-lg text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(code.id)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                              aria-label="Delete code"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
