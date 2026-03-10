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
    setLoading(true);
    const next = !active;
    const result = await toggleOrgActive(orgId, next);
    if (result?.success) setActive(next);
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
        active
          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-green-500" : "bg-gray-400"}`} />
      {loading ? "Saving..." : active ? "Active" : "Inactive"}
    </button>
  );
}
