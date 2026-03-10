"use client";

import { useState } from "react";
import Image from "next/image";

const MAX_PHOTOS = 6;

interface GalleryUploadProps {
  initialUrls: string[];
  folder: string;
  onPhotosChange?: (urls: string[]) => void;
}

export function GalleryUpload({ initialUrls, folder, onPhotosChange }: GalleryUploadProps) {
  const [photos, setPhotos] = useState<string[]>(initialUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File): Promise<string | null> {
    const signRes = await fetch("/api/cloudinary/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder }),
    });

    if (!signRes.ok) {
      const signErr = await signRes.json().catch(() => ({}));
      fetch("/api/cloudinary/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "sign", status: signRes.status, error: signErr }),
      }).catch(() => {});
      throw new Error(signRes.status === 401 ? "session_expired" : "sign_failed");
    }

    const { signature, timestamp, cloudName, apiKey } = await signRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
    formData.append("folder", folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();

    if (!data.secure_url) {
      fetch("/api/cloudinary/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "upload", status: res.status, error: data.error }),
      }).catch(() => {});
      throw new Error(data.error?.message ?? "upload_failed");
    }

    return data.secure_url;
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = MAX_PHOTOS - photos.length;
    const toUpload = files.slice(0, remaining);

    if (toUpload.length === 0) return;
    setError(null);
    setUploading(true);

    try {
      const results = await Promise.allSettled(toUpload.map(uploadFile));
      const valid = results
        .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
        .map((r) => r.value);
      const failures = results.filter((r) => r.status === "rejected");

      if (failures.length > 0) {
        const firstErr = (failures[0] as PromiseRejectedResult).reason?.message ?? "";
        if (firstErr === "session_expired") {
          setError("Session expired — please refresh the page and try again.");
        } else {
          setError(`${failures.length} photo(s) failed to upload. Please try again.`);
        }
      }

      if (valid.length > 0) {
        const newPhotos = [...photos, ...valid];
        setPhotos(newPhotos);
        onPhotosChange?.(newPhotos);
      }
    } catch (err) {
      console.error("[GalleryUpload] Unexpected error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function remove(index: number) {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onPhotosChange?.(newPhotos);
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-bold text-foreground">
        Photo Gallery <span className="font-normal text-secondary-foreground">({photos.length}/{MAX_PHOTOS})</span>
      </label>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {photos.map((url, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
            <Image src={url} alt={`Gallery photo ${i + 1}`} fill sizes="150px" className="object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background text-secondary-foreground transition-colors hover:border-primary">
            <span className="text-2xl">{uploading ? "…" : "+"}</span>
            <span className="text-xs">Add photo</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFiles}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
