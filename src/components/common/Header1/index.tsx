import { getKoulenFontClass } from "@/lib/utils";
import React from "react";

export default function Header1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={`${getKoulenFontClass()} decoration-none text-8xl font-normal uppercase leading-none tracking-normal`}
    >
      {children}
    </h1>
  );
}
