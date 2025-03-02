
import { trackAffiliateClick } from "@/services/external-products/trackingApi";
import { toast } from "sonner";

// Export the handleAffiliateClick function
export const handleAffiliateClick = async (
  externalId: string,
  externalSource: string,
  userCountry: string,
  t: (key: string, fallback: string) => string,
  userId?: string
) => {
  try {
    await trackAffiliateClick(
      externalId, 
      externalSource, 
      userCountry
    );
    
    toast.success(t("external_products.redirecting", "Opening external product page"), {
      description: t("external_products.redirect_description", "You'll be redirected to complete your purchase")
    });
  } catch (error) {
    console.error("Error tracking affiliate click:", error);
    // Still allow the navigation to happen even if tracking fails
  }
};

// Add the trackClick function that's being imported in AffiliateLink.tsx
export const trackClick = (productId: string, source: string) => {
  console.log(`Product click tracked: ${productId} from ${source}`);
  // This is a simple tracking function that could be expanded
  // to include analytics tracking in the future
};
