"use client";

import { useState, useEffect } from "react";
import DirectoryOrg from "./DirectoryOrg";
import { DirectoryOrgType, IndustryType } from "@/app/types";

import Filter from "./Filter";
import NoResults from "./NoResults";
import LoadingResults from "./LoadingResults";
import Header1 from "../common/Header1";

export default function Directory({ className = "" }: { className?: string }) {
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>(
    []
  );
  const [organizations, setOrganizations] = useState<DirectoryOrgType[]>([]);
  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizationsAndIndustries = async () => {
      try {
        setIsLoading(true);
        const [orgResponse, industryResponse] = await Promise.all([
          fetch("/api/organizations?page=1&limit=10"),
          fetch("/api/industries"),
        ]);

        const [orgData, industryData] = await Promise.all([
          orgResponse.json(),
          industryResponse.json(),
        ]);

        if (!orgResponse.ok)
          throw new Error(orgData.error || "Failed to fetch organizations");
        if (!industryResponse.ok)
          throw new Error(industryData.error || "Failed to fetch industries");

        const sortedIndustries = industryData.industries.sort(
          (a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
        );

        setOrganizations(orgData.organizations);
        setIndustries(sortedIndustries);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizationsAndIndustries();
  }, []);

  const filteredOrganizations = organizations.filter((org) => {
    if (selectedIndustries.length === 0) {
      return true;
    }

    return org.industries.some((industry) =>
      selectedIndustries.some((selected) => selected.id === industry.id)
    );
  });

  return (
    <section
      className={`${className} mb-4 flex w-10/12 flex-col items-center pb-4 pt-8`}
    >
      <Header1 className="pb-8 text-center">The Directory</Header1>
      <div className="min-h-96 w-full rounded-lg border border-border bg-background p-4 shadow-lg sm:min-h-[520px] lg:w-[896px] dark:shadow-gray-800">
        <div className="mb-6 md:flex md:gap-x-2">
          <Filter
            industries={industries}
            selectedIndustries={selectedIndustries}
            setSelectedIndustries={setSelectedIndustries}
            isIndustryDropdownOpen={isIndustryDropdownOpen}
            setIsIndustryDropdownOpen={setIsIndustryDropdownOpen}
          />
        </div>

        {isLoading ? (
          <LoadingResults />
        ) : filteredOrganizations.length === 0 ? (
          <NoResults />
        ) : (
          <div className="grid h-full gap-4">
            {filteredOrganizations.map((org) => (
              <DirectoryOrg key={org.id} {...org} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
