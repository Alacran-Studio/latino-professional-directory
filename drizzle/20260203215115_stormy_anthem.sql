CREATE TABLE IF NOT EXISTS "lpdd"."event_industries" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer,
	"industry_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."event_organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer,
	"organization_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"short_description" text,
	"event_date" text NOT NULL,
	"event_time" text,
	"location" text,
	"city_id" integer,
	"registration_url" text,
	"photo_url" text,
	"video_url" text,
	"is_virtual" text DEFAULT 'false',
	CONSTRAINT "events_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."event_industries" ADD CONSTRAINT "event_industries_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "lpdd"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."event_industries" ADD CONSTRAINT "event_industries_industry_id_industries_id_fk" FOREIGN KEY ("industry_id") REFERENCES "lpdd"."industries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."event_organizations" ADD CONSTRAINT "event_organizations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "lpdd"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."event_organizations" ADD CONSTRAINT "event_organizations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."events" ADD CONSTRAINT "events_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "lpdd"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
