
import { supabase } from "@/integrations/supabase/client";

/**
 * Track when a user clicks on an affiliate link
 * Stores the click in the database for analytics and commission tracking
 */
export const trackAffiliateClick = async (
  productId: string, 
  country: string = 'US',
  source: string = 'unknown'
): Promise<void> => {
  try {
    console.log(`Tracking affiliate click: ${productId} from ${source} in ${country}`);
    
    // Record this click in the database
    await supabase.from('affiliate_clicks').insert({
      product_id: productId,
      source: source,
      country: country
    });
    
    // Call Edge Function if needed for additional processing (uncomment if using edge function)
    /*
    const { error } = await supabase.functions.invoke('track-affiliate-click', {
      body: { 
        productId,
        country,
        source
      }
    });
    
    if (error) {
      console.error('Error calling track-affiliate-click function:', error);
    }
    */
    
  } catch (error) {
    console.error('Error tracking affiliate click:', error);
  }
};
