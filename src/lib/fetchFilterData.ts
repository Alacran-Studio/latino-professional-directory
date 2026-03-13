import { IndustryType, CityType, ServiceType, CommunityType } from "@/app/types";

export interface FilterData {
  industries: IndustryType[];
  cities: CityType[];
  services: ServiceType[];
  communities: CommunityType[];
}

export async function fetchFilterData(): Promise<FilterData> {
  const [industryResponse, cityResponse, serviceResponse, communityResponse] = await Promise.all([
    fetch("/api/industries"),
    fetch("/api/cities"),
    fetch("/api/services"),
    fetch("/api/communities"),
  ]);

  if (!industryResponse.ok) {
    const error = await industryResponse.json();
    throw new Error(error.error || "Failed to fetch industries");
  }
  if (!cityResponse.ok) {
    const error = await cityResponse.json();
    throw new Error(error.error || "Failed to fetch cities");
  }
  if (!serviceResponse.ok) {
    const error = await serviceResponse.json();
    throw new Error(error.error || "Failed to fetch services");
  }
  if (!communityResponse.ok) {
    const error = await communityResponse.json();
    throw new Error(error.error || "Failed to fetch communities");
  }

  const [industryData, cityData, serviceData, communityData] = await Promise.all([
    industryResponse.json(),
    cityResponse.json(),
    serviceResponse.json(),
    communityResponse.json(),
  ]);

  const industries = industryData.industries.sort(
    (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
  );

  const cities = cityData.cities.sort(
    (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
  );

  const services = serviceData.services.sort(
    (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
  );

  const communities = communityData.communities.sort(
    (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
  );

  return { industries, cities, services, communities };
}
