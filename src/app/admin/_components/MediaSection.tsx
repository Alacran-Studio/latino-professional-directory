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
import { useCompletion } from "./CompletionContext";
import { SectionHeading } from "@/components/admin/SectionHeading";
import { OnboardingChecklist } from "@/components/admin/OnboardingChecklist";
import type { AdminOrg } from "@/types/admin";

export function MediaSection({ org, isOnboarding = false }: { org: AdminOrg; isOnboarding?: boolean }) {
  const { updateMedia } = useCompletion();
  const [bannerUrl, setBannerUrl] = useState(org.photo_url ?? "");
  const bannerUrlRef = useRef(org.photo_url ?? "");
  const [hasLogo, setHasLogo] = useState(!!org.logo_url);
  const [hasBanner, setHasBanner] = useState(!!org.photo_url);
  const [hasGallery, setHasGallery] = useState((org.gallery_photos?.length ?? 0) > 0);

  async function handleLogoUpload(url: string) {
    setHasLogo(true);
    updateMedia({ logo: true, banner: hasBanner });
    const result = await updateLogoAction(org.id, url);
    if (result?.error) { toast.error(result.error); setHasLogo(false); updateMedia({ logo: false, banner: hasBanner }); }
    else { toast.success("Logo saved."); }
  }

  async function handleLogoDelete() {
    setHasLogo(false);
    updateMedia({ logo: false, banner: hasBanner });
    const result = await updateLogoAction(org.id, "");
    if (result?.error) { toast.error(result.error); setHasLogo(true); updateMedia({ logo: true, banner: hasBanner }); }
    else { toast.success("Logo removed."); }
  }

  async function handleBannerUpload(url: string) {
    setBannerUrl(url);
    bannerUrlRef.current = url;
    setHasBanner(true);
    updateMedia({ logo: hasLogo, banner: true });
    const result = await updateBannerAction(org.id, url, "50% 50%");
    if (result?.error) { toast.error(result.error); setHasBanner(false); updateMedia({ logo: hasLogo, banner: false }); }
    else { toast.success("Banner saved."); }
  }

  async function handleBannerDelete() {
    setBannerUrl("");
    bannerUrlRef.current = "";
    setHasBanner(false);
    updateMedia({ logo: hasLogo, banner: false });
    const result = await updateBannerAction(org.id, "", "50% 50%");
    if (result?.error) { toast.error(result.error); setHasBanner(true); updateMedia({ logo: hasLogo, banner: true }); }
    else { toast.success("Banner removed."); }
  }

  async function handlePositionSave(position: string) {
    const result = await updateBannerPositionAction(org.id, position);
    if (result?.error) toast.error(result.error);
    // No success toast for position — too noisy on drag end
  }

  async function handlePhotosChange(urls: string[]) {
    setHasGallery(urls.length > 0);
    const result = await updateGalleryAction(org.id, urls);
    if (result?.error) toast.error(result.error);
    else toast.success("Gallery saved.");
  }

  return (
    <section className="space-y-5">
      <SectionHeading>Media</SectionHeading>

      {isOnboarding && (
        <OnboardingChecklist items={[
          { label: "Logo", met: hasLogo },
          { label: "Banner Image", met: hasBanner },
          { label: "Photo Gallery", met: hasGallery, optional: true },
        ]} />
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
        onPositionSave={handlePositionSave}
        aspectRatio="banner"
      />
      <p className="-mt-1 text-xs text-secondary-foreground">
        Recommended 1200×400px or wider. Drag to reposition — auto-saves on release.
      </p>

      <GalleryUpload
        folder="lpdd/gallery"
        initialUrls={(org.gallery_photos ?? []).map((p) => p.url)}
        onPhotosChange={handlePhotosChange}
      />
    </section>
  );
}
