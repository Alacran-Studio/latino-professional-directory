"use client";
import { useState, useEffect } from "react";
import DirectoryOrg from "./DirectoryOrg";
import { DirectoryOrgType, IndustryType } from "@/app/types";

import Filter from "./Filter";
// import SearchBar from "./search-bar";

export default function Directory() {
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>(
    []
  );
  const [organizations, setOrganizations] = useState<DirectoryOrgType[]>([]);
  const [industries, setIndustries] = useState<IndustryType[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations?page=1&limit=10");
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch data");

        setOrganizations(data.organizations);
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    };
    const fetchIndustries = async () => {
      try {
        const response = await fetch("/api/industries");
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch data");
        console.log("industries from response:", data);
        const sortedIndustries = data.industries.sort(
          (a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
        );
        setIndustries(sortedIndustries);
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    };

    fetchOrganizations();
    fetchIndustries();
  }, []);

  return (
    <section className="mb-4 flex w-10/12 flex-col items-center pb-4 pt-8">
      <h1 className="pb-8 text-center text-lg font-semibold sm:text-4xl">
        Directory
      </h1>
      <div className="min-h-[760px] rounded-lg border border-border bg-background p-4 shadow-lg md:w-full dark:shadow-gray-800">
        <div className="mb-6 md:flex md:gap-x-2">
          <Filter
            industries={industries}
            selectedIndustries={selectedIndustries}
            setSelectedIndustries={setSelectedIndustries}
            isIndustryDropdownOpen={isIndustryDropdownOpen}
            setIsIndustryDropdownOpen={setIsIndustryDropdownOpen}
          />

          {/* <SearchBar></SearchBar> */}
        </div>

        <div className="grid gap-4">
          {organizations
            .filter((org) => {
              if (selectedIndustries.length === 0) {
                return true;
              }

              return org.industries.some((industry) =>
                selectedIndustries.some(
                  (selected) => selected.id === industry.id
                )
              );
            })
            .map((org) => (
              <DirectoryOrg key={org.id} {...org} />
            ))}
        </div>
      </div>
    </section>
  );
}
