import { requireAuth } from "@/lib/auth/requireAuth";
import {
  fetchOrgById,
  fetchAllIndustries,
  fetchAllServices,
  fetchAllCities,
  fetchAllAffinities,
  userOwnsOrg,
} from "@/lib/admin/dbOperations";
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

  if (role === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) redirect("/admin/organizations");
  }

  const [org, allIndustries, allServices, allCities, allAffinities] =
    await Promise.all([
      fetchOrgById(orgId),
      fetchAllIndustries(),
      fetchAllServices(),
      fetchAllCities(),
      fetchAllAffinities(),
    ]);

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

      <div className="mb-6 flex items-start gap-3">
        <div>
          <h1 className="font-lexend text-2xl font-semibold text-foreground">
            {org.name}
          </h1>
          <p className="mt-0.5 text-sm text-secondary-foreground">Organization Profile</p>
        </div>
        <StatusBadge status={org.status as OrgStatus} />
      </div>

      <OrgForm
        org={org}
        allIndustries={allIndustries}
        allServices={allServices}
        allCities={allCities}
        allAffinities={allAffinities}
      />
    </div>
  );
}
