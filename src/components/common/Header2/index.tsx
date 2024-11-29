import React from "react";

export default function Header2({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-semibold leading-snug sm:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}
