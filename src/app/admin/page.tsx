import { requireAuth } from "@/lib/auth/requireAuth";
import { db } from "@/lib/drizzleClient";
import { OrganizationsTable } from "../../../drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { DashboardStats } from "./_components/DashboardStats";
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

export default async function AdminDashboard() {
  const user = await requireAuth();
  const role = user.role as UserRole;
  const counts = await getOrgCounts();

  const systemAdminStats = [
    { label: "Total Organizations", value: counts.total },
    { label: "Approved", value: counts.approved },
    { label: "Pending Review", value: counts.pending },
    { label: "Rejected", value: counts.rejected },
  ];

  const orgAdminStats = [
    { label: "Your Organizations", value: 0 },
  ];

  return (
    <div>
      <h1 className="font-lexend mb-6 text-2xl font-semibold text-foreground">
        {role === "system_admin" ? "Admin Dashboard" : "My Dashboard"}
      </h1>

      <DashboardStats
        stats={role === "system_admin" ? systemAdminStats : orgAdminStats}
      />

      {role === "system_admin" && counts.pending > 0 && (
        <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <span className="font-semibold">{counts.pending}</span>{" "}
            organization{counts.pending !== 1 ? "s" : ""} waiting for review.
          </p>
        </div>
      )}
    </div>
  );
}
