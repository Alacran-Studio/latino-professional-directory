import { requireAuth } from "@/lib/auth/requireAuth";
import { fetchAllOrgs, fetchUserOrgs } from "@/lib/admin/dbOperations";
import { OrgTable } from "../_components/OrgTable";
import type { AdminOrg, UserRole } from "@/types/admin";

function groupOrgs(orgs: AdminOrg[]) {
  const sorted = [...orgs].sort((a, b) => a.name.localeCompare(b.name));
  return {
    readyForReview: sorted.filter((o) => o.ready_for_review === "true" && o.is_active === "false"),
    active: sorted.filter((o) => o.is_active === "true"),
    inactive: sorted.filter((o) => o.ready_for_review !== "true" && o.is_active === "false"),
  };
}

export default async function OrganizationsPage() {
  const user = await requireAuth();
  const role = user.role as UserRole;

  const organizations =
    role === "system_admin"
      ? await fetchAllOrgs()
      : await fetchUserOrgs(user.id);

  if (role !== "system_admin") {
    return (
      <div>
        <h1 className="font-lexend mb-6 text-2xl font-semibold text-foreground">My Organizations</h1>
        <OrgTable organizations={organizations} role={role} />
      </div>
    );
  }

  const groups = groupOrgs(organizations);

  return (
    <div className="space-y-8">
      <h1 className="font-lexend text-2xl font-semibold text-foreground">All Organizations</h1>

      {groups.readyForReview.length > 0 && (
        <div>
          <h2 className="font-lexend mb-3 text-sm font-semibold uppercase tracking-wide text-yellow-700">
            Ready for Review ({groups.readyForReview.length})
          </h2>
          <OrgTable organizations={groups.readyForReview} role={role} />
        </div>
      )}

      {groups.active.length > 0 && (
        <div>
          <h2 className="font-lexend mb-3 text-sm font-semibold uppercase tracking-wide text-green-700">
            Active ({groups.active.length})
          </h2>
          <OrgTable organizations={groups.active} role={role} />
        </div>
      )}

      {groups.inactive.length > 0 && (
        <div>
          <h2 className="font-lexend mb-3 text-sm font-semibold uppercase tracking-wide text-secondary-foreground">
            Inactive ({groups.inactive.length})
          </h2>
          <OrgTable organizations={groups.inactive} role={role} />
        </div>
      )}
    </div>
  );
}
