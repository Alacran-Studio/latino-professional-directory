"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { updateOrg, updateOrgGalleryPhotos, userOwnsOrg } from "@/lib/admin/dbOperations";
import type { UserRole } from "@/types/admin";
import { revalidatePath } from "next/cache";

async function checkAuth(orgId: number) {
  const user = await requireAuth();
  if ((user.role as UserRole) === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) return { error: "Permission denied." } as const;
  }
  return null;
}

function revalidateOrg(orgId: number) {
  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/organizations", "layout");
}

export async function updateLogoAction(orgId: number, url: string) {
  const authError = await checkAuth(orgId);
  if (authError) return authError;

  try {
    await updateOrg(orgId, { logo_url: url });
  } catch {
    return { error: "Failed to save logo." };
  }

  revalidateOrg(orgId);
  return { success: true };
}

export async function updateBannerAction(orgId: number, url: string, position: string) {
  const authError = await checkAuth(orgId);
  if (authError) return authError;

  try {
    await updateOrg(orgId, { photo_url: url, banner_position: position });
  } catch {
    return { error: "Failed to save banner." };
  }

  revalidateOrg(orgId);
  return { success: true };
}

export async function updateBannerPositionAction(orgId: number, position: string) {
  const authError = await checkAuth(orgId);
  if (authError) return authError;

  try {
    await updateOrg(orgId, { banner_position: position });
  } catch {
    return { error: "Failed to save banner position." };
  }

  revalidateOrg(orgId);
  return { success: true };
}

export async function updateGalleryAction(orgId: number, urls: string[]) {
  const authError = await checkAuth(orgId);
  if (authError) return authError;

  try {
    await updateOrgGalleryPhotos(orgId, urls);
  } catch {
    return { error: "Failed to save gallery." };
  }

  revalidateOrg(orgId);
  return { success: true };
}
