
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const marketplaceApiKeys = {
  aliexpress: Deno.env.get('ALIEXPRESS_API_KEY') || '',
  shein: Deno.env.get('SHEIN_API_KEY') || '',
  otto: Deno.env.get('OTTO_API_KEY') || '',
  zalando: Deno.env.get('ZALANDO_API_KEY') || '',
  harcoo: Deno.env.get('HARCOO_API_KEY') || '',
  lounge: Deno.env.get('LOUNGE_API_KEY') || '',
  flaconi: Deno.env.get('FLACONI_API_KEY') || '',
}

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query, country, sources } = await req.json()
    const results = []

    console.log(`Searching: "${query}" in ${country}, sources:`, sources)

    // Create a client with the service role key for database operations
    const supabase = createClient(
      supabaseUrl || '',
      supabaseServiceKey || ''
    )

    // Check if we have any API keys for the requested sources
    const hasApiKeys = sources.some(source => !!marketplaceApiKeys[source])

    // If we have no valid API keys, try to use cached results from our database
    if (!hasApiKeys) {
      console.log('No valid API keys found, using cached results')
      const { data: cachedResults, error } = await supabase
        .from('external_products')
        .select('*')
        .ilike('name', `%${query}%`)
        .in('source', sources)
        .limit(20)

      if (!error && cachedResults?.length) {
        return new Response(
          JSON.stringify(formatProducts(cachedResults, country)),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Process each source in parallel
    await Promise.all(
      sources.map(async (source) => {
        // Skip if no API key
        if (!marketplaceApiKeys[source]) {
          console.log(`No API key for ${source}, skipping`)
          return
        }

        try {
          const sourceResults = await searchProductsFromSource(source, query, country)
          if (sourceResults && sourceResults.length > 0) {
            results.push(...sourceResults)
            
            // Cache results in database for future use
            await cacheProducts(supabase, sourceResults, source)
          }
        } catch (sourceError) {
          console.error(`Error fetching from ${source}:`, sourceError)
        }
      })
    )

    // If we have no results from APIs, attempt to use demo data
    if (results.length === 0) {
      console.log('No results from APIs, using sample data')
      
      // Generate some sample data based on the query
      const sampleData = generateSampleData(query, sources, country)
      results.push(...sampleData)
    }

    return new Response(
      JSON.stringify(results),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function searchProductsFromSource(source, query, country) {
  console.log(`Searching ${source} for "${query}" in ${country}`)
  
  const apiKey = marketplaceApiKeys[source]
  
  // This would be replaced with actual API calls to each marketplace
  // Below is a structure for how this might work
  
  switch (source) {
    case 'aliexpress':
      return await searchAliExpress(query, country, apiKey)
    case 'shein':
      return await searchShein(query, country, apiKey)
    case 'otto':
      return await searchOtto(query, country, apiKey)
    case 'zalando':
      return await searchZalando(query, country, apiKey)
    case 'harcoo':
      return await searchHarcoo(query, country, apiKey)
    case 'lounge':
      return await searchLounge(query, country, apiKey)
    case 'flaconi':
      return await searchFlaconi(query, country, apiKey)
    default:
      return []
  }
}

// Example implementation for one API
async function searchAliExpress(query, country, apiKey) {
  if (!apiKey) {
    console.log('No AliExpress API key available')
    return []
  }
  
  try {
    // Real implementation would make an actual API call
    // This is a placeholder for the API call structure
    const response = await fetch(`https://api.aliexpress.com/v1/products/search?keywords=${encodeURIComponent(query)}&country=${country}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    // If the API is down or returns an error, handle gracefully
    if (!response.ok) {
      console.error(`AliExpress API error: ${response.status} ${response.statusText}`)
      return []
    }
    
    const data = await response.json()
    
    // Map API response to our product format
    return data.products.map(product => ({
      title: product.title,
      price: product.price.value,
      originalPrice: product.original_price?.value,
      image: product.image_url,
      images: product.image_urls,
      url: product.product_url,
      category: product.category_name,
      description: product.description,
      source: 'aliexpress',
      externalId: product.product_id,
      language: country === 'US' ? 'en' : country.toLowerCase(),
      affiliateUrl: product.promotion_link
    }))
  } catch (error) {
    console.error('Error searching AliExpress:', error)
    return []
  }
}

// Similar functions would be implemented for other marketplaces
async function searchShein(query, country, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function searchOtto(query, country, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function searchZalando(query, country, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function searchHarcoo(query, country, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function searchLounge(query, country, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function searchFlaconi(query, country, apiKey) {
  // Similar structure to AliExpress function
  return []
}

// Helper to cache products in the database
async function cacheProducts(supabase, products, source) {
  if (!products || products.length === 0) return
  
  try {
    // Format products for database storage
    const formattedProducts = products.map(p => ({
      name: p.title,
      price: p.price,
      source: source,
      image: p.image,
      affiliate_link: p.affiliateUrl || p.url,
      created_at: new Date()
    }))
    
    // Upsert to avoid duplicates
    const { error } = await supabase
      .from('external_products')
      .upsert(formattedProducts, { 
        onConflict: 'name,source',
        ignoreDuplicates: false 
      })
    
    if (error) {
      console.error('Error caching products:', error)
    }
  } catch (error) {
    console.error('Exception caching products:', error)
  }
}

// Format products from database to match the API format
function formatProducts(dbProducts, country) {
  return dbProducts.map(p => ({
    title: p.name,
    price: p.price,
    image: p.image,
    url: p.affiliate_link,
    source: p.source,
    externalId: p.id,
    language: country === 'US' ? 'en' : country.toLowerCase(),
    affiliateUrl: p.affiliate_link
  }))
}

// Generate sample data if no API results
function generateSampleData(query, sources, country) {
  return sources.slice(0, 3).flatMap(source => {
    return Array(2).fill(0).map((_, i) => ({
      title: `${source.charAt(0).toUpperCase() + source.slice(1)} ${query} Item ${i+1}`,
      price: 19.99 + (i * 10),
      originalPrice: i % 2 === 0 ? 29.99 + (i * 10) : null,
      image: `https://picsum.photos/seed/${source}${i}/400/400`,
      images: [`https://picsum.photos/seed/${source}${i}/400/400`],
      url: `https://example.com/${source}/products/${i}`,
      category: query,
      description: `This is a sample ${source} product for "${query}"`,
      source: source,
      externalId: `sample-${source}-${i}`,
      language: country === 'US' ? 'en' : country.toLowerCase(),
      affiliateUrl: `https://example.com/${source}/affiliate/${i}?ref=outwitshop`
    }))
  })
}
