import React from "react";

/**
 * Decorative display heading using Koulen font.
 * Used for large, blocky hero text like "FIND YOUR COMMUNITY" or "UPCOMING EVENTS".
 * Renders as an h2 by default — the semantic H1 should be styled separately for SEO.
 */
export default function DisplayHeading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "span" | "p";
}) {
  return (
    <Tag
      className={`font-koulen text-[48px] leading-none tracking-wide md:text-[80px] lg:text-[96px] ${className}`}
    >
      {children}
    </Tag>
  );
}
