
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface UserLevelData {
  type: "buyer" | "seller";
  current_level: string;
  points: number;
  total_orders: number;
  total_spent: number;
  total_sales: number;
  average_rating: number;
}

const calculateProgress = (levelData: UserLevelData): number => {
  if (levelData.type === "buyer") {
    if (levelData.current_level === "Newbie Shopper") {
      return Math.min((levelData.total_orders / 10) * 100, 100);
    } else if (levelData.current_level === "Frequent Buyer") {
      return Math.min(((levelData.total_orders - 10) / 15) * 100, 100);
    } else if (levelData.current_level === "VIP Shopper") {
      return Math.min(((levelData.total_orders - 25) / 25) * 100, 100);
    }
  } else {
    if (levelData.current_level === "Starter Seller") {
      return Math.min((levelData.total_sales / 10) * 100, 100);
    } else if (levelData.current_level === "Growing Seller") {
      return Math.min(((levelData.total_sales - 10) / 40) * 100, 100);
    } else if (levelData.current_level === "Top Seller") {
      return Math.min(((levelData.total_sales - 50) / 50) * 100, 100);
    }
  }
  return 100;
};

const getNextLevel = (currentLevel: string): string | undefined => {
  const levels = {
    "Newbie Shopper": "Frequent Buyer",
    "Frequent Buyer": "VIP Shopper",
    "VIP Shopper": "Elite Member",
    "Starter Seller": "Growing Seller",
    "Growing Seller": "Top Seller",
    "Top Seller": "Platinum Seller",
  };
  return levels[currentLevel as keyof typeof levels];
};

export const useUserLevels = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["userLevels", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No user ID provided");

      const { data, error } = await supabase
        .from("user_levels")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      const levels = data.reduce((acc, level) => {
        const progress = calculateProgress(level);
        const nextLevel = getNextLevel(level.current_level);
        
        acc[level.type] = {
          current: level.current_level,
          progress,
          next: nextLevel,
          points: level.points,
        };
        return acc;
      }, {} as Record<string, { current: string; progress: number; next?: string; points: number; }>);

      return levels;
    },
    enabled: !!userId,
  });
};
