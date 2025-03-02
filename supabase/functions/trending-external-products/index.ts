
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
    const { country, limit = 10, sources = [] } = await req.json()
    const results = []

    console.log(`Fetching trending products for ${country} from sources:`, sources)

    // Create Supabase client for database operations
    const supabase = createClient(
      supabaseUrl || '',
      supabaseServiceKey || ''
    )

    // Check if we have any API keys for the requested sources
    const hasApiKeys = sources.some(source => !!marketplaceApiKeys[source])

    // If we have no valid API keys, try to use cached results from our database
    if (!hasApiKeys) {
      console.log('No valid API keys found, using cached trending products')
      const { data: cachedResults, error } = await supabase
        .from('external_products')
        .select('*')
        .in('source', sources)
        .order('created_at', { ascending: false })
        .limit(limit)

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
          const sourceResults = await getTrendingProductsFromSource(source, country, Math.ceil(limit / sources.length))
          if (sourceResults && sourceResults.length > 0) {
            results.push(...sourceResults)
            
            // Cache results in database
            await cacheProducts(supabase, sourceResults, source)
          }
        } catch (sourceError) {
          console.error(`Error fetching trending from ${source}:`, sourceError)
        }
      })
    )

    // If we have no results from APIs, attempt to use demo data
    if (results.length === 0) {
      console.log('No trending results from APIs, using sample data')
      
      // Generate some sample trending data
      const sampleData = generateTrendingSampleData(sources, country, limit)
      results.push(...sampleData)
    }

    return new Response(
      JSON.stringify(results),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing trending request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function getTrendingProductsFromSource(source, country, limit) {
  console.log(`Getting trending products from ${source} for ${country}, limit: ${limit}`)
  
  const apiKey = marketplaceApiKeys[source]
  
  // This would be replaced with actual API calls to each marketplace
  // Below is a structure for how this might work
  
  switch (source) {
    case 'aliexpress':
      return await getTrendingAliExpressProducts(country, limit, apiKey)
    case 'shein':
      return await getTrendingSheinProducts(country, limit, apiKey)
    case 'otto':
      return await getTrendingOttoProducts(country, limit, apiKey)
    case 'zalando':
      return await getTrendingZalandoProducts(country, limit, apiKey)
    case 'harcoo':
      return await getTrendingHarcooProducts(country, limit, apiKey)
    case 'lounge':
      return await getTrendingLoungeProducts(country, limit, apiKey)
    case 'flaconi':
      return await getTrendingFlaconiProducts(country, limit, apiKey)
    default:
      return []
  }
}

// Example implementation for one API
async function getTrendingAliExpressProducts(country, limit, apiKey) {
  if (!apiKey) {
    console.log('No AliExpress API key available')
    return []
  }
  
  try {
    // Real implementation would make an actual API call
    // This is a placeholder for the API call structure
    const response = await fetch(`https://api.aliexpress.com/v1/products/trending?country=${country}&limit=${limit}`, {
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
      affiliateUrl: product.promotion_link,
      trending: true
    }))
  } catch (error) {
    console.error('Error getting trending AliExpress products:', error)
    return []
  }
}

// Similar functions would be implemented for other marketplaces
async function getTrendingSheinProducts(country, limit, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function getTrendingOttoProducts(country, limit, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function getTrendingZalandoProducts(country, limit, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function getTrendingHarcooProducts(country, limit, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function getTrendingLoungeProducts(country, limit, apiKey) {
  // Similar structure to AliExpress function
  return []
}

async function getTrendingFlaconiProducts(country, limit, apiKey) {
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
    affiliateUrl: p.affiliate_link,
    trending: true
  }))
}

// Generate sample data if no API results
function generateTrendingSampleData(sources, country, limit) {
  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports']
  
  return sources.slice(0, Math.min(sources.length, 3)).flatMap(source => {
    const itemsPerSource = Math.ceil(limit / Math.min(sources.length, 3))
    
    return Array(itemsPerSource).fill(0).map((_, i) => {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const price = (9.99 + (Math.random() * 90)).toFixed(2)
      const hasDiscount = Math.random() > 0.5
      const originalPrice = hasDiscount ? (Number(price) * (1 + (Math.random() * 0.5))).toFixed(2) : null
      
      return {
        title: `Trending ${source} ${category} Item ${i+1}`,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        image: `https://picsum.photos/seed/trend-${source}${i}/400/400`,
        images: [`https://picsum.photos/seed/trend-${source}${i}/400/400`],
        url: `https://example.com/${source}/trending/${i}`,
        category: category,
        description: `This is a trending ${source} product in the ${category} category`,
        source: source,
        externalId: `trending-${source}-${i}`,
        language: country === 'US' ? 'en' : country.toLowerCase(),
        affiliateUrl: `https://example.com/${source}/affiliate/trending/${i}?ref=outwitshop`,
        trending: true
      }
    })
  })
}
