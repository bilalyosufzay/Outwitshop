
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { getBadgeColor } from "./card-utils/sourceStyles";

interface ProductCardImageProps {
  images: string[];
  name: string;
  externalSource?: string;
  discountPercentage: number;
  taxIncluded?: boolean;
  countryAvailability?: string[];
  isAvailableInUserCountry: boolean;
}

const ProductCardImage = ({
  images,
  name,
  externalSource,
  discountPercentage,
  taxIncluded,
  countryAvailability,
  isAvailableInUserCountry
}: ProductCardImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);
  const { t } = useTranslation();

  // Rotate through images
  const rotateImages = () => {
    if (images.length <= 1) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative aspect-square overflow-hidden" onMouseEnter={rotateImages}>
      {/* Loading state */}
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <ShoppingCart className="h-6 w-6 text-gray-400" />
        </div>
      )}
      
      {/* Error state */}
      {hasImageError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">{t("common.image_unavailable", "Image unavailable")}</span>
        </div>
      ) : (
        <img
          src={images[currentImageIndex]}
          alt={name}
          className={cn(
            "object-cover w-full h-full transition-transform group-hover:scale-105",
            isImageLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsImageLoading(false)}
          onError={() => {
            setIsImageLoading(false);
            setHasImageError(true);
          }}
        />
      )}
      
      {/* Source Badge */}
      <Badge 
        className={cn(
          "absolute top-2 left-2 text-white capitalize", 
          getBadgeColor(externalSource)
        )}
      >
        {externalSource}
      </Badge>
      
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white">
          -{discountPercentage}%
        </Badge>
      )}

      {/* Tax Badge */}
      {taxIncluded && (
        <Badge 
          variant="outline" 
          className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm"
        >
          {t("external_products.tax_included", "Tax Incl.")}
        </Badge>
      )}

      {/* Country Availability */}
      {countryAvailability && countryAvailability.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="absolute bottom-2 right-2 bg-slate-700 hover:bg-slate-800 text-white">
                <Globe className="h-3 w-3 mr-1" />
                {countryAvailability[0]}
                {countryAvailability.length > 1 && '+'}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("external_products.available_in", "Available in")}: {countryAvailability.join(', ')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Not Available in User Country Warning */}
      {!isAvailableInUserCountry && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="text-white font-medium px-3 py-2 rounded bg-black/50 text-sm">
            {t("external_products.not_available", "Not available in your region")}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCardImage;
