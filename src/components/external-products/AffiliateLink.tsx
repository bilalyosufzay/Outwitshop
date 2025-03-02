
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { handleAffiliateClick, trackClick } from "./card-utils/trackClick";

interface AffiliateLinkProps {
  productId: string;
  productName: string;
  externalSource?: string;
  externalId?: string;
  affiliateUrl?: string | null;
  externalUrl?: string;
  userCountry: string;
  isAvailableInUserCountry: boolean;
}

const AffiliateLink = ({
  productId,
  productName,
  externalSource = 'unknown',
  externalId = '',
  affiliateUrl,
  externalUrl,
  userCountry,
  isAvailableInUserCountry
}: AffiliateLinkProps) => {
  const { t } = useTranslation();

  // This handles what happens when the user clicks on the product
  const handleClick = async () => {
    // Track this click for analytics
    trackClick(productId, externalSource);
    
    // If there's no valid URL or product is not available, don't proceed
    if ((!affiliateUrl && !externalUrl) || !isAvailableInUserCountry) {
      console.log(`Product ${productId} has no valid URL or is not available in ${userCountry}`);
      return;
    }
    
    // Use the affiliate URL if available, otherwise use the external URL
    const url = affiliateUrl || externalUrl;
    if (!url) {
      console.error(`No URL available for product ${productId}`);
      return;
    }
    
    try {
      // Track affiliate click and show a toast notification
      if (externalId) {
        await handleAffiliateClick(externalId, externalSource, userCountry, t);
      }
      
      // Open the URL in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error opening affiliate link:", error);
    }
  };

  return (
    <Button 
      onClick={handleClick}
      className={cn(
        "w-full mt-2 flex items-center gap-2",
        !isAvailableInUserCountry && "opacity-50 cursor-not-allowed"
      )}
      variant="default"
      disabled={!isAvailableInUserCountry || (!affiliateUrl && !externalUrl)}
    >
      {isAvailableInUserCountry ? (
        <>
          <ShoppingBag className="h-4 w-4" />
          {t("external_products.view_product", "View product")}
          <ExternalLink className="h-3 w-3 ml-auto" />
        </>
      ) : (
        <>
          {t("external_products.not_available_button", "Not available")}
        </>
      )}
    </Button>
  );
};

export default AffiliateLink;
