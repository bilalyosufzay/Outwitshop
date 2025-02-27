
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProductsHeader from "./components/ProductsHeader";
import ProductSearchBar from "./components/ProductSearchBar";
import EmptyProductsList from "./components/EmptyProductsList";
import ProductsList from "./components/ProductsList";
import { Product } from "@/data/products";
import ProductSkeletons from "./components/ProductSkeletons";

const ProductsPage = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ProductsHeader onAddProduct={handleAddProduct} />
      <ProductSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {filteredProducts.length === 0 ? (
        <EmptyProductsList onAddProduct={handleAddProduct} />
      ) : (
        <ProductsList 
          products={filteredProducts}
          onEdit={(id) => navigate(`/my-shop/products/edit/${id}`)}
          onDelete={() => {}}
          onToggleFeatured={() => {}}
          onToggleTrending={() => {}}
          onToggleOnSale={() => {}}
        />
      )}
    </div>
  );
};

export default ProductsPage;
