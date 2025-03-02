
import { Product } from "@/data/types/product";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getLocalizedPrice } from "@/utils/localization";
import ProductCardImage from "./external-products/ProductCardImage";
import ProductCardInfo from "./external-products/ProductCardInfo";
import AffiliateLink from "./external-products/AffiliateLink";

interface ExternalProductCardProps {
  product: Product;
  className?: string;
  userCountry?: string;
}

const ExternalProductCard = ({ product, className, userCountry = "US" }: ExternalProductCardProps) => {
  // Prepare image array
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

  // Check if product is available in user's country
  const isAvailableInUserCountry = !product.countryAvailability || 
    product.countryAvailability.includes(userCountry);

  // Ensure we have valid affiliate URL
  const affiliateUrl = product.affiliate?.url || product.externalUrl;

  console.log(`Product: ${product.name}, Affiliate URL: ${affiliateUrl}`);

  return (
    <Card 
      className={cn(
        "overflow-hidden flex flex-col group relative border shadow-sm hover:shadow-md transition-all",
        !isAvailableInUserCountry && "opacity-70",
        className
      )}
    >
      <ProductCardImage 
        images={images}
        name={product.name}
        externalSource={product.externalSource}
        discountPercentage={discountPercentage}
        taxIncluded={product.taxIncluded}
        countryAvailability={product.countryAvailability}
        isAvailableInUserCountry={isAvailableInUserCountry}
      />
      
      <ProductCardInfo 
        name={product.name}
        formattedPrice={price.formatted}
        formattedOriginalPrice={originalPrice?.formatted}
      />
      
      <AffiliateLink 
        productId={product.id}
        productName={product.name}
        externalSource={product.externalSource}
        externalId={product.externalId}
        affiliateUrl={affiliateUrl}
        externalUrl={product.externalUrl}
        userCountry={userCountry}
        isAvailableInUserCountry={isAvailableInUserCountry}
      />
    </Card>
  );
};

export default ExternalProductCard;
