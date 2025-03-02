
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Configure CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock data generator for search results from various sources
const generateMockSearchResults = (query: string, country: string, sources: string[]) => {
  // Make sure the query is a string
  const searchQuery = String(query).toLowerCase();
  
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

  const searchResults = [];
  const multiplier = priceMultipliers[country] || 1.0;
  
  // Generate 5 results per source
  for (const source of sources) {
    const categories = categoryPools[source] || ['General'];
    const priceRange = priceRanges[source] || { min: 10, max: 100 };
    
    // Generate between 3-8 results per source
    const numResults = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < numResults; i++) {
      const category = categories[i % categories.length];
      const price = (Math.random() * (priceRange.max - priceRange.min) + priceRange.min) * multiplier;
      const hasDiscount = Math.random() > 0.6;
      const originalPrice = hasDiscount ? price * (1 + Math.random() * 0.5) : undefined;
      
      // Generate mock product image URL
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
      
      searchResults.push({
        title: `${searchQuery.toUpperCase()} ${source} ${category} Item ${i+1}`,
        price: price.toFixed(2),
        originalPrice: originalPrice?.toFixed(2),
        category: category,
        source: source,
        externalId: productId,
        url: `https://example.com/${source}/product/${productId}`,
        image: `https://picsum.photos/seed/${imageId}/300/300`,
        images: [
          `https://picsum.photos/seed/${imageId}/300/300`,
          `https://picsum.photos/seed/${imageId+1}/300/300`,
          `https://picsum.photos/seed/${imageId+2}/300/300`
        ],
        description: `This is a product matching your search for "${searchQuery}" from ${source} in the ${category} category.`,
        shippingCountries,
        language
      });
    }
  }

  return searchResults;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { query, country = 'US', sources = ['aliexpress', 'shein'] } = await req.json();
    console.log(`Searching for: "${query}" in ${country}, sources: ${sources.join(', ')}`);

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Search query is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

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

    // In a real implementation, you would make API calls to each marketplace
    // For now, we'll generate mock data based on the query
    const searchResults = generateMockSearchResults(query, country, availableSources);

    return new Response(
      JSON.stringify(searchResults),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error searching external products:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to search external products" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
