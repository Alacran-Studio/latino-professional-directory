import FilterIcon from "@/components/Directory/icons/Filter";

interface DateFilterProps {
  dateFilter: "all" | "upcoming" | "past";
  setDateFilter: (filter: "all" | "upcoming" | "past") => void;
  isDateDropdownOpen: boolean;
  setIsDateDropdownOpen: (isOpen: boolean) => void;
}

export default function DateFilter({
  dateFilter,
  setDateFilter,
  isDateDropdownOpen,
  setIsDateDropdownOpen,
}: DateFilterProps) {
  const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "upcoming", label: "Upcoming Events" },
    { value: "past", label: "Past Events" },
  ];

  return (
    <div className="relative md:w-1/3">
      <button
        onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-full bg-brandGreen px-4 py-2 text-label text-white hover:bg-brandGreen/90 dark:text-black"
      >
        <FilterIcon />
        <span>
          {filterOptions.find((opt) => opt.value === dateFilter)?.label}
        </span>
      </button>

      {isDateDropdownOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-border bg-background shadow-lg">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setDateFilter(option.value as "all" | "upcoming" | "past");
                setIsDateDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-cardHover"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
