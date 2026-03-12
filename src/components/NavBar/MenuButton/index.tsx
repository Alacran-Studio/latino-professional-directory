"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

export const MenuButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button className="md:hidden" onClick={toggleSidebar}>
      <Bars3Icon width={30} height={30} className="text-white" />
    </button>
  );
};
