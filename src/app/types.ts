export interface DirectoryOrgType {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  website_url: string;
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
  LGBTQ = "LGBTQ+",
}

export enum Category {
  Networking = "Networking",
  Startups = "Startups",
}
