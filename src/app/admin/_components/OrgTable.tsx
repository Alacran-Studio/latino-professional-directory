import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import type { AdminOrg, OrgStatus } from "@/types/admin";

interface OrgTableProps {
  organizations: AdminOrg[];
}

export function OrgTable({ organizations }: OrgTableProps) {
  if (organizations.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-secondary-foreground">No organizations found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
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
                <StatusBadge status={org.status as OrgStatus} />
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
  );
}
