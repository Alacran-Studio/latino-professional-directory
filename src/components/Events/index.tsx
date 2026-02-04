"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import {
  EventType,
  IndustryType,
  CityType,
  EventsApiResponse,
  IndustriesApiResponse,
  CitiesApiResponse,
} from "@/app/types";

import IndustryFilter from "@/components/Directory/IndustryFilter";
import LocationFilter from "@/components/Directory/LocationFilter";
import DateFilter from "./DateFilter";
import NoEvents from "./NoEvents";
import LoadingEvents from "./LoadingEvents";
import Header1 from "@/components/common/Header1";

export default function EventsDirectory({
  className = "",
}: {
  className?: string;
}) {
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
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
    const fetchEventsAndFilters = async () => {
      try {
        setIsLoading(true);
        const [eventResponse, industryResponse, cityResponse] =
          await Promise.all([
            fetch("/api/events?page=1&limit=50"),
            fetch("/api/industries"),
            fetch("/api/cities"),
          ]);

        if (!eventResponse.ok) {
          const error = await eventResponse.json();
          throw new Error(error.error || "Failed to fetch events");
        }
        if (!industryResponse.ok) {
          const error = await industryResponse.json();
          throw new Error(error.error || "Failed to fetch industries");
        }
        if (!cityResponse.ok) {
          const error = await cityResponse.json();
          throw new Error(error.error || "Failed to fetch cities");
        }

        const [eventData, industryData, cityData] = (await Promise.all([
          eventResponse.json(),
          industryResponse.json(),
          cityResponse.json(),
        ])) as [
          EventsApiResponse,
          IndustriesApiResponse,
          CitiesApiResponse
        ];

        const sortedIndustries = industryData.industries.sort(
          (a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
        );

        const sortedCities = cityData.cities.sort(
          (a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
        );

        setEvents(eventData.events);
        setIndustries(sortedIndustries);
        setCities(sortedCities);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventsAndFilters();
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
      <Header1 className="pb-8 text-center">Events</Header1>
      <div className="min-h-96 w-full rounded-lg border border-border bg-background p-4 shadow-lg sm:min-h-[520px] lg:max-w-6xl dark:shadow-gray-800">
        {isLoading ? (
          <></>
        ) : (
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
