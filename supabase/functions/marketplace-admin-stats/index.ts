
// marketplace-admin-stats/index.ts
// This function provides statistics for the admin dashboard
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
    // 1. Get product counts by marketplace
    const { data: productStats, error: productError } = await supabase
      .from('imported_marketplace_products')
      .select('source, count(*)')
      .group('source');
    
    if (productError) throw productError;
    
    // 2. Get click statistics by marketplace
    const { data: clickStats, error: clickError } = await supabase
      .from('affiliate_clicks')
      .select('source, count(*)')
      .group('source');
    
    if (clickError) throw clickError;
    
    // 3. Get conversion statistics
    const { data: conversionStats, error: conversionError } = await supabase
      .from('affiliate_clicks')
      .select('source, count(*)')
      .eq('converted', true)
      .group('source');
    
    if (conversionError) throw conversionError;
    
    // 4. Get recent import logs
    const { data: importLogs, error: logsError } = await supabase
      .from('import_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (logsError) throw logsError;
    
    // 5. Get commission earnings by marketplace
    const { data: commissionStats, error: commissionError } = await supabase
      .from('affiliate_clicks')
      .select('source, sum(commission_amount)')
      .eq('converted', true)
      .group('source');
    
    if (commissionError) throw commissionError;
    
    // Calculate conversion rates and CTR
    const clicksBySource = clickStats.reduce((acc, item) => {
      acc[item.source] = parseInt(item.count);
      return acc;
    }, {});
    
    const conversionsBySource = conversionStats.reduce((acc, item) => {
      acc[item.source] = parseInt(item.count);
      return acc;
    }, {});
    
    const conversionRates = Object.keys(clicksBySource).reduce((acc, source) => {
      const clicks = clicksBySource[source] || 0;
      const conversions = conversionsBySource[source] || 0;
      acc[source] = clicks > 0 ? (conversions / clicks) * 100 : 0;
      return acc;
    }, {});
    
    // Combine all stats
    const combinedStats = productStats.map(item => {
      const source = item.source;
      return {
        marketplace: source,
        productCount: parseInt(item.count),
        clicks: clicksBySource[source] || 0,
        conversions: conversionsBySource[source] || 0,
        conversionRate: conversionRates[source] || 0,
        commission: commissionStats.find(c => c.source === source)?.sum || 0
      };
    });
    
    return new Response(
      JSON.stringify({
        stats: combinedStats,
        recentImports: importLogs,
        lastUpdated: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
