
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Product, FEATURED_PRODUCTS, TRENDING_PRODUCTS, SALE_PRODUCTS } from "@/data/products";

const RecentlyViewed = () => {
  const navigate = useNavigate();

  const { data: recentViews, isLoading } = useQuery({
    queryKey: ['recentViews'],
    queryFn: async () => {
      const { data: views, error } = await supabase
        .from('product_views')
        .select('product_id, viewed_at')
        .order('viewed_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return views;
    },
  });

  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (recentViews) {
      // Map product IDs to actual product data from our static data
      const allProducts = [
        ...FEATURED_PRODUCTS,
        ...TRENDING_PRODUCTS,
        ...SALE_PRODUCTS,
      ];
      
      const products = recentViews
        .map(view => allProducts.find(p => p.id === view.product_id))
        .filter((p): p is Product => p !== undefined);
      
      setRecentProducts(products);
    }
  }, [recentViews]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <div className="flex items-center gap-2 mb-6">
          <History className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Recently Viewed</h1>
        </div>

        {isLoading ? (
          <Card className="p-6">
            <p className="text-muted-foreground">Loading recently viewed items...</p>
          </Card>
        ) : recentProducts.length === 0 ? (
          <Card className="p-6">
            <p className="text-muted-foreground">No recently viewed items.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default RecentlyViewed;
