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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ viewAs?: string }>;
}) {
  const user = await requireAuth();
  const role = user.role as UserRole;
  const { id } = await params;
  const { viewAs } = await searchParams;
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

  const previewingAsOrgAdmin = role === "system_admin" && viewAs === "org_admin";
  const effectiveRole: UserRole = previewingAsOrgAdmin ? "org_admin" : role;

  const isOnboarding = org.is_active === "false";
  const completion = computeCompletion(org);

  const showOnboardingFooter = effectiveRole === "org_admin" && isOnboarding && org.ready_for_review !== "true";

  return (
    <CompletionProvider initialCompletion={completion}>
    <div className="flex h-full flex-col">
      {/* Scrollable content area */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/organizations"
            className="text-sm text-secondary-foreground hover:text-foreground"
          >
            &larr; Back to organizations
          </Link>
          {role === "system_admin" && (
            <Link
              href={previewingAsOrgAdmin ? `/admin/organizations/${orgId}` : `/admin/organizations/${orgId}?viewAs=org_admin`}
              className="text-xs text-secondary-foreground underline hover:text-foreground"
            >
              {previewingAsOrgAdmin ? "Exit org admin preview" : "Preview as org admin"}
            </Link>
          )}
        </div>

        {previewingAsOrgAdmin && (
          <div className="mb-6 rounded-md border border-purple-200 bg-purple-50 px-4 py-2 text-xs text-purple-700">
            Previewing as org admin — edits are still saved normally.
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-lexend text-2xl font-semibold text-foreground">
                {org.name}
              </h1>
              <StatusBadge isActive={org.is_active !== "false"} />
            </div>
            <p className="mt-0.5 text-sm text-secondary-foreground">Organization Profile</p>
          </div>
          {role === "system_admin" && !previewingAsOrgAdmin && (
            <div className="flex flex-wrap items-center gap-3">
              <ActiveToggle orgId={org.id} isActive={org.is_active !== "false"} />
              <DeleteOrgButton orgId={org.id} orgName={org.name} />
            </div>
          )}
        </div>

        {/* Org admin: profile completion prompt */}
        {effectiveRole === "org_admin" && org.is_active === "false" && (
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
        {role === "system_admin" && !previewingAsOrgAdmin && org.ready_for_review === "true" && org.is_active === "false" && (
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
