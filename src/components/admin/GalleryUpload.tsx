"use client";

import { useState, useRef } from "react";
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
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  async function uploadFile(file: File): Promise<string | null> {
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

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url ?? null;
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = MAX_PHOTOS - photos.length;
    const toUpload = files.slice(0, remaining);

    if (toUpload.length === 0) return;
    setError(null);
    setUploading(true);

    try {
      const urls = await Promise.all(toUpload.map(uploadFile));
      const valid = urls.filter((u): u is string => u !== null);
      const newPhotos = [...photos, ...valid];
      setPhotos(newPhotos);
      onPhotosChange?.(newPhotos);
    } catch {
      setError("Some uploads failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function remove(index: number) {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setConfirmIndex(null);
    onPhotosChange?.(newPhotos);
  }

  function handleDragStart(index: number) {
    dragIndex.current = index;
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setDragOverIndex(index);
  }

  function handleDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault();
    const from = dragIndex.current;
    if (from === null || from === dropIndex) {
      dragIndex.current = null;
      setDragOverIndex(null);
      return;
    }

    const reordered = [...photos];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(dropIndex, 0, moved);

    setPhotos(reordered);
    onPhotosChange?.(reordered);
    dragIndex.current = null;
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    dragIndex.current = null;
    setDragOverIndex(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-bold text-foreground">
        Photo Gallery{" "}
        <span className="font-normal text-secondary-foreground">
          ({photos.length}/{MAX_PHOTOS})
        </span>
      </label>

      {photos.length > 1 && (
        <p className="text-xs text-secondary-foreground">Drag photos to reorder.</p>
      )}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {photos.map((url, i) => (
          <div
            key={url}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={(e) => handleDrop(e, i)}
            onDragEnd={handleDragEnd}
            className={`group relative aspect-square cursor-grab overflow-hidden rounded-lg border transition-all active:cursor-grabbing ${
              dragOverIndex === i
                ? "scale-105 border-primary ring-2 ring-primary"
                : "border-border"
            }`}
          >
            <Image
              src={url}
              alt={`Gallery photo ${i + 1}`}
              fill
              sizes="150px"
              className="pointer-events-none object-cover"
            />

            {confirmIndex === i ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/70 p-1">
                <p className="text-center text-xs font-medium text-white">Remove?</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmIndex(null)}
                    className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium text-white hover:bg-white/30"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmIndex(i)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                ×
              </button>
            )}
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
