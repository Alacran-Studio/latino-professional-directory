/**
 * FilterDropdown tests — issues #117 + #118
 *
 * Covers:
 *   - Opening & closing (including dismiss-bug regression)
 *   - Item selection and chip rendering
 *   - Chip removal
 *   - Analytics (onItemSelect prop)
 *   - Two-filter page-level behavior (mutual exclusion, chips, analytics page var)
 */

import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown from "../index";
import { trackFilterApplied, trackFilterRemoved } from "@/lib/analytics";

jest.mock("@/lib/analytics");

const mockTrackFilterApplied = trackFilterApplied as jest.Mock;
const mockTrackFilterRemoved = trackFilterRemoved as jest.Mock;

// ── Fixtures ──────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Healthcare" },
  { id: 3, name: "Finance" },
];

const CITIES = [
  { id: 10, name: "Chicago" },
  { id: 11, name: "New York" },
];

// ── Helper ────────────────────────────────────────────────────────────────────

/** The button reflects open state via its className. */
const dropdownIsOpen = (btn: HTMLElement) =>
  btn.className.includes("rounded-t-lg");

// ── Wrappers ──────────────────────────────────────────────────────────────────

/**
 * Minimal controlled wrapper for isolated single-filter tests.
 */
function SingleFilter({
  items = INDUSTRIES,
  onItemSelect,
  label = "Filter by Industry",
  buttonClassName,
  chipClassName,
}: {
  items?: typeof INDUSTRIES;
  onItemSelect?: (item: string, selected: boolean) => void;
  label?: string;
  buttonClassName?: string;
  chipClassName?: string;
}) {
  const [selected, setSelected] = useState<typeof INDUSTRIES>([]);
  const [open, setOpen] = useState(false);
  return (
    <FilterDropdown
      label={label}
      icon={<span>icon</span>}
      items={items}
      selectedItems={selected}
      setSelectedItems={setSelected}
      isDropdownOpen={open}
      setIsDropdownOpen={setOpen}
      onItemSelect={onItemSelect}
      buttonClassName={buttonClassName}
      chipClassName={chipClassName}
    />
  );
}

/**
 * Mirrors the Directory / Events pattern: two FilterDropdowns sharing a single
 * `openFilter` state, with analytics wired through onItemSelect.
 */
function TwoFilters({ page = "directory" }: { page?: string }) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedIndustries, setSelectedIndustries] = useState<
    typeof INDUSTRIES
  >([]);
  const [selectedCities, setSelectedCities] = useState<typeof CITIES>([]);

  return (
    <div>
      <FilterDropdown
        label="Filter by Industry"
        icon={<span>icon</span>}
        items={INDUSTRIES}
        selectedItems={selectedIndustries}
        setSelectedItems={setSelectedIndustries}
        isDropdownOpen={openFilter === "industry"}
        setIsDropdownOpen={(isOpen) =>
          setOpenFilter(isOpen ? "industry" : null)
        }
        buttonClassName="bg-brandGold"
        onItemSelect={(val, selected) =>
          selected
            ? trackFilterApplied("industry", val, page)
            : trackFilterRemoved("industry", val, page)
        }
      />
      <FilterDropdown
        label="Filter by City"
        icon={<span>icon</span>}
        items={CITIES}
        selectedItems={selectedCities}
        setSelectedItems={setSelectedCities}
        isDropdownOpen={openFilter === "location"}
        setIsDropdownOpen={(isOpen) =>
          setOpenFilter(isOpen ? "location" : null)
        }
        buttonClassName="bg-gray-300"
        chipClassName="bg-gray-300"
        onItemSelect={(val, selected) =>
          selected
            ? trackFilterApplied("location", val, page)
            : trackFilterRemoved("location", val, page)
        }
      />
    </div>
  );
}

// ── Tests: single FilterDropdown ──────────────────────────────────────────────

describe("FilterDropdown", () => {
  // ── Opening & Closing ──────────────────────────────────────────────────────

  describe("Opening and Closing", () => {
    it("opens the dropdown when the filter button is clicked", () => {
      render(<SingleFilter />);
      const btn = screen.getByRole("button", { name: /Filter by Industry/i });

      expect(dropdownIsOpen(btn)).toBe(false);
      fireEvent.click(btn);
      expect(dropdownIsOpen(btn)).toBe(true);
    });

    it("closes the dropdown when the filter button is clicked again — dismiss bug regression", () => {
      // Regression: before the fix, the document mousedown handler would
      // re-open the dropdown after the button's onClick closed it, because
      // the button was not excluded from the outside-click check.
      render(<SingleFilter />);
      const btn = screen.getByRole("button", { name: /Filter by Industry/i });

      fireEvent.click(btn);
      expect(dropdownIsOpen(btn)).toBe(true);

      // Real click sequence: mousedown fires before click.
      // The mousedown handler must return early when the target is the button.
      fireEvent.mouseDown(btn);
      fireEvent.click(btn);

      expect(dropdownIsOpen(btn)).toBe(false);
    });

    it("closes the dropdown when clicking outside", () => {
      render(<SingleFilter />);
      const btn = screen.getByRole("button", { name: /Filter by Industry/i });

      fireEvent.click(btn);
      expect(dropdownIsOpen(btn)).toBe(true);

      fireEvent.mouseDown(document.body);

      expect(dropdownIsOpen(btn)).toBe(false);
    });
  });

  // ── Item Selection ─────────────────────────────────────────────────────────

  describe("Item Selection", () => {
    it("checks the checkbox when an item is selected", () => {
      render(<SingleFilter />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );

      const checkbox = screen.getByRole("checkbox", { name: /Technology/i });
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("shows a chip when an item is selected", () => {
      render(<SingleFilter />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );
      fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));

      expect(
        screen.getByRole("button", { name: /Technology/i })
      ).toBeInTheDocument();
    });

    it("unchecks the checkbox and removes the chip when the item is deselected", () => {
      render(<SingleFilter />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );
      const checkbox = screen.getByRole("checkbox", { name: /Technology/i });

      fireEvent.click(checkbox); // select
      fireEvent.click(checkbox); // deselect

      expect(checkbox).not.toBeChecked();
      expect(
        screen.queryByRole("button", { name: /Technology/i })
      ).not.toBeInTheDocument();
    });

    it("shows a chip for each selected item", () => {
      render(<SingleFilter />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );

      fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));
      fireEvent.click(screen.getByRole("checkbox", { name: /Healthcare/i }));

      expect(
        screen.getByRole("button", { name: /Technology/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Healthcare/i })
      ).toBeInTheDocument();
    });

    it("removes a chip and deselects the item when the chip is clicked", () => {
      render(<SingleFilter />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );
      fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));

      // Chip appears; click it to remove
      fireEvent.click(screen.getByRole("button", { name: /Technology/i }));

      expect(
        screen.queryByRole("button", { name: /Technology/i })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("checkbox", { name: /Technology/i })
      ).not.toBeChecked();
    });

    it("deselecting all items removes all chips", () => {
      render(<SingleFilter />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );

      fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));
      fireEvent.click(screen.getByRole("checkbox", { name: /Healthcare/i }));
      fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));
      fireEvent.click(screen.getByRole("checkbox", { name: /Healthcare/i }));

      expect(
        screen.queryByRole("button", { name: /Technology/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Healthcare/i })
      ).not.toBeInTheDocument();
    });
  });

  // ── Analytics ──────────────────────────────────────────────────────────────

  describe("Analytics (onItemSelect)", () => {
    it("calls onItemSelect with (name, true) when an item is selected", () => {
      const onItemSelect = jest.fn();
      render(<SingleFilter onItemSelect={onItemSelect} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );

      fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));

      expect(onItemSelect).toHaveBeenCalledWith("Technology", true);
    });

    it("calls onItemSelect with (name, false) when an item is deselected via checkbox", () => {
      const onItemSelect = jest.fn();
      render(<SingleFilter onItemSelect={onItemSelect} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );
      const checkbox = screen.getByRole("checkbox", { name: /Technology/i });

      fireEvent.click(checkbox); // select
      fireEvent.click(checkbox); // deselect

      expect(onItemSelect).toHaveBeenLastCalledWith("Technology", false);
    });

    it("does NOT call onItemSelect when a chip is removed", () => {
      // Chip removal goes through removeItem(), which skips onItemSelect.
      // If you want analytics on chip removal, wire it through handleItemChange.
      const onItemSelect = jest.fn();
      render(<SingleFilter onItemSelect={onItemSelect} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Filter by Industry/i })
      );
      fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));

      onItemSelect.mockClear();
      fireEvent.click(screen.getByRole("button", { name: /Technology/i }));

      expect(onItemSelect).not.toHaveBeenCalled();
    });
  });
});

// ── Tests: two FilterDropdowns (page-level) ───────────────────────────────────

describe("Two FilterDropdowns (page-level)", () => {
  it("opening one filter closes the other", () => {
    render(<TwoFilters />);
    const industryBtn = screen.getByRole("button", {
      name: /Filter by Industry/i,
    });
    const locationBtn = screen.getByRole("button", { name: /Filter by City/i });

    fireEvent.click(industryBtn);
    expect(dropdownIsOpen(industryBtn)).toBe(true);
    expect(dropdownIsOpen(locationBtn)).toBe(false);

    fireEvent.click(locationBtn);
    expect(dropdownIsOpen(locationBtn)).toBe(true);
    expect(dropdownIsOpen(industryBtn)).toBe(false);
  });

  it("chips from one filter remain visible while the other filter is open", () => {
    render(<TwoFilters />);

    // Select an industry
    fireEvent.click(
      screen.getByRole("button", { name: /Filter by Industry/i })
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));

    // Open the location filter
    fireEvent.click(screen.getByRole("button", { name: /Filter by City/i }));

    // Industry chip should still be in DOM
    expect(
      screen.getByRole("button", { name: /Technology/i })
    ).toBeInTheDocument();
  });

  it("chips from both filters coexist when both have selections", () => {
    render(<TwoFilters />);

    fireEvent.click(
      screen.getByRole("button", { name: /Filter by Industry/i })
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));

    fireEvent.click(screen.getByRole("button", { name: /Filter by City/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /Chicago/i }));

    expect(
      screen.getByRole("button", { name: /Technology/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Chicago/i })
    ).toBeInTheDocument();
  });

  it('fires trackFilterApplied with page="directory"', () => {
    render(<TwoFilters page="directory" />);
    fireEvent.click(
      screen.getByRole("button", { name: /Filter by Industry/i })
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /Technology/i }));

    expect(mockTrackFilterApplied).toHaveBeenCalledWith(
      "industry",
      "Technology",
      "directory"
    );
  });

  it('fires trackFilterApplied with page="events"', () => {
    render(<TwoFilters page="events" />);
    fireEvent.click(
      screen.getByRole("button", { name: /Filter by Industry/i })
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /Healthcare/i }));

    expect(mockTrackFilterApplied).toHaveBeenCalledWith(
      "industry",
      "Healthcare",
      "events"
    );
  });

  it('fires trackFilterRemoved with correct page on checkbox deselect', () => {
    render(<TwoFilters page="directory" />);
    fireEvent.click(
      screen.getByRole("button", { name: /Filter by Industry/i })
    );
    const checkbox = screen.getByRole("checkbox", { name: /Finance/i });

    fireEvent.click(checkbox); // select
    fireEvent.click(checkbox); // deselect

    expect(mockTrackFilterRemoved).toHaveBeenCalledWith(
      "industry",
      "Finance",
      "directory"
    );
  });

  it("clicking outside closes whichever filter is open", () => {
    render(<TwoFilters />);
    const industryBtn = screen.getByRole("button", {
      name: /Filter by Industry/i,
    });

    fireEvent.click(industryBtn);
    expect(dropdownIsOpen(industryBtn)).toBe(true);

    fireEvent.mouseDown(document.body);

    expect(dropdownIsOpen(industryBtn)).toBe(false);
  });
});
