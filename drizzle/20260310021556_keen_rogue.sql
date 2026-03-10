CREATE TABLE IF NOT EXISTS "lpdd"."organization_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"url" text NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_photos" ADD CONSTRAINT "organization_photos_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
