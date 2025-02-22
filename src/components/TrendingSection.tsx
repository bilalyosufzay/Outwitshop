
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { TRENDING_PRODUCTS } from "@/data/products";

export const TrendingSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        {TRENDING_PRODUCTS.map((product) => (
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
