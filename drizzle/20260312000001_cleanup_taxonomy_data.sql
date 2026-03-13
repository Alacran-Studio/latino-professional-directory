-- Remove org-community mappings pointing to old placeholder communities
DELETE FROM "lpdd"."organization_communities"
WHERE "community_id" NOT IN (
  SELECT id FROM "lpdd"."communities"
  WHERE name IN ('Latine', 'Women', 'LGBTQ+')
);
--> statement-breakpoint
-- Remove old placeholder communities, keep only the 3 canonical ones
DELETE FROM "lpdd"."communities"
WHERE name NOT IN ('Latine', 'Women', 'LGBTQ+');
--> statement-breakpoint
-- Remove org-service mappings pointing to old placeholder services
DELETE FROM "lpdd"."organization_services"
WHERE "service_id" NOT IN (
  SELECT id FROM "lpdd"."key_services"
  WHERE name IN (
    'Networking Events',
    'Mentorship Programs',
    'Professional Cohorts',
    'In-Person Conferences & Summits',
    'Virtual Summits',
    'Educational Events',
    'Job Board'
  )
);
--> statement-breakpoint
-- Remove old placeholder services, keep only the 7 canonical ones
DELETE FROM "lpdd"."key_services"
WHERE name NOT IN (
  'Networking Events',
  'Mentorship Programs',
  'Professional Cohorts',
  'In-Person Conferences & Summits',
  'Virtual Summits',
  'Educational Events',
  'Job Board'
);
