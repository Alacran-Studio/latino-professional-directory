"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface CloudinaryUploadProps {
  folder: string;
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  label: string;
  aspectRatio?: "banner" | "square" | "free";
}

export function CloudinaryUpload({
  folder,
  currentUrl,
  onUpload,
  label,
  aspectRatio = "free",
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);

    try {
      // Get signed params from our API
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      const { signature, timestamp, cloudName, apiKey } = await signRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await uploadRes.json();

      if (data.secure_url) {
        setPreview(data.secure_url);
        onUpload(data.secure_url);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const containerClass =
    aspectRatio === "banner"
      ? "h-36 w-full"
      : aspectRatio === "square"
        ? "h-24 w-24"
        : "h-28 w-full";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-foreground">{label}</label>

      <div
        className={`${containerClass} relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-border bg-background transition-colors hover:border-primary`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <Image src={preview} alt={label} fill className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1 text-secondary-foreground">
            <span className="text-2xl">+</span>
            <span className="text-xs">Click or drag to upload</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-sm text-white">Uploading…</span>
          </div>
        )}
      </div>

      {preview && (
        <button
          type="button"
          className="self-start text-xs text-secondary-foreground underline"
          onClick={() => inputRef.current?.click()}
        >
          Replace image
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
