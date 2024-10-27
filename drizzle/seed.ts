import "./envConfig";
import { OrganizationsTable } from "./schema";
import { db } from "@/lib/drizzleClient";
import { techqueria_org } from "./seed-data";

async function main() {
  try {
    console.log("Seed started...");

    await db.insert(OrganizationsTable).values([techqueria_org]);
    // TODO: insert proper seed data into tables

    console.log("Seed finished...");
  } catch (e) {
    console.error(e);
    throw new Error("Seed error...");
  }

  process.exit(0);
}
main();
