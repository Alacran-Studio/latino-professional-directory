CREATE TABLE IF NOT EXISTS "lpdd"."user_organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"organization_id" integer NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lpdd"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"supabase_id" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"role" text DEFAULT 'org_admin' NOT NULL,
	"created_at" text DEFAULT 'now()' NOT NULL,
	"updated_at" text DEFAULT 'now()' NOT NULL,
	CONSTRAINT "users_supabase_id_unique" UNIQUE("supabase_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_contacts" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ADD COLUMN "status" text DEFAULT 'approved' NOT NULL;--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ADD COLUMN "created_at" text DEFAULT 'now()' NOT NULL;--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ADD COLUMN "updated_at" text DEFAULT 'now()' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."user_organizations" ADD CONSTRAINT "user_organizations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "lpdd"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lpdd"."user_organizations" ADD CONSTRAINT "user_organizations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
