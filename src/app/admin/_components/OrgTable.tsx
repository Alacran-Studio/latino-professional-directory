import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import type { AdminOrg, OrgStatus, UserRole } from "@/types/admin";

interface OrgTableProps {
  organizations: AdminOrg[];
  role?: UserRole;
}

export function OrgTable({ organizations, role }: OrgTableProps) {
  if (organizations.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-secondary-foreground">No organizations found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {organizations.map((org) => (
          <Link
            key={org.id}
            href={`/admin/organizations/${org.id}`}
            className="block rounded-lg border border-border bg-card p-4 hover:bg-card-hover"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{org.name}</p>
              <div className="flex flex-wrap items-center justify-end gap-1">
                <StatusBadge status={org.status as OrgStatus} isActive={org.is_active !== "false"} />
                {role === "system_admin" && org.ready_for_review === "true" && org.is_active === "false" && (
                  <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                    Review Requested
                  </span>
                )}
              </div>
            </div>
            {org.website_url && (
              <p className="mt-1 truncate text-xs text-secondary-foreground">
                {org.website_url}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Website
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr
                key={org.id}
                className="border-b border-border last:border-b-0 hover:bg-card-hover"
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {org.name}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-wrap items-center gap-1">
                    <StatusBadge status={org.status as OrgStatus} isActive={org.is_active !== "false"} />
                    {role === "system_admin" && org.ready_for_review === "true" && org.is_active === "false" && (
                      <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        Review Requested
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-secondary-foreground">
                  {org.website_url}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/organizations/${org.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
