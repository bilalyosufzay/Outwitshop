
import { supabase } from "@/integrations/supabase/client";

export interface SponsoredProductSearchResult {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[] | null;
  boostLevel: number;
}

/**
 * Search for sponsored products
 * @param query Search query string
 * @returns Array of sponsored products sorted by boost level
 */
export async function searchSponsoredProducts(query: string): Promise<SponsoredProductSearchResult[]> {
  try {
    // Use a raw SQL query instead of RPC which is causing TypeScript errors
    const { data, error } = await supabase
      .from('sponsored_products')
      .select(`
        id, 
        boost_level,
        products:product_id (
          id, 
          name, 
          price, 
          category, 
          images, 
          image
        )
      `)
      .eq('status', 'active')
      .ilike('products.name', `%${query}%`)
      .order('boost_level', { ascending: false });
    
    if (error) {
      console.error("Error searching sponsored products:", error);
      return [];
    }

    // Transform the result to a more usable format (handle empty data case)
    if (!data || !Array.isArray(data)) {
      console.log("No sponsored products found or invalid data format");
      return [];
    }

    return data.map((item: any) => ({
      id: item.products.id,
      name: item.products.name,
      price: item.products.price,
      category: item.products.category,
      image: item.products.image,
      images: item.products.images,
      boostLevel: item.boost_level
    }));
  } catch (error) {
    console.error("Failed to search sponsored products:", error);
    return [];
  }
}

/**
 * Search for regular marketplace products
 * @param query Search query string
 * @param limit Maximum number of results to return
 * @returns Array of marketplace products matching the query
 */
export async function searchMarketplaceProducts(query: string, limit: number = 20) {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .ilike('name', `%${query}%`)
      .eq('status', 'active')
      .limit(limit);
    
    if (error) {
      console.error("Error searching marketplace products:", error);
      return [];
    }
    
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.original_price,
      category: item.category,
      image: item.image,
      images: item.images,
      description: item.description,
      featured: item.featured,
      trending: item.trending,
      onSale: item.on_sale
    }));
  } catch (error) {
    console.error("Failed to search marketplace products:", error);
    return [];
  }
}

/**
 * Get all marketplace products
 * @param limit Maximum number of products to fetch
 * @returns Array of all marketplace products
 */
export async function getAllProducts(limit: number = 50) {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('status', 'active')
      .limit(limit);
    
    if (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
    
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.original_price,
      category: item.category,
      image: item.image,
      images: item.images,
      description: item.description,
      featured: item.featured,
      trending: item.trending,
      onSale: item.on_sale
    }));
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    return [];
  }
}

/**
 * Get product by ID
 * @param productId Product ID to fetch
 * @returns Product details or null if not found
 */
export async function getProductById(productId: string) {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('id', productId)
      .single();
    
    if (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      originalPrice: data.original_price,
      category: data.category,
      image: data.image,
      images: data.images,
      description: data.description,
      featured: data.featured,
      trending: data.trending,
      onSale: data.on_sale
    };
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    return null;
  }
}
