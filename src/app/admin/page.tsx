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

async function getUserOrgCounts(userId: number) {
  const links = await db
    .select({ organization_id: UserOrganizationsTable.organization_id })
    .from(UserOrganizationsTable)
    .where(eq(UserOrganizationsTable.user_id, userId));

  const orgIds = links.map((l) => l.organization_id);
  if (orgIds.length === 0) return { total: 0, pending: 0, approved: 0 };

  const rows = await db
    .select({
      status: OrganizationsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(OrganizationsTable)
    .where(inArray(OrganizationsTable.id, orgIds))
    .groupBy(OrganizationsTable.status);

  const counts = { total: 0, pending: 0, approved: 0 };
  for (const row of rows) {
    counts.total += row.count;
    if (row.status === "pending") counts.pending = row.count;
    if (row.status === "approved") counts.approved = row.count;
  }
  return counts;
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
    const counts = await getUserOrgCounts(user.id);
    return {
      stats: [
        { label: "Your Organizations", value: counts.total, href: "/admin/organizations" },
        { label: "Approved", value: counts.approved, href: "/admin/organizations" },
        { label: "Pending Review", value: counts.pending, href: "/admin/organizations" },
      ],
      pendingCount: counts.pending,
    };
  };

  const data =
    role === "system_admin" ? await systemAdminStats() : await orgAdminData();

  return (
    <div>
      <h1 className="font-lexend mb-6 text-2xl font-semibold text-foreground">
        {role === "system_admin" ? "Admin Dashboard" : "My Dashboard"}
      </h1>

      {justSubmitted && <SubmittedBanner />}

      <DashboardStats stats={data.stats} />

      {role === "system_admin" && data.pendingCount > 0 && (
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
