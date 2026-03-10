import { db } from "@/lib/drizzleClient";
import { InvitesTable, OrganizationsTable } from "../../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import type { AdminInvite, InviteStatus } from "@/types/admin";

export async function createInvite(data: {
  token: string;
  email: string;
  first_name: string;
  last_name: string;
  organization_id: number;
  invited_by: number;
  expires_at: string;
}): Promise<void> {
  await db.insert(InvitesTable).values({
    ...data,
    status: "pending",
    created_at: new Date().toISOString(),
  });
}

export async function fetchInviteByToken(token: string): Promise<AdminInvite | null> {
  const rows = await db
    .select({
      id: InvitesTable.id,
      token: InvitesTable.token,
      email: InvitesTable.email,
      first_name: InvitesTable.first_name,
      last_name: InvitesTable.last_name,
      organization_id: InvitesTable.organization_id,
      organization_name: OrganizationsTable.name,
      invited_by: InvitesTable.invited_by,
      status: InvitesTable.status,
      expires_at: InvitesTable.expires_at,
      accepted_at: InvitesTable.accepted_at,
      created_at: InvitesTable.created_at,
    })
    .from(InvitesTable)
    .innerJoin(OrganizationsTable, eq(InvitesTable.organization_id, OrganizationsTable.id))
    .where(eq(InvitesTable.token, token))
    .limit(1);

  if (rows.length === 0) return null;
  return rows[0] as AdminInvite;
}

export async function fetchAllInvites(): Promise<AdminInvite[]> {
  const rows = await db
    .select({
      id: InvitesTable.id,
      token: InvitesTable.token,
      email: InvitesTable.email,
      first_name: InvitesTable.first_name,
      last_name: InvitesTable.last_name,
      organization_id: InvitesTable.organization_id,
      organization_name: OrganizationsTable.name,
      invited_by: InvitesTable.invited_by,
      status: InvitesTable.status,
      expires_at: InvitesTable.expires_at,
      accepted_at: InvitesTable.accepted_at,
      created_at: InvitesTable.created_at,
    })
    .from(InvitesTable)
    .innerJoin(OrganizationsTable, eq(InvitesTable.organization_id, OrganizationsTable.id))
    .orderBy(InvitesTable.created_at);

  return rows as AdminInvite[];
}

export async function markInviteAccepted(token: string): Promise<void> {
  await db
    .update(InvitesTable)
    .set({ status: "accepted", accepted_at: new Date().toISOString() })
    .where(eq(InvitesTable.token, token));
}

export async function expireInvite(id: number): Promise<void> {
  await db
    .update(InvitesTable)
    .set({ status: "expired" })
    .where(eq(InvitesTable.id, id));
}

export async function hasPendingInvite(email: string, organizationId: number): Promise<boolean> {
  const rows = await db
    .select({ id: InvitesTable.id })
    .from(InvitesTable)
    .where(
      and(
        eq(InvitesTable.email, email),
        eq(InvitesTable.organization_id, organizationId),
        eq(InvitesTable.status, "pending")
      )
    )
    .limit(1);

  return rows.length > 0;
}
