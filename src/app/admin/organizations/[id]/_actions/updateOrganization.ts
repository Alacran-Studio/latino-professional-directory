"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { updateOrg, userOwnsOrg } from "@/lib/admin/dbOperations";
import type { UserRole } from "@/types/admin";
import { revalidatePath } from "next/cache";

export async function updateOrganization(orgId: number, formData: FormData) {
  const user = await requireAuth();
  const role = user.role as UserRole;

  // org_admin can only edit their own orgs
  if (role === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) {
      return { error: "You do not have permission to edit this organization." };
    }
  }

  const name = formData.get("name") as string;
  const website_url = formData.get("website_url") as string;

  if (!name || !website_url) {
    return { error: "Name and website URL are required." };
  }

  try {
    await updateOrg(orgId, {
      name,
      website_url,
      short_description: (formData.get("short_description") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
      logo_url: (formData.get("logo_url") as string) || undefined,
      photo_url: (formData.get("photo_url") as string) || undefined,
      video_url: (formData.get("video_url") as string) || undefined,
    });
  } catch {
    return { error: "Failed to update organization. Please try again." };
  }

  revalidatePath("/admin/organizations");
  revalidatePath(`/admin/organizations/${orgId}`);
  return { success: true };
}
