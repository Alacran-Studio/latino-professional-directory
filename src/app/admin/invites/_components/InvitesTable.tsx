"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminInvite, InviteStatus } from "@/types/admin";
import { revokeInvite } from "../_actions/revokeInvite";
import { resendInvite } from "../_actions/resendInvite";

interface InvitesTableProps {
  invites: AdminInvite[];
}

type TabStatus = "pending" | "expired";

const statusStyles: Record<InviteStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  expired: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export function InvitesTable({ invites }: InvitesTableProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabStatus>("pending");

  async function handleRevoke(inviteId: number) {
    setLoading(inviteId);
    setError(null);
    const formData = new FormData();
    formData.set("invite_id", String(inviteId));
    const result = await revokeInvite(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      router.refresh();
    }
    setLoading(null);
  }

  async function handleResend(inviteId: number) {
    setLoading(inviteId);
    setError(null);
    setResendSuccess(null);
    const formData = new FormData();
    formData.set("invite_id", String(inviteId));
    const result = await resendInvite(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setResendSuccess(inviteId);
      setTimeout(() => setResendSuccess(null), 3000);
    }
    setLoading(null);
  }

  const filtered = invites.filter((i) => i.status === activeTab);
  const pendingCount = invites.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["pending", "expired"] as TabStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-secondary-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {tab === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {resendSuccess && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
          Invite email resent.
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-secondary-foreground">No {activeTab} invites.</p>
        </div>
      ) : (
        <>
          {/* Mobile: stacked cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {filtered.map((invite) => (
              <div
                key={invite.id}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {invite.first_name} {invite.last_name}
                    </p>
                    <p className="text-xs text-secondary-foreground">{invite.email}</p>
                    <p className="mt-1 text-xs text-secondary-foreground">{invite.organization_name}</p>
                  </div>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[invite.status as InviteStatus]}`}
                  >
                    {invite.status}
                  </span>
                </div>
                {invite.status === "pending" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleResend(invite.id)}
                      disabled={loading !== null}
                      className="rounded-md border border-border px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-card-hover disabled:opacity-50"
                    >
                      {loading === invite.id ? "..." : resendSuccess === invite.id ? "Sent!" : "Resend"}
                    </button>
                    <button
                      onClick={() => handleRevoke(invite.id)}
                      disabled={loading !== null}
                      className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      {loading === invite.id ? "..." : "Revoke"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden overflow-hidden rounded-lg border border-border md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Organization</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((invite) => (
                  <tr
                    key={invite.id}
                    className="border-b border-border last:border-b-0 hover:bg-card-hover"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      {invite.first_name} {invite.last_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-secondary-foreground">{invite.email}</td>
                    <td className="px-4 py-3 text-sm text-secondary-foreground">{invite.organization_name}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[invite.status as InviteStatus]}`}
                      >
                        {invite.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {invite.status === "pending" && (
                        <div className="flex items-center justify-end gap-4">
                          <button
                            onClick={() => handleResend(invite.id)}
                            disabled={loading !== null}
                            className="text-sm font-medium text-secondary-foreground hover:underline disabled:opacity-50"
                          >
                            {loading === invite.id ? "..." : resendSuccess === invite.id ? "Sent!" : "Resend"}
                          </button>
                          <button
                            onClick={() => handleRevoke(invite.id)}
                            disabled={loading !== null}
                            className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
                          >
                            {loading === invite.id ? "..." : "Revoke"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
