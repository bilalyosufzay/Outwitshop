
import { useState } from "react";
import { Product } from "@/data/types/product";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLocalizedPrice } from "@/utils/localization";
import { trackAffiliateClick } from "@/services/externalProductsService";
import { toast } from "sonner";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExternalProductCardProps {
  product: Product;
  className?: string;
}

const ExternalProductCard = ({ product, className }: ExternalProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Function to handle click on affiliate link
  const handleClick = async () => {
    if (product.externalSource && product.externalId) {
      trackAffiliateClick(product.externalId, product.externalSource);
      toast.success("Opening external product page", {
        description: "You'll be redirected to complete your purchase"
      });
    }
  };

  // Handle image rotation for products with multiple images
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  // Format price with localization
  const price = getLocalizedPrice(product.price);
  const originalPrice = product.originalPrice 
    ? getLocalizedPrice(product.originalPrice) 
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
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden flex flex-col group relative border shadow-sm hover:shadow-md transition-all",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        
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

        {/* Country Availability */}
        {product.countryAvailability && product.countryAvailability.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="absolute bottom-2 right-2 bg-slate-700 hover:bg-slate-800 text-white">
                  <Info className="h-3 w-3 mr-1" />
                  {product.countryAvailability[0]}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Only available in {product.countryAvailability.join(', ')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
      <a 
        href={product.affiliate?.url || product.externalUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={handleClick}
        aria-label={`View ${product.name} on ${product.externalSource}`}
      />
      
      {/* External Link Indicator (appears on hover) */}
      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-none">
          <ExternalLink className="h-3 w-3 mr-1" />
          Visit
        </Badge>
      </div>
    </Card>
  );
};

export default ExternalProductCard;
