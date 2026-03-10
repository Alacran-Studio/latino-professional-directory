"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { GalleryUpload } from "@/components/admin/GalleryUpload";
import {
  updateLogoAction,
  updateBannerAction,
  updateBannerPositionAction,
  updateGalleryAction,
} from "../organizations/[id]/_actions/updateMedia";
import type { AdminOrg } from "@/types/admin";

export function MediaSection({ org }: { org: AdminOrg }) {
  const [bannerUrl, setBannerUrl] = useState(org.photo_url ?? "");
  const bannerUrlRef = useRef(org.photo_url ?? "");

  async function handleLogoUpload(url: string) {
    const result = await updateLogoAction(org.id, url);
    if (result?.error) toast.error(result.error);
    else toast.success("Logo saved.");
  }

  async function handleBannerUpload(url: string) {
    setBannerUrl(url);
    bannerUrlRef.current = url;
    const result = await updateBannerAction(org.id, url, "50% 50%");
    if (result?.error) toast.error(result.error);
    else toast.success("Banner saved.");
  }

  async function handlePositionSave(position: string) {
    const result = await updateBannerPositionAction(org.id, position);
    if (result?.error) toast.error(result.error);
    // No success toast for position — too noisy on drag end
  }

  async function handlePhotosChange(urls: string[]) {
    const result = await updateGalleryAction(org.id, urls);
    if (result?.error) toast.error(result.error);
    else toast.success("Gallery saved.");
  }

  return (
    <section className="space-y-5">
      <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
        Media
      </h2>

      <CloudinaryUpload
        folder="lpdd/logos"
        label="Organization Logo"
        currentUrl={org.logo_url}
        onUpload={handleLogoUpload}
        aspectRatio="square"
      />

      <CloudinaryUpload
        folder="lpdd/banners"
        label="Banner Image"
        currentUrl={bannerUrl}
        currentPosition={org.banner_position}
        onUpload={handleBannerUpload}
        onPositionChange={() => {}}
        onPositionSave={handlePositionSave}
        aspectRatio="banner"
      />
      <p className="-mt-1 text-xs text-secondary-foreground">
        Recommended 1200×400px or wider. Drag to reposition — releases auto-save.
      </p>

      <GalleryUpload
        folder="lpdd/gallery"
        initialUrls={(org.gallery_photos ?? []).map((p) => p.url)}
        onPhotosChange={handlePhotosChange}
      />
    </section>
  );
}
