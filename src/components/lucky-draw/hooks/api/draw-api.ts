
import { supabase } from "@/integrations/supabase/client";
import { Prize, PrizeHistoryItem } from "../../types";
import { LuckyDrawPrize, LuckyDrawWinner } from "../types/database-types";
import { getCurrentUser } from "../utils/lucky-draw-utils";

/**
 * Enter a lucky draw campaign for the current user
 */
export const enterCampaign = async (campaignId: string): Promise<{
  selectedPrize: Prize | null;
  winnerRecord: PrizeHistoryItem | null;
  error: string | null;
}> => {
  try {
    // Get available entries for this user and campaign
    const user = await getCurrentUser();
    if (!user) {
      return { 
        selectedPrize: null,
        winnerRecord: null,
        error: "You must be logged in to enter the lucky draw"
      };
    }

    const { data: entriesData, error: entriesError } = await supabase
      .from('lucky_draw_entries')
      .select('id')
      .eq('user_id', user.id)
      .eq('campaign_id', campaignId)
      .eq('is_used', false)
      .limit(1);

    if (entriesError || !entriesData || entriesData.length === 0) {
      console.error("Error getting available entries:", entriesError);
      return { 
        selectedPrize: null, 
        winnerRecord: null,
        error: "No available entries found" 
      };
    }

    // Type casting to ensure TypeScript knows the structure
    const entries = entriesData as {id: string}[];
    const entryId = entries[0].id;

    // Get a random prize from the campaign
    const { data: prizesData, error: prizesError } = await supabase
      .from('lucky_draw_prizes')
      .select('*')
      .eq('campaign_id', campaignId)
      .lt('claimed', 'quantity'); // Only select prizes with available quantity

    if (prizesError || !prizesData || prizesData.length === 0) {
      console.error("Error getting prizes:", prizesError);
      return { 
        selectedPrize: null, 
        winnerRecord: null,
        error: "No available prizes found" 
      };
    }

    // Cast data to our defined type
    const typedPrizes = prizesData as unknown as LuckyDrawPrize[];

    // Select a random prize
    const randomPrize = typedPrizes[Math.floor(Math.random() * typedPrizes.length)];
    
    // Insert a winner record
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7); // Default 7 days to claim

    const { data: winnerData, error: winnerError } = await supabase
      .from('lucky_draw_winners')
      .insert({
        user_id: user.id,
        campaign_id: campaignId,
        prize_id: randomPrize.id,
        entry_id: entryId,
        date: new Date().toISOString(),
        claimed: false,
        claim_code: `PRIZE-${Math.floor(100000 + Math.random() * 900000)}`,
        expires_at: expireDate.toISOString()
      })
      .select()
      .single();

    if (winnerError) {
      console.error("Error creating winner record:", winnerError);
      return { 
        selectedPrize: null, 
        winnerRecord: null,
        error: "Failed to record your prize" 
      };
    }

    // Type assertion to ensure TypeScript knows the structure
    const winner = winnerData as unknown as LuckyDrawWinner;

    // Mark the entry as used
    await supabase
      .from('lucky_draw_entries')
      .update({ is_used: true })
      .eq('id', entryId);

    // Increment the claimed count for this prize
    await supabase
      .from('lucky_draw_prizes')
      .update({ 
        claimed: (randomPrize.claimed || 0) + 1 
      })
      .eq('id', randomPrize.id);

    // Convert prize data for the UI
    const mappedPrize: Prize = {
      id: Number(randomPrize.id), // Convert string ID to number for Prize interface
      name: randomPrize.name,
      color: randomPrize.color,
      icon: null,
      description: randomPrize.description,
      rarity: randomPrize.rarity,
      points: randomPrize.points,
      quantity: randomPrize.quantity,
      claimed: (randomPrize.claimed || 0) + 1,
      image: randomPrize.image
    };

    // Create the prize history item
    const newPrize: PrizeHistoryItem = {
      id: winner.id,
      prize: mappedPrize,
      date: new Date(winner.date),
      claimed: winner.claimed,
      claimCode: winner.claim_code,
      expiresAt: winner.expires_at ? new Date(winner.expires_at) : undefined
    };

    return { 
      selectedPrize: mappedPrize, 
      winnerRecord: newPrize,
      error: null 
    };
  } catch (err) {
    console.error("Error in enterCampaign:", err);
    return { 
      selectedPrize: null, 
      winnerRecord: null,
      error: "Failed to enter the campaign" 
    };
  }
};
