
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FEATURED_PRODUCTS } from "@/data/products";

export const FeaturedSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        {FEATURED_PRODUCTS.map((product) => (
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
