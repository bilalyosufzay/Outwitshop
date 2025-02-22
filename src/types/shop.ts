
export interface Shop {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  slug: string;
  contact_email: string;
  status: string;
  created_at: string;
  updated_at: string | null;
}
