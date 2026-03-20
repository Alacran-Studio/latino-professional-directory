import Link from "next/link";
import type { AdminOrg } from "@/types/admin";

interface QueueCardProps {
  org: AdminOrg;
}

export function QueueCard({ org }: QueueCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3">
        <h3 className="font-lexend text-lg font-semibold text-foreground">
          {org.name}
        </h3>
        {org.website_url && (
          <p className="mt-0.5 text-sm text-secondary-foreground">
            {org.website_url}
          </p>
        )}
      </div>

      {org.short_description && (
        <p className="mb-3 text-sm text-foreground">{org.short_description}</p>
      )}

      {org.description && (
        <p className="mb-4 text-sm text-secondary-foreground line-clamp-3">
          {org.description}
        </p>
      )}

      <Link
        href={`/admin/organizations/${org.id}`}
        className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Review &amp; Activate &rarr;
      </Link>
    </div>
  );
}
