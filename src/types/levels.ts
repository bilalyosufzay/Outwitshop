
export interface LevelRequirement {
  orders: number;
  spent?: number;  // for buyers
  rating?: number; // for sellers
  sales?: number;  // for sellers
}

export interface Level {
  id: string;
  name: string;
  icon: string;
  requirements: LevelRequirement;
  perks: string[];
  color: string;
}

export interface UserLevel {
  current_level: string;
  progress: {
    orders: number;
    spent: number;
    rating?: number;
    sales?: number;
  };
  next_level?: string;
  points: number;
}
