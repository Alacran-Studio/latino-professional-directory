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
} from "../../drizzle/schema";
import { inArray, eq } from "drizzle-orm";
import { DirectoryOrgType, IndustryType, CityType, EventType } from "@/app/types";

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

// ** EVENT FETCH FUNCTIONS **

export async function fetchEvents(
  page: number,
  limit: number
): Promise<EventType[]> {
  const offset = (page - 1) * limit;

  try {
    const events = await fetchEventsData(offset, limit);

    // Fetch event-industry mappings
    const eventIndustryMappings = await fetchEventIndustryMappings(events);
    const industryIds = eventIndustryMappings
      .map((mapping) => mapping.industry_id)
      .filter((id): id is number => id !== null);
    const industries = await fetchIndustries(industryIds);

    // Fetch cities for events
    const cityIds = events
      .map((event) => event.city_id)
      .filter((id): id is number => id !== null);
    const cities = await fetchCities(cityIds);

    // Fetch event-organization mappings
    const eventOrgMappings = await fetchEventOrgMappings(events);
    const orgIds = eventOrgMappings
      .map((mapping) => mapping.organization_id)
      .filter((id): id is number => id !== null);
    const organizations = await fetchOrganizationsById(orgIds);

    // Map all data to events
    const eventsWithData = mapDataToEvents(
      events,
      cities,
      eventIndustryMappings,
      industries,
      eventOrgMappings,
      organizations
    );

    return eventsWithData;
  } catch (error) {
    console.error("Error in fetchEvents:", error);
    throw error;
  }
}

export async function fetchEvent(eventId: number): Promise<EventType> {
  try {
    const event = await fetchEventData(eventId);

    // Fetch event-industry mappings
    const eventIndustryMappings = await fetchEventIndustryMappings(event);
    const industryIds = eventIndustryMappings
      .map((mapping) => mapping.industry_id)
      .filter((id): id is number => id !== null);
    const industries = await fetchIndustries(industryIds);

    // Fetch city for event
    const cityIds = event
      .map((e) => e.city_id)
      .filter((id): id is number => id !== null);
    const cities = await fetchCities(cityIds);

    // Fetch event-organization mappings
    const eventOrgMappings = await fetchEventOrgMappings(event);
    const orgIds = eventOrgMappings
      .map((mapping) => mapping.organization_id)
      .filter((id): id is number => id !== null);
    const organizations = await fetchOrganizationsById(orgIds);

    // Map all data to event
    const eventWithData = mapDataToEvents(
      event,
      cities,
      eventIndustryMappings,
      industries,
      eventOrgMappings,
      organizations
    ).find((e) => e !== undefined);

    return eventWithData;
  } catch (error) {
    console.error("Error in fetchEvent:", error);
    throw error;
  }
}

export async function fetchEventsForOrganization(
  organizationId: number
): Promise<EventType[]> {
  try {
    // Get event IDs for this organization
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

    // Fetch events
    const events = await db
      .select()
      .from(EventsTable)
      .where(inArray(EventsTable.id, eventIds));

    // Fetch event-industry mappings
    const eventIndustryMappings = await fetchEventIndustryMappings(events);
    const industryIds = eventIndustryMappings
      .map((mapping) => mapping.industry_id)
      .filter((id): id is number => id !== null);
    const industries = await fetchIndustries(industryIds);

    // Fetch cities
    const cityIds = events
      .map((event) => event.city_id)
      .filter((id): id is number => id !== null);
    const cities = await fetchCities(cityIds);

    // Fetch all event-org mappings for these events
    const allEventOrgMappings = await fetchEventOrgMappings(events);
    const allOrgIds = allEventOrgMappings
      .map((mapping) => mapping.organization_id)
      .filter((id): id is number => id !== null);
    const organizations = await fetchOrganizationsById(allOrgIds);

    // Map all data to events
    const eventsWithData = mapDataToEvents(
      events,
      cities,
      eventIndustryMappings,
      industries,
      allEventOrgMappings,
      organizations
    );

    return eventsWithData;
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

  // Map data to organizations
  const organizationsWithData = mapDataToOrganizations(
    organizations,
    orgIndustryMappings,
    industries,
    orgCityMappings,
    cities
  );

  return organizationsWithData;
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
    // Get city (direct FK)
    const city = cityData.find((c) => c.id === event.city_id);

    // Get industries (direct many-to-many)
    const eventIndustries = industryMappings
      .filter((m) => m.event_id === event.id)
      .map((m) => industries.find((i) => i.id === m.industry_id))
      .filter((i) => i !== undefined);

    // Get hosting organizations (many-to-many, optional)
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
