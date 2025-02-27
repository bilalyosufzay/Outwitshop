
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FEATURED_PRODUCTS } from "@/data/products";
import { useEffect, useState } from "react";
import { Product } from "@/data/types/product";
import { fetchFeaturedProducts } from "@/utils/productUtils";
import { useToast } from "@/components/ui/use-toast";

export const FeaturedSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("FeaturedSection mounted");
    
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const marketplaceProducts = await fetchFeaturedProducts();
        
        if (marketplaceProducts.length > 0) {
          console.log("Fetched featured products:", marketplaceProducts.length);
          setCurrentProducts(marketplaceProducts);
        } else {
          console.log("Using demo featured products");
          setCurrentProducts(FEATURED_PRODUCTS);
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
        setCurrentProducts(FEATURED_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setCurrentProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        // Rotate all product details
        const firstProduct = { ...newProducts[0] };
        for (let i = 0; i < newProducts.length - 1; i++) {
          newProducts[i] = { ...newProducts[i + 1] };
        }
        newProducts[newProducts.length - 1] = firstProduct;
        return newProducts;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('featured.title')}
          </h2>
          <button className="text-sm text-accent hover:underline">
            {t('featured.view_all')}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((skeleton) => (
            <div key={`skeleton-${skeleton}`} className="animate-pulse">
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
          {t('featured.title')}
        </h2>
        <button 
          className="text-sm text-accent hover:underline"
          onClick={() => navigate('/products')}
        >
          {t('featured.view_all')}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {currentProducts.map((product, index) => (
          <ProductCard
            key={`featured-${product.id}-${index}`}
            {...product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
    </section>
  );
};
