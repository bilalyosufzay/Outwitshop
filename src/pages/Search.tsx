
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface SponsoredProductResult {
  boost_level: number;
  product_id: {
    id: string;
    name: string;
    price: number;
    description: string | null;
    stock_quantity: number;
    image: string;
    images?: string[];
  };
}

interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  description: string | null;
  stock_quantity: number;
  image: string;
  images?: string[];
}

interface ProductWithSponsorship extends Product {
  isSponsored?: boolean;
  boostLevel?: number;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];

      // First, get sponsored products
      const { data: sponsoredProducts } = await supabase
        .from('sponsored_products')
        .select(`
          boost_level,
          product_id (
            id,
            name,
            price,
            description,
            stock_quantity,
            image,
            images
          )
        `)
        .eq('status', 'active')
        .textSearch('product_id.name', searchQuery) as { data: SponsoredProductResult[] | null };

      // Then, get regular products
      const { data: regularProducts } = await supabase
        .from('products')
        .select('id, name, price, description, stock_quantity, image, images')
        .eq('status', 'active')
        .textSearch('name', searchQuery)
        .limit(20) as { data: DatabaseProduct[] | null };

      // Combine and format results
      const sponsored = (sponsoredProducts || []).map((sp) => ({
        id: sp.product_id.id,
        name: sp.product_id.name,
        price: sp.product_id.price,
        category: 'sponsored',
        image: sp.product_id.image,
        images: sp.product_id.images,
        isSponsored: true,
        boostLevel: sp.boost_level
      })) as ProductWithSponsorship[];

      const regular = (regularProducts || []).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: 'general',
        image: p.image,
        images: p.images,
        isSponsored: false
      })) as ProductWithSponsorship[];

      // Sort results: sponsored first (by boost level), then regular
      return [...sponsored, ...regular];
    },
    enabled: searchQuery.length > 0
  });

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
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ))}
          </div>
        ) : products?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product: ProductWithSponsorship) => (
              <div key={product.id} className="relative">
                <ProductCard {...product} />
                {product.isSponsored && (
                  <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Sponsored
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            {searchQuery ? "No results found" : "Start typing to search"}
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Search;
