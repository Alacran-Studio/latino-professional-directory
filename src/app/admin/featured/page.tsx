import { requireRole } from "@/lib/auth/requireAuth";
import { fetchFeaturedOrgs, fetchAllOrgs } from "@/lib/admin/dbOperations";
import { FeaturedOrgsManager } from "../_components/FeaturedOrgsManager";

export default async function FeaturedOrgsPage() {
  await requireRole("system_admin");

  const [featuredOrgs, allOrgs] = await Promise.all([
    fetchFeaturedOrgs(),
    fetchAllOrgs(),
  ]);

  return (
    <div>
      <h1 className="font-lexend mb-6 text-2xl font-semibold text-foreground">
        Featured Organizations
      </h1>
      <FeaturedOrgsManager
        featuredOrgs={featuredOrgs}
        allOrgs={allOrgs}
      />
    </div>
  );
}
