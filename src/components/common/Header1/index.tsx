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
      className={`font-lexend text-[28px] font-semibold leading-tight tracking-normal md:text-[42px] ${className}`}
    >
      {children}
    </h1>
  );
}
