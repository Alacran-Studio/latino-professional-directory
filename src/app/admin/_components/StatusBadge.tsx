import type { OrgStatus } from "@/types/admin";

const statusStyles: Record<OrgStatus | "inactive", string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  approved:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  inactive: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

interface StatusBadgeProps {
  status: OrgStatus;
  isActive?: boolean;
}

export function StatusBadge({ status, isActive = true }: StatusBadgeProps) {
  const effectiveStatus = status === "approved" && !isActive ? "inactive" : status;
  const label = effectiveStatus === "inactive" ? "Inactive" : effectiveStatus;

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[effectiveStatus]}`}
    >
      {label}
    </span>
  );
}
