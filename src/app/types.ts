export interface DirectoryOrgType {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  industry_tags: Industry[];
  locations: string[];
  latino_serving: boolean;
  affinities: string[];
}

export enum Industry {
  Tech = "Tech",
  Healthcare = "Healthcare",
  Finance = "Finance",
  ProfessionalServices = "Professional Services",
  VentureCapital = "Venture Capital",
  Cybersecurity = "Cybersecurity",
  RealEstate = "Real Estate",
}

export enum Affinity {
  LatinoServing = "Latino-serving",
  WomenServing = "Women-serving",
  Startups = "Startups",
  LGBTQ = "LGBTQ+",
}
