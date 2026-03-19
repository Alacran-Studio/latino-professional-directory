"use client";

import { useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { trackDirectorySearch } from "@/lib/analytics";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newValue) {
        params.set("q", newValue);
        trackDirectorySearch(newValue);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 800);
  };

  const handleClear = () => {
    onChange("");
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-foreground" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search organizations..."
        className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
