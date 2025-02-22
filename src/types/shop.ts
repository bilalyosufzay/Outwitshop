
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
  verified: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  verification_submitted_at: string | null;
  verification_rejected_reason: string | null;
  verification_documents: VerificationDocument[];
}

export interface VerificationDocument {
  type: 'business_license' | 'id_card' | 'proof_of_address';
  url: string;
  uploaded_at: string;
}
