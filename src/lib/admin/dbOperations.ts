import { db } from "@/lib/drizzleClient";
import {
  OrganizationsTable,
  UserOrganizationsTable,
  FeaturedOrgsTable,
} from "../../../drizzle/schema";
import { eq, inArray, sql } from "drizzle-orm";
import type { AdminOrg, OrgStatus } from "@/types/admin";
import { generateSlug } from "@/lib/slugify";

export interface FeaturedOrg {
  id: number;
  org_id: number;
  display_order: number;
  name: string;
}

export async function fetchAllOrgs(): Promise<AdminOrg[]> {
  const rows = await db
    .select()
    .from(OrganizationsTable)
    .orderBy(OrganizationsTable.name);
  return rows as AdminOrg[];
}

export async function fetchUserOrgs(userId: number): Promise<AdminOrg[]> {
  const links = await db
    .select({ organization_id: UserOrganizationsTable.organization_id })
    .from(UserOrganizationsTable)
    .where(eq(UserOrganizationsTable.user_id, userId));

  const orgIds = links.map((l) => l.organization_id);
  if (orgIds.length === 0) return [];

  const rows = await db
    .select()
    .from(OrganizationsTable)
    .where(inArray(OrganizationsTable.id, orgIds))
    .orderBy(OrganizationsTable.name);

  return rows as AdminOrg[];
}

export async function fetchOrgById(id: number): Promise<AdminOrg | null> {
  const rows = await db
    .select()
    .from(OrganizationsTable)
    .where(eq(OrganizationsTable.id, id));

  if (rows.length === 0) return null;
  return rows[0] as AdminOrg;
}

export async function updateOrg(
  id: number,
  data: {
    name?: string;
    description?: string;
    short_description?: string;
    website_url?: string;
    logo_url?: string;
    photo_url?: string;
    video_url?: string;
  }
) {
  const updateData: Record<string, unknown> = {
    ...data,
    updated_at: new Date().toISOString(),
  };
  if (data.name) {
    updateData.slug = generateSlug(data.name);
  }
  await db
    .update(OrganizationsTable)
    .set(updateData)
    .where(eq(OrganizationsTable.id, id));
}

export async function updateOrgStatus(id: number, status: OrgStatus) {
  await db
    .update(OrganizationsTable)
    .set({ status, updated_at: new Date().toISOString() })
    .where(eq(OrganizationsTable.id, id));
}

export async function fetchPendingOrgs(): Promise<AdminOrg[]> {
  const rows = await db
    .select()
    .from(OrganizationsTable)
    .where(eq(OrganizationsTable.status, "pending"))
    .orderBy(OrganizationsTable.created_at);
  return rows as AdminOrg[];
}

export async function userOwnsOrg(
  userId: number,
  orgId: number
): Promise<boolean> {
  const rows = await db
    .select()
    .from(UserOrganizationsTable)
    .where(eq(UserOrganizationsTable.user_id, userId))
    .limit(1);

  return rows.some((r) => r.organization_id === orgId);
}

export async function fetchFeaturedOrgs(): Promise<FeaturedOrg[]> {
  const rows = await db
    .select({
      id: FeaturedOrgsTable.id,
      org_id: FeaturedOrgsTable.org_id,
      display_order: FeaturedOrgsTable.display_order,
      name: OrganizationsTable.name,
    })
    .from(FeaturedOrgsTable)
    .innerJoin(OrganizationsTable, eq(FeaturedOrgsTable.org_id, OrganizationsTable.id))
    .orderBy(FeaturedOrgsTable.display_order);
  return rows;
}

export async function addFeaturedOrg(orgId: number, displayOrder: number): Promise<void> {
  await db.insert(FeaturedOrgsTable).values({ org_id: orgId, display_order: displayOrder });
}

export async function removeFeaturedOrg(orgId: number): Promise<void> {
  await db.delete(FeaturedOrgsTable).where(eq(FeaturedOrgsTable.org_id, orgId));
}

export async function updateFeaturedOrgOrder(orgId: number, displayOrder: number): Promise<void> {
  await db
    .update(FeaturedOrgsTable)
    .set({ display_order: displayOrder })
    .where(eq(FeaturedOrgsTable.org_id, orgId));
}
