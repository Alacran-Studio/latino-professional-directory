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
      className={`decoration-none text-lg font-medium leading-snug tracking-normal sm:text-xl lg:text-2xl ${className}`}
    >
      {children}
    </p>
  );
}
