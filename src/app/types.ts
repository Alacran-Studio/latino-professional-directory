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

export type BorderColor = "accent" | "primary" | "brand" | "secondary";
export type IconName = "trophy" | "school" | "handshake" | "group";

export interface CardType {
  title: string;
  icon: IconName;
  description: string;
  borderColor: BorderColor;
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
