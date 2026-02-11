import { requireAuth } from "@/lib/auth/requireAuth";
import { fetchOrgById, userOwnsOrg } from "@/lib/admin/dbOperations";
import { OrgForm } from "../../_components/OrgForm";
import { StatusBadge } from "../../_components/StatusBadge";
import { notFound, redirect } from "next/navigation";
import type { UserRole, OrgStatus } from "@/types/admin";
import Link from "next/link";

export default async function EditOrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAuth();
  const role = user.role as UserRole;
  const { id } = await params;
  const orgId = parseInt(id, 10);

  if (isNaN(orgId)) notFound();

  // org_admin can only edit their own orgs
  if (role === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) redirect("/admin/organizations");
  }

  const org = await fetchOrgById(orgId);
  if (!org) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/organizations"
          className="text-sm text-secondary-foreground hover:text-foreground"
        >
          &larr; Back to organizations
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-lexend text-2xl font-semibold text-foreground">
          {org.name}
        </h1>
        <StatusBadge status={org.status as OrgStatus} />
      </div>

      <OrgForm org={org} />
    </div>
  );
}
