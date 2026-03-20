"use client";

import { useState } from "react";
import { submitForReview } from "../organizations/[id]/_actions/submitForReview";

interface SubmitForReviewButtonProps {
  orgId: number;
  allComplete: boolean;
  metCount: number;
  total: number;
}

export function SubmitForReviewButton({ orgId, allComplete, metCount, total }: SubmitForReviewButtonProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    const result = await submitForReview(orgId);
    if (result?.error) {
      setError(result.error);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <p className="text-sm font-medium text-green-700">
        ✓ Submitted for review — we&apos;ll be in touch soon!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleSubmit}
        disabled={loading || !allComplete}
        title={!allComplete ? `Complete all ${total} requirements to submit (${metCount}/${total} done)` : undefined}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit for Review"}
      </button>
      {!allComplete && (
        <p className="text-xs text-secondary-foreground">{metCount} of {total} requirements met</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
