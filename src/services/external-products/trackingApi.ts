
import { supabase } from "@/integrations/supabase/client";

// Track affiliate link clicks
export const trackAffiliateClick = async (
  externalId: string, 
  source: string, 
  country: string = 'US'
): Promise<void> => {
  try {
    // Call the function to track the click
    const { error } = await supabase.functions.invoke('track-affiliate-click', {
      body: { 
        externalId,
        source,
        country
      }
    });
    
    if (error) {
      console.error("Error tracking affiliate click:", error);
    }
    
    // Log client-side for debugging
    console.log(`Tracking affiliate click: ${source} product ${externalId} in ${country}`);
    
  } catch (err) {
    console.error("Failed to track affiliate click:", err);
  }
};
