"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import {
  EventType,
  IndustryType,
  CityType,
  EventsApiResponse,
} from "@/app/types";
import { fetchFilterData } from "@/lib/fetchFilterData";
import FilterDropdown from "@/components/Directory/FilterDropdown";
import FilterIcon from "@/components/Directory/icons/Filter";
import LocationIcon from "@/components/Directory/icons/Location";
import { trackFilterApplied, trackFilterRemoved } from "@/lib/analytics";
import DateFilter from "./DateFilter";
import NoEvents from "./NoEvents";
import LoadingEvents from "./LoadingEvents";
export default function EventsDirectory({
  className = "",
}: {
  className?: string;
}) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>(
    []
  );
  const [selectedCities, setSelectedCities] = useState<CityType[]>([]);
  const [dateFilter, setDateFilter] = useState<"all" | "upcoming" | "past">(
    "upcoming"
  );
  const [events, setEvents] = useState<EventType[]>([]);
  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [eventResponse, filterData] = await Promise.all([
          fetch("/api/events?page=1&limit=50"),
          fetchFilterData(),
        ]);

        if (!eventResponse.ok) {
          const error = await eventResponse.json();
          throw new Error(error.error || "Failed to fetch events");
        }

        const eventData: EventsApiResponse = await eventResponse.json();

        setEvents(eventData.events);
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

  const filteredEvents = events.filter((event) => {
    // Industry filter
    const matchesIndustry =
      selectedIndustries.length === 0 ||
      event.industries.some((industry) =>
        selectedIndustries.some((selected) => selected.id === industry.id)
      );

    // City filter
    const matchesCity =
      selectedCities.length === 0 ||
      (event.city &&
        selectedCities.some((selected) => selected.id === event.city.id));

    // Date filter
    const eventDate = new Date(event.event_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let matchesDate = true;
    if (dateFilter === "upcoming") {
      matchesDate = eventDate >= today;
    } else if (dateFilter === "past") {
      matchesDate = eventDate < today;
    }

    return matchesIndustry && matchesCity && matchesDate;
  });

  return (
    <section
      className={`${className} mb-4 flex w-10/12 flex-col items-center pb-4 pt-8`}
    >
      {isLoading ? (
        <></>
      ) : (
        <div className="mb-6 flex w-full flex-col gap-y-4 md:flex-row md:gap-x-2 md:gap-y-0 lg:max-w-6xl">
          <FilterDropdown
            label="Filter by Industry"
            icon={<FilterIcon />}
            items={industries}
            selectedItems={selectedIndustries}
            setSelectedItems={setSelectedIndustries}
            isDropdownOpen={openFilter === "industry"}
            setIsDropdownOpen={(isOpen) => setOpenFilter(isOpen ? "industry" : null)}
            buttonClassName="bg-brandGold dark:text-black"
            widthClassName="md:w-1/2"
            onItemSelect={(val, selected) =>
              selected ? trackFilterApplied("industry", val) : trackFilterRemoved("industry", val)
            }
          />
          <FilterDropdown
            label="Filter by City"
            icon={<LocationIcon />}
            items={cities}
            selectedItems={selectedCities}
            setSelectedItems={setSelectedCities}
            isDropdownOpen={openFilter === "location"}
            setIsDropdownOpen={(isOpen) => setOpenFilter(isOpen ? "location" : null)}
            buttonClassName="bg-gray-300 dark:bg-gray-400 dark:text-black"
            widthClassName="md:w-1/2"
            onItemSelect={(val, selected) =>
              selected ? trackFilterApplied("location", val) : trackFilterRemoved("location", val)
            }
          />
          {/* TODO: DateFilter – Upcoming/Past Events toggle
           * Component ready at ./DateFilter/index.tsx
           * State already wired: dateFilter, isDateDropdownOpen
           * Filtering logic in filteredEvents already handles "upcoming" | "past" | "all"
           * Shelved to revisit once layout/design is finalized with Figma designs.
           *
           * <DateFilter
           *   dateFilter={dateFilter}
           *   setDateFilter={setDateFilter}
           *   isDateDropdownOpen={isDateDropdownOpen}
           *   setIsDateDropdownOpen={setIsDateDropdownOpen}
           * />
           */}
        </div>
      )}

      {isLoading ? (
        <LoadingEvents />
      ) : filteredEvents.length === 0 ? (
        <NoEvents />
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-6xl lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      )}
    </section>
  );
}
