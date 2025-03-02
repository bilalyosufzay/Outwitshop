
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
    const { scheduled = true } = await req.json();
    
    // Define available marketplaces (in a real app, this would be from a database or config)
    const marketplaces = [
      "aliexpress", "shein", "otto", "zalando", "harcoo", "loungeByZalando", "flaconi"
    ];
    
    // Create import log
    const { data: logData, error: logError } = await supabase
      .from("import_logs")
      .insert({
        scheduled: scheduled,
        marketplaces: marketplaces,
        status: "started",
        details: scheduled ? "Scheduled import" : "Manual bulk import",
      })
      .select("id")
      .single();
      
    if (logError) {
      console.error("Error creating import log:", logError);
    }
    
    const logId = logData?.id;
    
    // Trigger imports for each marketplace
    const importPromises = marketplaces.map(async (marketplace) => {
      try {
        // Call the single marketplace import function
        const response = await fetch(
          `${supabaseUrl}/functions/v1/import-marketplace-products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({ 
              marketplace, 
              country: "US", // Default to US
              limit: 20 // Lower limit for bulk imports
            }),
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to import ${marketplace}: ${response.statusText}`);
        }
        
        const result = await response.json();
        return { marketplace, success: true, count: result.count };
      } catch (error) {
        console.error(`Error importing ${marketplace}:`, error);
        return { marketplace, success: false, error: error.message };
      }
    });
    
    const results = await Promise.all(importPromises);
    
    // Update import log
    if (logId) {
      await supabase
        .from("import_logs")
        .update({
          status: "completed",
          results: results,
        })
        .eq("id", logId);
    }
    
    // Count total successful imports
    const totalImported = results.reduce((sum, result) => {
      return sum + (result.success ? (result.count || 0) : 0);
    }, 0);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Scheduled imports completed: ${totalImported} products imported across ${marketplaces.length} marketplaces`,
        results: results,
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
    console.error("Error processing scheduled imports:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Scheduled imports failed: ${error.message}`,
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
