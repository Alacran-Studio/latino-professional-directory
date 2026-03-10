export type OrgStatus = "pending" | "approved" | "rejected";

export type UserRole = "system_admin" | "org_admin";

export interface AdminOrgPhoto {
  id: number;
  url: string;
  display_order: number;
}

export interface AdminOrgRelated {
  id: number;
  name: string;
}

export interface AdminOrg {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  short_description: string | null;
  website_url: string;
  photo_url: string | null;
  banner_position: string | null;
  video_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  x_url: string | null;
  status: OrgStatus;
  is_active: string;
  created_at: string;
  updated_at: string;
  // Related data (populated by fetchOrgById)
  industries?: AdminOrgRelated[];
  services?: AdminOrgRelated[];
  cities?: AdminOrgRelated[];
  affinities?: AdminOrgRelated[];
  gallery_photos?: AdminOrgPhoto[];
}

export interface AdminUser {
  id: number;
  supabase_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface JoinFormData {
  // Step 1: Organization info
  name: string;
  description: string;
  short_description: string;
  website_url: string;

  // Step 2: Contact info
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}
