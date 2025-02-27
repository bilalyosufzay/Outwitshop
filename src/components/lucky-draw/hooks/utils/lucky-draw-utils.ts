
import { supabase } from "@/integrations/supabase/client";

/**
 * Gets the current authenticated user
 */
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};

/**
 * Updates a user's streak based on their last spin date
 */
export const calculateStreak = (lastSpinDate: string | null, currentStreak: number): number => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  if (lastSpinDate === yesterday) {
    return currentStreak + 1;
  } else if (lastSpinDate !== today) {
    return 1;
  }
  
  return currentStreak;
};
