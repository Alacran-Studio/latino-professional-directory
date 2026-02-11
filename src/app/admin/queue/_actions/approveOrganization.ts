"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { updateOrgStatus } from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";

export async function approveOrganization(orgId: number) {
  await requireRole("system_admin");

  try {
    await updateOrgStatus(orgId, "approved");
  } catch {
    return { error: "Failed to approve organization." };
  }

  revalidatePath("/admin/queue");
  revalidatePath("/admin");
  revalidatePath("/admin/organizations");
  return { success: true };
}
