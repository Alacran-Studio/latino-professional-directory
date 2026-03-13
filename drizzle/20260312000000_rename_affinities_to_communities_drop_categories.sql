ALTER TABLE "lpdd"."organization_affinities" DROP CONSTRAINT "organization_affinities_affinity_id_affinities_id_fk";
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_affinities" DROP CONSTRAINT "organization_affinities_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_categories" DROP CONSTRAINT "organization_categories_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_categories" DROP CONSTRAINT "organization_categories_organization_id_organizations_id_fk";
--> statement-breakpoint
DROP TABLE "lpdd"."organization_categories" CASCADE;
--> statement-breakpoint
DROP TABLE "lpdd"."categories" CASCADE;
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_affinities" RENAME TO "organization_communities";
--> statement-breakpoint
ALTER TABLE "lpdd"."affinities" RENAME TO "communities";
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_communities" RENAME COLUMN "affinity_id" TO "community_id";
--> statement-breakpoint
ALTER TABLE "lpdd"."communities" DROP CONSTRAINT "affinities_name_unique";
--> statement-breakpoint
ALTER TABLE "lpdd"."communities" ADD CONSTRAINT "communities_name_unique" UNIQUE("name");
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_communities" ADD CONSTRAINT "organization_communities_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "lpdd"."organizations"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "lpdd"."organization_communities" ADD CONSTRAINT "organization_communities_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "lpdd"."communities"("id") ON DELETE no action ON UPDATE no action;
