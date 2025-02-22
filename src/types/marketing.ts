
export interface ReferralCode {
  id: string;
  user_id: string;
  code: string;
  type: 'buyer' | 'seller';
  referrals_count: number;
  rewards_earned: number;
  created_at: string;
  expires_at: string | null;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  status: 'pending' | 'completed';
  reward_claimed: boolean;
  created_at: string;
  completed_at: string | null;
}

export interface AffiliateProgram {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  commission_rate: number;
  total_earnings: number;
  payment_info: Record<string, string>;
  created_at: string;
}
