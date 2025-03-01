
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types/product";

// Function to generate affiliate URL based on product and source
const generateAffiliateUrl = (url: string, source: string, productId: string): string => {
  // In a real implementation, these would be your actual affiliate IDs
  const affiliateIds = {
    aliexpress: "marketplace-app-1234",
    shein: "marketplace-app-5678",
    otto: "marketplace-app-9012"
  };

  // Add affiliate parameters based on the source
  if (source === 'aliexpress') {
    // AliExpress typically uses something like this
    return `${url}?aff_id=${affiliateIds.aliexpress}&product_id=${productId}`;
  } else if (source === 'shein') {
    // Shein might use a different format
    return `${url}?ref=${affiliateIds.shein}&item=${productId}`;
  } else if (source === 'otto') {
    // Otto might use yet another format
    return `${url}?partner=${affiliateIds.otto}&campaign=marketplace&item=${productId}`;
  }
  
  // Default fallback
  return url;
};

// Search across external platforms
export const searchExternalProducts = async (
  query: string, 
  country: string = 'US',
  sources: string[] = ['aliexpress', 'shein', 'otto']
): Promise<Product[]> => {
  try {
    console.log(`Searching external products for: ${query} in ${country}`);
    
    // Call Supabase edge function to fetch products from external APIs
    const { data, error } = await supabase.functions.invoke('search-external-products', {
      body: { 
        query, 
        country,
        sources
      }
    });
    
    if (error) {
      console.error("Error fetching external products:", error);
      return [];
    }

    if (!data || !Array.isArray(data)) {
      console.error("Invalid response format from external products API");
      return [];
    }

    // Format the response to match our Product interface
    return data.map((item: any) => {
      const source = item.source?.toLowerCase() || 'unknown';
      const baseUrl = item.url || '';
      const externalId = item.externalId || `${source}-${Date.now()}`;
      
      // Make product available only in Germany if it's from Otto
      const countryAvailability = source === 'otto' ? ['DE'] : undefined;

      return {
        id: `${source}-${externalId}`,
        name: item.title || 'Unknown Product',
        price: Number(item.price) || 0,
        originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
        category: item.category || 'External Product',
        image: item.image || '/placeholder.svg',
        images: item.images || [item.image || '/placeholder.svg'],
        description: item.description,
        externalSource: source,
        externalId: externalId,
        externalUrl: baseUrl,
        countryAvailability,
        affiliate: {
          url: generateAffiliateUrl(baseUrl, source, externalId),
          commissionRate: 1.0 // 1% commission
        },
        commissionRate: 1.0 // 1% commission
      };
    });
  } catch (error) {
    console.error("Exception fetching external products:", error);
    return [];
  }
};

// Get trending products from external sources
export const getTrendingExternalProducts = async (
  country: string = 'US',
  limit: number = 10
): Promise<Product[]> => {
  try {
    console.log(`Fetching trending external products for ${country}`);
    
    // Sources to include - exclude Otto for non-German users
    const sources = country === 'DE' 
      ? ['aliexpress', 'shein', 'otto'] 
      : ['aliexpress', 'shein'];
    
    const { data, error } = await supabase.functions.invoke('trending-external-products', {
      body: { 
        country,
        limit,
        sources
      }
    });
    
    if (error) {
      console.error("Error fetching trending external products:", error);
      return [];
    }

    if (!data || !Array.isArray(data)) {
      console.error("Invalid response format from trending external products API");
      return [];
    }

    // Format the response to match our Product interface
    return data.map((item: any) => {
      const source = item.source?.toLowerCase() || 'unknown';
      const baseUrl = item.url || '';
      const externalId = item.externalId || `${source}-${Date.now()}`;
      
      // Make product available only in Germany if it's from Otto
      const countryAvailability = source === 'otto' ? ['DE'] : undefined;

      return {
        id: `${source}-${externalId}`,
        name: item.title || 'Unknown Product',
        price: Number(item.price) || 0,
        originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
        category: item.category || 'External Product',
        image: item.image || '/placeholder.svg',
        images: item.images || [item.image || '/placeholder.svg'],
        description: item.description,
        externalSource: source,
        externalId: externalId,
        externalUrl: baseUrl,
        countryAvailability,
        trending: true,
        affiliate: {
          url: generateAffiliateUrl(baseUrl, source, externalId),
          commissionRate: 1.0 // 1% commission
        },
        commissionRate: 1.0 // 1% commission
      };
    });
  } catch (error) {
    console.error("Exception fetching trending external products:", error);
    return [];
  }
};

// Track the conversion (user clicked on affiliate link)
export const trackAffiliateClick = async (
  productId: string,
  source: string,
  userId?: string
): Promise<void> => {
  try {
    await supabase.functions.invoke('track-affiliate-click', {
      body: { 
        productId, 
        source,
        userId: userId || 'anonymous',
        timestamp: new Date().toISOString()
      }
    });
    console.log(`Tracked affiliate click for ${source} product: ${productId}`);
  } catch (error) {
    console.error("Error tracking affiliate click:", error);
    // Just log the error, don't throw - this shouldn't block user experience
  }
};
