
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types/product";
import { getAvailableMarketplaces } from "./marketplaceUtils";
import { mapExternalProductToProduct } from "./productMappers";

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

    // Map the API response to our Product interface
    return data.map((item: any) => mapExternalProductToProduct(item, country));
    
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

    // Map the API response to our Product interface
    return data.map((item: any) => mapExternalProductToProduct(item, country));
    
  } catch (error) {
    console.error("Exception fetching trending external products:", error);
    return [];
  }
};
