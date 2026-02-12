"use client";

import Image from "next/image";
import { useState } from "react";

interface CoverImageProps {
  src: string;
  fallback: string;
  alt: string;
}

export default function CoverImage({ src, fallback, alt }: CoverImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover"
      priority
      onError={() => setImgSrc(fallback)}
    />
  );
}
