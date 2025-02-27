
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { TRENDING_PRODUCTS } from "@/data/products";
import { useEffect, useState } from "react";
import { Product } from "@/data/types/product";
import { fetchTrendingProducts } from "@/utils/productUtils";

export const TrendingSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(TRENDING_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingProducts = async () => {
      try {
        setLoading(true);
        const marketplaceProducts = await fetchTrendingProducts();
        
        if (marketplaceProducts.length > 0) {
          setProducts(marketplaceProducts);
        } else {
          // Fallback to demo products
          setProducts(TRENDING_PRODUCTS);
        }
      } catch (error) {
        console.error("Failed to load trending products:", error);
        // Fallback to demo products
        setProducts(TRENDING_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingProducts();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('trending.title')}
          </h2>
          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
            {t('trending.hot')}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((skeleton) => (
            <div key={skeleton} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {t('trending.title')}
        </h2>
        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
          {t('trending.hot')}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
    </section>
  );
};
