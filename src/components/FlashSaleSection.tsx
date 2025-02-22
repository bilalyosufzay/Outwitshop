
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { SALE_PRODUCTS } from "@/data/products";

export const FlashSaleSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative">
        <h2 className="text-2xl font-bold mb-2">{t('flash_sale.title')}</h2>
        <p className="text-white/80 mb-4">{t('flash_sale.subtitle')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SALE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white/10 backdrop-blur-md border border-white/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
