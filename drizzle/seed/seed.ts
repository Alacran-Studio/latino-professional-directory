import "../envConfig";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/drizzleClient";
import {
  directoryOrgs,
  orgIndustryMappings,
  directoryAffinities,
  directoryCategories,
  orgAffinityMappings,
  orgCategoryMappings,
  directoryCities,
  orgCityMappings,
  directoryEvents,
  eventOrgMappings,
  eventIndustryMappings,
  directoryServices,
  orgServiceMappings,
} from "./data";
import {
  OrganizationsTable,
  IndustriesTable,
  OrganizationIndustries,
  AffinitiesTable,
  OrganizationAffinities,
  CategoriesTable,
  OrganizationCategories,
  CitiesTable,
  OrganizationCities,
  EventsTable,
  EventOrganizations,
  EventIndustries,
  FeaturedOrgsTable,
  KeyServicesTable,
  OrganizationServices,
} from "../schema";
import { directoryIndustries } from "./data";

async function main() {
  try {
    await seedOrganizations();
    await seedIndustries();
    await seedOrganizationIndustries();
    await seedAffinities();
    await seedOrganizationAffinities();
    await seedCategories();
    await seedOrganizationCategories();
    await seedCities();
    await seedOrganizationCities();
    await seedEvents();
    await seedEventOrganizations();
    await seedEventIndustries();
    await seedFeaturedOrgs();
    await seedServices();
    await seedOrganizationServices();
  } catch (e) {
    console.error(e);
    throw new Error("Seed error...");
  } finally {
    process.exit(0);
  }
}
main();

async function seedOrganizations() {
  console.log("Seed organizations started...");
  for (const org of directoryOrgs) {
    // Check if the organization already exists by name
    const existingOrg = await db
      .select()
      .from(OrganizationsTable)
      .where(eq(OrganizationsTable.name, org.name))
      .limit(1);
    if (existingOrg.length > 0) {
      console.log(`Skipping existing organization: ${org.name}`);
      continue;
    }

    await db.insert(OrganizationsTable).values(org);
    console.log(`Inserted organization: ${org.name}`);
  }
  console.log("Seed organizations finished...");
}

async function seedIndustries() {
  console.log("Seed industries started...");
  for (const industry of directoryIndustries) {
    // Check if the industry already exists by name
    const existingIndustry = await db
      .select()
      .from(IndustriesTable)
      .where(eq(IndustriesTable.name, industry.name))
      .limit(1);
    if (existingIndustry.length > 0) {
      console.log(`Skipping existing industry: ${industry.name}`);
      continue;
    }

    await db.insert(IndustriesTable).values(industry);
    console.log(`Inserted industry: ${industry.name}`);
  }
  console.log("Seed industries finished...");
}

async function seedOrganizationIndustries() {
  console.log("Seed organization industries started...");
  for (const mapping of orgIndustryMappings) {
    // Look up the organization ID by name
    const [organization] = await db
      .select()
      .from(OrganizationsTable)
      .where(eq(OrganizationsTable.name, mapping.directoryName))
      .limit(1);

    if (!organization) {
      console.log(`Organization not found: ${mapping.directoryName}`);
      continue;
    }

    // Loop through each industry and insert the mapping if not already present
    for (const industryName of mapping.directoryIndustries) {
      const [industry] = await db
        .select()
        .from(IndustriesTable)
        .where(eq(IndustriesTable.name, industryName))
        .limit(1);

      if (!industry) {
        console.log(`Industry not found: ${industryName}`);
        continue;
      }

      // Check if the mapping already exists
      const existingMapping = await db
        .select()
        .from(OrganizationIndustries)
        .where(
          and(
            eq(OrganizationIndustries.organization_id, organization.id),
            eq(OrganizationIndustries.industry_id, industry.id)
          )
        )
        .limit(1);

      if (existingMapping.length > 0) {
        console.log(
          `Mapping already exists for ${mapping.directoryName} -> ${industryName}`
        );
        continue;
      }

      // Insert the new mapping
      await db.insert(OrganizationIndustries).values({
        organization_id: organization.id,
        industry_id: industry.id,
      });
      console.log(
        `Inserted mapping: ${mapping.directoryName} -> ${industryName}`
      );
    }
  }
  console.log("Seeding organization industries completed.");
}

async function seedAffinities() {
  console.log("Seed affinities started...");
  for (const affinity of directoryAffinities) {
    const existingAffinity = await db
      .select()
      .from(AffinitiesTable)
      .where(eq(AffinitiesTable.name, affinity))
      .limit(1);
    if (existingAffinity.length > 0) {
      console.log(`Skipping existing affinity: ${affinity}`);
      continue;
    }

    await db.insert(AffinitiesTable).values({ name: affinity });
    console.log(`Inserted affinity: ${affinity}`);
  }
  console.log("Seed affinities finished...");
}

async function seedOrganizationAffinities() {
  console.log("Seed organization affinities started...");
  for (const mapping of orgAffinityMappings) {
    const [organization] = await db
      .select()
      .from(OrganizationsTable)
      .where(eq(OrganizationsTable.name, mapping.directoryName))
      .limit(1);

    if (!organization) {
      console.log(`Organization not found: ${mapping.directoryName}`);
      continue;
    }

    for (const affinityName of mapping.affinities) {
      const [affinity] = await db
        .select()
        .from(AffinitiesTable)
        .where(eq(AffinitiesTable.name, affinityName))
        .limit(1);

      if (!affinity) {
        console.log(`Affinity not found: ${affinityName}`);
        continue;
      }

      const existingMapping = await db
        .select()
        .from(OrganizationAffinities)
        .where(
          and(
            eq(OrganizationAffinities.organization_id, organization.id),
            eq(OrganizationAffinities.affinity_id, affinity.id)
          )
        )
        .limit(1);

      if (existingMapping.length > 0) {
        console.log(
          `Mapping already exists for ${mapping.directoryName} -> ${affinityName}`
        );
        continue;
      }

      await db.insert(OrganizationAffinities).values({
        organization_id: organization.id,
        affinity_id: affinity.id,
      });
      console.log(
        `Inserted mapping: ${mapping.directoryName} -> ${affinityName}`
      );
    }
  }
  console.log("Seeding organization affinities completed.");
}

async function seedCategories() {
  console.log("Seed categories started...");
  for (const category of directoryCategories) {
    const existingCategory = await db
      .select()
      .from(CategoriesTable)
      .where(eq(CategoriesTable.name, category))
      .limit(1);
    if (existingCategory.length > 0) {
      console.log(`Skipping existing category: ${category}`);
      continue;
    }

    await db.insert(CategoriesTable).values({ name: category });
    console.log(`Inserted category: ${category}`);
  }
  console.log("Seed categories finished...");
}

async function seedOrganizationCategories() {
  console.log("Seed organization categories started...");
  for (const mapping of orgCategoryMappings) {
    const [organization] = await db
      .select()
      .from(OrganizationsTable)
      .where(eq(OrganizationsTable.name, mapping.directoryName))
      .limit(1);

    if (!organization) {
      console.log(`Organization not found: ${mapping.directoryName}`);
      continue;
    }

    for (const categoryName of mapping.categories) {
      const [category] = await db
        .select()
        .from(CategoriesTable)
        .where(eq(CategoriesTable.name, categoryName))
        .limit(1);

      if (!category) {
        console.log(`Category not found: ${categoryName}`);
        continue;
      }

      const existingMapping = await db
        .select()
        .from(OrganizationCategories)
        .where(
          and(
            eq(OrganizationCategories.organization_id, organization.id),
            eq(OrganizationCategories.category_id, category.id)
          )
        )
        .limit(1);

      if (existingMapping.length > 0) {
        console.log(
          `Mapping already exists for ${mapping.directoryName} -> ${categoryName}`
        );
        continue;
      }

      await db.insert(OrganizationCategories).values({
        organization_id: organization.id,
        category_id: category.id,
      });
      console.log(
        `Inserted mapping: ${mapping.directoryName} -> ${categoryName}`
      );
    }
  }
  console.log("Seeding organization categories completed.");
}

async function seedCities() {
  console.log("Seed cities started...");
  for (const city of directoryCities) {
    const existingCity = await db
      .select()
      .from(CitiesTable)
      .where(eq(CitiesTable.name, city.name))
      .limit(1);
    if (existingCity.length > 0) {
      console.log(`Skipping existing city: ${city.name}`);
      continue;
    }

    await db.insert(CitiesTable).values(city);
    console.log(`Inserted city: ${city.name}`);
  }
  console.log("Seed cities finished...");
}

async function seedOrganizationCities() {
  console.log("Seed organization cities started...");
  for (const mapping of orgCityMappings) {
    const [organization] = await db
      .select()
      .from(OrganizationsTable)
      .where(eq(OrganizationsTable.name, mapping.directoryName))
      .limit(1);

    if (!organization) {
      console.log(`Organization not found: ${mapping.directoryName}`);
      continue;
    }

    for (const cityName of mapping.directoryCities) {
      const [city] = await db
        .select()
        .from(CitiesTable)
        .where(eq(CitiesTable.name, cityName))
        .limit(1);

      if (!city) {
        console.log(`City not found: ${cityName}`);
        continue;
      }

      const existingMapping = await db
        .select()
        .from(OrganizationCities)
        .where(
          and(
            eq(OrganizationCities.organization_id, organization.id),
            eq(OrganizationCities.city_id, city.id)
          )
        )
        .limit(1);

      if (existingMapping.length > 0) {
        console.log(
          `Mapping already exists for ${mapping.directoryName} -> ${cityName}`
        );
        continue;
      }

      await db.insert(OrganizationCities).values({
        organization_id: organization.id,
        city_id: city.id,
      });
      console.log(`Inserted mapping: ${mapping.directoryName} -> ${cityName}`);
    }
  }
  console.log("Seeding organization cities completed.");
}

async function seedEvents() {
  console.log("Seed events started...");
  for (const event of directoryEvents) {
    const existingEvent = await db
      .select()
      .from(EventsTable)
      .where(eq(EventsTable.name, event.name))
      .limit(1);

    if (existingEvent.length > 0) {
      console.log(`Skipping existing event: ${event.name}`);
      continue;
    }

    // Look up city_id by city name
    const [city] = await db
      .select()
      .from(CitiesTable)
      .where(eq(CitiesTable.name, event.city))
      .limit(1);

    if (!city) {
      console.log(`City not found: ${event.city}`);
      continue;
    }

    // Insert event with city_id (destructure to remove city field)
    const { city: _, ...eventData } = event;
    await db.insert(EventsTable).values({
      ...eventData,
      city_id: city.id,
    });
    console.log(`Inserted event: ${event.name}`);
  }
  console.log("Seed events finished...");
}

async function seedEventOrganizations() {
  console.log("Seed event organizations started...");
  for (const mapping of eventOrgMappings) {
    const [event] = await db
      .select()
      .from(EventsTable)
      .where(eq(EventsTable.name, mapping.eventName))
      .limit(1);

    if (!event) {
      console.log(`Event not found: ${mapping.eventName}`);
      continue;
    }

    for (const orgName of mapping.organizationNames) {
      const [organization] = await db
        .select()
        .from(OrganizationsTable)
        .where(eq(OrganizationsTable.name, orgName))
        .limit(1);

      if (!organization) {
        console.log(`Organization not found: ${orgName}`);
        continue;
      }

      const existingMapping = await db
        .select()
        .from(EventOrganizations)
        .where(
          and(
            eq(EventOrganizations.event_id, event.id),
            eq(EventOrganizations.organization_id, organization.id)
          )
        )
        .limit(1);

      if (existingMapping.length > 0) {
        console.log(
          `Mapping already exists: ${mapping.eventName} -> ${orgName}`
        );
        continue;
      }

      await db.insert(EventOrganizations).values({
        event_id: event.id,
        organization_id: organization.id,
      });
      console.log(`Inserted mapping: ${mapping.eventName} -> ${orgName}`);
    }
  }
  console.log("Seeding event organizations completed.");
}

async function seedEventIndustries() {
  console.log("Seed event industries started...");
  for (const mapping of eventIndustryMappings) {
    const [event] = await db
      .select()
      .from(EventsTable)
      .where(eq(EventsTable.name, mapping.eventName))
      .limit(1);

    if (!event) {
      console.log(`Event not found: ${mapping.eventName}`);
      continue;
    }

    for (const industryName of mapping.industries) {
      const [industry] = await db
        .select()
        .from(IndustriesTable)
        .where(eq(IndustriesTable.name, industryName))
        .limit(1);

      if (!industry) {
        console.log(`Industry not found: ${industryName}`);
        continue;
      }

      const existingMapping = await db
        .select()
        .from(EventIndustries)
        .where(
          and(
            eq(EventIndustries.event_id, event.id),
            eq(EventIndustries.industry_id, industry.id)
          )
        )
        .limit(1);

      if (existingMapping.length > 0) {
        console.log(
          `Mapping already exists: ${mapping.eventName} -> ${industryName}`
        );
        continue;
      }

      await db.insert(EventIndustries).values({
        event_id: event.id,
        industry_id: industry.id,
      });
      console.log(`Inserted mapping: ${mapping.eventName} -> ${industryName}`);
    }
  }
  console.log("Seeding event industries completed.");
}

async function seedFeaturedOrgs() {
  console.log("Seed featured orgs started...");
  const FEATURED = [
    { name: "Techqueria", displayOrder: 1 },
    { name: "ALPFA", displayOrder: 2 },
    { name: "1871", displayOrder: 3 },
  ];

  for (const { name, displayOrder } of FEATURED) {
    const [org] = await db
      .select()
      .from(OrganizationsTable)
      .where(eq(OrganizationsTable.name, name))
      .limit(1);

    if (!org) {
      console.log(`Organization not found: ${name}`);
      continue;
    }

    const existing = await db
      .select()
      .from(FeaturedOrgsTable)
      .where(eq(FeaturedOrgsTable.org_id, org.id))
      .limit(1);

    if (existing.length > 0) {
      console.log(`Skipping existing featured org: ${name}`);
      continue;
    }

    await db.insert(FeaturedOrgsTable).values({
      org_id: org.id,
      display_order: displayOrder,
    });
    console.log(`Inserted featured org: ${name} (order ${displayOrder})`);
  }
  console.log("Seed featured orgs finished...");
}

async function seedServices() {
  console.log("Seed services started...");
  for (const service of directoryServices) {
    const existingService = await db
      .select()
      .from(KeyServicesTable)
      .where(eq(KeyServicesTable.name, service.name))
      .limit(1);
    if (existingService.length > 0) {
      console.log(`Skipping existing service: ${service.name}`);
      continue;
    }

    await db.insert(KeyServicesTable).values(service);
    console.log(`Inserted service: ${service.name}`);
  }
  console.log("Seed services finished...");
}

async function seedOrganizationServices() {
  console.log("Seed organization services started...");
  for (const mapping of orgServiceMappings) {
    const [organization] = await db
      .select()
      .from(OrganizationsTable)
      .where(eq(OrganizationsTable.name, mapping.directoryName))
      .limit(1);

    if (!organization) {
      console.log(`Organization not found: ${mapping.directoryName}`);
      continue;
    }

    for (const serviceName of mapping.services) {
      const [service] = await db
        .select()
        .from(KeyServicesTable)
        .where(eq(KeyServicesTable.name, serviceName))
        .limit(1);

      if (!service) {
        console.log(`Service not found: ${serviceName}`);
        continue;
      }

      const existingMapping = await db
        .select()
        .from(OrganizationServices)
        .where(
          and(
            eq(OrganizationServices.organization_id, organization.id),
            eq(OrganizationServices.service_id, service.id)
          )
        )
        .limit(1);

      if (existingMapping.length > 0) {
        console.log(
          `Mapping already exists for ${mapping.directoryName} -> ${serviceName}`
        );
        continue;
      }

      await db.insert(OrganizationServices).values({
        organization_id: organization.id,
        service_id: service.id,
      });
      console.log(
        `Inserted mapping: ${mapping.directoryName} -> ${serviceName}`
      );
    }
  }
  console.log("Seeding organization services completed.");
}
