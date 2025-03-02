
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// Configure Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Mock implementation - in a real app, this would connect to actual marketplace APIs
async function fetchProductsFromMarketplace(marketplace: string, country: string, limit: number) {
  console.log(`Fetching products from ${marketplace} for country ${country}, limit: ${limit}`);
  
  // This is a mock implementation
  // In a real app, you would use actual marketplace API clients here
  
  const demoProducts = [];
  const categories = ["Clothing", "Electronics", "Home", "Beauty", "Books", "Toys"];
  const currencies = { "US": "USD", "DE": "EUR", "UK": "GBP", "CA": "CAD", "TR": "TRY", "SE": "SEK" };
  
  for (let i = 1; i <= limit; i++) {
    const price = Math.floor(Math.random() * 1000) + 1;
    const originalPrice = Math.random() > 0.3 ? price * 1.2 : null;
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const currencyCode = currencies[country as keyof typeof currencies] || "USD";
    
    demoProducts.push({
      external_id: `${marketplace}-${country}-${Date.now()}-${i}`,
      name: `${marketplace} Product ${i}`,
      description: `This is a demo product from ${marketplace}`,
      price: price,
      original_price: originalPrice,
      image: `https://picsum.photos/seed/${marketplace}${i}/300/300`,
      images: [
        `https://picsum.photos/seed/${marketplace}${i}/300/300`,
        `https://picsum.photos/seed/${marketplace}${i}2/300/300`,
      ],
      category: categories[categoryIndex],
      source: marketplace,
      country_availability: [country],
      external_url: `https://example.com/${marketplace}/product/${i}`,
      affiliate_url: `https://example.com/${marketplace}/affiliate/product/${i}`,
      currency: currencyCode,
      in_stock: Math.random() > 0.1, // 90% of products are in stock
    });
  }
  
  return demoProducts;
}

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
    // Parse request
    const { marketplace, country = "US", limit = 100 } = await req.json();
    
    if (!marketplace) {
      return new Response(
        JSON.stringify({ error: "Marketplace is required" }),
        { 
          status: 400, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
    
    // Create import log
    const { data: logData, error: logError } = await supabase
      .from("import_logs")
      .insert({
        scheduled: false,
        marketplaces: [marketplace],
        status: "started",
        details: `Manual import for ${marketplace} (${country})`,
      })
      .select("id")
      .single();
      
    if (logError) {
      console.error("Error creating import log:", logError);
    }
    
    const logId = logData?.id;
    
    // Fetch products from marketplace API (mocked for now)
    const products = await fetchProductsFromMarketplace(marketplace, country, limit);
    
    // Process and insert products
    let insertedCount = 0;
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      // Check if product already exists
      const { data: existingProduct } = await supabase
        .from("imported_marketplace_products")
        .select("id, external_id")
        .eq("external_id", product.external_id)
        .maybeSingle();
      
      let result;
      if (existingProduct) {
        // Update existing product
        result = await supabase
          .from("imported_marketplace_products")
          .update({
            name: product.name,
            description: product.description,
            price: product.price,
            original_price: product.original_price,
            image: product.image,
            images: product.images,
            category: product.category,
            country_availability: product.country_availability,
            external_url: product.external_url,
            affiliate_url: product.affiliate_url,
            currency: product.currency,
            in_stock: product.in_stock,
            last_updated: new Date().toISOString(),
          })
          .eq("external_id", product.external_id);
          
        if (result.error) {
          console.error("Error updating product:", result.error);
          errorCount++;
        } else {
          updatedCount++;
        }
      } else {
        // Insert new product
        result = await supabase
          .from("imported_marketplace_products")
          .insert(product);
          
        if (result.error) {
          console.error("Error inserting product:", result.error);
          errorCount++;
        } else {
          insertedCount++;
        }
      }
    }
    
    // Update import log
    if (logId) {
      await supabase
        .from("import_logs")
        .update({
          status: "completed",
          results: {
            inserted: insertedCount,
            updated: updatedCount,
            errors: errorCount,
            total: products.length,
          },
        })
        .eq("id", logId);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Import completed: ${insertedCount} products inserted, ${updatedCount} updated, ${errorCount} errors`,
        count: insertedCount + updatedCount,
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
    console.error("Error processing import request:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Import failed: ${error.message}`,
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
