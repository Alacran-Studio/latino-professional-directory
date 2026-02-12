import { IndustryType, CityType } from "@/app/types";

export interface FilterData {
  industries: IndustryType[];
  cities: CityType[];
}

export async function fetchFilterData(): Promise<FilterData> {
  const [industryResponse, cityResponse] = await Promise.all([
    fetch("/api/industries"),
    fetch("/api/cities"),
  ]);

  if (!industryResponse.ok) {
    const error = await industryResponse.json();
    throw new Error(error.error || "Failed to fetch industries");
  }
  if (!cityResponse.ok) {
    const error = await cityResponse.json();
    throw new Error(error.error || "Failed to fetch cities");
  }

  const [industryData, cityData] = await Promise.all([
    industryResponse.json(),
    cityResponse.json(),
  ]);

  const industries = industryData.industries.sort(
    (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
  );

  const cities = cityData.cities.sort(
    (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)
  );

  return { industries, cities };
}
