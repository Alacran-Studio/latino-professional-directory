import { requireRole } from "@/lib/auth/requireAuth";
import { fetchAllInvites } from "@/lib/admin/inviteOperations";
import { fetchAllOrgs, fetchOrgAdmins } from "@/lib/admin/dbOperations";
import { InviteForm } from "./_components/InviteForm";
import { InvitesTable } from "./_components/InvitesTable";
import { OrgAdminsTable } from "./_components/OrgAdminsTable";

export default async function ManageAdminsPage() {
  await requireRole("system_admin");

  const [invites, allOrgs, orgAdmins] = await Promise.all([
    fetchAllInvites(),
    fetchAllOrgs(),
    fetchOrgAdmins(),
  ]);

  const approvedOrgs = allOrgs.filter((org) => org.status === "approved");
  const nonAcceptedInvites = invites.filter((i) => i.status !== "accepted");

  return (
    <div className="space-y-8">
      <h1 className="font-lexend text-2xl font-semibold text-foreground">
        Manage Admins
      </h1>

      <div>
        <h2 className="font-lexend mb-4 text-lg font-semibold text-foreground">
          Org Admins (Active)
        </h2>
        <OrgAdminsTable admins={orgAdmins} />
      </div>

      <InviteForm orgs={approvedOrgs} />

      <div>
        <h2 className="font-lexend mb-4 text-lg font-semibold text-foreground">
          Invites
        </h2>
        <InvitesTable invites={nonAcceptedInvites} />
      </div>
    </div>
  );
}
