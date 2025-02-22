
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getLocalizedPrice, getUserCountry } from "@/utils/localization";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  onClick?: () => void;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  onClick,
  className,
}: ProductCardProps) => {
  const [localizedPrice, setLocalizedPrice] = useState(getLocalizedPrice(price));
  const [localizedOriginalPrice, setLocalizedOriginalPrice] = useState(
    originalPrice ? getLocalizedPrice(originalPrice) : null
  );

  useEffect(() => {
    const initializeLocalization = async () => {
      const country = await getUserCountry();
      setLocalizedPrice(getLocalizedPrice(price, country));
      if (originalPrice) {
        setLocalizedOriginalPrice(getLocalizedPrice(originalPrice, country));
      }
    };

    initializeLocalization();
  }, [price, originalPrice]);

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-lg animate-scale-in",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full 
                     shadow-sm transition-colors hover:bg-white"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
        {originalPrice && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500 uppercase">{category}</p>
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-accent">
            {localizedPrice.formatted}
          </p>
          {localizedOriginalPrice && (
            <p className="text-sm text-gray-500 line-through">
              {localizedOriginalPrice.formatted}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
