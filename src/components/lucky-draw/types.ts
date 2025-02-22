
import { LucideIcon } from "lucide-react";

export interface Prize {
  id: number;
  name: string;
  color: string;
  icon: React.ReactNode;
}

export interface PrizeHistoryItem {
  id: string;
  prize: Prize;
  date: Date;
  claimed: boolean;
}
