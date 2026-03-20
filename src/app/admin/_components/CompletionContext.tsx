"use client";

import { createContext, useContext, useState } from "react";
import type { OrgCompletion } from "@/lib/admin/computeCompletion";

type BasicInfoSlice = Omit<OrgCompletion["basicInfo"], "complete">;
type MediaSlice = Omit<OrgCompletion["media"], "complete">;
type ClassificationSlice = Omit<OrgCompletion["classification"], "complete">;

interface CompletionContextValue {
  completion: OrgCompletion;
  updateBasicInfo: (data: BasicInfoSlice) => void;
  updateMedia: (data: MediaSlice) => void;
  updateClassification: (data: ClassificationSlice) => void;
}

const CompletionContext = createContext<CompletionContextValue | null>(null);

function buildCompletion(
  basicInfo: BasicInfoSlice,
  media: MediaSlice,
  classification: ClassificationSlice
): OrgCompletion {
  const basicInfoComplete = basicInfo.name && basicInfo.website_url && basicInfo.short_description && basicInfo.description;
  const mediaComplete = media.logo && media.banner;
  const classificationComplete = classification.industry && classification.service && classification.city;

  const requirements = [
    basicInfo.name, basicInfo.website_url, basicInfo.short_description, basicInfo.description,
    media.logo, media.banner,
    classification.industry, classification.service, classification.city,
  ];
  const metCount = requirements.filter(Boolean).length;

  return {
    basicInfo: { ...basicInfo, complete: basicInfoComplete },
    media: { ...media, complete: mediaComplete },
    classification: { ...classification, complete: classificationComplete },
    metCount,
    total: requirements.length,
    allComplete: metCount === requirements.length,
  };
}

export function CompletionProvider({
  children,
  initialCompletion,
}: {
  children: React.ReactNode;
  initialCompletion: OrgCompletion;
}) {
  const [basicInfo, setBasicInfo] = useState<BasicInfoSlice>({
    name: initialCompletion.basicInfo.name,
    website_url: initialCompletion.basicInfo.website_url,
    short_description: initialCompletion.basicInfo.short_description,
    description: initialCompletion.basicInfo.description,
  });
  const [media, setMedia] = useState<MediaSlice>({
    logo: initialCompletion.media.logo,
    banner: initialCompletion.media.banner,
  });
  const [classification, setClassification] = useState<ClassificationSlice>({
    industry: initialCompletion.classification.industry,
    service: initialCompletion.classification.service,
    city: initialCompletion.classification.city,
  });

  return (
    <CompletionContext.Provider
      value={{
        completion: buildCompletion(basicInfo, media, classification),
        updateBasicInfo: setBasicInfo,
        updateMedia: setMedia,
        updateClassification: setClassification,
      }}
    >
      {children}
    </CompletionContext.Provider>
  );
}

export function useCompletion() {
  const ctx = useContext(CompletionContext);
  if (!ctx) throw new Error("useCompletion must be used within CompletionProvider");
  return ctx;
}
