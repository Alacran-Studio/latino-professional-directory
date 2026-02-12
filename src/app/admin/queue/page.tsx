import { requireRole } from "@/lib/auth/requireAuth";
import { fetchPendingOrgs } from "@/lib/admin/dbOperations";
import { QueueCard } from "../_components/QueueCard";

export default async function ApprovalQueuePage() {
  await requireRole("system_admin");

  const pendingOrgs = await fetchPendingOrgs();

  return (
    <div>
      <h1 className="font-lexend mb-6 text-2xl font-semibold text-foreground">
        Approval Queue
      </h1>

      {pendingOrgs.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-secondary-foreground">
            No organizations pending review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingOrgs.map((org) => (
            <QueueCard key={org.id} org={org} />
          ))}
        </div>
      )}
    </div>
  );
}
