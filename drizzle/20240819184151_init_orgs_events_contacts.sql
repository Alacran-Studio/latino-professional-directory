CREATE SCHEMA "lpdd";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."events" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"event_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."organization_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"organization_id" integer,
	CONSTRAINT "organization_contacts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo_url" text,
	"description" text,
	"industry" text,
	"website" text NOT NULL,
	"city" text NOT NULL,
	"region" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."events" ADD CONSTRAINT "events_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_contacts" ADD CONSTRAINT "organization_contacts_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
