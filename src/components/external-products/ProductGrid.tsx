
import { useTranslation } from "react-i18next";
import { ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ExternalProductCard from "@/components/ExternalProductCard";
import { Product } from "@/data/types/product";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  noResultsMessage?: boolean;
  searchQuery?: string;
  userCountry: string;
  isTrending?: boolean;
}

const ProductGrid = ({ 
  products, 
  loading, 
  noResultsMessage = false, 
  searchQuery = "", 
  userCountry,
  isTrending = false
}: ProductGridProps) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="border-none shadow-none animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0 && noResultsMessage && searchQuery) {
    return (
      <div className="text-center py-10">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">
          {t("external_products.no_products", "No products found")}
        </h3>
        <p className="text-muted-foreground">
          {t("external_products.try_different_search", "Try a different search term or platform")}
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  console.log(`Rendering ${products.length} products in grid`);
  
  return (
    <div className="mt-4">
      {!isTrending && products.length > 0 && (
        <h2 className="text-lg font-semibold mb-4">
          {t("external_products.search_results", "Search Results")}
        </h2>
      )}
      {isTrending && (
        <h2 className="text-lg font-semibold mb-4">
          {t("external_products.trending_products", "Trending Products")}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => {
          console.log(`Grid rendering product: ${product.id}, has affiliate URL: ${!!product.affiliate?.url}`);
          return (
            <ExternalProductCard 
              key={product.id} 
              product={product} 
              userCountry={userCountry}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
