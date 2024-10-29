import "../envConfig";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzleClient";
import { directoryOrgs } from "./data";
import { OrganizationsTable } from "../schema";

async function main() {
  try {
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
  } catch (e) {
    console.error(e);
    throw new Error("Seed error...");
  } finally {
    process.exit(0);
  }
}
main();
