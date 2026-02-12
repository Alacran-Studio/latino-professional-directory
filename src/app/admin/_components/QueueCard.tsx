"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveOrganization } from "../queue/_actions/approveOrganization";
import { rejectOrganization } from "../queue/_actions/rejectOrganization";
import type { AdminOrg } from "@/types/admin";

interface QueueCardProps {
  org: AdminOrg;
}

export function QueueCard({ org }: QueueCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  async function handleApprove() {
    setLoading("approve");
    const result = await approveOrganization(org.id);
    if (result?.error) {
      setLoading(null);
      alert(result.error);
    } else {
      router.refresh();
    }
  }

  async function handleReject() {
    setLoading("reject");
    const result = await rejectOrganization(org.id);
    if (result?.error) {
      setLoading(null);
      alert(result.error);
    } else {
      router.refresh();
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3">
        <h3 className="font-lexend text-lg font-semibold text-foreground">
          {org.name}
        </h3>
        {org.website_url && (
          <p className="mt-0.5 text-sm text-secondary-foreground">
            {org.website_url}
          </p>
        )}
      </div>

      {org.short_description && (
        <p className="mb-3 text-sm text-foreground">{org.short_description}</p>
      )}

      {org.description && (
        <p className="mb-4 text-sm text-secondary-foreground line-clamp-3">
          {org.description}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          disabled={loading !== null}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
        >
          {loading === "approve" ? "Approving..." : "Approve"}
        </button>
        <button
          onClick={handleReject}
          disabled={loading !== null}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
        >
          {loading === "reject" ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
}
