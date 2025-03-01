
// This is a Supabase Edge Function that searches for products from external sources
// Supports AliExpress, Shein, and Otto

import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// Load environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Mock APIs for now - in a real implementation, you would connect to actual APIs
async function searchAliExpress(query: string): Promise<any[]> {
  console.log(`Searching AliExpress for: ${query}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate 5 mock products
  return Array.from({ length: 5 }, (_, i) => ({
    title: `AliExpress: ${query} Product ${i+1}`,
    price: Math.floor(Math.random() * 100) + 5,
    originalPrice: Math.floor(Math.random() * 150) + 50,
    image: `https://picsum.photos/seed/aliexpress-${query}-${i}/300/300`,
    images: [
      `https://picsum.photos/seed/aliexpress-${query}-${i}/300/300`,
      `https://picsum.photos/seed/aliexpress-${query}-${i}-2/300/300`,
    ],
    category: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Toys'][Math.floor(Math.random() * 5)],
    description: `This is a great ${query} product from AliExpress with amazing features!`,
    externalId: `ali-${Date.now()}-${i}`,
    url: `https://www.aliexpress.com/item/${Date.now()}${i}.html`,
    source: 'AliExpress'
  }));
}

async function searchShein(query: string): Promise<any[]> {
  console.log(`Searching Shein for: ${query}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate 5 mock products
  return Array.from({ length: 5 }, (_, i) => ({
    title: `SHEIN: ${query} Fashion Item ${i+1}`,
    price: Math.floor(Math.random() * 40) + 10,
    originalPrice: Math.floor(Math.random() * 60) + 30,
    image: `https://picsum.photos/seed/shein-${query}-${i}/300/300`,
    images: [
      `https://picsum.photos/seed/shein-${query}-${i}/300/300`,
      `https://picsum.photos/seed/shein-${query}-${i}-2/300/300`,
    ],
    category: ['Women', 'Men', 'Kids', 'Home', 'Beauty'][Math.floor(Math.random() * 5)],
    description: `Trendy ${query} fashion item from SHEIN!`,
    externalId: `shein-${Date.now()}-${i}`,
    url: `https://www.shein.com/item-p-${Date.now()}${i}.html`,
    source: 'Shein'
  }));
}

async function searchOtto(query: string): Promise<any[]> {
  console.log(`Searching Otto for: ${query}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Generate 5 mock products
  return Array.from({ length: 5 }, (_, i) => ({
    title: `OTTO: ${query} Premium Item ${i+1}`,
    price: Math.floor(Math.random() * 150) + 50,
    originalPrice: Math.floor(Math.random() * 200) + 100,
    image: `https://picsum.photos/seed/otto-${query}-${i}/300/300`,
    images: [
      `https://picsum.photos/seed/otto-${query}-${i}/300/300`,
      `https://picsum.photos/seed/otto-${query}-${i}-2/300/300`,
    ],
    category: ['Furniture', 'Fashion', 'Electronics', 'Home', 'Sports'][Math.floor(Math.random() * 5)],
    description: `Premium ${query} item from OTTO Germany!`,
    externalId: `otto-${Date.now()}-${i}`,
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
    const { query, country, sources } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Log search request
    console.log(`External product search: "${query}" for country: ${country}, sources: ${sources.join(',')}`);
    
    // Initialize results array
    let results: any[] = [];
    
    // Search on each platform that's requested
    const searchPromises: Promise<any[]>[] = [];
    
    if (sources.includes('aliexpress')) {
      searchPromises.push(searchAliExpress(query));
    }
    
    if (sources.includes('shein')) {
      searchPromises.push(searchShein(query));
    }
    
    // Only include Otto for German customers
    if (sources.includes('otto') && country === 'DE') {
      searchPromises.push(searchOtto(query));
    }
    
    // Wait for all searches to complete
    const searchResults = await Promise.all(searchPromises);
    
    // Combine and shuffle results
    results = searchResults.flat();
    
    // Shuffle results to mix different sources
    results.sort(() => Math.random() - 0.5);
    
    // Track the search in the database
    await supabase.from('external_product_searches').insert({
      query,
      country,
      sources: sources,
      results_count: results.length
    });

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
