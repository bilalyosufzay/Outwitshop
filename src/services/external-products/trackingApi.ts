
import { supabase } from "@/integrations/supabase/client";

// Track the conversion (user clicked on affiliate link)
export const trackAffiliateClick = async (
  productId: string,
  source: string,
  userId?: string,
  country: string = "US"
): Promise<void> => {
  try {
    await supabase.functions.invoke('track-affiliate-click', {
      body: { 
        productId, 
        source,
        userId: userId || 'anonymous',
        country,
        timestamp: new Date().toISOString()
      }
    });
    console.log(`Tracked affiliate click for ${source} product: ${productId}`);
  } catch (error) {
    console.error("Error tracking affiliate click:", error);
    // Just log the error, don't throw - this shouldn't block user experience
  }
};
