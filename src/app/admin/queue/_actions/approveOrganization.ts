"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { updateOrgStatus, fetchOrgById } from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzleClient";
import {
  UserOrganizationsTable,
  UsersTable,
} from "../../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/email/resend";
import { orgApprovedEmail } from "@/lib/email/templates/orgApproved";

export async function approveOrganization(orgId: number) {
  await requireRole("system_admin");

  const org = await fetchOrgById(orgId);
  if (!org) return { error: "Organization not found." };

  try {
    await updateOrgStatus(orgId, "approved");
  } catch {
    return { error: "Failed to approve organization." };
  }

  // Send approval email to org owner (non-blocking)
  const links = await db
    .select({ user_id: UserOrganizationsTable.user_id })
    .from(UserOrganizationsTable)
    .where(eq(UserOrganizationsTable.organization_id, orgId));

  if (links.length > 0) {
    const users = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, links[0].user_id));

    if (users.length > 0) {
      const owner = users[0];
      const { subject, html } = orgApprovedEmail({
        orgName: org.name,
        firstName: owner.first_name,
      });
      sendEmail({ to: owner.email, subject, html });
    }
  }

  revalidatePath("/admin/queue");
  revalidatePath("/admin");
  revalidatePath("/admin/organizations");
  return { success: true };
}
