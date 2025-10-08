CREATE TABLE IF NOT EXISTS "lpdd"."cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "cities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."organization_cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"city_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_cities" ADD CONSTRAINT "organization_cities_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_cities" ADD CONSTRAINT "organization_cities_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "lpdd"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" DROP COLUMN IF EXISTS "city";