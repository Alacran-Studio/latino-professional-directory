"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import {
  updateOrgIndustries,
  updateOrgServices,
  updateOrgCities,
  updateOrgCommunities,
  userOwnsOrg,
} from "@/lib/admin/dbOperations";
import type { UserRole } from "@/types/admin";
import { revalidatePath } from "next/cache";

type Category = "industries" | "services" | "cities" | "communities";

export async function updateClassificationAction(
  orgId: number,
  category: Category,
  ids: number[]
) {
  const user = await requireAuth();
  if ((user.role as UserRole) === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) return { error: "Permission denied." };
  }

  try {
    switch (category) {
      case "industries": await updateOrgIndustries(orgId, ids); break;
      case "services":   await updateOrgServices(orgId, ids);   break;
      case "cities":     await updateOrgCities(orgId, ids);     break;
      case "communities": await updateOrgCommunities(orgId, ids); break;
    }
  } catch {
    return { error: `Failed to update ${category}. Please try again.` };
  }

  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/organizations", "layout");
  return { success: true };
}
