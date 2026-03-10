"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { FeaturedOrg } from "@/lib/admin/dbOperations";
import type { AdminOrg } from "@/types/admin";
import {
  addFeaturedOrgAction,
  removeFeaturedOrgAction,
} from "../_actions/featuredOrgs";

interface FeaturedOrgsManagerProps {
  featuredOrgs: FeaturedOrg[];
  allOrgs: AdminOrg[];
}

const MAX_FEATURED = 3;

export function FeaturedOrgsManager({
  featuredOrgs,
  allOrgs,
}: FeaturedOrgsManagerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const featuredOrgIds = new Set(featuredOrgs.map((f) => f.org_id));
  const availableOrgs = allOrgs.filter((org) => !featuredOrgIds.has(org.id));

  const slots = [1, 2, 3];

  async function handleRemove(orgId: number) {
    setLoading(`remove-${orgId}`);
    const formData = new FormData();
    formData.set("orgId", String(orgId));
    const result = await removeFeaturedOrgAction(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      router.refresh();
    }
    setLoading(null);
  }

  async function handleAdd(displayOrder: number, formElement: HTMLFormElement) {
    const selectEl = formElement.querySelector("select") as HTMLSelectElement;
    const orgId = Number(selectEl.value);
    if (!orgId) return;

    setLoading(`add-${displayOrder}`);
    const formData = new FormData();
    formData.set("orgId", String(orgId));
    formData.set("displayOrder", String(displayOrder));
    const result = await addFeaturedOrgAction(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      router.refresh();
    }
    setLoading(null);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-secondary-foreground">
        Up to {MAX_FEATURED} organizations are shown as featured on the homepage.
      </p>

      <div className="space-y-3">
        {slots.map((slot) => {
          const featured = featuredOrgs.find((f) => f.display_order === slot);

          return (
            <div
              key={slot}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <span className="font-lexend w-6 shrink-0 text-center text-sm font-semibold text-secondary-foreground">
                {slot}
              </span>

              {featured ? (
                <>
                  <span className="font-lexend flex-1 text-sm font-medium text-foreground">
                    {featured.name}
                  </span>
                  <button
                    onClick={() => handleRemove(featured.org_id)}
                    disabled={loading !== null}
                    className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    {loading === `remove-${featured.org_id}` ? "Removing..." : "Remove"}
                  </button>
                </>
              ) : (
                <form
                  className="flex flex-1 items-center gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAdd(slot, e.currentTarget);
                  }}
                >
                  <select
                    className="font-lexend flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an organization...
                    </option>
                    {availableOrgs.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={loading !== null || featuredOrgs.length >= MAX_FEATURED}
                    className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    {loading === `add-${slot}` ? "Adding..." : "Add"}
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
