"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { setOrgActive, setOrgReadyForReview } from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";

export async function toggleOrgActive(orgId: number, isActive: boolean) {
  await requireRole("system_admin");
  await setOrgActive(orgId, isActive);
  // Clear review request once admin takes action
  if (isActive) await setOrgReadyForReview(orgId, false);
  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/admin/organizations");
  revalidatePath("/");
  revalidatePath("/directory");
  return { success: true };
}
