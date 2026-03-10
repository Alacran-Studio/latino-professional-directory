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
import { ActiveToggle } from "../../_components/ActiveToggle";
import { DeleteOrgButton } from "../../_components/DeleteOrgButton";
import { SubmitForReviewButton } from "../../_components/SubmitForReviewButton";
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

      <div className="mb-6 flex flex-wrap items-start gap-3">
        <div className="flex-1">
          <h1 className="font-lexend text-2xl font-semibold text-foreground">
            {org.name}
          </h1>
          <p className="mt-0.5 text-sm text-secondary-foreground">Organization Profile</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={org.status as OrgStatus} isActive={org.is_active !== "false"} />
          {role === "system_admin" && (
            <ActiveToggle orgId={org.id} isActive={org.is_active !== "false"} />
          )}
          {role === "system_admin" && (
            <DeleteOrgButton orgId={org.id} orgName={org.name} />
          )}
        </div>
      </div>

      {/* Org admin: profile completion prompt */}
      {role === "org_admin" && org.status === "approved" && org.is_active === "false" && (
        <div className="mb-6 rounded-md border border-blue-200 bg-blue-50 px-4 py-4 dark:border-blue-800 dark:bg-blue-950/20">
          {org.ready_for_review === "true" ? (
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              ✓ Your profile has been submitted for review. We&apos;ll activate your listing once we&apos;ve taken a look!
            </p>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                  Almost there! Complete your profile to go live.
                </p>
                <p className="mt-0.5 text-sm text-blue-700 dark:text-blue-300">
                  Add your logo, photos, description, and other details below — then submit for final review.
                </p>
              </div>
              <SubmitForReviewButton orgId={org.id} />
            </div>
          )}
        </div>
      )}

      {/* System admin: review request badge */}
      {role === "system_admin" && org.ready_for_review === "true" && org.is_active === "false" && (
        <div className="mb-6 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300">
          This organization has submitted their profile for final review. Toggle <strong>Active</strong> above to publish their listing.
        </div>
      )}

      {/* System admin: rejected org warning */}
      {role === "system_admin" && org.status === "rejected" && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400">
          This organization was rejected. Rejected organizations should be deleted when no longer needed.
        </div>
      )}

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
