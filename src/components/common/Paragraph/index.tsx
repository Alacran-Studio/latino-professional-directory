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
      className={`decoration-none text-[14px] font-medium leading-snug tracking-normal ${className}`}
    >
      {children}
    </p>
  );
}
