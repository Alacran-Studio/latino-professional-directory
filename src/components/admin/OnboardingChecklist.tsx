import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon as CheckCircleOutlineIcon } from "@heroicons/react/24/outline";

export interface ChecklistItem {
  label: string;
  met: boolean;
  optional?: boolean;
}

export function OnboardingChecklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
      {items.map(({ label, met, optional }) => (
        <div key={label} className="flex items-center gap-2 text-sm">
          {met ? (
            <CheckCircleIcon className="h-4 w-4 shrink-0 text-green-600" />
          ) : (
            <CheckCircleOutlineIcon className="h-4 w-4 shrink-0 text-secondary-foreground" />
          )}
          <span className={met ? "text-foreground" : "text-secondary-foreground"}>
            {label}{optional && <span className="italic"> (optional)</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
