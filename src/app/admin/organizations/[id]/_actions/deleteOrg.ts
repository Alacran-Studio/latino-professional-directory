"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { deleteOrg } from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteOrgAction(orgId: number) {
  await requireRole("system_admin");
  await deleteOrg(orgId);
  revalidatePath("/admin/organizations");
  revalidatePath("/");
  revalidatePath("/directory");
  redirect("/admin/organizations");
}
