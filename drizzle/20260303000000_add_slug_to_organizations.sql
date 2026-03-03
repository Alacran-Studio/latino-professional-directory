ALTER TABLE "lpdd"."organizations" ADD COLUMN "slug" text;
--> statement-breakpoint
UPDATE "lpdd"."organizations"
SET "slug" = lower(
  regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(name, '[^\w\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    ),
    '(^-|-$)', '', 'g'
  )
);
--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ALTER COLUMN "slug" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ADD CONSTRAINT "organizations_slug_unique" UNIQUE("slug");
