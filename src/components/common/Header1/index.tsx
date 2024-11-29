import { getKoulenFontClass } from "@/lib/utils";
import React from "react";

export default function Header1({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`${getKoulenFontClass()} decoration-none text-4xl font-normal uppercase leading-none tracking-normal md:text-6xl ${className}`}
    >
      {children}
    </h1>
  );
}
