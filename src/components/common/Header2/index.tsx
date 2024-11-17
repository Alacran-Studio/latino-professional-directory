import React from "react";

export default function Header2({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={`text-2xl font-semibold ${className}`}>{children}</h2>;
}
