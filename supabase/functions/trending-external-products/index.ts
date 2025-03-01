
// Supabase Edge Function to fetch trending products from external e-commerce platforms
// Supports AliExpress, Shein, and Otto

import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// Load environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Mock function to get trending AliExpress products
async function getTrendingAliExpressProducts(limit: number = 10): Promise<any[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate mock trending products
  return Array.from({ length: limit }, (_, i) => ({
    title: `AliExpress Trending Item ${i+1}`,
    price: Math.floor(Math.random() * 100) + 5,
    originalPrice: Math.floor(Math.random() * 150) + 50,
    image: `https://picsum.photos/seed/alitrend-${i}/300/300`,
    images: [
      `https://picsum.photos/seed/alitrend-${i}/300/300`,
      `https://picsum.photos/seed/alitrend-${i}-2/300/300`,
    ],
    category: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Toys'][Math.floor(Math.random() * 5)],
    description: 'This is a trending product on AliExpress with amazing features!',
    externalId: `alitrend-${Date.now()}-${i}`,
    url: `https://www.aliexpress.com/item/${Date.now()}${i}.html`,
    source: 'AliExpress'
  }));
}

// Mock function to get trending Shein products
async function getTrendingSheinProducts(limit: number = 10): Promise<any[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 250));
  
  // Generate mock trending products
  return Array.from({ length: limit }, (_, i) => ({
    title: `SHEIN Trending Fashion ${i+1}`,
    price: Math.floor(Math.random() * 40) + 10,
    originalPrice: Math.floor(Math.random() * 60) + 30,
    image: `https://picsum.photos/seed/sheintrend-${i}/300/300`,
    images: [
      `https://picsum.photos/seed/sheintrend-${i}/300/300`,
      `https://picsum.photos/seed/sheintrend-${i}-2/300/300`,
    ],
    category: ['Women', 'Men', 'Kids', 'Home', 'Beauty'][Math.floor(Math.random() * 5)],
    description: 'Trendy fashion item from SHEIN!',
    externalId: `sheintrend-${Date.now()}-${i}`,
    url: `https://www.shein.com/item-p-${Date.now()}${i}.html`,
    source: 'Shein'
  }));
}

// Mock function to get trending Otto products
async function getTrendingOttoProducts(limit: number = 10): Promise<any[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 350));
  
  // Generate mock trending products
  return Array.from({ length: limit }, (_, i) => ({
    title: `OTTO Premium Trending ${i+1}`,
    price: Math.floor(Math.random() * 150) + 50,
    originalPrice: Math.floor(Math.random() * 200) + 100,
    image: `https://picsum.photos/seed/ottotrend-${i}/300/300`,
    images: [
      `https://picsum.photos/seed/ottotrend-${i}/300/300`,
      `https://picsum.photos/seed/ottotrend-${i}-2/300/300`,
    ],
    category: ['Furniture', 'Fashion', 'Electronics', 'Home', 'Sports'][Math.floor(Math.random() * 5)],
    description: 'Premium trending item from OTTO Germany!',
    externalId: `ottotrend-${Date.now()}-${i}`,
    url: `https://www.otto.de/p/${Date.now()}${i}`,
    source: 'Otto'
  }));
}

// Handle requests to this function
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { country, limit = 12, sources = ['aliexpress', 'shein', 'otto'] } = await req.json();
    
    // Determine how many products to fetch from each source
    const sourcesCount = sources.length;
    const itemsPerSource = Math.ceil(limit / sourcesCount);
    
    // Log request
    console.log(`Fetching trending products for country: ${country}, limit: ${limit}, sources: ${sources.join(',')}`);
    
    // Initialize results array
    let results: any[] = [];
    
    // Get trending products from each platform
    const trendsPromises: Promise<any[]>[] = [];
    
    if (sources.includes('aliexpress')) {
      trendsPromises.push(getTrendingAliExpressProducts(itemsPerSource));
    }
    
    if (sources.includes('shein')) {
      trendsPromises.push(getTrendingSheinProducts(itemsPerSource));
    }
    
    // Only include Otto for German customers
    if (sources.includes('otto') && country === 'DE') {
      trendsPromises.push(getTrendingOttoProducts(itemsPerSource));
    }
    
    // Wait for all trends to complete
    const trendsResults = await Promise.all(trendsPromises);
    
    // Combine results from all sources
    results = trendsResults.flat();
    
    // Shuffle results to mix different sources
    results.sort(() => Math.random() - 0.5);
    
    // Limit to requested number of results
    results = results.slice(0, limit);
    
    return new Response(
      JSON.stringify(results),
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
