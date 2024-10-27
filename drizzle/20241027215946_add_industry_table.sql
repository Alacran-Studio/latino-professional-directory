CREATE TABLE IF NOT EXISTS "lpdd"."industries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "industries_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."organization_industries" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"industry_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_industries" ADD CONSTRAINT "organization_industries_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_industries" ADD CONSTRAINT "organization_industries_industry_id_industries_id_fk" FOREIGN KEY ("industry_id") REFERENCES "lpdd"."industries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
