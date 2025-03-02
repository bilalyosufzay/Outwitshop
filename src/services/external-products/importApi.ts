
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Run a one-time import for a specific marketplace
export const triggerMarketplaceImport = async (
  marketplace: string,
  country: string = 'US',
  limit: number = 100
): Promise<{success: boolean, message: string, count?: number}> => {
  try {
    const { data, error } = await supabase.functions.invoke('import-marketplace-products', {
      body: { 
        marketplace, 
        country,
        limit
      }
    });
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      message: data.message,
      count: data.count
    };
  } catch (error: any) {
    console.error("Error triggering marketplace import:", error);
    toast.error(`Failed to import from ${marketplace}`);
    return {
      success: false,
      message: `Failed to import from ${marketplace}: ${error.message}`
    };
  }
};

// Trigger a scheduled import across all marketplaces
export const triggerScheduledImports = async (): Promise<{success: boolean, message: string}> => {
  try {
    const { data, error } = await supabase.functions.invoke('schedule-marketplace-imports', {
      body: { 
        scheduled: false // Manual trigger
      }
    });
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      message: data.message
    };
  } catch (error: any) {
    console.error("Error triggering scheduled imports:", error);
    toast.error("Failed to run scheduled imports");
    return {
      success: false,
      message: `Failed to run imports: ${error.message}`
    };
  }
};

// Get admin statistics for marketplace imports
export const getMarketplaceAdminStats = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('marketplace-admin-stats', {
      body: {}
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error: any) {
    console.error("Error fetching marketplace admin stats:", error);
    toast.error("Failed to load marketplace statistics");
    throw error;
  }
};

// Fetch imported products from a specific marketplace
export const getImportedProducts = async (
  marketplace?: string,
  limit: number = 20,
  page: number = 1
) => {
  try {
    // Handle the situation where the imported_marketplace_products table may not yet exist
    // by using a type cast to any
    let query = supabase
      .from('imported_marketplace_products' as any)
      .select('*', { count: 'exact' })
      .order('last_updated', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    
    if (marketplace) {
      query = query.eq('source', marketplace);
    }
    
    const { data, error, count } = await query;
    
    if (error) {
      throw error;
    }
    
    return { 
      products: data || [],
      totalCount: count || 0,
      page,
      limit
    };
  } catch (error: any) {
    console.error("Error fetching imported products:", error);
    toast.error("Failed to load imported products");
    throw error;
  }
};

// Remove a specific imported product
export const removeImportedProduct = async (externalId: string) => {
  try {
    const { error } = await supabase
      .from('imported_marketplace_products' as any)
      .delete()
      .eq('external_id', externalId);
    
    if (error) {
      throw error;
    }
    
    toast.success("Product removed successfully");
    return true;
  } catch (error: any) {
    console.error("Error removing imported product:", error);
    toast.error("Failed to remove product");
    throw error;
  }
};
