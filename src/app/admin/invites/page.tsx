import { requireRole } from "@/lib/auth/requireAuth";
import { fetchAllInvites } from "@/lib/admin/inviteOperations";
import { fetchAllOrgs } from "@/lib/admin/dbOperations";
import { InviteForm } from "./_components/InviteForm";
import { InvitesTable } from "./_components/InvitesTable";

export default async function ManageAdminsPage() {
  await requireRole("system_admin");

  const [invites, allOrgs] = await Promise.all([fetchAllInvites(), fetchAllOrgs()]);

  const approvedOrgs = allOrgs.filter((org) => org.status === "approved");

  return (
    <div className="space-y-8">
      <h1 className="font-lexend text-2xl font-semibold text-foreground">
        Manage Admins
      </h1>

      <InviteForm orgs={approvedOrgs} />

      <div>
        <h2 className="font-lexend mb-4 text-lg font-semibold text-foreground">
          Invites
        </h2>
        <InvitesTable invites={invites} />
      </div>
    </div>
  );
}
