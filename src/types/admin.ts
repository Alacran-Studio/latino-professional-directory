export type OrgStatus = "pending" | "approved" | "rejected";

export type UserRole = "system_admin" | "org_admin";

export interface AdminOrg {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  short_description: string | null;
  website_url: string;
  photo_url: string | null;
  video_url: string | null;
  status: OrgStatus;
  created_at: string;
  updated_at: string;
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
