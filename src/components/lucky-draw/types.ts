
import { ReactNode } from "react";

export interface Prize {
  id: number;
  name: string;
  color: string;
  icon: ReactNode;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  points?: number;
  quantity?: number;
  claimed?: number;
  description?: string;
  image?: string;
}

export interface PrizeHistoryItem {
  id: string;
  prize: Prize;
  date: Date;
  claimed: boolean;
  claimCode?: string;
  expiresAt?: Date;
}

export interface SpecialEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  prizes: Prize[];
  rules?: string[];
  eligibilityCriteria?: string[];
  sponsor?: string;
  sponsorLogo?: string;
}

export interface DrawEntry {
  id: string;
  method: 'purchase' | 'engagement' | 'direct' | 'vip';
  quantity: number;
  date: Date;
  description: string;
}

export interface DrawCampaign {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'ended';
  prizes: Prize[];
  entryMethods: ('purchase' | 'engagement' | 'direct' | 'vip')[];
  totalEntries: number;
  userEntries: number;
}

export type MissionType = 'review' | 'share' | 'referral' | 'purchase' | 'daily';

export interface Mission {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  reward: number; // Number of entries
  completed: boolean;
  progress?: number;
  total?: number;
}

export interface LuckyDrawSettings {
  purchaseEntryAmount: number; // Amount spent to earn 1 entry
  directEntryEnabled: boolean;
  maxDirectEntries: number;
  vipBonusEntries: number;
  claimPeriodDays: number;
  showWinners: boolean;
}
