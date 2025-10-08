import { IndustryType } from "@/app/types";
import FilterIcon from "@/components/Directory/icons/Filter";
import FilterDropdown from "@/components/Directory/FilterDropdown";

interface FilterProps {
  industries: IndustryType[];
  selectedIndustries: IndustryType[];
  setSelectedIndustries: (industries: IndustryType[]) => void;
  isIndustryDropdownOpen: boolean;
  setIsIndustryDropdownOpen: (isOpen: boolean) => void;
}

export default function Filter({
  industries,
  selectedIndustries,
  setSelectedIndustries,
  isIndustryDropdownOpen,
  setIsIndustryDropdownOpen,
}: FilterProps) {
  return (
    <FilterDropdown
      label="Filter by Industry"
      icon={<FilterIcon />}
      items={industries}
      selectedItems={selectedIndustries}
      setSelectedItems={setSelectedIndustries}
      isDropdownOpen={isIndustryDropdownOpen}
      setIsDropdownOpen={setIsIndustryDropdownOpen}
      buttonClassName="bg-brandGold dark:text-black"
      widthClassName="md:w-1/2"
    />
  );
}
