
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { TRENDING_PRODUCTS, FEATURED_PRODUCTS, SALE_PRODUCTS } from "../data/products";
import { Product } from "@/data/types/product";
import { fetchMarketplaceProducts } from "@/utils/productUtils";
import { useToast } from "@/components/ui/use-toast";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // First load marketplace products
        const marketplaceProducts = await fetchMarketplaceProducts();
        
        // If we have marketplace products, use those
        if (marketplaceProducts.length > 0) {
          setProducts(marketplaceProducts);
        } else {
          // Fallback to demo products if no marketplace products exist yet
          setProducts([...TRENDING_PRODUCTS, ...FEATURED_PRODUCTS, ...SALE_PRODUCTS]);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        toast({
          title: "Error loading products",
          description: "Please try again later",
          variant: "destructive",
        });
        // Fallback to demo products
        setProducts([...TRENDING_PRODUCTS, ...FEATURED_PRODUCTS, ...SALE_PRODUCTS]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [toast]);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-4">
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
              <Card key={skeleton} className="border-none shadow-none animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="border-none shadow-none">
                  <ProductCard {...product} />
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center text-muted-foreground mt-8">
                No products found matching your search.
              </div>
            )}
          </>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Products;
