"use client";

import { useState } from "react";
import { toggleOrgActive } from "../organizations/[id]/_actions/toggleOrgActive";

interface ActiveToggleProps {
  orgId: number;
  isActive: boolean;
}

export function ActiveToggle({ orgId, isActive }: ActiveToggleProps) {
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    if (loading) return;
    const next = !active;
    setActive(next);
    setLoading(true);
    try {
      const result = await toggleOrgActive(orgId, next);
      if (!result?.success) setActive(!next); // revert on failure
    } catch {
      setActive(!next); // revert on error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        role="switch"
        aria-checked={active}
        onClick={handleToggle}
        disabled={loading}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed ${
          active
            ? "bg-green-500 dark:bg-green-600"
            : "bg-gray-300 dark:bg-gray-600"
        } ${loading ? "opacity-60" : ""}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
            active ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className="text-xs font-medium text-secondary-foreground">
        {loading ? "Saving…" : active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
