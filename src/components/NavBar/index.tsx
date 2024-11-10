"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FullBrand } from "@/components/common/FullBrand";
import { MenuButton } from "@/components/NavBar/MenuButton";
import { InternalNavigationLinks } from "@/app/types";

interface NavBarProps {
  links: InternalNavigationLinks;
}

export default function NavBar({ links }: NavBarProps) {
  const pathname = usePathname();

  const navClasses = clsx(
    "w-full min-w-[315px] h-12 md:h-14 flex items-center justify-between px-2 bg-slate-900",
    pathname === "/" && "absolute z-10 md:bg-transparent"
  );

  return (
    <nav className={navClasses}>
      <Link href="/" className="mr-12 flex items-center">
        <FullBrand />
      </Link>
      <NavLinks links={links} />
      <MenuButton />
    </nav>
  );
}
