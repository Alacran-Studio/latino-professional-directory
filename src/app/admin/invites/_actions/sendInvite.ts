"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { createInvite, hasPendingInvite } from "@/lib/admin/inviteOperations";
import { fetchOrgById } from "@/lib/admin/dbOperations";
import { sendEmail } from "@/lib/email/resend";
import { orgAdminInviteEmail } from "@/lib/email/templates/orgAdminInvite";
import { APP_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export async function sendInvite(formData: FormData) {
  const currentUser = await requireRole("system_admin");

  const firstName = (formData.get("first_name") as string)?.trim();
  const lastName = (formData.get("last_name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const organizationId = Number(formData.get("organization_id"));

  if (!firstName || !lastName || !email || !organizationId) {
    return { error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const alreadyPending = await hasPendingInvite(email, organizationId);
  if (alreadyPending) {
    return { error: "A pending invite already exists for this email and organization." };
  }

  const org = await fetchOrgById(organizationId);
  if (!org) {
    return { error: "Organization not found." };
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  await createInvite({
    token,
    email,
    first_name: firstName,
    last_name: lastName,
    organization_id: organizationId,
    invited_by: currentUser.id,
    expires_at: expiresAt,
  });

  const inviteUrl = `${APP_URL}/invite/accept?token=${token}`;
  const { subject, html } = orgAdminInviteEmail({ firstName, orgName: org.name, inviteUrl });

  // Fire-and-forget
  sendEmail({ to: email, subject, html });

  revalidatePath("/admin/invites");
  return { success: true };
}
