import { db } from "@/lib/drizzleClient";
import {
  IndustriesTable,
  OrganizationIndustries,
  OrganizationsTable,
} from "../../drizzle/schema";
import { inArray, eq } from "drizzle-orm";
import { DirectoryOrgType, IndustryType } from "@/app/types";

export async function fetchOrganizations(
  page: number,
  limit: number
): Promise<DirectoryOrgType[]> {
  const offset = (page - 1) * limit;

  try {
    const organizations = await fetchOrganizationsData(offset, limit);
    const orgIndustryMappings = await fetchOrgIndustryMappings(organizations);
    const industryIds = orgIndustryMappings
      .map((mapping) => mapping.industry_id)
      .filter((id): id is number => id !== null);
    const industries = await fetchIndustries(industryIds);
    const organizationsWithIndustries = mapIndustriesToOrganizations(
      organizations,
      orgIndustryMappings,
      industries
    );
    console.log("Organizations:", organizationsWithIndustries);
    return organizationsWithIndustries;
  } catch (error) {
    console.error("Error in fetchOrganizations:", error);
    throw error;
  }
}

export async function fetchOrganization(
  organizationId: number
): Promise<DirectoryOrgType> {
  try {
    const organization = await fetchOrganizationData(organizationId);
    const orgIndustryMappings = await fetchOrgIndustryMappings(organization);
    const industryIds = orgIndustryMappings
      .map((mapping) => mapping.industry_id)
      .filter((id): id is number => id !== null);
    const industries = await fetchIndustries(industryIds);
    const organizationWithIndustries = mapIndustriesToOrganizations(
      organization,
      orgIndustryMappings,
      industries
    ).find((o) => o !== undefined);
    return organizationWithIndustries;
  } catch (error) {
    console.error("Error in fetchOrganization:", error);
    throw error;
  }
}

export async function fetchIndustries(
  industryIds?: number[]
): Promise<IndustryType[]> {
  const query = db
    .select({
      id: IndustriesTable.id,
      name: IndustriesTable.name,
    })
    .from(IndustriesTable);

  if (industryIds && industryIds.length > 0) {
    query.where(inArray(IndustriesTable.id, industryIds));
  }

  const industries = await query;
  return industries;
}

// ** HELPER METHODS **

// Helper to fetch organizations based on pagination
async function fetchOrganizationsData(offset: number, limit: number) {
  const organizations = await db
    .select()
    .from(OrganizationsTable)
    .offset(offset)
    .limit(limit);
  return organizations;
}

async function fetchOrganizationData(id: number) {
  return await db
    .select()
    .from(OrganizationsTable)
    .where(eq(OrganizationsTable.id, id));
}

// Helper to fetch organization industry mappings
async function fetchOrgIndustryMappings(organizations: any[]) {
  const orgIds = organizations.map((org) => org.id);

  const orgIndustryMappings = await db
    .select({
      organization_id: OrganizationIndustries.organization_id,
      industry_id: OrganizationIndustries.industry_id,
    })
    .from(OrganizationIndustries)
    .where(inArray(OrganizationIndustries.organization_id, orgIds));

  return orgIndustryMappings;
}

// Helper to combine organizations with their industries
function mapIndustriesToOrganizations(
  organizations: any[],
  industryMappings: any[],
  industries: any[]
) {
  const organizationsWithIndustries = organizations.map((org) => ({
    ...org,
    industries: industryMappings
      .filter((mapping) => mapping.organization_id === org.id)
      .map((mapping): IndustryType | null => {
        const industry = industries.find(
          (ind) => ind.id === mapping.industry_id
        );
        return industry || null;
      })
      .filter((industry): industry is IndustryType => industry !== null),
  }));

  return organizationsWithIndustries;
}
