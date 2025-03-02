
// import-marketplace-products/index.ts
// This function imports products from various marketplaces and stores them in the database
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
    // Parse request parameters
    const { marketplace, country, limit = 100 } = await req.json();
    
    console.log(`Starting product import for marketplace: ${marketplace}, country: ${country}, limit: ${limit}`);
    
    // In a real implementation, you would call the respective marketplace API here
    // For this demo, we'll simulate fetching products
    const products = await fetchMarketplaceProducts(marketplace, country, limit);
    
    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ message: `No products found for ${marketplace}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }
    
    // Store products in the database
    const { data, error } = await upsertProductsToDb(supabase, products, marketplace);
    
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully imported ${data.length} products from ${marketplace}`,
        count: data.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error importing products:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Mock function to simulate fetching products from marketplace APIs
async function fetchMarketplaceProducts(marketplace: string, country: string, limit: number) {
  // In a real implementation, this would call the respective marketplace API
  console.log(`Fetching ${limit} products from ${marketplace} for country ${country}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock products
  return Array.from({ length: Math.floor(Math.random() * limit) + 5 }, (_, i) => ({
    externalId: `${marketplace}-${Date.now()}-${i}`,
    name: `${marketplace.toUpperCase()} Test Product ${i + 1}`,
    description: `This is a test product imported from ${marketplace}`,
    price: (Math.random() * 100 + 10).toFixed(2),
    originalPrice: Math.random() > 0.5 ? (Math.random() * 150 + 20).toFixed(2) : null,
    image: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
    category: ['Electronics', 'Fashion', 'Home', 'Beauty'][Math.floor(Math.random() * 4)],
    marketplace,
    countryAvailability: marketplace === 'aliexpress' ? ['US', 'UK', 'DE', 'FR', 'CA'] : 
                        marketplace === 'shein' ? ['US', 'UK', 'DE', 'FR', 'CA', 'TR'] :
                        marketplace === 'otto' ? ['DE', 'AT'] :
                        marketplace === 'zalando' ? ['DE', 'FR', 'UK', 'SE'] : 
                        marketplace === 'harcoo' ? ['DE', 'UK'] :
                        marketplace === 'lounge' ? ['DE', 'UK'] :
                        marketplace === 'flaconi' ? ['DE', 'FR', 'AT'] : ['US'],
    externalUrl: `https://example.com/${marketplace}/product-${i}`,
    currency: country === 'US' || country === 'CA' ? 'USD' : 
              country === 'UK' ? 'GBP' : 
              country === 'DE' || country === 'FR' || country === 'AT' ? 'EUR' :
              country === 'SE' ? 'SEK' :
              country === 'TR' ? 'TRY' : 'USD',
    stock: Math.random() > 0.1 // 90% chance of being in stock
  }));
}

// Insert or update products in the database
async function upsertProductsToDb(supabase, products, source) {
  const timestamp = new Date().toISOString();
  
  // Transform products to match the database schema
  const transformedProducts = products.map(p => ({
    external_id: p.externalId,
    name: p.name,
    description: p.description,
    price: parseFloat(p.price),
    original_price: p.originalPrice ? parseFloat(p.originalPrice) : null,
    image: p.image,
    images: p.images,
    category: p.category,
    source: source.toLowerCase(),
    country_availability: p.countryAvailability,
    external_url: p.externalUrl,
    currency: p.currency,
    in_stock: p.stock,
    last_updated: timestamp,
    affiliate_url: generateAffiliateUrl(p.externalUrl, source, p.externalId)
  }));
  
  // Upsert products to the database
  return await supabase
    .from('imported_marketplace_products')
    .upsert(transformedProducts, { 
      onConflict: 'external_id',
      returning: 'minimal'
    });
}

// Generate affiliate URLs based on marketplace
function generateAffiliateUrl(url: string, source: string, productId: string): string {
  // In a real implementation, these would be your actual affiliate IDs from each program
  const affiliateIds = {
    aliexpress: "marketplace-app-1234",
    shein: "marketplace-app-5678",
    otto: "marketplace-app-9012",
    zalando: "marketplace-app-3456",
    harcoo: "marketplace-app-7890",
    lounge: "marketplace-app-2345",
    flaconi: "marketplace-app-6789"
  };

  // Add affiliate parameters based on the source
  if (source === 'aliexpress') {
    return `${url}?aff_id=${affiliateIds.aliexpress}&product_id=${productId}`;
  } else if (source === 'shein') {
    return `${url}?ref=${affiliateIds.shein}&item=${productId}`;
  } else if (source === 'otto') {
    return `${url}?partner=${affiliateIds.otto}&campaign=marketplace&item=${productId}`;
  } else if (source === 'zalando') {
    return `${url}?partner=${affiliateIds.zalando}&item=${productId}`;
  } else if (source === 'harcoo') {
    return `${url}?aff=${affiliateIds.harcoo}&pid=${productId}`;
  } else if (source === 'lounge') {
    return `${url}?partner=${affiliateIds.lounge}&item=${productId}`;
  } else if (source === 'flaconi') {
    return `${url}?ref=${affiliateIds.flaconi}&item=${productId}`;
  }
  
  // Default fallback
  return url;
}
