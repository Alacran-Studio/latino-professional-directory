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
      className={`font-body text-base leading-relaxed tracking-normal ${className}`}
    >
      {children}
    </p>
  );
}
