import React from "react";

export default function Subheading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-lexend text-xl font-medium leading-snug tracking-normal sm:text-2xl ${className}`}
    >
      {children}
    </p>
  );
}
