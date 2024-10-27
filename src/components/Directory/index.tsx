"use client";
import { useState, useEffect } from "react";
import DirectoryOrg from "./DirectoryOrg";
import { Industry } from "@/app/types";

import Filter from "./Filter";
// import SearchBar from "./search-bar";

export default function Directory() {
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [organizations, setOrganizations] = useState([]);

  const industries: Industry[] = Object.values(Industry).sort((a, b) =>
    a.localeCompare(b)
  );

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations?page=1&limit=10");
        const data = await response.json();
        console.log(
          "Successfully made service call to API endpoint and here's the data: ",
          data
        );
        if (!response.ok) throw new Error(data.error || "Failed to fetch data");

        setOrganizations(data.organizations);
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    };

    fetchOrganizations();
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
          <p>Work in progress</p>
          {/* {organizations
            .filter((org) => {
              if (selectedIndustries.length === 0) {
                return true;
              }

              return org.industry_tags.some((tag) =>
                selectedIndustries.includes(tag)
              );
            })
            .map((org) => (
              <DirectoryOrg key={org.id} {...org} />
            ))} */}
        </div>
      </div>
    </section>
  );
}
