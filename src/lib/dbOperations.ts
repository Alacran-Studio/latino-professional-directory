import { db } from "@/lib/drizzleClient";
import {
  IndustriesTable,
  OrganizationIndustries,
  OrganizationsTable,
  CitiesTable,
  OrganizationCities,
  EventsTable,
  EventOrganizations,
  EventIndustries,
  FeaturedOrgsTable,
} from "../../drizzle/schema";
import { inArray, eq, and } from "drizzle-orm";
import { DirectoryOrgType, IndustryType, CityType, EventType } from "@/app/types";

// ** ENRICHMENT HELPERS **

async function enrichOrganizations(
  organizations: any[]
): Promise<DirectoryOrgType[]> {
  if (organizations.length === 0) return [];

  const [orgIndustryMappings, orgCityMappings] = await Promise.all([
    fetchOrgIndustryMappings(organizations),
    fetchOrgCityMappings(organizations),
  ]);

  const industryIds = orgIndustryMappings
    .map((mapping) => mapping.industry_id)
    .filter((id): id is number => id !== null);
  const cityIds = orgCityMappings
    .map((mapping) => mapping.city_id)
    .filter((id): id is number => id !== null);

  const [industries, cities] = await Promise.all([
    fetchIndustries(industryIds),
    fetchCities(cityIds),
  ]);

  return mapDataToOrganizations(
    organizations,
    orgIndustryMappings,
    industries,
    orgCityMappings,
    cities
  );
}

async function enrichEvents(events: any[]): Promise<EventType[]> {
  if (events.length === 0) return [];

  const [eventIndustryMappings, eventOrgMappings] = await Promise.all([
    fetchEventIndustryMappings(events),
    fetchEventOrgMappings(events),
  ]);

  const industryIds = eventIndustryMappings
    .map((mapping) => mapping.industry_id)
    .filter((id): id is number => id !== null);
  const cityIds = events
    .map((event) => event.city_id)
    .filter((id): id is number => id !== null);
  const orgIds = eventOrgMappings
    .map((mapping) => mapping.organization_id)
    .filter((id): id is number => id !== null);

  const [industries, cities, organizations] = await Promise.all([
    fetchIndustries(industryIds),
    fetchCities(cityIds),
    fetchOrganizationsById(orgIds),
  ]);

  return mapDataToEvents(
    events,
    cities,
    eventIndustryMappings,
    industries,
    eventOrgMappings,
    organizations
  );
}

// ** ORGANIZATION FETCH FUNCTIONS **

export async function fetchFeaturedOrganizations(): Promise<DirectoryOrgType[]> {
  try {
    const featuredRows = await db
      .select({ org_id: FeaturedOrgsTable.org_id })
      .from(FeaturedOrgsTable)
      .orderBy(FeaturedOrgsTable.display_order);

    const orgIds = featuredRows.map((r) => r.org_id);
    if (orgIds.length === 0) return [];

    const organizations = await db
      .select()
      .from(OrganizationsTable)
      .where(inArray(OrganizationsTable.id, orgIds));

    // Preserve display_order ordering
    const orderedOrgs = orgIds
      .map((id) => organizations.find((o) => o.id === id))
      .filter((o): o is (typeof organizations)[0] => o !== undefined);

    return await enrichOrganizations(orderedOrgs);
  } catch (error) {
    console.error("Error in fetchFeaturedOrganizations:", error);
    throw error;
  }
}

export async function fetchOrganizations(
  page: number,
  limit: number
): Promise<DirectoryOrgType[]> {
  const offset = (page - 1) * limit;

  try {
    const organizations = await fetchOrganizationsData(offset, limit);
    return await enrichOrganizations(organizations);
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
    const enriched = await enrichOrganizations(organization);
    return enriched[0];
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

async function fetchOrganizationsData(offset: number, limit: number) {
  const organizations = await db
    .select()
    .from(OrganizationsTable)
    .where(eq(OrganizationsTable.status, "approved"))
    .offset(offset)
    .limit(limit);
  return organizations;
}

async function fetchOrganizationData(id: number) {
  return await db
    .select()
    .from(OrganizationsTable)
    .where(and(eq(OrganizationsTable.id, id), eq(OrganizationsTable.status, "approved")));
}

async function fetchOrgIndustryMappings(organizations: any[]) {
  const orgIds = organizations.map((org) => org.id);
  if (orgIds.length === 0) return [];

  const orgIndustryMappings = await db
    .select({
      organization_id: OrganizationIndustries.organization_id,
      industry_id: OrganizationIndustries.industry_id,
    })
    .from(OrganizationIndustries)
    .where(inArray(OrganizationIndustries.organization_id, orgIds));

  return orgIndustryMappings;
}

async function fetchOrgCityMappings(organizations: any[]) {
  const orgIds = organizations.map((org) => org.id);
  if (orgIds.length === 0) return [];

  const orgCityMappings = await db
    .select({
      organization_id: OrganizationCities.organization_id,
      city_id: OrganizationCities.city_id,
    })
    .from(OrganizationCities)
    .where(inArray(OrganizationCities.organization_id, orgIds));

  return orgCityMappings;
}

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

// ** EVENT FETCH FUNCTIONS **

export async function fetchEvents(
  page: number,
  limit: number
): Promise<EventType[]> {
  const offset = (page - 1) * limit;

  try {
    const events = await fetchEventsData(offset, limit);
    return await enrichEvents(events);
  } catch (error) {
    console.error("Error in fetchEvents:", error);
    throw error;
  }
}

export async function fetchEvent(eventId: number): Promise<EventType> {
  try {
    const event = await fetchEventData(eventId);
    const enriched = await enrichEvents(event);
    return enriched[0];
  } catch (error) {
    console.error("Error in fetchEvent:", error);
    throw error;
  }
}

export async function fetchEventsForOrganization(
  organizationId: number
): Promise<EventType[]> {
  try {
    const eventOrgMappings = await db
      .select({
        event_id: EventOrganizations.event_id,
      })
      .from(EventOrganizations)
      .where(eq(EventOrganizations.organization_id, organizationId));

    const eventIds = eventOrgMappings
      .map((mapping) => mapping.event_id)
      .filter((id): id is number => id !== null);

    if (eventIds.length === 0) return [];

    const events = await db
      .select()
      .from(EventsTable)
      .where(inArray(EventsTable.id, eventIds));

    return await enrichEvents(events);
  } catch (error) {
    console.error("Error in fetchEventsForOrganization:", error);
    throw error;
  }
}

// ** EVENT HELPER METHODS **

async function fetchEventsData(offset: number, limit: number) {
  const events = await db
    .select()
    .from(EventsTable)
    .offset(offset)
    .limit(limit);
  return events;
}

async function fetchEventData(id: number) {
  return await db.select().from(EventsTable).where(eq(EventsTable.id, id));
}

async function fetchEventIndustryMappings(events: any[]) {
  const eventIds = events.map((event) => event.id);
  if (eventIds.length === 0) return [];

  const eventIndustryMappings = await db
    .select({
      event_id: EventIndustries.event_id,
      industry_id: EventIndustries.industry_id,
    })
    .from(EventIndustries)
    .where(inArray(EventIndustries.event_id, eventIds));

  return eventIndustryMappings;
}

async function fetchEventOrgMappings(events: any[]) {
  const eventIds = events.map((event) => event.id);
  if (eventIds.length === 0) return [];

  const eventOrgMappings = await db
    .select({
      event_id: EventOrganizations.event_id,
      organization_id: EventOrganizations.organization_id,
    })
    .from(EventOrganizations)
    .where(inArray(EventOrganizations.event_id, eventIds));

  return eventOrgMappings;
}

async function fetchOrganizationsById(
  orgIds: number[]
): Promise<DirectoryOrgType[]> {
  if (orgIds.length === 0) return [];

  const organizations = await db
    .select()
    .from(OrganizationsTable)
    .where(inArray(OrganizationsTable.id, orgIds));

  return await enrichOrganizations(organizations);
}

function mapDataToEvents(
  events: any[],
  cityData: any[],
  industryMappings: any[],
  industries: any[],
  orgMappings: any[],
  organizations: DirectoryOrgType[]
): EventType[] {
  return events.map((event) => {
    const city = cityData.find((c) => c.id === event.city_id);

    const eventIndustries = industryMappings
      .filter((m) => m.event_id === event.id)
      .map((m) => industries.find((i) => i.id === m.industry_id))
      .filter((i) => i !== undefined);

    const eventOrgs = orgMappings
      .filter((m) => m.event_id === event.id)
      .map((m) => organizations.find((o) => o.id === m.organization_id))
      .filter((org) => org !== undefined);

    return {
      ...event,
      city,
      industries: eventIndustries,
      organizations: eventOrgs,
    };
  });
}
