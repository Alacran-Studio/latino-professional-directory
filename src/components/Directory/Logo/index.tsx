"use client";

import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const styles: string = [
  "mb-4",
  "h-36",
  "w-36",
  "flex-shrink-0",
  "rounded-lg",
  "p-2",
  "sm:mb-0",
  "sm:mr-4",
  "sm:h-32",
  "sm:w-32",
  "dark:bg-gradient-to-r",
  "dark:from-logoGradientFrom",
  "dark:via-logoGradientVia",
  "dark:to-logoGradientTo",
].join(" ");

export default function Logo({ src, alt, width, height }: Props) {
  return (
    <div className={styles}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full rounded-md object-scale-down"
      />
    </div>
  );
}
