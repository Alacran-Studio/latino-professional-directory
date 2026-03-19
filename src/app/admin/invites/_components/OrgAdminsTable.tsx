import type { OrgAdmin } from "@/types/admin";

interface OrgAdminsTableProps {
  admins: OrgAdmin[];
}

export function OrgAdminsTable({ admins }: OrgAdminsTableProps) {
  if (admins.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-secondary-foreground">No org admins yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {admins.map((admin) => (
          <div
            key={`${admin.user_id}-${admin.organization_id}`}
            className="rounded-lg border border-border bg-card p-4"
          >
            <p className="text-sm font-medium text-foreground">
              {admin.first_name} {admin.last_name}
            </p>
            <p className="text-xs text-secondary-foreground">{admin.email}</p>
            <p className="mt-1 text-xs text-secondary-foreground">{admin.organization_name}</p>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Organization</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={`${admin.user_id}-${admin.organization_id}`}
                className="border-b border-border last:border-b-0 hover:bg-card-hover"
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground">{admin.organization_name}</td>
                <td className="px-4 py-3 text-sm text-secondary-foreground">
                  {admin.first_name} {admin.last_name}
                </td>
                <td className="px-4 py-3 text-sm text-secondary-foreground">{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
