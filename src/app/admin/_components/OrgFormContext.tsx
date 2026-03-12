"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { OrganizationProfileUI } from "@/types/organization";

interface OrgFormContextValue {
  preview: OrganizationProfileUI;
  updatePreview: (partial: Partial<OrganizationProfileUI>) => void;
}

const OrgFormContext = createContext<OrgFormContextValue | null>(null);

export function OrgFormProvider({
  initialOrg,
  children,
}: {
  initialOrg: OrganizationProfileUI;
  children: React.ReactNode;
}) {
  const [preview, setPreview] = useState<OrganizationProfileUI>(initialOrg);

  const updatePreview = useCallback((partial: Partial<OrganizationProfileUI>) => {
    setPreview((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <OrgFormContext.Provider value={{ preview, updatePreview }}>
      {children}
    </OrgFormContext.Provider>
  );
}

export function useOrgFormContext() {
  const ctx = useContext(OrgFormContext);
  if (!ctx) throw new Error("useOrgFormContext must be used within OrgFormProvider");
  return ctx;
}
