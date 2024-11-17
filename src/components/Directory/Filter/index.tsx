import { useRef, useEffect } from "react";
import { IndustryType } from "@/app/types";
import "./checkbox.css";
import FilterIcon from "@/components/Directory/icons/Filter";
import XIcon from "@/components/Directory/icons/X";

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
  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const industryDropdownButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        industryDropdownRef.current?.contains(target) ||
        industryDropdownButtonRef.current?.contains(target)
      ) {
        return;
      }
      setIsIndustryDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsIndustryDropdownOpen]);

  const handleIndustryChange = (industry: IndustryType) => {
    if (selectedIndustries.some((selected) => selected.id === industry.id)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const removeIndustry = (industryToRemove: IndustryType) => {
    setSelectedIndustries(
      selectedIndustries.filter((industry) => industry !== industryToRemove)
    );
  };

  return (
    <div className="relative mt-4 md:mt-0 md:w-full">
      {/* Filter Button */}
      <button
        ref={industryDropdownButtonRef}
        onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
        className={`flex w-full items-center justify-between bg-brandGold px-4 py-2 transition-all duration-300 ease-out hover:shadow-lg md:h-12 md:w-1/2 dark:text-black ${
          isIndustryDropdownOpen
            ? "rounded-t-lg font-semibold"
            : "rounded-lg font-normal"
        }`}
      >
        <div className="flex items-center">
          <FilterIcon />
          <span className="ml-2">Filter by Industry</span>
        </div>
        <div
          className={`ml-2 transition-opacity duration-300 ease-out ${
            isIndustryDropdownOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <XIcon />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={industryDropdownRef}
        className={`absolute w-full transform bg-background transition-all duration-300 ease-out md:w-1/2 ${
          isIndustryDropdownOpen
            ? "max-h-[500px] translate-y-0 rounded-b-lg border-b border-l border-r border-border p-4 opacity-100 shadow-2xl"
            : "max-h-0 translate-y-0 border-none p-0 opacity-0 shadow-none"
        } overflow-hidden`}
      >
        {industries.map((industry) => (
          <label
            key={industry.id}
            className="mb-2 flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              checked={selectedIndustries.includes(industry)}
              onChange={() => handleIndustryChange(industry)}
            ></input>
            <span>{industry.name}</span>
          </label>
        ))}
      </div>

      {/* Industry Chips Container */}
      <div
        className={`flex w-full flex-wrap gap-2 ${
          selectedIndustries.length === 0 ? "mt-0" : "mt-4"
        } ${isIndustryDropdownOpen ? "hidden" : "block"}`}
      >
        {selectedIndustries.map((industry: IndustryType) => (
          <button
            key={industry.id}
            onClick={() => removeIndustry(industry)}
            className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-chipGradientFrom via-chipGradientVia to-chipGradientTo px-3 py-1 focus:outline-none"
          >
            <span>{industry.name}</span>
            <XIcon />
          </button>
        ))}
      </div>
    </div>
  );
}
