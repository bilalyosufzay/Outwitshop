
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Configure CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock data generator for trending products from various sources
const generateMockTrendingProducts = (country: string, limit: number, sources: string[]) => {
  // Define category pools for different marketplaces
  const categoryPools = {
    aliexpress: ['Electronics', 'Home & Garden', 'Fashion', 'Toys', 'Beauty'],
    shein: ['Women\'s Clothing', 'Men\'s Clothing', 'Kids', 'Accessories', 'Home Décor'],
    otto: ['Furniture', 'Appliances', 'Fashion', 'Electronics', 'Home'],
    zalando: ['Shoes', 'Clothing', 'Sports', 'Accessories', 'Designer'],
    harcoo: ['Luxury', 'Travel', 'Outdoors', 'Tech', 'Lifestyle'],
    lounge: ['Premium Fashion', 'Designer', 'Exclusive', 'Limited Edition', 'Seasonal'],
    flaconi: ['Perfume', 'Skincare', 'Makeup', 'Haircare', 'Wellness']
  };

  // Define price ranges for different marketplaces and countries
  const priceRanges = {
    aliexpress: { min: 5, max: 50 },
    shein: { min: 8, max: 40 },
    otto: { min: 20, max: 200 },
    zalando: { min: 25, max: 150 },
    harcoo: { min: 30, max: 300 },
    lounge: { min: 40, max: 400 },
    flaconi: { min: 15, max: 100 }
  };

  // Adjust prices based on country/currency
  const priceMultipliers = {
    US: 1.0,    // USD
    CA: 1.35,   // CAD
    UK: 0.8,    // GBP
    DE: 0.9,    // EUR
    FR: 0.9,    // EUR
    SE: 10.5,   // SEK
    TR: 30.0,   // TRY
    AT: 0.9     // EUR
  };

  // Generate fake trending products
  const trendingProducts = [];
  const multiplier = priceMultipliers[country] || 1.0;

  // Evenly distribute products across selected sources
  const productsPerSource = Math.ceil(limit / sources.length);
  
  for (const source of sources) {
    const categories = categoryPools[source] || ['General'];
    const priceRange = priceRanges[source] || { min: 10, max: 100 };
    
    for (let i = 0; i < productsPerSource; i++) {
      if (trendingProducts.length >= limit) break;
      
      const price = (Math.random() * (priceRange.max - priceRange.min) + priceRange.min) * multiplier;
      const hasDiscount = Math.random() > 0.7;
      const originalPrice = hasDiscount ? price * (1 + Math.random() * 0.5) : undefined;
      
      // Generate mock product image URL - in production you'd use real URLs
      const imageId = Math.floor(Math.random() * 1000);
      const productId = `${source}-${Date.now()}-${i}`;
      
      // Set shipping countries based on source
      let shippingCountries;
      if (source === 'otto') {
        shippingCountries = ['DE', 'AT'];
      } else if (source === 'zalando') {
        shippingCountries = ['DE', 'AT', 'FR', 'UK', 'SE'];
      } else if (source === 'harcoo' || source === 'lounge') {
        shippingCountries = ['DE', 'UK', 'FR'];
      } else if (source === 'flaconi') {
        shippingCountries = ['DE', 'AT', 'FR'];
      } else {
        // Global marketplaces
        shippingCountries = ['US', 'CA', 'UK', 'DE', 'FR', 'SE', 'TR', 'AT'];
      }
      
      // Set language based on country
      let language = 'en';
      if (['DE', 'AT'].includes(country)) language = 'de';
      if (country === 'FR') language = 'fr';
      if (country === 'SE') language = 'sv';
      if (country === 'TR') language = 'tr';
      
      trendingProducts.push({
        title: `Trending ${source} ${categories[i % categories.length]} Item ${i+1}`,
        price: price.toFixed(2),
        originalPrice: originalPrice?.toFixed(2),
        category: categories[i % categories.length],
        source: source,
        externalId: productId,
        url: `https://example.com/${source}/product/${productId}`,
        image: `https://picsum.photos/seed/${imageId}/300/300`,
        images: [
          `https://picsum.photos/seed/${imageId}/300/300`,
          `https://picsum.photos/seed/${imageId+1}/300/300`,
          `https://picsum.photos/seed/${imageId+2}/300/300`
        ],
        description: `This is a trending product from ${source} in the ${categories[i % categories.length]} category.`,
        shippingCountries,
        language
      });
    }
  }

  return trendingProducts;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { country = 'US', limit = 10, sources = ['aliexpress', 'shein'] } = await req.json();
    console.log(`Fetching trending external products for ${country}, sources: ${sources.join(', ')}`);

    // Filter sources based on country availability
    let availableSources = [...sources];
    
    // Otto is only available in Germany and Austria
    if (!['DE', 'AT'].includes(country) && availableSources.includes('otto')) {
      availableSources = availableSources.filter(source => source !== 'otto');
    }
    
    // Zalando is available in specific European countries
    if (!['DE', 'AT', 'FR', 'UK', 'SE'].includes(country) && availableSources.includes('zalando')) {
      availableSources = availableSources.filter(source => source !== 'zalando');
    }
    
    // Harcoo and Lounge are available in Germany, UK, and France
    if (!['DE', 'UK', 'FR'].includes(country)) {
      availableSources = availableSources.filter(source => 
        source !== 'harcoo' && source !== 'lounge'
      );
    }
    
    // Flaconi is available in Germany, Austria, and France
    if (!['DE', 'AT', 'FR'].includes(country) && availableSources.includes('flaconi')) {
      availableSources = availableSources.filter(source => source !== 'flaconi');
    }
    
    // In a real implementation, you would make API calls to each marketplace to get trending products
    // For now, we'll generate mock data
    const trendingProducts = generateMockTrendingProducts(country, limit, availableSources);

    return new Response(
      JSON.stringify(trendingProducts),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error generating trending products:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to fetch trending products" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
