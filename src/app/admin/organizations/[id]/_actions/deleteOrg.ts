"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { deleteOrg, fetchOrgById } from "@/lib/admin/dbOperations";
import { destroyOrgMedia } from "@/lib/cloudinary/destroyOrgMedia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteOrgAction(orgId: number) {
  await requireRole("system_admin");

  // Fetch media URLs before deleting from DB
  const org = await fetchOrgById(orgId);
  if (org) {
    try {
      await destroyOrgMedia({
        logo_url: org.logo_url,
        photo_url: org.photo_url,
        gallery_urls: (org.gallery_photos ?? []).map((p) => p.url),
      });
    } catch (err) {
      console.error("[deleteOrgAction] Cloudinary cleanup failed:", err);
      // Don't block deletion if Cloudinary cleanup fails
    }
  }

  await deleteOrg(orgId);
  revalidatePath("/admin/organizations");
  revalidatePath("/");
  revalidatePath("/directory");
  redirect("/admin/organizations");
}
