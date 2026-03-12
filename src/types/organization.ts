/**
 * Shared interface for rendering an organization profile.
 *
 * Used by both the public OrganizationProfile component and the admin preview pane.
 * If a field is added, renamed, or removed here, TypeScript will break both
 * consumers — keeping the public page and the admin preview in sync without unit tests.
 */

export interface OrgProfileTag {
  id: number;
  name: string;
}

export interface OrgProfilePhoto {
  id: number;
  url: string;
  display_order: number;
}

export interface OrganizationProfileUI {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  photo_url: string | null;
  banner_position: string | null;
  short_description: string | null;
  description: string | null;
  website_url: string | null;
  video_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  x_url: string | null;
  industries: OrgProfileTag[];
  services: OrgProfileTag[];
  affinities: OrgProfileTag[];
  cities: OrgProfileTag[];
  gallery_photos: OrgProfilePhoto[];
}
