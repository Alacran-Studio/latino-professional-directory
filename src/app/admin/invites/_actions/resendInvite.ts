"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { fetchInviteById, refreshInviteExpiry } from "@/lib/admin/inviteOperations";
import { sendEmail } from "@/lib/email/resend";
import { orgAdminInviteEmail } from "@/lib/email/templates/orgAdminInvite";
import { APP_URL } from "@/lib/constants";

export async function resendInvite(formData: FormData) {
  await requireRole("system_admin");

  const inviteId = Number(formData.get("invite_id"));
  if (!inviteId) {
    return { error: "Invalid invite." };
  }

  const invite = await fetchInviteById(inviteId);
  if (!invite) {
    return { error: "Invite not found." };
  }
  if (invite.status !== "pending") {
    return { error: "Only pending invites can be resent." };
  }
  if (new Date(invite.expires_at) < new Date()) {
    return { error: "This invite has expired. Revoke it and create a new one." };
  }

  await refreshInviteExpiry(invite.id);

  const inviteUrl = `${APP_URL}/invite/accept?token=${invite.token}`;
  const { subject, html } = orgAdminInviteEmail({
    firstName: invite.first_name,
    orgName: invite.organization_name,
    inviteUrl,
  });

  await sendEmail({ to: invite.email, subject, html });

  return { success: true };
}
