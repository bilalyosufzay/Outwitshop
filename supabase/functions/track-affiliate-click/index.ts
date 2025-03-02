
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

// Configure CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request data
    const { productId, source, userId, country, timestamp } = await req.json();

    if (!productId || !source) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: productId and source are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Tracking affiliate click for ${source} product: ${productId}, user: ${userId}, country: ${country}`);

    // Insert the affiliate click tracking data
    const { data, error } = await supabaseClient
      .from('affiliate_clicks')
      .insert([
        {
          product_id: productId,
          source,
          user_id: userId || null,
          country: country || 'US',
          clicked_at: timestamp || new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error tracking affiliate click:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to track affiliate click' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Affiliate click tracked successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
