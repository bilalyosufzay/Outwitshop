
// Database schema types for our Supabase tables
export type LuckyDrawCampaign = {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'active' | 'ended';
  entry_methods: string[] | any; // Can be string[] or JSON
  lucky_draw_prizes?: LuckyDrawPrize[];
}

export type LuckyDrawPrize = {
  id: string;
  name: string;
  description?: string;
  color: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  points?: number;
  quantity: number;
  claimed?: number;
  image?: string;
}

export type LuckyDrawEntry = {
  id: string;
  user_id: string;
  campaign_id: string;
  method: 'purchase' | 'engagement' | 'direct' | 'vip';
  quantity: number;
  date: string;
  description?: string;
  reference_id?: string;
  is_used: boolean;
}

export type LuckyDrawMission = {
  id: string;
  type: 'review' | 'share' | 'referral' | 'purchase' | 'daily';
  title: string;
  description?: string;
  reward: number;
  is_active: boolean;
  campaign_id?: string;
}

export type LuckyDrawWinner = {
  id: string;
  user_id: string;
  campaign_id: string;
  prize_id: string;
  entry_id: string;
  date: string;
  claimed: boolean;
  claim_code?: string;
  claimed_at?: string;
  expires_at?: string;
}

export type LuckyDrawCompletedMission = {
  id: string;
  user_id: string;
  mission_id: string;
  completed_at: string;
  entries_awarded: number;
}
