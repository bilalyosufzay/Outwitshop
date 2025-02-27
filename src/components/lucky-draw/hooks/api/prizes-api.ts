
import { supabase } from "@/integrations/supabase/client";
import { PrizeHistoryItem, Prize } from "../../types";
import { LuckyDrawPrize, LuckyDrawWinner } from "../types/database-types";
import { getCurrentUser } from "../utils/lucky-draw-utils";

/**
 * Fetches prize history for the current user
 */
export const fetchPrizeHistory = async (): Promise<{
  history: PrizeHistoryItem[];
  error: string | null;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) return { history: [], error: null };

    // First, fetch the user's winner records directly
    const { data: winnerData, error: winnerError } = await supabase
      .from('lucky_draw_winners')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (winnerError) {
      console.error("Error fetching prize winners:", winnerError);
      return { history: [], error: "Failed to load prize history" };
    }

    // Type assertion to ensure TypeScript knows the structure
    const winners = winnerData as unknown as LuckyDrawWinner[];

    if (!winners || winners.length === 0) {
      // No prizes won yet
      return { history: [], error: null };
    }

    // Extract prize IDs to fetch their details
    const prizeIds = winners.map(winner => winner.prize_id);

    // Fetch prize details separately
    const { data: prizesData, error: prizesError } = await supabase
      .from('lucky_draw_prizes')
      .select('*')
      .in('id', prizeIds);

    if (prizesError) {
      console.error("Error fetching prize details:", prizesError);
      return { history: [], error: "Failed to load prize details" };
    }

    // Type assertion for prize data
    const prizes = prizesData as unknown as LuckyDrawPrize[];

    if (!prizes || prizes.length === 0) {
      console.error("No prize data found");
      return { history: [], error: "No prize data found" };
    }

    // Create a lookup map for prizes by ID
    const prizesById = new Map<string, LuckyDrawPrize>();
    for (const prize of prizes) {
      prizesById.set(prize.id, prize);
    }

    // Combine winner and prize data
    const mappedPrizeHistory: PrizeHistoryItem[] = [];
    
    for (const winner of winners) {
      const prize = prizesById.get(winner.prize_id);
      if (!prize) continue; // Skip if we can't find the prize details
      
      mappedPrizeHistory.push({
        id: winner.id,
        prize: {
          id: Number(prize.id), // Convert string ID to number for Prize interface
          name: prize.name,
          color: prize.color,
          icon: null,
          description: prize.description,
          rarity: prize.rarity,
          points: prize.points,
          quantity: prize.quantity,
          claimed: prize.claimed,
          image: prize.image
        },
        date: new Date(winner.date),
        claimed: winner.claimed,
        claimCode: winner.claim_code,
        expiresAt: winner.expires_at ? new Date(winner.expires_at) : undefined
      });
    }

    return { history: mappedPrizeHistory, error: null };
  } catch (err) {
    console.error("Error in fetchPrizeHistory:", err);
    return { history: [], error: "Failed to load prize history" };
  }
};

/**
 * Claims a prize for the current user
 */
export const claimPrize = async (prizeId: string): Promise<{
  success: boolean;
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('lucky_draw_winners')
      .update({ 
        claimed: true, 
        claimed_at: new Date().toISOString() 
      })
      .eq('id', prizeId);

    if (error) {
      console.error("Error claiming prize:", error);
      return { success: false, error: "Failed to claim prize" };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Error in claimPrize:", err);
    return { success: false, error: "Failed to claim prize" };
  }
};
