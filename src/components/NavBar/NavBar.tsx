"use client";

import Link from "next/link";
import NavLinks from "./NavLinks/nav-links";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

export default function NavBar() {
  const pathname = usePathname();

  const navClasses = clsx(
    "w-full min-w-[315px] h-12 md:h-14 flex items-center justify-between px-2 bg-slate-900",
    pathname === "/" && "absolute z-10 md:bg-transparent"
  );

  return (
    <nav className={navClasses}>
      <Link href="/" className="mr-12 flex items-center">
        <Image
          src="/logo.svg"
          width={40}
          height={40}
          alt="Logo for Latiné Professional Development Directory"
        />
        <p className="text-xl tracking-tighter text-white">LPDD</p>
      </Link>
      <NavLinks />
    </nav>
  );
}
