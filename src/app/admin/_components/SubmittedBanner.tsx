"use client";

import { useState } from "react";

export function SubmittedBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
      <p className="text-sm text-green-700 dark:text-green-400">
        {
          "Thanks for submitting! Complete your organization profile below to get listed in the directory."
        }
      </p>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
      >
        Dismiss
      </button>
    </div>
  );
}
