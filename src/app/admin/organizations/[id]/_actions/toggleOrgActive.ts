"use server";

import { requireRole } from "@/lib/auth/requireAuth";
import { setOrgActive, setOrgReadyForReview, fetchOrgById } from "@/lib/admin/dbOperations";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzleClient";
import { UserOrganizationsTable, UsersTable } from "../../../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/email/resend";
import { orgLiveEmail } from "@/lib/email/templates/orgLive";

export async function toggleOrgActive(orgId: number, isActive: boolean) {
  await requireRole("system_admin");
  await setOrgActive(orgId, isActive);

  if (isActive) {
    // Clear review request
    await setOrgReadyForReview(orgId, false);

    // Send "you're live!" email to org admin
    const org = await fetchOrgById(orgId);
    if (org) {
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
          const { subject, html } = orgLiveEmail({
            orgName: org.name,
            firstName: owner.first_name,
            orgSlug: org.slug,
          });
          sendEmail({ to: owner.email, subject, html });
        }
      }
    }
  }

  revalidatePath(`/admin/organizations/${orgId}`);
  revalidatePath("/admin/organizations");
  revalidatePath("/");
  revalidatePath("/directory");
  return { success: true };
}
