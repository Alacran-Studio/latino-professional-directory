"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { updateOrg, userOwnsOrg } from "@/lib/admin/dbOperations";
import type { UserRole } from "@/types/admin";
import { revalidatePath } from "next/cache";

export async function updateBasicInfo(orgId: number, formData: FormData) {
  const user = await requireAuth();
  if ((user.role as UserRole) === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) return { error: "Permission denied." };
  }

  const name = (formData.get("name") as string)?.trim();
  const website_url = (formData.get("website_url") as string)?.trim();

  if (!name || !website_url) {
    return { error: "Name and website URL are required." };
  }

  try {
    await updateOrg(orgId, {
      name,
      website_url,
      short_description: (formData.get("short_description") as string) || null,
      description: (formData.get("description") as string) || null,
      video_url: (formData.get("video_url") as string) || null,
    });
  } catch {
    return { error: "Failed to save. Please try again." };
  }

  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/organizations", "layout");
  return { success: true };
}
