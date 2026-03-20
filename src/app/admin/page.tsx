import Link from "next/link";
import { requireAuth } from "@/lib/auth/requireAuth";
import { db } from "@/lib/drizzleClient";
import { OrganizationsTable, UserOrganizationsTable } from "@drizzle/schema";
import { eq, sql, inArray } from "drizzle-orm";
import { DashboardStats } from "./_components/DashboardStats";
import { SubmittedBanner } from "./_components/SubmittedBanner";
import type { UserRole } from "@/types/admin";

async function getOrgCounts() {
  const rows = await db
    .select({
      status: OrganizationsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(OrganizationsTable)
    .groupBy(OrganizationsTable.status);

  const counts = { total: 0, approved: 0, pending: 0, rejected: 0 };
  for (const row of rows) {
    const c = row.count;
    counts.total += c;
    if (row.status === "approved") counts.approved = c;
    if (row.status === "pending") counts.pending = c;
    if (row.status === "rejected") counts.rejected = c;
  }
  return counts;
}

async function getUserOrg(userId: number) {
  const links = await db
    .select({ organization_id: UserOrganizationsTable.organization_id })
    .from(UserOrganizationsTable)
    .where(eq(UserOrganizationsTable.user_id, userId));

  if (links.length === 0) return null;

  const rows = await db
    .select({ id: OrganizationsTable.id, is_active: OrganizationsTable.is_active })
    .from(OrganizationsTable)
    .where(inArray(OrganizationsTable.id, links.map((l) => l.organization_id)));

  return rows[0] ?? null;
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await requireAuth();
  const role = user.role as UserRole;
  const params = await searchParams;
  const justSubmitted = params.submitted === "true";

  const systemAdminStats = async () => {
    const counts = await getOrgCounts();
    return {
      stats: [
        { label: "Total Organizations", value: counts.total, href: "/admin/organizations" },
        { label: "Approved", value: counts.approved, href: "/admin/organizations" },
        { label: "Pending Review", value: counts.pending, href: "/admin/queue" },
        { label: "Rejected", value: counts.rejected },
      ],
      pendingCount: counts.pending,
    };
  };

  const orgAdminData = async () => {
    const org = await getUserOrg(user.id);
    return { org, pendingCount: 0 };
  };

  const isSystemAdmin = role === "system_admin";
  const data = isSystemAdmin ? await systemAdminStats() : await orgAdminData();

  return (
    <div>
      <h1 className="font-lexend mb-6 text-2xl font-semibold text-foreground">
        {isSystemAdmin ? "Admin Dashboard" : "My Dashboard"}
      </h1>

      {justSubmitted && <SubmittedBanner />}

      {isSystemAdmin ? (
        <DashboardStats stats={(data as Awaited<ReturnType<typeof systemAdminStats>>).stats} />
      ) : (
        (() => {
          const org = (data as Awaited<ReturnType<typeof orgAdminData>>).org;
          const isActive = org?.is_active === "true";
          const href = org ? `/admin/organizations/${org.id}` : "/admin/organizations";
          return (
            <Link
              href={href}
              className="block rounded-lg border border-border bg-card p-6 shadow-lg shadow-gray-300 transition duration-300 ease-in-out hover:bg-cardHover"
            >
              <p className="text-sm text-secondary-foreground">Your Organization</p>
              <p className={`font-lexend mt-1 text-3xl font-semibold ${isActive ? "text-green-600" : "text-gray-500"}`}>
                {isActive ? "Active" : "Inactive"}
              </p>
            </Link>
          );
        })()
      )}

      {isSystemAdmin && data.pendingCount > 0 && (
        <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <span className="font-semibold">{data.pendingCount}</span>{" "}
            organization{data.pendingCount !== 1 ? "s" : ""} waiting for review.
          </p>
        </div>
      )}
    </div>
  );
}
