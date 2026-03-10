"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CloudinaryUploadProps {
  folder: string;
  currentUrl?: string | null;
  currentPosition?: string | null;
  onUpload: (url: string) => void;
  onPositionChange?: (position: string) => void;
  onPositionSave?: (position: string) => void;
  label: string;
  aspectRatio?: "banner" | "square" | "free";
}

export function CloudinaryUpload({
  folder,
  currentUrl,
  currentPosition,
  onUpload,
  onPositionChange,
  onPositionSave,
  label,
  aspectRatio = "free",
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [error, setError] = useState<string | null>(null);

  // Position state for drag-to-reposition (banner only)
  const parsePos = (pos?: string | null) => {
    if (!pos) return { x: 50, y: 50 };
    const [x, y] = pos.replace(/%/g, "").split(" ").map(Number);
    return { x: isNaN(x) ? 50 : x, y: isNaN(y) ? 50 : y };
  };
  const [position, setPosition] = useState(parsePos(currentPosition));
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const positionStr = `${Math.round(position.x)}% ${Math.round(position.y)}%`;
  const positionStrRef = useRef(positionStr);
  positionStrRef.current = positionStr;

  // Emit position changes upward
  useEffect(() => {
    if (aspectRatio === "banner" && onPositionChange) {
      onPositionChange(positionStr);
    }
  }, [positionStr, aspectRatio, onPositionChange]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!preview || aspectRatio !== "banner") return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  }, [preview, aspectRatio, position]);

  useEffect(() => {
    if (!isDragging) return;

    function onMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = e.clientX - dragStart.current.mouseX;
      const dy = e.clientY - dragStart.current.mouseY;
      // Dragging right moves image right → x decreases (showing more left)
      const newX = Math.max(0, Math.min(100, dragStart.current.posX - (dx / rect.width) * 100));
      const newY = Math.max(0, Math.min(100, dragStart.current.posY - (dy / rect.height) * 100));
      setPosition({ x: newX, y: newY });
    }

    function onMouseUp() {
      setIsDragging(false);
      onPositionSave?.(positionStrRef.current);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);

    try {
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
        setPosition({ x: 50, y: 50 }); // reset position on new upload
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
      ? "h-44 w-full"
      : aspectRatio === "square"
        ? "h-24 w-24"
        : "h-28 w-full";

  const isBanner = aspectRatio === "banner";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-foreground">{label}</label>

      <div
        ref={containerRef}
        className={`${containerClass} relative overflow-hidden rounded-lg border-2 border-dashed border-border bg-background transition-colors ${
          isBanner && preview ? "cursor-grab active:cursor-grabbing" : "cursor-pointer hover:border-primary"
        }`}
        onClick={isBanner && preview ? undefined : () => inputRef.current?.click()}
        onMouseDown={onMouseDown}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt={label}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className={aspectRatio === "square" ? "object-contain p-2" : "object-cover"}
              style={isBanner ? { objectPosition: positionStr } : undefined}
              draggable={false}
            />
            {/* Drag hint overlay (banner only) */}
            {isBanner && (
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isDragging ? "opacity-0" : "opacity-0 hover:opacity-100"}`}>
                <div className="rounded-md bg-black/50 px-3 py-1.5 text-xs text-white">
                  Drag to reposition
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={`flex h-full flex-col items-center justify-center gap-1 text-center text-secondary-foreground ${aspectRatio === "square" ? "p-1" : "p-4"}`}>
            <span className="text-2xl">+</span>
            <span className="text-xs">
              {aspectRatio === "square" ? "Upload" : "Click or drag to upload"}
            </span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-sm text-white">Uploading…</span>
          </div>
        )}
      </div>

      {/* Replace + reposition controls for banner */}
      {isBanner && preview && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-xs text-secondary-foreground underline"
            onClick={() => inputRef.current?.click()}
          >
            Replace image
          </button>
          <span className="text-xs text-secondary-foreground">· Drag the image above to reposition</span>
        </div>
      )}

      {/* Replace button for non-banner */}
      {!isBanner && preview && (
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
