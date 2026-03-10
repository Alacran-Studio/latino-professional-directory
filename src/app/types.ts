export interface InternalNavigationLink {
  name: string;
  href: string;
}

export type InternalNavigationLinks = Array<InternalNavigationLink>;

export interface AffinityType {
  id: number;
  name: string;
}

export interface OrgPhotoType {
  id: number;
  url: string;
  display_order: number;
}

export interface DirectoryOrgType {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  short_description: string;
  description: string;
  website_url: string;
  industries: IndustryType[];
  services: ServiceType[];
  affinities: AffinityType[];
  gallery_photos: OrgPhotoType[];
  photo_url: string;
  banner_position: string;
  video_url: string;
  linkedin_url: string;
  instagram_url: string;
  facebook_url: string;
  x_url: string;
  cities: CityType[];
  events?: EventType[];
}

export interface IndustryType {
  id: number;
  name: string;
}

export interface ServiceType {
  id: number;
  name: string;
}

export interface CityType {
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

export interface OrganizationsApiResponse {
  organizations: DirectoryOrgType[];
}

export interface IndustriesApiResponse {
  industries: IndustryType[];
}

export interface ServicesApiResponse {
  services: ServiceType[];
}

export interface CitiesApiResponse {
  cities: CityType[];
}

export interface EventType {
  id: number;
  name: string;
  description: string;
  short_description: string;
  event_date: string;
  event_time: string;
  location: string;
  city_id: number;
  registration_url: string;
  photo_url: string;
  video_url: string;
  is_virtual: string;
  organizations: DirectoryOrgType[];
  industries: IndustryType[];
  city: CityType;
}

export interface EventsApiResponse {
  events: EventType[];
}

export interface EventApiResponse {
  event: EventType;
}
