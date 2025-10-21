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
      className={`decoration-none text-[26px] font-bold leading-none tracking-normal md:text-[50px] ${className}`}
    >
      {children}
    </h1>
  );
}
