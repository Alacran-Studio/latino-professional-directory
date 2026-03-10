"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { deleteOrgAction } from "../organizations/[id]/_actions/deleteOrg";

interface DeleteOrgButtonProps {
  orgId: number;
  orgName: string;
  iconOnly?: boolean;
}

export function DeleteOrgButton({ orgId, orgName, iconOnly }: DeleteOrgButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteOrgAction(orgId);
  }

  const modal = open && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-xl">
        <h2 className="text-base font-semibold text-foreground">Delete organization?</h2>
        <p className="mt-2 text-sm text-secondary-foreground">
          <strong>{orgName}</strong> will be permanently deleted. This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            disabled={loading}
            onClick={() => setOpen(false)}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-card-hover disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );

  if (iconOnly) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
          aria-label={`Delete ${orgName}`}
          title={`Delete ${orgName}`}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
        {modal}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
      >
        Delete Organization
      </button>
      {modal}
    </>
  );
}
