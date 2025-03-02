
import { trackAffiliateClick } from "@/services/externalProductsService";
import { toast } from "sonner";

export const handleAffiliateClick = async (
  externalId: string,
  externalSource: string,
  userCountry: string = "US",
  t: (key: string, fallback: string) => string
) => {
  try {
    await trackAffiliateClick(
      externalId, 
      externalSource, 
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
};
