
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SiteInfo {
  siteName: string;
  siteUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the request body
    const { externalId, source, country, siteInfo } = await req.json();

    console.log(`Processing affiliate click for ${source} product ${externalId} in ${country}`);
    
    // Use default site info if not provided
    const finalSiteInfo: SiteInfo = siteInfo || {
      siteName: 'Outwit Shop',
      siteUrl: 'https://outwitshop.com'
    };
    
    // Validate required fields
    if (!externalId || !source) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Insert the click into the database
    const { error } = await supabase
      .from('affiliate_clicks')
      .insert([
        { 
          external_id: externalId,
          source,
          country,
          site_name: finalSiteInfo.siteName,
          site_url: finalSiteInfo.siteUrl
        }
      ]);

    if (error) {
      console.error('Error inserting affiliate click:', error);
      throw error;
    }

    // Return a successful response
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing affiliate click:', error);
    
    // Return an error response
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
