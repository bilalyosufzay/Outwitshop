
// This is a Supabase Edge Function to track affiliate clicks and commissions

import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// Load environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle requests to this function
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, source, userId, timestamp } = await req.json();
    
    // Validate required fields
    if (!productId || !source) {
      return new Response(
        JSON.stringify({ error: 'Product ID and source are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Log click
    console.log(`Tracking affiliate click: ${source} product ${productId} by user ${userId}`);
    
    // Insert click record into the database
    const { error } = await supabase.from('affiliate_clicks').insert({
      product_id: productId,
      source: source,
      user_id: userId || null,
      clicked_at: timestamp || new Date().toISOString(),
      commission_rate: 1.0 // 1% commission rate
    });
    
    if (error) {
      console.error('Error recording affiliate click:', error);
      throw error;
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
