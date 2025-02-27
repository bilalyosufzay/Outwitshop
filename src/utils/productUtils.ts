
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types/product";

export const fetchMarketplaceProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('status', 'active');

    if (error) {
      console.error("Error fetching marketplace products:", error);
      return [];
    }

    // Transform the data to match our Product interface
    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.original_price,
      category: item.category,
      image: item.image,
      images: item.images,
      description: item.description,
      sellerId: item.seller_id,
      shopId: item.shop_id,
      featured: item.featured,
      trending: item.trending,
      onSale: item.on_sale,
      commissionRate: item.commission_rate
    }));
  } catch (error) {
    console.error("Exception fetching marketplace products:", error);
    return [];
  }
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('status', 'active')
      .eq('featured', true)
      .limit(4);

    if (error) {
      console.error("Error fetching featured products:", error);
      return [];
    }

    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.original_price,
      category: item.category,
      image: item.image,
      images: item.images,
      description: item.description,
      sellerId: item.seller_id,
      shopId: item.shop_id,
      featured: item.featured,
      trending: item.trending,
      onSale: item.on_sale,
      commissionRate: item.commission_rate
    }));
  } catch (error) {
    console.error("Exception fetching featured products:", error);
    return [];
  }
};

export const fetchTrendingProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('status', 'active')
      .eq('trending', true)
      .limit(4);

    if (error) {
      console.error("Error fetching trending products:", error);
      return [];
    }

    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.original_price,
      category: item.category,
      image: item.image,
      images: item.images,
      description: item.description,
      sellerId: item.seller_id,
      shopId: item.shop_id,
      featured: item.featured,
      trending: item.trending,
      onSale: item.on_sale,
      commissionRate: item.commission_rate
    }));
  } catch (error) {
    console.error("Exception fetching trending products:", error);
    return [];
  }
};

export const fetchSaleProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('status', 'active')
      .eq('on_sale', true)
      .not('original_price', 'is', null)
      .limit(4);

    if (error) {
      console.error("Error fetching sale products:", error);
      return [];
    }

    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.original_price,
      category: item.category,
      image: item.image,
      images: item.images,
      description: item.description,
      sellerId: item.seller_id,
      shopId: item.shop_id,
      featured: item.featured,
      trending: item.trending,
      onSale: item.on_sale,
      commissionRate: item.commission_rate
    }));
  } catch (error) {
    console.error("Exception fetching sale products:", error);
    return [];
  }
};

// Helper function to calculate commission on a product
export const calculateCommission = (product: Product): number => {
  const commissionRate = product.commissionRate || 10; // Default 10% if not specified
  return (product.price * commissionRate) / 100;
};
