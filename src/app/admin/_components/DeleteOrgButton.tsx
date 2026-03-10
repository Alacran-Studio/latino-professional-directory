"use client";

import { useState } from "react";
import { deleteOrgAction } from "../organizations/[id]/_actions/deleteOrg";

interface DeleteOrgButtonProps {
  orgId: number;
  orgName: string;
}

export function DeleteOrgButton({ orgId, orgName }: DeleteOrgButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
      >
        Delete Organization
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 dark:border-red-800 dark:bg-red-950/20">
      <span className="text-sm text-red-700 dark:text-red-400">
        Delete <strong>{orgName}</strong>? This cannot be undone.
      </span>
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await deleteOrgAction(orgId);
        }}
        className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Deleting…" : "Confirm Delete"}
      </button>
      <button
        disabled={loading}
        onClick={() => setConfirming(false)}
        className="text-xs text-secondary-foreground hover:text-foreground disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  );
}
