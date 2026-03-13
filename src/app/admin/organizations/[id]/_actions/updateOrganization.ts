"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import {
  updateOrg,
  updateOrgIndustries,
  updateOrgServices,
  updateOrgCities,
  updateOrgCommunities,
  updateOrgGalleryPhotos,
  userOwnsOrg,
} from "@/lib/admin/dbOperations";
import type { UserRole } from "@/types/admin";
import { revalidatePath } from "next/cache";

function parseIds(formData: FormData, key: string): number[] {
  const raw = formData.getAll(key) as string[];
  return raw.map(Number).filter((n) => !isNaN(n) && n > 0);
}

function parseStrings(formData: FormData, key: string): string[] {
  return (formData.getAll(key) as string[]).filter(Boolean);
}

export async function updateOrganization(orgId: number, formData: FormData) {
  const user = await requireAuth();
  const role = user.role as UserRole;

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
    await Promise.all([
      updateOrg(orgId, {
        name,
        website_url,
        short_description: (formData.get("short_description") as string) || undefined,
        description: (formData.get("description") as string) || undefined,
        logo_url: (formData.get("logo_url") as string) || undefined,
        photo_url: (formData.get("photo_url") as string) || undefined,
        banner_position: (formData.get("banner_position") as string) || undefined,
        video_url: (formData.get("video_url") as string) || undefined,
        linkedin_url: (formData.get("linkedin_url") as string) || undefined,
        instagram_url: (formData.get("instagram_url") as string) || undefined,
        facebook_url: (formData.get("facebook_url") as string) || undefined,
        x_url: (formData.get("x_url") as string) || undefined,
      }),
      updateOrgIndustries(orgId, parseIds(formData, "industry_ids")),
      updateOrgServices(orgId, parseIds(formData, "service_ids")),
      updateOrgCities(orgId, parseIds(formData, "city_ids")),
      updateOrgCommunities(orgId, parseIds(formData, "community_ids")),
      updateOrgGalleryPhotos(orgId, parseStrings(formData, "gallery_photo_urls")),
    ]);
  } catch {
    return { error: "Failed to update organization. Please try again." };
  }

  revalidatePath("/admin/organizations");
  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath(`/organizations/${orgId}`);
  return { success: true };
}
