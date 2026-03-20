"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

interface MediaCompletion { logo: boolean; banner: boolean; complete: boolean; }

export function MediaSection({ org, isOnboarding = false, sectionCompletion }: { org: AdminOrg; isOnboarding?: boolean; sectionCompletion?: MediaCompletion }) {
  const router = useRouter();
  const [bannerUrl, setBannerUrl] = useState(org.photo_url ?? "");
  const bannerUrlRef = useRef(org.photo_url ?? "");

  async function handleLogoUpload(url: string) {
    const result = await updateLogoAction(org.id, url);
    if (result?.error) toast.error(result.error);
    else { toast.success("Logo saved."); router.refresh(); }
  }

  async function handleLogoDelete() {
    const result = await updateLogoAction(org.id, "");
    if (result?.error) toast.error(result.error);
    else { toast.success("Logo removed."); router.refresh(); }
  }

  async function handleBannerUpload(url: string) {
    setBannerUrl(url);
    bannerUrlRef.current = url;
    const result = await updateBannerAction(org.id, url, "50% 50%");
    if (result?.error) toast.error(result.error);
    else { toast.success("Banner saved."); router.refresh(); }
  }

  async function handleBannerDelete() {
    setBannerUrl("");
    bannerUrlRef.current = "";
    const result = await updateBannerAction(org.id, "", "50% 50%");
    if (result?.error) toast.error(result.error);
    else { toast.success("Banner removed."); router.refresh(); }
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

      {isOnboarding && sectionCompletion && (
        <div className="rounded-lg border border-border bg-gray-50 p-3 space-y-1.5">
          {[
            { label: "Logo", met: sectionCompletion.logo },
            { label: "Banner Image", met: sectionCompletion.banner },
          ].map(({ label, met }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <span>{met ? "✅" : "⬜"}</span>
              <span className={met ? "text-foreground" : "text-secondary-foreground"}>{label}</span>
            </div>
          ))}
        </div>
      )}

      <CloudinaryUpload
        folder="lpdd/logos"
        label="Organization Logo"
        currentUrl={org.logo_url}
        onUpload={handleLogoUpload}
        onDelete={handleLogoDelete}
        aspectRatio="square"
      />

      <CloudinaryUpload
        folder="lpdd/banners"
        label="Banner Image"
        currentUrl={bannerUrl}
        currentPosition={org.banner_position}
        onUpload={handleBannerUpload}
        onDelete={handleBannerDelete}
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
