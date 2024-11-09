import { integer, pgSchema, serial, text } from "drizzle-orm/pg-core";

export const lpddSchema = pgSchema("lpdd");

export const OrganizationsTable = lpddSchema.table("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  logo_url: text("logo_url"),
  description: text("description"),
  short_description: text("short_description"),
  website_url: text("website_url").notNull().unique(),
  photo_url: text("photo_url"),
  video_url: text("video_url"),
});

export const OrganizationContacts = lpddSchema.table("organization_contacts", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  organization_id: integer("organization_id").references(
    () => OrganizationsTable.id
  ),
});

export const IndustriesTable = lpddSchema.table("industries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const OrganizationIndustries = lpddSchema.table(
  "organization_industries",
  {
    id: serial("id").primaryKey(),
    organization_id: integer("organization_id").references(
      () => OrganizationsTable.id
    ),
    industry_id: integer("industry_id").references(() => IndustriesTable.id),
  }
);

export const AffinitiesTable = lpddSchema.table("affinities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const OrganizationAffinities = lpddSchema.table(
  "organization_affinities",
  {
    id: serial("id").primaryKey(),
    organization_id: integer("organization_id").references(
      () => OrganizationsTable.id
    ),
    affinity_id: integer("affinity_id").references(() => AffinitiesTable.id),
  }
);

export const CategoriesTable = lpddSchema.table("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const OrganizationCategories = lpddSchema.table(
  "organization_categories",
  {
    id: serial("id").primaryKey(),
    organization_id: integer("organization_id").references(
      () => OrganizationsTable.id
    ),
    category_id: integer("category_id").references(() => CategoriesTable.id),
  }
);
