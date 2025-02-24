
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FEATURED_PRODUCTS } from "@/data/products";
import { useState, useEffect } from "react";

export const FeaturedSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => 
        prevIndex === FEATURED_PRODUCTS.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change product every 3 seconds

    return () => clearInterval(interval);
  }, []);

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
        {[0, 1].map((offset) => {
          const productIndex = (currentProductIndex + offset) % FEATURED_PRODUCTS.length;
          const product = FEATURED_PRODUCTS[productIndex];
          return (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => navigate(`/product/${product.id}`)}
              className="animate-fade-in"
            />
          );
        })}
      </div>
    </section>
  );
};
