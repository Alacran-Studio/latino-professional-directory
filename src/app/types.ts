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

export enum IconName {
  Trophy = "trophy",
  School = "school",
  Handshake = "handshake",
  Group = "group",
}

export interface CardType {
  title: string;
  icon: IconName;
  description: string;
  borderColor: string;
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
