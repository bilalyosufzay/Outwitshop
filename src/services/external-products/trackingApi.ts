
import { supabase } from "@/integrations/supabase/client";

interface SiteInfo {
  siteName: string;
  siteUrl: string;
}

/**
 * These are the values you should provide to AliExpress when registering for an affiliate account:
 * - Site Name: "Outwit Shop"
 * - Site URL: Your production URL, e.g., "https://outwitshop.com"
 * 
 * For testing purposes, you can use:
 * - Site URL: "https://ad14e263-92fc-413c-a4ca-e1ae31f9b10f.lovableproject.com"
 */

// The site information to use for affiliate tracking
export const SITE_INFO = {
  siteName: 'Outwit Shop',
  // Replace this with your production URL when going live
  siteUrl: 'https://ad14e263-92fc-413c-a4ca-e1ae31f9b10f.lovableproject.com'
};

// Track affiliate link clicks
export const trackAffiliateClick = async (
  externalId: string, 
  source: string, 
  country: string = 'US',
  siteInfo?: SiteInfo
): Promise<void> => {
  try {
    // Use the provided siteInfo or fall back to the default SITE_INFO
    const trackingSiteInfo = siteInfo || SITE_INFO;
    
    // Call the function to track the click
    const { error } = await supabase.functions.invoke('track-affiliate-click', {
      body: { 
        externalId,
        source,
        country,
        siteInfo: trackingSiteInfo
      }
    });
    
    if (error) {
      console.error("Error tracking affiliate click:", error);
    }
    
    // Log client-side for debugging
    console.log(`Tracking affiliate click: ${source} product ${externalId} in ${country}`);
    console.log(`Using site info: ${trackingSiteInfo.siteName} (${trackingSiteInfo.siteUrl})`);
    
  } catch (err) {
    console.error("Failed to track affiliate click:", err);
  }
};
