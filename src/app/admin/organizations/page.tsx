import { requireAuth } from "@/lib/auth/requireAuth";
import { fetchAllOrgs, fetchUserOrgs } from "@/lib/admin/dbOperations";
import { OrgTable } from "../_components/OrgTable";
import type { UserRole } from "@/types/admin";

export default async function OrganizationsPage() {
  const user = await requireAuth();
  const role = user.role as UserRole;

  const organizations =
    role === "system_admin"
      ? await fetchAllOrgs()
      : await fetchUserOrgs(user.id);

  return (
    <div>
      <h1 className="font-lexend mb-6 text-2xl font-semibold text-foreground">
        {role === "system_admin" ? "All Organizations" : "My Organizations"}
      </h1>

      <OrgTable organizations={organizations} />
    </div>
  );
}
