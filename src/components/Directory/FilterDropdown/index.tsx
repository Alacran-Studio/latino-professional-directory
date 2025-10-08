import { useRef, useEffect, ReactNode } from "react";
import "../Filter/checkbox.css";
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
  widthClassName?: string;
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
  widthClassName = "md:w-1/2",
}: FilterDropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
  }, [setIsDropdownOpen]);

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
    <div className={`relative mt-4 md:mt-0 ${widthClassName}`}>
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
          <Paragraph className="ml-2">{label}</Paragraph>
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
            <Paragraph>{item.name}</Paragraph>
          </label>
        ))}
      </div>

      {/* Item Chips Container */}
      <div
        className={`flex w-full flex-wrap gap-2 ${
          selectedItems.length === 0 ? "mt-0" : "mt-4"
        } ${isDropdownOpen ? "hidden" : "block"}`}
      >
        {selectedItems.map((item: T) => (
          <button
            key={item.id !== undefined ? item.id : item.name}
            onClick={() => removeItem(item)}
            className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-chipGradientFrom via-chipGradientVia to-chipGradientTo px-3 py-1 focus:outline-none"
          >
            <Paragraph>{item.name}</Paragraph>
            <XIcon />
          </button>
        ))}
      </div>
    </div>
  );
}
