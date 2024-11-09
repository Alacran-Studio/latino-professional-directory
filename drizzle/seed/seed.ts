import "../envConfig";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/drizzleClient";
import { directoryOrgs, orgIndustryMappings } from "./data";
import {
  OrganizationsTable,
  IndustriesTable,
  OrganizationIndustries,
} from "../schema";
import { directoryIndustries } from "./data";

async function main() {
  try {
    await seedOrganizations();
    await seedIndustries();
    await seedOrganizationIndustries();
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
