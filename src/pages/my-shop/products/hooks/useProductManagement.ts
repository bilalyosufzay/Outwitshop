
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types/product";
import { useAuth } from "@/contexts/AuthContext";

export function useProductManagement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const { data: shopData, error: shopError } = await supabase
          .from('shops')
          .select('id')
          .eq('owner_id', user.id)
          .single();
          
        if (shopError) {
          console.error("Error fetching shop:", shopError);
          if (shopError.code === 'PGRST116') {
            // No shop found for this seller
            return navigate('/my-shop/create');
          }
          throw shopError;
        }
        
        const shopId = shopData.id;
        
        const { data, error } = await supabase
          .from('marketplace_products' as any)
          .select('*')
          .eq('shop_id', shopId)
          .eq('seller_id', user.id);
          
        if (error) throw error;
        
        // Transform to match Product interface
        const transformedProducts = data.map((item: any) => ({
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
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [user, navigate]);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    navigate('/my-shop/products/add');
  };

  const handleEditProduct = (productId: string) => {
    navigate(`/my-shop/products/edit/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabase
        .from('marketplace_products' as any)
        .delete()
        .eq('id', productId);
        
      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const toggleFeatured = async (productId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('marketplace_products' as any)
        .update({ featured })
        .eq('id', productId);
        
      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === productId ? {...p, featured} : p
      ));
      
      toast.success(`Product ${featured ? 'featured' : 'unfeatured'} successfully`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const toggleTrending = async (productId: string, trending: boolean) => {
    try {
      const { error } = await supabase
        .from('marketplace_products' as any)
        .update({ trending })
        .eq('id', productId);
        
      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === productId ? {...p, trending} : p
      ));
      
      toast.success(`Product ${trending ? 'marked as trending' : 'removed from trending'} successfully`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const toggleOnSale = async (productId: string, onSale: boolean) => {
    try {
      // Get current product to check if original price is set
      const product = products.find(p => p.id === productId);
      
      if (onSale && (!product?.originalPrice || product.originalPrice <= product.price)) {
        return toast.error("Set an original price higher than the current price first");
      }
      
      const { error } = await supabase
        .from('marketplace_products' as any)
        .update({ on_sale: onSale })
        .eq('id', productId);
        
      if (error) throw error;
      
      setProducts(products.map(p => 
        p.id === productId ? {...p, onSale} : p
      ));
      
      toast.success(`Product ${onSale ? 'added to sale' : 'removed from sale'} successfully`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return {
    loading,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    toggleFeatured,
    toggleTrending,
    toggleOnSale
  };
}
