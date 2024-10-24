"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { MenuIcon } from "@heroicons/react/outline";

export const MenuButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button className="md:hidden" onClick={toggleSidebar}>
      <MenuIcon width={30} height={30} className="text-nav-foreground" />
    </button>
  );
};
