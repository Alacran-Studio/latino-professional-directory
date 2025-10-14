import { db } from "@/lib/drizzleClient";
import {
  IndustriesTable,
  OrganizationIndustries,
  OrganizationsTable,
  CitiesTable,
  OrganizationCities,
} from "../../drizzle/schema";
import { inArray, eq } from "drizzle-orm";
import { DirectoryOrgType, IndustryType, CityType } from "@/app/types";

export async function fetchOrganizations(
  page: number,
  limit: number
): Promise<DirectoryOrgType[]> {
  const offset = (page - 1) * limit;

  try {
    const organizations = await fetchOrganizationsData(offset, limit);

    // Fetch industries
    const orgIndustryMappings = await fetchOrgIndustryMappings(organizations);
    const industryIds = orgIndustryMappings
      .map((mapping) => mapping.industry_id)
      .filter((id): id is number => id !== null);
    const industries = await fetchIndustries(industryIds);

    // Fetch cities
    const orgCityMappings = await fetchOrgCityMappings(organizations);
    const cityIds = orgCityMappings
      .map((mapping) => mapping.city_id)
      .filter((id): id is number => id !== null);
    const cities = await fetchCities(cityIds);

    // Map both industries and cities to organizations
    const organizationsWithData = mapDataToOrganizations(
      organizations,
      orgIndustryMappings,
      industries,
      orgCityMappings,
      cities
    );
    console.log("Organizations:", organizationsWithData);
    return organizationsWithData;
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

    // Fetch industries
    const orgIndustryMappings = await fetchOrgIndustryMappings(organization);
    const industryIds = orgIndustryMappings
      .map((mapping) => mapping.industry_id)
      .filter((id): id is number => id !== null);
    const industries = await fetchIndustries(industryIds);

    // Fetch cities
    const orgCityMappings = await fetchOrgCityMappings(organization);
    const cityIds = orgCityMappings
      .map((mapping) => mapping.city_id)
      .filter((id): id is number => id !== null);
    const cities = await fetchCities(cityIds);

    const organizationWithData = mapDataToOrganizations(
      organization,
      orgIndustryMappings,
      industries,
      orgCityMappings,
      cities
    ).find((o) => o !== undefined);
    return organizationWithData;
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

export async function fetchCities(cityIds?: number[]): Promise<CityType[]> {
  const query = db
    .select({
      id: CitiesTable.id,
      name: CitiesTable.name,
    })
    .from(CitiesTable);

  if (cityIds && cityIds.length > 0) {
    query.where(inArray(CitiesTable.id, cityIds));
  }

  const cities = await query;
  return cities;
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

// Helper to fetch organization city mappings
async function fetchOrgCityMappings(organizations: any[]) {
  const orgIds = organizations.map((org) => org.id);

  const orgCityMappings = await db
    .select({
      organization_id: OrganizationCities.organization_id,
      city_id: OrganizationCities.city_id,
    })
    .from(OrganizationCities)
    .where(inArray(OrganizationCities.organization_id, orgIds));

  return orgCityMappings;
}

// Helper to combine organizations with their industries and cities
function mapDataToOrganizations(
  organizations: any[],
  industryMappings: any[],
  industries: any[],
  cityMappings: any[],
  cities: any[]
) {
  const organizationsWithData = organizations.map((org) => ({
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
    cities: cityMappings
      .filter((mapping) => mapping.organization_id === org.id)
      .map((mapping): CityType | null => {
        const city = cities.find((c) => c.id === mapping.city_id);
        return city || null;
      })
      .filter((city): city is CityType => city !== null),
  }));

  return organizationsWithData;
}
