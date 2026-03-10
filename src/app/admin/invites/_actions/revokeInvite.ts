"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { expireInvite } from "@/lib/admin/inviteOperations";
import { revalidatePath } from "next/cache";

export async function revokeInvite(formData: FormData) {
  await requireRole("system_admin");

  const inviteId = Number(formData.get("invite_id"));
  if (!inviteId) {
    return { error: "Invalid invite." };
  }

  await expireInvite(inviteId);

  revalidatePath("/admin/invites");
  return { success: true };
}
