CREATE TABLE IF NOT EXISTS "lpdd"."categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."organization_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer,
	"category_id" integer
);
--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ADD COLUMN "photos" text DEFAULT '[]';--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ADD COLUMN "videos" text DEFAULT '[]';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_categories" ADD CONSTRAINT "organization_categories_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."organization_categories" ADD CONSTRAINT "organization_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "lpdd"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
