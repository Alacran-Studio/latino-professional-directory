CREATE TABLE IF NOT EXISTS "lpdd"."affinities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "affinities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."organization_affinities" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"affinity_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_affinities" ADD CONSTRAINT "organization_affinities_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_affinities" ADD CONSTRAINT "organization_affinities_affinity_id_affinities_id_fk" FOREIGN KEY ("affinity_id") REFERENCES "lpdd"."affinities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
