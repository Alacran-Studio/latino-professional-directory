export const dynamic = "force-dynamic";

import Directory from "@/components/Directory";
import FeaturedOrgs from "@/components/Home/FeaturedOrgs";
import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import {
  fetchOrganizations,
  fetchIndustries,
  fetchCities,
  fetchServices,
  fetchCommunities,
} from "@/lib/dbOperations";

export const metadata: Metadata = {
  title: `Directory | ${APP_NAME}`,
  description:
    "Browse organizations dedicated to the professional development of Latino professionals across all industries.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [organizations, industries, cities, services, communities] =
    await Promise.all([
      fetchOrganizations(1, 100),
      fetchIndustries(),
      fetchCities(),
      fetchServices(),
      fetchCommunities(),
    ]);

  const sortedIndustries = [...industries].sort((a, b) => a.name.localeCompare(b.name));
  const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name));
  const sortedServices = [...services].sort((a, b) => a.name.localeCompare(b.name));
  const sortedCommunities = [...communities].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="flex flex-col items-center justify-between">
      <FeaturedOrgs />
      <Directory
        className="mt-6"
        organizations={organizations}
        industries={sortedIndustries}
        cities={sortedCities}
        services={sortedServices}
        communities={sortedCommunities}
        initialQuery={q ?? ""}
      />
    </main>
  );
}
