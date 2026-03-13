import { useRef, useEffect, useLayoutEffect, useState, ReactNode } from "react";
import "./checkbox.css";
import XIcon from "@/components/Directory/icons/X";
import Paragraph from "@/components/common/Paragraph";


interface FilterItem {
  id?: number;
  name: string;
}

interface FilterDropdownProps<T extends FilterItem> {
  label: string;
  icon: ReactNode;
  items: T[];
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  buttonClassName?: string;
  chipClassName?: string;
  accentColor?: string;
  widthClassName?: string;
  onItemSelect?: (item: string, selected: boolean) => void;
}

export default function FilterDropdown<T extends FilterItem>({
  label,
  icon,
  items,
  selectedItems,
  setSelectedItems,
  isDropdownOpen,
  setIsDropdownOpen,
  buttonClassName = "bg-brandGold dark:text-black",
  chipClassName = "bg-accent dark:bg-accent",
  accentColor,
  widthClassName = "md:w-1/2",
  onItemSelect,
}: FilterDropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [clampState, setClampState] = useState<{ visibleCount: number; overflow: number } | null>(null);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || selectedItems.length === 0) {
      setClampState(null);
      return;
    }

    const chips = Array.from(el.querySelectorAll("[data-chip]")) as HTMLElement[];
    if (chips.length === 0) return;

    const tops = [...new Set(chips.map((c) => c.offsetTop))].sort((a, b) => a - b);

    if (tops.length <= 2) {
      setClampState(null);
      return;
    }

    const row3Top = tops[2];
    const visibleCount = chips.filter((c) => c.offsetTop < row3Top).length;
    const overflow = chips.length - visibleCount;

    setClampState((prev) =>
      prev?.visibleCount === visibleCount && prev?.overflow === overflow
        ? prev
        : { visibleCount, overflow }
    );
  }, [selectedItems]);

  const overflow = clampState?.overflow ?? 0;
  const visibleItems = clampState ? selectedItems.slice(0, clampState.visibleCount) : selectedItems;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDropdownOpen) return;
      const target = event.target as Node;
      if (
        dropdownRef.current?.contains(target) ||
        dropdownButtonRef.current?.contains(target)
      ) {
        return;
      }
      setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, setIsDropdownOpen]);

  const handleItemChange = (item: T) => {
    const isSelected = selectedItems.some((selected) =>
      item.id !== undefined
        ? selected.id === item.id
        : selected.name === item.name
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((i) =>
          item.id !== undefined ? i.id !== item.id : i.name !== item.name
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    onItemSelect?.(item.name, !isSelected);
  };

  const removeItem = (itemToRemove: T) => {
    setSelectedItems(
      selectedItems.filter((item) =>
        itemToRemove.id !== undefined
          ? item.id !== itemToRemove.id
          : item.name !== itemToRemove.name
      )
    );
  };

  const isItemSelected = (item: T) => {
    return selectedItems.some((selected) =>
      item.id !== undefined
        ? selected.id === item.id
        : selected.name === item.name
    );
  };

  return (
    <div
      className={`relative mt-4 md:mt-0 ${widthClassName}`}
      style={accentColor ? { "--filter-accent-color": accentColor } as React.CSSProperties : undefined}
    >
      {/* Filter Button */}
      <button
        ref={dropdownButtonRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex w-full items-center justify-between px-4 py-2 transition-all duration-300 ease-out hover:shadow-lg md:h-12 ${buttonClassName} ${
          isDropdownOpen
            ? "rounded-t-lg font-semibold"
            : "rounded-lg font-normal"
        }`}
      >
        <div className="flex items-center">
          {icon}
          <Paragraph className="ml-2 text-label font-lexend">{label}</Paragraph>
        </div>
        <div
          className={`ml-2 transition-opacity duration-300 ease-out ${
            isDropdownOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <XIcon />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={dropdownRef}
        className={`absolute z-10 w-full transform bg-background transition-all duration-300 ease-out ${
          isDropdownOpen
            ? "max-h-[500px] translate-y-0 rounded-b-lg border-b border-l border-r border-border p-4 opacity-100 shadow-2xl"
            : "max-h-0 translate-y-0 border-none p-0 opacity-0 shadow-none"
        } overflow-hidden`}
      >
        {items.map((item) => (
          <label
            key={item.id !== undefined ? item.id : item.name}
            className="mb-2 flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              checked={isItemSelected(item)}
              onChange={() => handleItemChange(item)}
            ></input>
            <Paragraph className="text-label font-lexend">{item.name}</Paragraph>
          </label>
        ))}
      </div>

      {/* Item Chips Container */}
      {selectedItems.length > 0 && (
        <div className="relative mt-4">
          {/* Hidden measurement div — always renders all chips at full width for accurate row detection */}
          <div
            ref={measureRef}
            className="invisible absolute w-full flex flex-wrap gap-2 pointer-events-none"
            aria-hidden="true"
          >
            {selectedItems.map((item: T) => (
              <button
                data-chip
                key={item.id !== undefined ? item.id : item.name}
                className={`flex items-center space-x-2 rounded-full px-3 py-1 ${chipClassName}`}
              >
                <Paragraph className="text-label font-lexend">{item.name}</Paragraph>
                <XIcon />
              </button>
            ))}
          </div>

          {/* Visible chips + inline overflow badge */}
          <div className="flex w-full flex-wrap gap-2">
            {visibleItems.map((item: T) => (
              <button
                key={item.id !== undefined ? item.id : item.name}
                onClick={() => removeItem(item)}
                className={`flex items-center space-x-2 rounded-full px-3 py-1 focus:outline-none ${chipClassName}`}
              >
                <Paragraph className="text-label font-lexend">{item.name}</Paragraph>
                <XIcon />
              </button>
            ))}
            {overflow > 0 && (
              <button
                onClick={() => setIsDropdownOpen(true)}
                className="rounded-full border border-border px-3 py-1 text-secondary-foreground hover:bg-muted"
              >
                <Paragraph className="text-label font-lexend">And {overflow} more...</Paragraph>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
