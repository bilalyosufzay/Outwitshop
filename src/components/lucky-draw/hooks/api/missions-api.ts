
import { supabase } from "@/integrations/supabase/client";
import { Mission } from "../../types";
import { LuckyDrawMission } from "../types/database-types";
import { getCurrentUser } from "../utils/lucky-draw-utils";

/**
 * Fetches available missions from the database
 */
export const fetchAvailableMissions = async (): Promise<{
  missions: Mission[];
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('lucky_draw_missions')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error("Error fetching missions:", error);
      return { missions: [], error: "Failed to load missions" };
    }

    if (data) {
      // Get completed missions for the current user
      const user = await getCurrentUser();
      if (!user) return { missions: [], error: null };
      
      const { data: completedData, error: completedError } = await supabase
        .from('lucky_draw_completed_missions')
        .select('mission_id')
        .eq('user_id', user.id);

      if (completedError) {
        console.error("Error fetching completed missions:", completedError);
      }

      // Create a set of completed mission IDs
      const completedMissionIds = new Set(
        (completedData || []).map((item: any) => item.mission_id)
      );

      // Cast data to our defined type
      const typedData = data as unknown as LuckyDrawMission[];

      const mappedMissions: Mission[] = typedData.map(mission => ({
        id: mission.id,
        type: mission.type,
        title: mission.title,
        description: mission.description || '',
        reward: mission.reward,
        completed: completedMissionIds.has(mission.id),
        // These would need to be added to the schema if we want to track progress
        progress: undefined,
        total: undefined
      }));

      return { missions: mappedMissions, error: null };
    }

    return { missions: [], error: null };
  } catch (err) {
    console.error("Error in fetchAvailableMissions:", err);
    return { missions: [], error: "Failed to load missions" };
  }
};

/**
 * Completes a mission for the current user
 */
export const completeMission = async (
  missionId: string,
  campaignId: string
): Promise<{
  success: boolean;
  reward: number;
  error: string | null;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { 
        success: false, 
        reward: 0,
        error: "You must be logged in to complete missions" 
      };
    }

    // First find the mission details
    const { data: missionData, error: missionFetchError } = await supabase
      .from('lucky_draw_missions')
      .select('*')
      .eq('id', missionId)
      .single();

    if (missionFetchError || !missionData) {
      console.error("Error fetching mission details:", missionFetchError);
      return { success: false, reward: 0, error: "Mission not found" };
    }

    const mission = missionData as unknown as LuckyDrawMission;

    // Mark the mission as completed
    const { error: missionError } = await supabase
      .from('lucky_draw_completed_missions')
      .insert({
        user_id: user.id,
        mission_id: missionId,
        entries_awarded: mission.reward,
        completed_at: new Date().toISOString()
      });

    if (missionError) {
      console.error("Error completing mission:", missionError);
      return { success: false, reward: 0, error: "Failed to complete mission" };
    }

    return { 
      success: true, 
      reward: mission.reward,
      error: null 
    };
  } catch (err) {
    console.error("Error in completeMission:", err);
    return { success: false, reward: 0, error: "Failed to complete mission" };
  }
};
