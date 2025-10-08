import { CityType } from "@/app/types";
import LocationIcon from "@/components/Directory/icons/Location";
import FilterDropdown from "@/components/Directory/FilterDropdown";

interface LocationFilterProps {
  cities: CityType[];
  selectedCities: CityType[];
  setSelectedCities: (cities: CityType[]) => void;
  isCityDropdownOpen: boolean;
  setIsCityDropdownOpen: (isOpen: boolean) => void;
}

export default function LocationFilter({
  cities,
  selectedCities,
  setSelectedCities,
  isCityDropdownOpen,
  setIsCityDropdownOpen,
}: LocationFilterProps) {
  return (
    <FilterDropdown
      label="Filter by City"
      icon={<LocationIcon />}
      items={cities}
      selectedItems={selectedCities}
      setSelectedItems={setSelectedCities}
      isDropdownOpen={isCityDropdownOpen}
      setIsDropdownOpen={setIsCityDropdownOpen}
      buttonClassName="bg-gray-400 dark:text-black"
      widthClassName="md:w-1/2"
    />
  );
}
