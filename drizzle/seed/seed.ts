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
} from "./data";
import {
  OrganizationsTable,
  IndustriesTable,
  OrganizationIndustries,
  AffinitiesTable,
  OrganizationAffinities,
  CategoriesTable,
  OrganizationCategories,
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
