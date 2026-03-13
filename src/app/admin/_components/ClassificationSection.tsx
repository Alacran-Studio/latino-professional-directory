"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MultiSelect } from "@/components/admin/MultiSelect";
import { RequestOptionModal } from "@/components/admin/RequestOptionModal";
import { updateClassificationAction } from "../organizations/[id]/_actions/updateClassification";
import type { AdminOrg, AdminOrgRelated } from "@/types/admin";

type Category = "industries" | "services" | "cities" | "communities";

interface ClassificationSectionProps {
  org: AdminOrg;
  allIndustries: AdminOrgRelated[];
  allServices: AdminOrgRelated[];
  allCities: AdminOrgRelated[];
  allCommunities: AdminOrgRelated[];
}

export function ClassificationSection({
  org,
  allIndustries,
  allServices,
  allCities,
  allCommunities,
}: ClassificationSectionProps) {
  const router = useRouter();
  const [industries, setIndustries] = useState<AdminOrgRelated[]>(org.industries ?? []);
  const [services, setServices] = useState<AdminOrgRelated[]>(org.services ?? []);
  const [cities, setCities] = useState<AdminOrgRelated[]>(org.cities ?? []);
  const [communities, setCommunities] = useState<AdminOrgRelated[]>(org.communities ?? []);

  const timers = useRef<Partial<Record<Category, ReturnType<typeof setTimeout>>>>({});

  function handleChange(
    category: Category,
    setter: React.Dispatch<React.SetStateAction<AdminOrgRelated[]>>,
    newItems: AdminOrgRelated[]
  ) {
    setter(newItems); // optimistic update
    if (timers.current[category] !== undefined) clearTimeout(timers.current[category]);
    timers.current[category] = setTimeout(async () => {
      const result = await updateClassificationAction(org.id, category, newItems.map((i) => i.id));
      if (result?.error) {
        toast.error(result.error);
        router.refresh(); // revert to server state on error
      }
    }, 400);
  }

  return (
    <section className="space-y-5">
      <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
        Classification
      </h2>

      <div className="space-y-1.5">
        <MultiSelect label="Focus Industries" name="industry_ids" options={allIndustries}
          selected={industries} onChange={(v) => handleChange("industries", setIndustries, v)} />
        <RequestOptionModal orgName={org.name} orgId={org.id} optionType="industry" />
      </div>

      <div className="space-y-1.5">
        <MultiSelect label="Key Services" name="service_ids" options={allServices}
          selected={services} onChange={(v) => handleChange("services", setServices, v)} />
        <RequestOptionModal orgName={org.name} orgId={org.id} optionType="service" />
      </div>

      <div className="space-y-1.5">
        <MultiSelect label="Communities" name="community_ids" options={allCommunities}
          selected={communities} onChange={(v) => handleChange("communities", setCommunities, v)} />
        <RequestOptionModal orgName={org.name} orgId={org.id} optionType="community" />
      </div>

      <MultiSelect label="Locations" name="city_ids" options={allCities}
        selected={cities} onChange={(v) => handleChange("cities", setCities, v)} />
    </section>
  );
}
