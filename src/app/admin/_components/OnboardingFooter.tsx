"use client";

import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { SubmitForReviewButton } from "./SubmitForReviewButton";
import { useCompletion } from "./CompletionContext";

const sections = [
  { key: "basicInfo" as const, label: "Basic Info" },
  { key: "media" as const, label: "Media" },
  { key: "classification" as const, label: "Classification" },
] as const;

export function OnboardingFooter({ orgId }: { orgId: number }) {
  const { completion } = useCompletion();

  return (
    <div className="-mx-6 -mb-6 shrink-0 border-t border-border bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.07)]">
      <div className="flex items-center justify-between gap-6 px-6 py-3">
        <div className="flex flex-col gap-1.5">
          <p className="pb-1 text-sm font-medium text-foreground">
            Add your logo, photos, description, and other details and submit for review.
          </p>
          <div className="flex items-center gap-2">
            {sections.map(({ key, label }) => {
              const met = completion[key].complete;
              return (
                <span
                  key={key}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    met
                      ? "bg-green-100 text-green-700"
                      : "border border-yellow-200 bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {met
                    ? <CheckCircleIcon className="h-3.5 w-3.5" />
                    : <ExclamationTriangleIcon className="h-3.5 w-3.5" />
                  }
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        <SubmitForReviewButton
          orgId={orgId}
          allComplete={completion.allComplete}
          metCount={completion.metCount}
          total={completion.total}
        />
      </div>
    </div>
  );
}
