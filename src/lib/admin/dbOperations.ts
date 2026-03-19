import { db } from "@/lib/drizzleClient";
import {
  OrganizationsTable,
  UserOrganizationsTable,
  UsersTable,
  FeaturedOrgsTable,
  OrganizationIndustries,
  OrganizationServices,
  OrganizationCities,
  OrganizationCommunities,
  OrganizationPhotosTable,
  OrganizationContacts,
  InvitesTable,
  IndustriesTable,
  KeyServicesTable,
  CitiesTable,
  CommunitiesTable,
} from "@drizzle/schema";
import { eq, inArray, sql } from "drizzle-orm";
import type { AdminOrg, AdminOrgPhoto, AdminOrgRelated, OrgAdmin, OrgStatus } from "@/types/admin";
import { generateSlug } from "@/lib/slugify";

export interface FeaturedOrg {
  id: number;
  org_id: number;
  display_order: number;
  name: string;
}

export async function fetchOrgAdmins(): Promise<OrgAdmin[]> {
  const rows = await db
    .select({
      user_id: UsersTable.id,
      first_name: UsersTable.first_name,
      last_name: UsersTable.last_name,
      email: UsersTable.email,
      organization_id: OrganizationsTable.id,
      organization_name: OrganizationsTable.name,
      created_at: UserOrganizationsTable.created_at,
    })
    .from(UserOrganizationsTable)
    .innerJoin(UsersTable, eq(UserOrganizationsTable.user_id, UsersTable.id))
    .innerJoin(OrganizationsTable, eq(UserOrganizationsTable.organization_id, OrganizationsTable.id))
    .where(eq(OrganizationsTable.is_active, "true"))
    .orderBy(OrganizationsTable.name, UsersTable.last_name);
  return rows;
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
  const org = rows[0] as AdminOrg;

  const [industries, services, cities, affinities, gallery_photos] = await Promise.all([
    db
      .select({ id: IndustriesTable.id, name: IndustriesTable.name })
      .from(OrganizationIndustries)
      .innerJoin(IndustriesTable, eq(OrganizationIndustries.industry_id, IndustriesTable.id))
      .where(eq(OrganizationIndustries.organization_id, id)),
    db
      .select({ id: KeyServicesTable.id, name: KeyServicesTable.name })
      .from(OrganizationServices)
      .innerJoin(KeyServicesTable, eq(OrganizationServices.service_id, KeyServicesTable.id))
      .where(eq(OrganizationServices.organization_id, id)),
    db
      .select({ id: CitiesTable.id, name: CitiesTable.name })
      .from(OrganizationCities)
      .innerJoin(CitiesTable, eq(OrganizationCities.city_id, CitiesTable.id))
      .where(eq(OrganizationCities.organization_id, id)),
    db
      .select({ id: CommunitiesTable.id, name: CommunitiesTable.name })
      .from(OrganizationCommunities)
      .innerJoin(CommunitiesTable, eq(OrganizationCommunities.community_id, CommunitiesTable.id))
      .where(eq(OrganizationCommunities.organization_id, id)),
    db
      .select({ id: OrganizationPhotosTable.id, url: OrganizationPhotosTable.url, display_order: OrganizationPhotosTable.display_order })
      .from(OrganizationPhotosTable)
      .where(eq(OrganizationPhotosTable.organization_id, id))
      .orderBy(OrganizationPhotosTable.display_order),
  ]);

  return {
    ...org,
    industries: industries as AdminOrgRelated[],
    services: services as AdminOrgRelated[],
    cities: cities as AdminOrgRelated[],
    communities: affinities as AdminOrgRelated[],
    gallery_photos: gallery_photos as AdminOrgPhoto[],
  };
}

export async function updateOrg(
  id: number,
  data: {
    name?: string;
    description?: string | null;
    short_description?: string | null;
    website_url?: string;
    logo_url?: string | null;
    photo_url?: string | null;
    banner_position?: string | null;
    video_url?: string | null;
    linkedin_url?: string | null;
    instagram_url?: string | null;
    facebook_url?: string | null;
    x_url?: string | null;
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

export async function updateOrgIndustries(orgId: number, industryIds: number[]) {
  await db.delete(OrganizationIndustries).where(eq(OrganizationIndustries.organization_id, orgId));
  if (industryIds.length > 0) {
    await db.insert(OrganizationIndustries).values(
      industryIds.map((industry_id) => ({ organization_id: orgId, industry_id }))
    );
  }
}

export async function updateOrgServices(orgId: number, serviceIds: number[]) {
  await db.delete(OrganizationServices).where(eq(OrganizationServices.organization_id, orgId));
  if (serviceIds.length > 0) {
    await db.insert(OrganizationServices).values(
      serviceIds.map((service_id) => ({ organization_id: orgId, service_id }))
    );
  }
}

export async function updateOrgCities(orgId: number, cityIds: number[]) {
  await db.delete(OrganizationCities).where(eq(OrganizationCities.organization_id, orgId));
  if (cityIds.length > 0) {
    await db.insert(OrganizationCities).values(
      cityIds.map((city_id) => ({ organization_id: orgId, city_id }))
    );
  }
}

export async function updateOrgCommunities(orgId: number, communityIds: number[]) {
  await db.delete(OrganizationCommunities).where(eq(OrganizationCommunities.organization_id, orgId));
  if (communityIds.length > 0) {
    await db.insert(OrganizationCommunities).values(
      communityIds.map((community_id) => ({ organization_id: orgId, community_id }))
    );
  }
}

export async function updateOrgGalleryPhotos(orgId: number, urls: string[]) {
  await db.delete(OrganizationPhotosTable).where(eq(OrganizationPhotosTable.organization_id, orgId));
  if (urls.length > 0) {
    await db.insert(OrganizationPhotosTable).values(
      urls.map((url, i) => ({ organization_id: orgId, url, display_order: i }))
    );
  }
}

export async function fetchAllIndustries(): Promise<AdminOrgRelated[]> {
  return db.select({ id: IndustriesTable.id, name: IndustriesTable.name }).from(IndustriesTable).orderBy(IndustriesTable.name);
}

export async function fetchAllServices(): Promise<AdminOrgRelated[]> {
  return db.select({ id: KeyServicesTable.id, name: KeyServicesTable.name }).from(KeyServicesTable).orderBy(KeyServicesTable.name);
}

export async function fetchAllCities(): Promise<AdminOrgRelated[]> {
  return db.select({ id: CitiesTable.id, name: CitiesTable.name }).from(CitiesTable).orderBy(CitiesTable.name);
}

export async function fetchAllCommunities(): Promise<AdminOrgRelated[]> {
  return db.select({ id: CommunitiesTable.id, name: CommunitiesTable.name }).from(CommunitiesTable).orderBy(CommunitiesTable.name);
}

export async function updateOrgStatus(id: number, status: OrgStatus) {
  await db
    .update(OrganizationsTable)
    .set({ status, updated_at: new Date().toISOString() })
    .where(eq(OrganizationsTable.id, id));
}

export async function setOrgReadyForReview(id: number, ready: boolean) {
  await db
    .update(OrganizationsTable)
    .set({ ready_for_review: ready ? "true" : "false", updated_at: new Date().toISOString() })
    .where(eq(OrganizationsTable.id, id));
}

export async function setOrgActive(id: number, isActive: boolean) {
  await db
    .update(OrganizationsTable)
    .set({ is_active: isActive ? "true" : "false", updated_at: new Date().toISOString() })
    .where(eq(OrganizationsTable.id, id));
}

export async function deleteOrg(id: number): Promise<void> {
  await db.delete(InvitesTable).where(eq(InvitesTable.organization_id, id));
  await db.delete(UserOrganizationsTable).where(eq(UserOrganizationsTable.organization_id, id));
  await db.delete(OrganizationPhotosTable).where(eq(OrganizationPhotosTable.organization_id, id));
  await db.delete(FeaturedOrgsTable).where(eq(FeaturedOrgsTable.org_id, id));
  await db.delete(OrganizationIndustries).where(eq(OrganizationIndustries.organization_id, id));
  await db.delete(OrganizationServices).where(eq(OrganizationServices.organization_id, id));
  await db.delete(OrganizationCities).where(eq(OrganizationCities.organization_id, id));
  await db.delete(OrganizationCommunities).where(eq(OrganizationCommunities.organization_id, id));
  await db.delete(OrganizationContacts).where(eq(OrganizationContacts.organization_id, id));
  await db.delete(OrganizationsTable).where(eq(OrganizationsTable.id, id));
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
