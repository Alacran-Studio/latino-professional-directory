import React from "react";

export default function Paragraph({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`decoration-none text-base font-medium leading-snug tracking-normal md:text-lg ${className}`}
    >
      {children}
    </p>
  );
}
