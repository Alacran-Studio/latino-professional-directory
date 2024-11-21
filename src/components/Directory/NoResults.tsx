"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NoResults() {
  const router = useRouter();

  const handleSubmit = () => {
    console.log("Button clicked, navigating to /contact");
    router.push("/contact");
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <Image
        src="/Search.svg"
        alt="No Results Found"
        width={100}
        height={100}
        className="opacity-75"
      />
      <h3 className="text-lg font-semibold">No Results Found</h3>
      <p className="text-sm text-gray-500">
        Try shortening or rephrasing your search.
      </p>
      <button
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit an Organization
      </button>
    </div>
  );
}
