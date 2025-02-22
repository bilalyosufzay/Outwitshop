
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const SUMMER_IMAGES = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80", // shopping mall
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80", // woman shopping
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80", // shopping bags
  "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80", // modern storefront
];

export const HeroSection = () => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === SUMMER_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-48 rounded-2xl overflow-hidden animate-fade-in">
      <img
        src={SUMMER_IMAGES[currentImageIndex]}
        alt="Summer Collection"
        className="w-full h-full object-cover transition-opacity duration-500"
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
