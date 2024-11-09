ALTER TABLE "lpdd"."organizations" RENAME COLUMN "photos" TO "photo_url";--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" RENAME COLUMN "videos" TO "video_url";--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ALTER COLUMN "photo_url" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "lpdd"."organizations" ALTER COLUMN "video_url" DROP DEFAULT;