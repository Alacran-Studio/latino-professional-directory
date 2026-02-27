CREATE TABLE IF NOT EXISTS "lpdd"."key_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "key_services_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."organization_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"service_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_services" ADD CONSTRAINT "organization_services_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_services" ADD CONSTRAINT "organization_services_service_id_key_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "lpdd"."key_services"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
