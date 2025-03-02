
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import ProductGrid from "./ProductGrid";
import { Product } from "@/data/types/product";

interface TrendingProductsProps {
  trendingProducts: Product[];
  loading: boolean;
  country: string;
}

const TrendingProducts = ({ trendingProducts, loading, country }: TrendingProductsProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">
        {t("external_products.trending_products", "Trending Products")}
      </h2>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : (
        <ProductGrid 
          products={trendingProducts} 
          loading={false} 
          userCountry={country}
          isTrending={true}
        />
      )}
    </div>
  );
};

export default TrendingProducts;
