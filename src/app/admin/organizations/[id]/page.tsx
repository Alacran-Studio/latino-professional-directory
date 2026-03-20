import { requireAuth } from "@/lib/auth/requireAuth";
import {
  fetchOrgById,
  fetchAllIndustries,
  fetchAllServices,
  fetchAllCities,
  fetchAllCommunities,
  userOwnsOrg,
} from "@/lib/admin/dbOperations";
import { OrgForm } from "../../_components/OrgForm";
import { StatusBadge } from "../../_components/StatusBadge";
import { ActiveToggle } from "../../_components/ActiveToggle";
import { DeleteOrgButton } from "../../_components/DeleteOrgButton";
import { OnboardingFooter } from "../../_components/OnboardingFooter";
import { CompletionProvider } from "../../_components/CompletionContext";
import { notFound, redirect } from "next/navigation";
import type { UserRole } from "@/types/admin";
import { computeCompletion } from "@/lib/admin/computeCompletion";
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

  const [org, allIndustries, allServices, allCities, allCommunities] =
    await Promise.all([
      fetchOrgById(orgId),
      fetchAllIndustries(),
      fetchAllServices(),
      fetchAllCities(),
      fetchAllCommunities(),
    ]);

  if (!org) notFound();

  const isOnboarding = org.is_active === "false";
  const completion = computeCompletion(org);

  const showOnboardingFooter = role === "org_admin" && isOnboarding && org.ready_for_review !== "true";

  return (
    <CompletionProvider initialCompletion={completion}>
    <div className="flex h-full flex-col">
      {/* Scrollable content area */}
      <div className="min-h-0 flex-1 overflow-y-auto">
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
            <StatusBadge isActive={org.is_active !== "false"} />
            {role === "system_admin" && (
              <ActiveToggle orgId={org.id} isActive={org.is_active !== "false"} />
            )}
            {role === "system_admin" && (
              <DeleteOrgButton orgId={org.id} orgName={org.name} />
            )}
          </div>
        </div>

        {/* Org admin: profile completion prompt */}
        {role === "org_admin" && org.is_active === "false" && (
          <div className="mb-6 rounded-md border border-blue-200 bg-blue-50 px-4 py-4">
            {org.ready_for_review === "true" ? (
              <p className="text-sm font-medium text-blue-700">
                ✓ Your profile has been submitted for review. We&apos;ll activate your listing once we&apos;ve taken a look!
              </p>
            ) : (
              <p className="text-sm font-semibold text-blue-800">
                Almost there! Complete your profile to go live.
              </p>
            )}
          </div>
        )}

        {/* System admin: review request badge */}
        {role === "system_admin" && org.ready_for_review === "true" && org.is_active === "false" && (
          <div className="mb-6 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            This organization has submitted their profile for final review. Toggle <strong>Active</strong> above to publish their listing.
          </div>
        )}

        <OrgForm
          org={org}
          allIndustries={allIndustries}
          allServices={allServices}
          allCities={allCities}
          allCommunities={allCommunities}
          isOnboarding={isOnboarding}
        />

        {/* Bottom breathing room above footer */}
        {showOnboardingFooter && <div className="h-4" />}
      </div>

      {/* Sticky footer — pinned to bottom of main content area */}
      {showOnboardingFooter && <OnboardingFooter orgId={org.id} />}
    </div>
    </CompletionProvider>
  );
}
