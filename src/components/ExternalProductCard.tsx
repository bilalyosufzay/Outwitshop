
import { useState } from "react";
import { Product } from "@/data/types/product";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, Info, ShoppingCart, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLocalizedPrice } from "@/utils/localization";
import { trackAffiliateClick } from "@/services/externalProductsService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExternalProductCardProps {
  product: Product;
  className?: string;
  userCountry?: string;
}

const ExternalProductCard = ({ product, className, userCountry = "US" }: ExternalProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);
  const { t, i18n } = useTranslation();
  
  // Function to handle click on affiliate link
  const handleClick = async () => {
    if (product.externalSource && product.externalId) {
      try {
        await trackAffiliateClick(
          product.externalId, 
          product.externalSource, 
          undefined, // userId will be filled if authenticated
          userCountry
        );
        toast.success(t("external_products.redirecting", "Opening external product page"), {
          description: t("external_products.redirect_description", "You'll be redirected to complete your purchase")
        });
      } catch (error) {
        console.error("Error tracking affiliate click:", error);
        // Still allow the navigation to happen even if tracking fails
      }
    }
  };

  // Handle image rotation for products with multiple images
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  // Format price with localization
  const price = getLocalizedPrice(product.price, userCountry);
  const originalPrice = product.originalPrice 
    ? getLocalizedPrice(product.originalPrice, userCountry) 
    : null;
  
  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Determine source badge color
  const getBadgeColor = () => {
    switch (product.externalSource) {
      case 'aliexpress': return "bg-red-500 hover:bg-red-600";
      case 'shein': return "bg-purple-500 hover:bg-purple-600";
      case 'otto': return "bg-blue-600 hover:bg-blue-700";
      case 'zalando': return "bg-teal-500 hover:bg-teal-600";
      case 'harcoo': return "bg-amber-500 hover:bg-amber-600";
      case 'lounge': return "bg-pink-500 hover:bg-pink-600";
      case 'flaconi': return "bg-emerald-500 hover:bg-emerald-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Check if product is available in user's country
  const isAvailableInUserCountry = !product.countryAvailability || 
    product.countryAvailability.includes(userCountry);

  // Rotate through images
  const rotateImages = () => {
    if (images.length <= 1) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden flex flex-col group relative border shadow-sm hover:shadow-md transition-all",
        !isAvailableInUserCountry && "opacity-70",
        className
      )}
      onMouseEnter={rotateImages}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <ShoppingCart className="h-6 w-6 text-gray-400" />
          </div>
        )}
        
        {hasImageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-sm text-gray-500">{t("common.image_unavailable", "Image unavailable")}</span>
          </div>
        ) : (
          <img
            src={images[currentImageIndex]}
            alt={product.name}
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
            getBadgeColor()
          )}
        >
          {product.externalSource}
        </Badge>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white">
            -{discountPercentage}%
          </Badge>
        )}

        {/* Tax Badge */}
        {product.taxIncluded && (
          <Badge 
            variant="outline" 
            className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm"
          >
            {t("external_products.tax_included", "Tax Incl.")}
          </Badge>
        )}

        {/* Country Availability */}
        {product.countryAvailability && product.countryAvailability.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="absolute bottom-2 right-2 bg-slate-700 hover:bg-slate-800 text-white">
                  <Globe className="h-3 w-3 mr-1" />
                  {product.countryAvailability[0]}
                  {product.countryAvailability.length > 1 && '+'}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("external_products.available_in", "Available in")}: {product.countryAvailability.join(', ')}</p>
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
      
      {/* Product Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
        
        <div className="flex items-center mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{price.formatted}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.formatted}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Affiliate Link (full card clickable) */}
      {isAvailableInUserCountry && (
        <a 
          href={product.affiliate?.url || product.externalUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleClick}
          aria-label={`View ${product.name} on ${product.externalSource}`}
        />
      )}
      
      {/* External Link Indicator (appears on hover) */}
      {isAvailableInUserCountry && (
        <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-none">
            <ExternalLink className="h-3 w-3 mr-1" />
            {t("common.visit", "Visit")}
          </Badge>
        </div>
      )}
    </Card>
  );
};

export default ExternalProductCard;
