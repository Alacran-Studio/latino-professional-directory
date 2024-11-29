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
      className={`decoration-none text-xl font-medium leading-snug tracking-normal sm:text-3xl ${className}`}
    >
      {children}
    </p>
  );
}
