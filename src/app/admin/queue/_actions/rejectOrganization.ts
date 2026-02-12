"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { updateOrgStatus } from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";

export async function rejectOrganization(orgId: number) {
  await requireRole("system_admin");

  try {
    await updateOrgStatus(orgId, "rejected");
  } catch {
    return { error: "Failed to reject organization." };
  }

  revalidatePath("/admin/queue");
  revalidatePath("/admin");
  revalidatePath("/admin/organizations");
  return { success: true };
}
