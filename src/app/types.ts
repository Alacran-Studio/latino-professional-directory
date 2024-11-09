export interface DirectoryOrgType {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  website_url: string;
  industries: IndustryType[];
}

export interface IndustryType {
  id: number;
  name: string;
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
