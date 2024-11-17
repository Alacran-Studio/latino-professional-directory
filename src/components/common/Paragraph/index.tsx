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
      className={`decoration-none text-base font-medium leading-none tracking-normal ${className}`}
    >
      {children}
    </p>
  );
}
