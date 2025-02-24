
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FEATURED_PRODUCTS } from "@/data/products";
import { useEffect, useState } from "react";

export const FeaturedSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState(FEATURED_PRODUCTS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        // Rotate all product details including images
        for (let i = 0; i < newProducts.length; i++) {
          const nextIndex = (i + 1) % FEATURED_PRODUCTS.length;
          newProducts[i] = FEATURED_PRODUCTS[nextIndex];
        }
        return newProducts;
      });
    }, 3000); // Change every 3 seconds

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
        {currentProducts.map((product) => (
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
