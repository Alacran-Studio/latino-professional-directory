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
  KeyServicesTable,
  OrganizationServices,
  AffinitiesTable,
  OrganizationAffinities,
  OrganizationPhotosTable,
} from "../../drizzle/schema";
import { inArray, eq, and } from "drizzle-orm";
import { DirectoryOrgType, IndustryType, CityType, EventType, ServiceType, AffinityType, OrgPhotoType } from "@/app/types";

// ** ENRICHMENT HELPERS **

async function enrichOrganizations(
  organizations: any[]
): Promise<DirectoryOrgType[]> {
  if (organizations.length === 0) return [];

  const orgIds = organizations.map((o) => o.id);

  const [orgIndustryMappings, orgCityMappings, orgServiceMappings, orgAffinityMappings, orgPhotos] = await Promise.all([
    fetchOrgIndustryMappings(organizations),
    fetchOrgCityMappings(organizations),
    fetchOrgServiceMappings(organizations),
    db
      .select({ organization_id: OrganizationAffinities.organization_id, affinity_id: OrganizationAffinities.affinity_id })
      .from(OrganizationAffinities)
      .where(inArray(OrganizationAffinities.organization_id, orgIds)),
    db
      .select({ organization_id: OrganizationPhotosTable.organization_id, id: OrganizationPhotosTable.id, url: OrganizationPhotosTable.url, display_order: OrganizationPhotosTable.display_order })
      .from(OrganizationPhotosTable)
      .where(inArray(OrganizationPhotosTable.organization_id, orgIds))
      .orderBy(OrganizationPhotosTable.display_order),
  ]);

  const industryIds = orgIndustryMappings.map((m) => m.industry_id).filter((id): id is number => id !== null);
  const cityIds = orgCityMappings.map((m) => m.city_id).filter((id): id is number => id !== null);
  const serviceIds = orgServiceMappings.map((m) => m.service_id).filter((id): id is number => id !== null);
  const affinityIds = orgAffinityMappings.map((m) => m.affinity_id).filter((id): id is number => id !== null);

  const [industries, cities, services, affinities] = await Promise.all([
    fetchIndustries(industryIds),
    fetchCities(cityIds),
    fetchServices(serviceIds),
    affinityIds.length > 0
      ? db.select({ id: AffinitiesTable.id, name: AffinitiesTable.name }).from(AffinitiesTable).where(inArray(AffinitiesTable.id, affinityIds))
      : Promise.resolve([] as AffinityType[]),
  ]);

  return mapDataToOrganizations(
    organizations,
    orgIndustryMappings,
    industries,
    orgCityMappings,
    cities,
    orgServiceMappings,
    services,
    orgAffinityMappings,
    affinities,
    orgPhotos
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

export async function fetchServices(
  serviceIds?: number[]
): Promise<ServiceType[]> {
  const query = db
    .select({
      id: KeyServicesTable.id,
      name: KeyServicesTable.name,
    })
    .from(KeyServicesTable);

  if (serviceIds && serviceIds.length > 0) {
    query.where(inArray(KeyServicesTable.id, serviceIds));
  }

  return await query;
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

async function fetchOrgServiceMappings(organizations: any[]) {
  const orgIds = organizations.map((org) => org.id);
  if (orgIds.length === 0) return [];

  const orgServiceMappings = await db
    .select({
      organization_id: OrganizationServices.organization_id,
      service_id: OrganizationServices.service_id,
    })
    .from(OrganizationServices)
    .where(inArray(OrganizationServices.organization_id, orgIds));

  return orgServiceMappings;
}

function mapDataToOrganizations(
  organizations: any[],
  industryMappings: any[],
  industries: any[],
  cityMappings: any[],
  cities: any[],
  serviceMappings: any[],
  services: any[],
  affinityMappings: any[] = [],
  affinities: any[] = [],
  orgPhotos: any[] = []
) {
  return organizations.map((org) => ({
    ...org,
    industries: industryMappings
      .filter((m) => m.organization_id === org.id)
      .map((m): IndustryType | null => industries.find((i) => i.id === m.industry_id) || null)
      .filter((i): i is IndustryType => i !== null),
    cities: cityMappings
      .filter((m) => m.organization_id === org.id)
      .map((m): CityType | null => cities.find((c) => c.id === m.city_id) || null)
      .filter((c): c is CityType => c !== null),
    services: serviceMappings
      .filter((m) => m.organization_id === org.id)
      .map((m): ServiceType | null => services.find((s) => s.id === m.service_id) || null)
      .filter((s): s is ServiceType => s !== null),
    affinities: affinityMappings
      .filter((m) => m.organization_id === org.id)
      .map((m): AffinityType | null => affinities.find((a) => a.id === m.affinity_id) || null)
      .filter((a): a is AffinityType => a !== null),
    gallery_photos: orgPhotos
      .filter((p) => p.organization_id === org.id)
      .map((p): OrgPhotoType => ({ id: p.id, url: p.url, display_order: p.display_order })),
  }));
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
