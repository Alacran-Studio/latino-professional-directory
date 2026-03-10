"use server";

import { requireAuth } from "@/lib/auth/requireAuth";
import { setOrgReadyForReview, fetchOrgById, userOwnsOrg } from "@/lib/admin/dbOperations";
import { sendEmail } from "@/lib/email/resend";
import { orgReadyForReviewEmail } from "@/lib/email/templates/orgReadyForReview";
import { revalidatePath } from "next/cache";

export async function submitForReview(orgId: number) {
  const user = await requireAuth();

  // org_admin must own the org; system_admin can act on any
  if (user.role === "org_admin") {
    const owns = await userOwnsOrg(user.id, orgId);
    if (!owns) return { error: "Not authorized." };
  }

  const org = await fetchOrgById(orgId);
  if (!org) return { error: "Organization not found." };
  if (org.status !== "approved") return { error: "Only approved organizations can submit for review." };
  if (org.is_active === "true") return { error: "Organization is already active." };

  await setOrgReadyForReview(orgId, true);

  // Notify system admin
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (adminEmail) {
    const { subject, html } = orgReadyForReviewEmail({ orgName: org.name, orgId });
    sendEmail({ to: adminEmail, subject, html });
  }

  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/admin/organizations");
  return { success: true };
}
