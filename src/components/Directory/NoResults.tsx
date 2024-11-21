"use client";

import Image from "next/image";
import Link from "next/link";

export default function NoResults() {
  return (
    <div className="relative z-0 flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <Image
        src="/Search.svg"
        alt="No Results Found"
        width={200}
        height={200}
        className="opacity-75"
      />
      <h3 className="text-lg font-semibold">We couldn’t find any results.</h3>
      <p className="text-sm text-gray-500">
        Try a different search or refine your filters.
      </p>
      <Link
        href="/contact"
        className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-blue-600"
      >
        Submit an Organization
      </Link>
    </div>
  );
}
