
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { SALE_PRODUCTS } from "@/data/products";
import { useEffect, useState } from "react";
import { Product } from "@/data/types/product";
import { fetchSaleProducts } from "@/utils/productUtils";

export const FlashSaleSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(SALE_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const loadSaleProducts = async () => {
      try {
        setLoading(true);
        const marketplaceProducts = await fetchSaleProducts();
        
        if (marketplaceProducts.length > 0) {
          setProducts(marketplaceProducts);
        } else {
          // Fallback to demo products
          setProducts(SALE_PRODUCTS);
        }
      } catch (error) {
        console.error("Failed to load sale products:", error);
        // Fallback to demo products
        setProducts(SALE_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadSaleProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer when it reaches zero
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('flash_sale.title')}
            </h2>
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              {t('flash_sale.limited_time')}
            </span>
          </div>
          <div className="text-sm text-accent">
            {t('flash_sale.ends_in')}: --:--:--
          </div>
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
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('flash_sale.title')}
          </h2>
          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
            {t('flash_sale.limited_time')}
          </span>
        </div>
        <div className="text-sm text-accent">
          {t('flash_sale.ends_in')}: {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products
          .filter(product => product.originalPrice)
          .map((product) => (
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
