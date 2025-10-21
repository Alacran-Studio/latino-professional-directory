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
      className={`decoration-none text-4xl font-bold leading-none tracking-normal md:text-6xl ${className}`}
    >
      {children}
    </h1>
  );
}
