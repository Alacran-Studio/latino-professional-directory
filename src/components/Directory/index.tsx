"use client";

import { useState, useEffect } from "react";
import DirectoryOrg from "./DirectoryOrg";
import {
  DirectoryOrgType,
  IndustryType,
  CityType,
  ServiceType,
  CommunityType,
  OrganizationsApiResponse,
} from "@/app/types";
import { fetchFilterData } from "@/lib/fetchFilterData";
import FilterDropdown from "./FilterDropdown";
import FilterIcon from "@/components/Directory/icons/Filter";
import LocationIcon from "@/components/Directory/icons/Location";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { trackFilterApplied, trackFilterRemoved } from "@/lib/analytics";
import NoResults from "./NoResults";
import LoadingResults from "./LoadingResults";
import Header1 from "../common/Header1";
import type { FilterConfig } from "@/types/filters";

const filterConfigs: FilterConfig[] = [
  {
    key: "industry",
    label: "Filter by Industry",
    icon: <FilterIcon />,
    buttonClassName: "bg-brandGold dark:text-black",
    analyticsKey: "industry",
  },
  {
    key: "location",
    label: "Filter by City",
    icon: <LocationIcon />,
    buttonClassName: "bg-gray-300 dark:bg-gray-400 dark:text-black",
    chipClassName: "bg-gray-300 dark:bg-gray-400",
    accentColor: "var(--neutral)",
    analyticsKey: "location",
  },
  {
    key: "services",
    label: "Filter by Key Service",
    icon: <FilterIcon />,
    buttonClassName: "bg-gray-300 dark:bg-gray-400 dark:text-black",
    chipClassName: "bg-gray-300 dark:bg-gray-400",
    accentColor: "var(--neutral)",
    analyticsKey: "key_service",
  },
  {
    key: "communities",
    label: "Filter by Community",
    icon: <UserGroupIcon className="h-5 w-5" />,
    buttonClassName: "bg-gray-300 dark:bg-gray-400 dark:text-black",
    chipClassName: "bg-gray-300 dark:bg-gray-400",
    accentColor: "var(--neutral)",
    analyticsKey: "community",
  },
];

export default function Directory({ className = "" }: { className?: string }) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>([]);
  const [selectedCities, setSelectedCities] = useState<CityType[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedCommunities, setSelectedCommunities] = useState<CommunityType[]>([]);
  const [organizations, setOrganizations] = useState<DirectoryOrgType[]>([]);
  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [communities, setCommunities] = useState<CommunityType[]>([]);
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
        setServices(filterData.services);
        setCommunities(filterData.communities);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterItems: Record<string, IndustryType[] | CityType[] | ServiceType[] | CommunityType[]> = {
    industry: industries,
    location: cities,
    services: services,
    communities: communities,
  };

  const selectedItems: Record<string, IndustryType[] | CityType[] | ServiceType[] | CommunityType[]> = {
    industry: selectedIndustries,
    location: selectedCities,
    services: selectedServices,
    communities: selectedCommunities,
  };

  const setSelectedItemsMap: Record<string, (items: any[]) => void> = {
    industry: setSelectedIndustries,
    location: setSelectedCities,
    services: setSelectedServices,
    communities: setSelectedCommunities,
  };

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

    const matchesService =
      selectedServices.length === 0 ||
      org.services.some((service) =>
        selectedServices.some((selected) => selected.id === service.id)
      );

    const matchesCommunity =
      selectedCommunities.length === 0 ||
      org.communities.some((community) =>
        selectedCommunities.some((selected) => selected.id === community.id)
      );

    return matchesIndustry && matchesCity && matchesService && matchesCommunity;
  });

  return (
    <section
      className={`${className} mb-4 flex w-full flex-col items-center px-6 pb-4 pt-8`}
    >
      <Header1 className="pb-8 text-center">The Directory</Header1>
      <div className="min-h-96 w-full rounded-lg border border-border bg-background p-4 shadow-lg sm:min-h-[520px] lg:w-[896px] dark:shadow-gray-800">
        {!isLoading && (
          //TODO: Fix spacing on desktop
          <div className="mb-6 flex flex-col gap-y-4 md:flex-row md:flex-wrap md:gap-x-2 md:gap-y-2">
            {filterConfigs.map((config) => (
              <FilterDropdown
                key={config.key}
                label={config.label}
                icon={config.icon}
                items={filterItems[config.key]}
                selectedItems={selectedItems[config.key]}
                setSelectedItems={setSelectedItemsMap[config.key]}
                isDropdownOpen={openFilter === config.key}
                setIsDropdownOpen={(isOpen) =>
                  setOpenFilter(isOpen ? config.key : null)
                }
                buttonClassName={config.buttonClassName}
                chipClassName={config.chipClassName}
                accentColor={config.accentColor}
                widthClassName="md:w-[calc(50%-0.25rem)]"
                onItemSelect={(val, selected) =>
                  selected
                    ? trackFilterApplied(config.analyticsKey, val, "directory")
                    : trackFilterRemoved(config.analyticsKey, val, "directory")
                }
              />
            ))}
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
