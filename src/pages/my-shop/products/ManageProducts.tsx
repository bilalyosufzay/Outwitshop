
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types/product";
import { useAuth } from "@/contexts/AuthContext";

const ManageProducts = () => {
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
          .from('marketplace_products')
          .select('*')
          .eq('shop_id', shopId)
          .eq('seller_id', user.id);
          
        if (error) throw error;
        
        // Transform to match Product interface
        const transformedProducts = data.map(item => ({
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
        .from('marketplace_products')
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
        .from('marketplace_products')
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
        .from('marketplace_products')
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
        .from('marketplace_products')
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <BackButton />
          <h1 className="text-2xl font-semibold">Manage Products</h1>
        </div>
        <Button onClick={handleAddProduct}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <Card key={skeleton} className="p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found.</p>
              <Button onClick={handleAddProduct}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="p-4 relative">
                  <ProductCard {...product} />
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`featured-${product.id}`}
                        checked={product.featured}
                        onCheckedChange={(checked) => 
                          toggleFeatured(product.id, checked === true)
                        }
                      />
                      <label 
                        htmlFor={`featured-${product.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Featured Product
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`trending-${product.id}`}
                        checked={product.trending}
                        onCheckedChange={(checked) => 
                          toggleTrending(product.id, checked === true)
                        }
                      />
                      <label 
                        htmlFor={`trending-${product.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Trending Product
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`sale-${product.id}`}
                        checked={product.onSale}
                        onCheckedChange={(checked) => 
                          toggleOnSale(product.id, checked === true)
                        }
                      />
                      <label 
                        htmlFor={`sale-${product.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        On Sale
                      </label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageProducts;
