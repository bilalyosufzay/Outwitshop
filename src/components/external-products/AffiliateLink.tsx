
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { trackAffiliateClick } from "@/services/externalProductsService";
import { trackClick } from "./card-utils/trackClick";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AffiliateLinkProps {
  productId: string;
  productName: string;
  externalSource?: string | null;
  externalId?: string | null;
  affiliateUrl?: string | null;
  externalUrl?: string | null;
  userCountry: string;
  isAvailableInUserCountry: boolean;
}

const AffiliateLink = ({
  productId,
  productName,
  externalSource,
  externalId,
  affiliateUrl,
  externalUrl,
  userCountry,
  isAvailableInUserCountry
}: AffiliateLinkProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    console.log("AffiliateLink clicked:", {
      affiliateUrl,
      externalUrl,
      productId,
      externalSource
    });
    
    // First, track the click for analytics
    trackClick(productId, externalSource || "unknown");
    
    // If product is not available in user's country, show message
    if (!isAvailableInUserCountry) {
      toast.error(t("errors.product_not_available_in_country", "This product is not available in your country"));
      return;
    }
    
    // Then handle the actual link behavior
    if (affiliateUrl) {
      // Track in backend for affiliate commission
      trackAffiliateClick(productId, userCountry, externalSource || "unknown")
        .then(() => {
          console.log("Affiliate click tracked successfully");
          
          // Check if it's a mobile device - could expand with more sophisticated detection
          const isMobile = window.innerWidth <= 768;
          
          if (isMobile) {
            // For mobile, open directly in new tab
            window.open(affiliateUrl, "_blank", "noopener,noreferrer");
          } else {
            // For desktop, we can do the same or redirect
            window.open(affiliateUrl, "_blank", "noopener,noreferrer");
          }
        })
        .catch(error => {
          console.error("Error tracking affiliate click:", error);
          // Still open the link even if tracking fails
          window.open(affiliateUrl, "_blank", "noopener,noreferrer");
        });
    } else if (externalUrl) {
      // If no affiliate link but we have the external URL, use that instead
      window.open(externalUrl, "_blank", "noopener,noreferrer");
    } else {
      // As a fallback, navigate to the external products page
      navigate("/external-products");
    }
  };

  return (
    <div className="mt-auto pt-2">
      <Button 
        onClick={handleClick}
        variant="default" 
        className="w-full rounded-md hover:text-white transition-colors"
        disabled={!isAvailableInUserCountry}
      >
        {isAvailableInUserCountry ? t("shop_now", "Shop Now") : t("errors.not_available", "Not Available")}
      </Button>
    </div>
  );
};

export default AffiliateLink;
