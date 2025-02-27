
import { supabase } from "@/integrations/supabase/client";
import { DrawEntry } from "../../types";
import { LuckyDrawEntry } from "../types/database-types";
import { getCurrentUser } from "../utils/lucky-draw-utils";

/**
 * Fetches entries for the current user
 */
export const fetchUserEntries = async (): Promise<{
  entries: DrawEntry[];
  error: string | null;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) return { entries: [], error: null };

    const { data, error } = await supabase
      .from('lucky_draw_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching user entries:", error);
      return { entries: [], error: "Failed to load entries" };
    }

    if (data) {
      // Cast data to our defined type
      const typedData = data as unknown as LuckyDrawEntry[];
      
      const mappedEntries: DrawEntry[] = typedData.map(entry => ({
        id: entry.id,
        method: entry.method,
        quantity: entry.quantity,
        date: new Date(entry.date),
        description: entry.description || ''
      }));

      return { entries: mappedEntries, error: null };
    }

    return { entries: [], error: null };
  } catch (err) {
    console.error("Error in fetchUserEntries:", err);
    return { entries: [], error: "Failed to load entries" };
  }
};

/**
 * Adds a new entry to the database
 */
export const addEntry = async (
  campaignId: string,
  method: 'purchase' | 'engagement' | 'direct' | 'vip', 
  quantity: number, 
  description: string
): Promise<{
  entry: DrawEntry | null;
  error: string | null;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { 
        entry: null, 
        error: "You must be logged in to add entries" 
      };
    }

    const newEntry = {
      user_id: user.id,
      campaign_id: campaignId,
      method,
      quantity,
      description,
      date: new Date().toISOString(),
      is_used: false
    };

    const { data, error } = await supabase
      .from('lucky_draw_entries')
      .insert(newEntry)
      .select()
      .single();

    if (error) {
      console.error("Error adding entry:", error);
      return { entry: null, error: "Failed to add entry" };
    }

    if (data) {
      // Cast data to our defined type
      const typedData = data as unknown as LuckyDrawEntry;
      
      const mappedEntry: DrawEntry = {
        id: typedData.id,
        method: typedData.method,
        quantity: typedData.quantity,
        date: new Date(typedData.date),
        description: typedData.description || ''
      };

      return { entry: mappedEntry, error: null };
    }

    return { entry: null, error: "Failed to add entry" };
  } catch (err) {
    console.error("Error in addEntry:", err);
    return { entry: null, error: "Failed to add entry" };
  }
};
