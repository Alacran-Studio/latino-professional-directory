"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import {
  addFeaturedOrg,
  removeFeaturedOrg,
} from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";

export async function addFeaturedOrgAction(formData: FormData) {
  await requireRole("system_admin");

  const orgId = Number(formData.get("orgId"));
  const displayOrder = Number(formData.get("displayOrder"));

  if (!orgId || !displayOrder) return { error: "Invalid input." };

  try {
    await addFeaturedOrg(orgId, displayOrder);
  } catch {
    return { error: "Failed to add featured org." };
  }

  revalidatePath("/admin/featured");
  revalidatePath("/");
}

export async function removeFeaturedOrgAction(formData: FormData) {
  await requireRole("system_admin");

  const orgId = Number(formData.get("orgId"));
  if (!orgId) return { error: "Invalid input." };

  try {
    await removeFeaturedOrg(orgId);
  } catch {
    return { error: "Failed to remove featured org." };
  }

  revalidatePath("/admin/featured");
  revalidatePath("/");
}

export async function swapFeaturedOrgAction(formData: FormData) {
  await requireRole("system_admin");

  const oldOrgId = Number(formData.get("oldOrgId"));
  const newOrgId = Number(formData.get("newOrgId"));
  const displayOrder = Number(formData.get("displayOrder"));

  if (!oldOrgId || !newOrgId || !displayOrder) return { error: "Invalid input." };

  try {
    await removeFeaturedOrg(oldOrgId);
    await addFeaturedOrg(newOrgId, displayOrder);
  } catch {
    return { error: "Failed to swap featured org." };
  }

  revalidatePath("/admin/featured");
  revalidatePath("/");
}
