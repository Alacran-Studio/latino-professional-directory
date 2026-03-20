"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
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
  const [wiggling, setWiggling] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevAllComplete = useRef(allComplete);

  useEffect(() => {
    if (!prevAllComplete.current && allComplete) {
      setWiggling(true);
      toast.success("🎉 Profile complete — ready to submit!");

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const style = getComputedStyle(document.documentElement);
        const colors = [
          style.getPropertyValue("--primary").trim(),
          style.getPropertyValue("--accent").trim(),
          style.getPropertyValue("--secondary").trim(),
          style.getPropertyValue("--brand").trim(),
          "white",
        ];
        confetti({
          particleCount: 120,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
          colors,
        });
      }
    }

    if (prevAllComplete.current && !allComplete) {
      setWiggling(false);
    }

    prevAllComplete.current = allComplete;
  }, [allComplete]);

  async function handleSubmit() {
    setWiggling(false);
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
        ref={buttonRef}
        onClick={handleSubmit}
        disabled={loading || !allComplete}
        title={!allComplete ? `Complete all ${total} requirements to submit (${metCount}/${total} done)` : undefined}
        className={`inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 ${wiggling ? "animate-wiggle-loop" : ""}`}
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
