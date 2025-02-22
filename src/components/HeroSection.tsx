
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-48 rounded-2xl overflow-hidden animate-fade-in">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
        alt="Shopping"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div className="p-6 text-white">
          <p className="text-sm font-medium mb-2">{t('new_arrival')}</p>
          <h2 className="text-2xl font-semibold mb-4">{t('summer_collection')}</h2>
          <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
            {t('shop_now')}
          </button>
        </div>
      </div>
    </section>
  );
};
