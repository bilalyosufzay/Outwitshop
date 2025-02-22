
import { LucideIcon } from "lucide-react";

export interface Prize {
  id: number;
  name: string;
  color: string;
  icon: React.ReactNode;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  points?: number;
}

export interface PrizeHistoryItem {
  id: string;
  prize: Prize;
  date: Date;
  claimed: boolean;
}

export interface SpecialEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  prizes: Prize[];
}
