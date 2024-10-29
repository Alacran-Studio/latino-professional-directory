import "../envConfig";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzleClient";
import { IndustriesTable } from "../schema";
import { directoryIndustries } from "./data";

async function main() {
  try {
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
  } catch (e) {
    console.error(e);
    throw new Error("Seed error...");
  } finally {
    process.exit(0);
  }
}
main();
