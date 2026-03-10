"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { updateOrg, userOwnsOrg } from "@/lib/admin/dbOperations";
import type { UserRole } from "@/types/admin";
import { revalidatePath } from "next/cache";

export async function updateSocialLinks(orgId: number, formData: FormData) {
  const user = await requireAuth();
  if ((user.role as UserRole) === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) return { error: "Permission denied." };
  }

  try {
    await updateOrg(orgId, {
      linkedin_url: (formData.get("linkedin_url") as string) || null,
      instagram_url: (formData.get("instagram_url") as string) || null,
      facebook_url: (formData.get("facebook_url") as string) || null,
      x_url: (formData.get("x_url") as string) || null,
    });
  } catch {
    return { error: "Failed to save social links. Please try again." };
  }

  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/organizations", "layout");
  return { success: true };
}
