
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types/product";

// Function to generate affiliate URL based on product and source
const generateAffiliateUrl = (url: string, source: string, productId: string): string => {
  // In a real implementation, these would be your actual affiliate IDs
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
    // AliExpress typically uses something like this
    return `${url}?aff_id=${affiliateIds.aliexpress}&product_id=${productId}`;
  } else if (source === 'shein') {
    // Shein might use a different format
    return `${url}?ref=${affiliateIds.shein}&item=${productId}`;
  } else if (source === 'otto') {
    // Otto might use yet another format
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
};

// Get marketplace availability based on country
const getAvailableMarketplaces = (country: string): string[] => {
  const allMarketplaces = ['aliexpress', 'shein'];
  
  // Add region-specific marketplaces
  if (['DE', 'AT'].includes(country)) {
    allMarketplaces.push('otto');
  }
  
  if (['DE', 'FR', 'UK', 'SE'].includes(country)) {
    allMarketplaces.push('zalando', 'flaconi');
  }
  
  if (['DE', 'UK'].includes(country)) {
    allMarketplaces.push('harcoo', 'lounge');
  }
  
  return allMarketplaces;
};

// Search across external platforms
export const searchExternalProducts = async (
  query: string, 
  country: string = 'US',
  sources: string[] = []
): Promise<Product[]> => {
  try {
    console.log(`Searching external products for: ${query} in ${country}`);
    
    // If no sources specified, get all available for this country
    if (sources.length === 0) {
      sources = getAvailableMarketplaces(country);
    } else {
      // Filter out sources not available in this country
      const availableSources = getAvailableMarketplaces(country);
      sources = sources.filter(source => availableSources.includes(source));
    }
    
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
      
      // Define country availability based on source and country
      let countryAvailability: string[] | undefined;
      
      if (source === 'otto') {
        countryAvailability = ['DE', 'AT'];
      } else if (source === 'zalando') {
        countryAvailability = ['DE', 'FR', 'UK', 'SE'];
      } else if (source === 'harcoo' || source === 'lounge') {
        countryAvailability = ['DE', 'UK'];
      } else if (source === 'flaconi') {
        countryAvailability = ['DE', 'FR', 'AT'];
      }
      
      // Determine if tax is included based on region
      const taxIncluded = ['DE', 'FR', 'UK', 'SE', 'TR'].includes(country);
      
      // Determine currency based on country
      let currency = 'USD';
      if (['DE', 'FR', 'AT'].includes(country)) currency = 'EUR';
      if (country === 'UK') currency = 'GBP';
      if (country === 'CA') currency = 'CAD';
      if (country === 'TR') currency = 'TRY';
      if (country === 'SE') currency = 'SEK';

      return {
        id: `${source}-${externalId}`,
        name: item.title || 'Unknown Product',
        price: Number(item.price) || 0,
        originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
        category: item.category || 'External Product',
        image: item.image || '/placeholder.svg',
        images: item.images || [item.image || '/placeholder.svg'],
        description: item.description,
        externalSource: source as any, // Cast to the union type
        externalId: externalId,
        externalUrl: baseUrl,
        countryAvailability,
        taxIncluded,
        currency,
        language: item.language || 'en',
        shippingCountries: item.shippingCountries,
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
    
    // Get sources available for this country
    const sources = getAvailableMarketplaces(country);
    
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
      
      // Define country availability based on source
      let countryAvailability: string[] | undefined;
      
      if (source === 'otto') {
        countryAvailability = ['DE', 'AT'];
      } else if (source === 'zalando') {
        countryAvailability = ['DE', 'FR', 'UK', 'SE'];
      } else if (source === 'harcoo' || source === 'lounge') {
        countryAvailability = ['DE', 'UK'];
      } else if (source === 'flaconi') {
        countryAvailability = ['DE', 'FR', 'AT'];
      }
      
      // Determine if tax is included based on region
      const taxIncluded = ['DE', 'FR', 'UK', 'SE', 'TR'].includes(country);
      
      // Determine currency based on country
      let currency = 'USD';
      if (['DE', 'FR', 'AT'].includes(country)) currency = 'EUR';
      if (country === 'UK') currency = 'GBP';
      if (country === 'CA') currency = 'CAD';
      if (country === 'TR') currency = 'TRY';
      if (country === 'SE') currency = 'SEK';

      return {
        id: `${source}-${externalId}`,
        name: item.title || 'Unknown Product',
        price: Number(item.price) || 0,
        originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
        category: item.category || 'External Product',
        image: item.image || '/placeholder.svg',
        images: item.images || [item.image || '/placeholder.svg'],
        description: item.description,
        externalSource: source as any, // Cast to the union type
        externalId: externalId,
        externalUrl: baseUrl,
        countryAvailability,
        taxIncluded,
        currency,
        language: item.language || 'en',
        shippingCountries: item.shippingCountries,
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
  userId?: string,
  country?: string
): Promise<void> => {
  try {
    await supabase.functions.invoke('track-affiliate-click', {
      body: { 
        productId, 
        source,
        userId: userId || 'anonymous',
        country: country || 'US',
        timestamp: new Date().toISOString()
      }
    });
    console.log(`Tracked affiliate click for ${source} product: ${productId}`);
  } catch (error) {
    console.error("Error tracking affiliate click:", error);
    // Just log the error, don't throw - this shouldn't block user experience
  }
};

// Get available marketplaces for a specific country
export const getAvailableMarketplacesForCountry = (country: string): Array<{id: string, name: string}> => {
  const marketplaces = [];
  
  // Global marketplaces
  marketplaces.push({ id: 'aliexpress', name: 'AliExpress' });
  marketplaces.push({ id: 'shein', name: 'Shein' });
  
  // Region-specific marketplaces
  if (['DE', 'AT'].includes(country)) {
    marketplaces.push({ id: 'otto', name: 'Otto' });
  }
  
  if (['DE', 'FR', 'UK', 'SE'].includes(country)) {
    marketplaces.push({ id: 'zalando', name: 'Zalando' });
    marketplaces.push({ id: 'flaconi', name: 'Flaconi' });
  }
  
  if (['DE', 'UK'].includes(country)) {
    marketplaces.push({ id: 'harcoo', name: 'Harcoo' });
    marketplaces.push({ id: 'lounge', name: 'Lounge by Zalando' });
  }
  
  return marketplaces;
};

// Get available currencies
export const getAvailableCurrencies = (): Array<{code: string, symbol: string, name: string}> => {
  return [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' }
  ];
};

// Get supported countries for the marketplace
export const getSupportedCountries = (): Array<{code: string, name: string}> => {
  return [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'SE', name: 'Sweden' },
    { code: 'TR', name: 'Turkey' },
    { code: 'AT', name: 'Austria' }
  ];
};
