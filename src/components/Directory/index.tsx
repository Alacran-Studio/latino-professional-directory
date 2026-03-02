"use client";

import { useState, useEffect } from "react";
import DirectoryOrg from "./DirectoryOrg";
import {
  DirectoryOrgType,
  IndustryType,
  CityType,
  OrganizationsApiResponse,
} from "@/app/types";
import { fetchFilterData } from "@/lib/fetchFilterData";

import IndustryFilter from "./IndustryFilter";
import LocationFilter from "./LocationFilter";
import NoResults from "./NoResults";
import LoadingResults from "./LoadingResults";
import Header1 from "../common/Header1";

export default function Directory({ className = "" }: { className?: string }) {
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>(
    []
  );
  const [selectedCities, setSelectedCities] = useState<CityType[]>([]);
  const [organizations, setOrganizations] = useState<DirectoryOrgType[]>([]);
  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [orgResponse, filterData] = await Promise.all([
          fetch("/api/organizations?page=1&limit=100"),
          fetchFilterData(),
        ]);

        if (!orgResponse.ok) {
          const error = await orgResponse.json();
          throw new Error(error.error || "Failed to fetch organizations");
        }

        const orgData: OrganizationsApiResponse = await orgResponse.json();

        setOrganizations(orgData.organizations);
        setIndustries(filterData.industries);
        setCities(filterData.cities);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredOrganizations = organizations.filter((org) => {
    const matchesIndustry =
      selectedIndustries.length === 0 ||
      org.industries.some((industry) =>
        selectedIndustries.some((selected) => selected.id === industry.id)
      );

    const matchesCity =
      selectedCities.length === 0 ||
      org.cities.some((city) =>
        selectedCities.some((selected) => selected.id === city.id)
      );

    return matchesIndustry && matchesCity;
  });

  return (
    <section
      className={`${className} mb-4 flex w-full flex-col items-center px-6 pb-4 pt-8`}
    >
      <Header1 className="pb-8 text-center">The Directory</Header1>
      <div className="min-h-96 w-full rounded-lg border border-border bg-background p-4 shadow-lg sm:min-h-[520px] lg:w-[896px] dark:shadow-gray-800">
        {isLoading ? (
          <></>
        ) : (
          //TODO: Fix spacing on desktop
          <div className="mb-6 flex flex-col gap-y-4 md:flex-row md:gap-x-2 md:gap-y-0">
            <IndustryFilter
              industries={industries}
              selectedIndustries={selectedIndustries}
              setSelectedIndustries={setSelectedIndustries}
              isIndustryDropdownOpen={isIndustryDropdownOpen}
              setIsIndustryDropdownOpen={setIsIndustryDropdownOpen}
            />
            <LocationFilter
              cities={cities}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              isCityDropdownOpen={isCityDropdownOpen}
              setIsCityDropdownOpen={setIsCityDropdownOpen}
            />
          </div>
        )}

        {isLoading ? (
          <LoadingResults />
        ) : filteredOrganizations.length === 0 ? (
          <NoResults />
        ) : (
          <div className="grid gap-4">
            {filteredOrganizations.map((org) => (
              <DirectoryOrg key={org.id} {...org} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
