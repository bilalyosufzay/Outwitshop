
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// Configure Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      status: 204,
    });
  }
  
  try {
    // Get total product count
    const { count: totalProducts, error: countError } = await supabase
      .from("imported_marketplace_products")
      .select("*", { count: "exact", head: true });
      
    if (countError) {
      console.error("Error counting products:", countError);
      throw countError;
    }
    
    // Get latest import date
    const { data: latestImport, error: importError } = await supabase
      .from("import_logs")
      .select("created_at")
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
      
    // Get marketplace-specific stats
    const { data: marketplaceData, error: marketplaceError } = await supabase
      .from("imported_marketplace_products")
      .select("source, count(*)")
      .group("source");
      
    if (marketplaceError) {
      console.error("Error getting marketplace stats:", marketplaceError);
      throw marketplaceError;
    }
    
    // Get latest update timestamp for each marketplace
    const { data: lastUpdates, error: lastUpdateError } = await supabase
      .from("imported_marketplace_products")
      .select("source, max(last_updated) as last_updated")
      .group("source");
      
    if (lastUpdateError) {
      console.error("Error getting last updates:", lastUpdateError);
      throw lastUpdateError;
    }
    
    // Get affiliate click stats
    const { count: clicksCount, error: clicksError } = await supabase
      .from("affiliate_clicks")
      .select("*", { count: "exact", head: true });
      
    if (clicksError) {
      console.error("Error counting clicks:", clicksError);
      throw clicksError;
    }
    
    // Get conversion stats
    const { count: conversionsCount, error: conversionError } = await supabase
      .from("affiliate_clicks")
      .select("*", { count: "exact", head: true })
      .eq("converted", true);
      
    if (conversionError) {
      console.error("Error counting conversions:", conversionError);
      throw conversionError;
    }
    
    // Format marketplace stats with their last update times
    const marketplaceStats = marketplaceData.map((marketplace) => {
      const lastUpdate = lastUpdates.find(
        (update) => update.source === marketplace.source
      );
      
      return {
        marketplace: marketplace.source,
        productCount: marketplace.count,
        lastUpdated: lastUpdate?.last_updated || null,
        status: lastUpdate?.last_updated ? "success" : "never",
      };
    });
    
    // Calculate conversion rate (default to 0 if no clicks)
    const conversionRate = clicksCount ? (conversionsCount / clicksCount) : 0;
    
    return new Response(
      JSON.stringify({
        totalProducts: totalProducts || 0,
        lastImport: latestImport?.created_at || null,
        marketplaces: marketplaceStats,
        clicksTracked: clicksCount || 0,
        conversionRate: conversionRate,
      }),
      { 
        status: 200, 
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        } 
      }
    );
  } catch (error) {
    console.error("Error fetching marketplace admin stats:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Failed to fetch marketplace stats: ${error.message}`,
      }),
      { 
        status: 500, 
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        } 
      }
    );
  }
});
