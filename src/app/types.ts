export interface InternalNavigationLink {
  name: string;
  href: string;
}

export type InternalNavigationLinks = Array<InternalNavigationLink>;

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

export interface CardType {
  title: string;
  icon: string;
  description: string;
  borderColor: "accent" | "primary" | "brand" | "secondary";
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
