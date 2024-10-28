import { db } from "@/lib/drizzleClient";
import { OrganizationsTable } from "../../drizzle/schema";

export async function fetchOrganizations(page: number, limit: number) {
  const from = (page - 1) * limit;

  const orgs = await db
    .select()
    .from(OrganizationsTable)
    .limit(limit)
    .offset(from);
  console.log("orgs from drizzle db client: ", orgs);
  return orgs;
}
