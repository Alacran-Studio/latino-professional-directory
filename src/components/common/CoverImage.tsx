"use client";

import Image from "next/image";
import { useState } from "react";

interface CoverImageProps {
  src: string;
  fallback: string;
  alt: string;
  objectPosition?: string;
}

export default function CoverImage({ src, fallback, alt, objectPosition = "50% 50%" }: CoverImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="100vw"
      className="object-cover"
      style={{ objectPosition }}
      priority
      onError={() => setImgSrc(fallback)}
    />
  );
}
