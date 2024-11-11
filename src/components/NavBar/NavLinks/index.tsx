"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { InternalNavigationLink, InternalNavigationLinks } from "@/app/types";

interface NavLinksProps {
  links: InternalNavigationLinks;
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  const activeClasses = "text-blue-300 underline scale-95";
  const inactiveClasses = "text-white";

  return (
    <div className="hidden md:flex">
      {links.map(({ name, href }) => {
        const isActiveLink = pathname === href;

        return (
          <Link key={name} href={href}>
            <p
              className={`pr-2 text-sm tracking-tighter transition duration-300 ease-in-out md:pl-8 md:tracking-normal ${clsx(isActiveLink ? activeClasses : inactiveClasses)}`}
            >
              {name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
