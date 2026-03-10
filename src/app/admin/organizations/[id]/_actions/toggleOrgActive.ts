"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { setOrgActive } from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";

export async function toggleOrgActive(orgId: number, isActive: boolean) {
  await requireRole("system_admin");
  await setOrgActive(orgId, isActive);
  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/admin/organizations");
  return { success: true };
}
