
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { handleAffiliateClick } from "./card-utils/trackClick";

interface AffiliateLinkProps {
  productId: string;
  productName: string;
  externalSource?: string;
  externalId?: string;
  affiliateUrl?: string;
  externalUrl?: string;
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

  if (!isAvailableInUserCountry) {
    return null;
  }

  const handleClick = () => {
    if (externalId && externalSource) {
      handleAffiliateClick(externalId, externalSource, userCountry, t);
    }
  };

  return (
    <>
      {/* Affiliate Link (full card clickable) */}
      <a 
        href={affiliateUrl || externalUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={handleClick}
        aria-label={`View ${productName} on ${externalSource}`}
      />
      
      {/* External Link Indicator */}
      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-none">
          <ExternalLink className="h-3 w-3 mr-1" />
          {t("common.visit", "Visit")}
        </Badge>
      </div>
    </>
  );
};

export default AffiliateLink;
