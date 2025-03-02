
// schedule-marketplace-imports/index.ts
// This function schedules imports from different marketplaces on a regular basis
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.48.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: 'Server misconfigured - missing Supabase credentials' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { scheduled = false } = await req.json();
    
    console.log(`Running scheduled imports, scheduled flag: ${scheduled}`);
    
    // Define marketplaces and target countries
    const importTasks = [
      { marketplace: 'aliexpress', country: 'US', limit: 100 },
      { marketplace: 'shein', country: 'US', limit: 100 },
      { marketplace: 'otto', country: 'DE', limit: 50 },
      { marketplace: 'zalando', country: 'DE', limit: 75 },
      { marketplace: 'harcoo', country: 'UK', limit: 50 },
      { marketplace: 'lounge', country: 'UK', limit: 50 },
      { marketplace: 'flaconi', country: 'DE', limit: 40 }
    ];
    
    // Log import schedule
    await supabase
      .from('import_logs')
      .insert({
        scheduled: scheduled,
        marketplaces: importTasks.map(t => t.marketplace),
        status: 'started',
        details: `Starting imports for ${importTasks.length} marketplaces`
      });
    
    // Run each import task
    const results = await Promise.allSettled(
      importTasks.map(async task => {
        try {
          const response = await fetch(
            `${supabaseUrl}/functions/v1/import-marketplace-products`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseServiceKey}`
              },
              body: JSON.stringify(task)
            }
          );
          
          if (!response.ok) {
            throw new Error(`Failed to import from ${task.marketplace}: ${response.statusText}`);
          }
          
          const result = await response.json();
          return { marketplace: task.marketplace, success: true, count: result.count };
        } catch (error) {
          console.error(`Error importing from ${task.marketplace}:`, error);
          return { marketplace: task.marketplace, success: false, error: error.message };
        }
      })
    );
    
    // Analyze results
    const successfulImports = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failedImports = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length;
    
    // Log import completion
    await supabase
      .from('import_logs')
      .insert({
        scheduled: scheduled,
        marketplaces: importTasks.map(t => t.marketplace),
        status: 'completed',
        details: `Completed imports: ${successfulImports} successful, ${failedImports} failed`,
        results: results.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason })
      });
    
    // Get import statistics
    const { data: stats, error: statsError } = await supabase
      .from('imported_marketplace_products')
      .select('source, count(*)')
      .group('source');
    
    if (statsError) {
      throw statsError;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Scheduled imports completed: ${successfulImports} successful, ${failedImports} failed`,
        stats: stats
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error scheduling imports:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
