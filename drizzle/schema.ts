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
  status: text("status").notNull().default("approved"),
  created_at: text("created_at").notNull().default("now()"),
  updated_at: text("updated_at").notNull().default("now()"),
});

export const OrganizationContacts = lpddSchema.table("organization_contacts", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
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

export const CitiesTable = lpddSchema.table("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const OrganizationCities = lpddSchema.table("organization_cities", {
  id: serial("id").primaryKey(),
  organization_id: integer("organization_id").references(
    () => OrganizationsTable.id
  ),
  city_id: integer("city_id").references(() => CitiesTable.id),
});

export const EventsTable = lpddSchema.table("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  short_description: text("short_description"),
  event_date: text("event_date").notNull(),
  event_time: text("event_time"),
  location: text("location"),
  city_id: integer("city_id").references(() => CitiesTable.id),
  registration_url: text("registration_url"),
  photo_url: text("photo_url"),
  video_url: text("video_url"),
  is_virtual: text("is_virtual").default("false"),
});

export const EventOrganizations = lpddSchema.table("event_organizations", {
  id: serial("id").primaryKey(),
  event_id: integer("event_id").references(() => EventsTable.id),
  organization_id: integer("organization_id").references(
    () => OrganizationsTable.id
  ),
});

export const EventIndustries = lpddSchema.table("event_industries", {
  id: serial("id").primaryKey(),
  event_id: integer("event_id").references(() => EventsTable.id),
  industry_id: integer("industry_id").references(() => IndustriesTable.id),
});

export const UsersTable = lpddSchema.table("users", {
  id: serial("id").primaryKey(),
  supabase_id: text("supabase_id").notNull().unique(),
  email: text("email").notNull().unique(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  role: text("role").notNull().default("org_admin"),
  created_at: text("created_at").notNull().default("now()"),
  updated_at: text("updated_at").notNull().default("now()"),
});

export const UserOrganizationsTable = lpddSchema.table(
  "user_organizations",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => UsersTable.id),
    organization_id: integer("organization_id")
      .notNull()
      .references(() => OrganizationsTable.id),
    created_at: text("created_at").notNull().default("now()"),
  }
);

export const FeaturedOrgsTable = lpddSchema.table("featured_orgs", {
  id: serial("id").primaryKey(),
  org_id: integer("org_id").notNull().unique().references(() => OrganizationsTable.id),
  display_order: integer("display_order").notNull(),
});

export const KeyServicesTable = lpddSchema.table("key_services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const OrganizationServices = lpddSchema.table("organization_services", {
  id: serial("id").primaryKey(),
  organization_id: integer("organization_id").references(() => OrganizationsTable.id),
  service_id: integer("service_id").references(() => KeyServicesTable.id),
});
