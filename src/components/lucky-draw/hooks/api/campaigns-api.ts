
import { supabase } from "@/integrations/supabase/client";
import { DrawCampaign } from "../../types";
import { LuckyDrawCampaign, LuckyDrawPrize } from "../types/database-types";
import { getCurrentUser } from "../utils/lucky-draw-utils";

/**
 * Fetches active campaigns from the database
 */
export const fetchActiveCampaigns = async (): Promise<{
  campaigns: DrawCampaign[];
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('lucky_draw_campaigns')
      .select(`
        id,
        name,
        description,
        start_date,
        end_date,
        status,
        entry_methods,
        lucky_draw_prizes (
          id,
          name,
          description,
          color,
          rarity,
          points,
          quantity,
          claimed,
          image
        )
      `)
      .eq('status', 'active');

    if (error) {
      console.error("Error fetching campaigns:", error);
      return { campaigns: [], error: "Failed to load campaigns" };
    }

    if (data && data.length > 0) {
      // Cast data to our defined type
      const typedData = data as unknown as LuckyDrawCampaign[];
      
      const mappedCampaigns: DrawCampaign[] = typedData.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        description: campaign.description,
        startDate: new Date(campaign.start_date),
        endDate: new Date(campaign.end_date),
        status: campaign.status,
        prizes: campaign.lucky_draw_prizes?.map(prize => ({
          id: Number(prize.id), // Convert string ID to number for Prize interface
          name: prize.name,
          description: prize.description,
          color: prize.color,
          icon: null, // We'll need to implement icons based on prize type
          rarity: prize.rarity,
          points: prize.points,
          quantity: prize.quantity,
          claimed: prize.claimed,
          image: prize.image
        })) || [],
        entryMethods: Array.isArray(campaign.entry_methods) 
          ? campaign.entry_methods 
          : (typeof campaign.entry_methods === 'string' 
              ? JSON.parse(campaign.entry_methods) 
              : []),
        totalEntries: 0, // We'll populate this from another query
        userEntries: 0  // We'll populate this from another query
      }));

      return { campaigns: mappedCampaigns, error: null };
    }

    return { campaigns: [], error: null };
  } catch (err) {
    console.error("Error in fetchActiveCampaigns:", err);
    return { campaigns: [], error: "Failed to load campaigns" };
  }
};

/**
 * Fetches statistics for a specific campaign
 */
export const fetchCampaignStatistics = async (campaignId: string): Promise<{
  totalEntries: number;
  userEntries: number;
  error: string | null;
}> => {
  try {
    // Get total entries for this campaign
    const { count: totalCount, error: totalError } = await supabase
      .from('lucky_draw_entries')
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', campaignId);

    if (totalError) {
      console.error("Error fetching campaign stats:", totalError);
      return { totalEntries: 0, userEntries: 0, error: "Failed to load campaign statistics" };
    }

    // Get user entries for this campaign
    const user = await getCurrentUser();
    if (!user) {
      return { totalEntries: totalCount || 0, userEntries: 0, error: null };
    }

    const { count: userCount, error: userError } = await supabase
      .from('lucky_draw_entries')
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', campaignId)
      .eq('user_id', user.id);

    if (userError) {
      console.error("Error fetching user stats:", userError);
      return { totalEntries: totalCount || 0, userEntries: 0, error: "Failed to load user statistics" };
    }

    return { 
      totalEntries: totalCount || 0, 
      userEntries: userCount || 0,
      error: null
    };
  } catch (err) {
    console.error("Error in fetchCampaignStatistics:", err);
    return { totalEntries: 0, userEntries: 0, error: "Failed to load campaign statistics" };
  }
};
