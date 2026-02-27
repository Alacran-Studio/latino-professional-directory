CREATE TABLE IF NOT EXISTS "lpdd"."featured_orgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"display_order" integer NOT NULL,
	CONSTRAINT "featured_orgs_org_id_unique" UNIQUE("org_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."featured_orgs" ADD CONSTRAINT "featured_orgs_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
