
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
  business_license?: string;
  owner_name: string;
  id_card_number: string;
  address: string;
  phone_number: string;
}
