
// Function to generate affiliate URL based on product and source
export const generateAffiliateUrl = (url: string, source: string, productId: string): string => {
  // In a real implementation, these would be your actual affiliate IDs
  const affiliateIds = {
    aliexpress: "marketplace-app-1234",
    shein: "marketplace-app-5678",
    otto: "marketplace-app-9012",
    zalando: "marketplace-app-3456",
    harcoo: "marketplace-app-7890",
    lounge: "marketplace-app-2345",
    flaconi: "marketplace-app-6789"
  };

  // Add affiliate parameters based on the source
  if (source === 'aliexpress') {
    // AliExpress typically uses something like this
    return `${url}?aff_id=${affiliateIds.aliexpress}&product_id=${productId}`;
  } else if (source === 'shein') {
    // Shein might use a different format
    return `${url}?ref=${affiliateIds.shein}&item=${productId}`;
  } else if (source === 'otto') {
    // Otto might use yet another format
    return `${url}?partner=${affiliateIds.otto}&campaign=marketplace&item=${productId}`;
  } else if (source === 'zalando') {
    return `${url}?partner=${affiliateIds.zalando}&item=${productId}`;
  } else if (source === 'harcoo') {
    return `${url}?aff=${affiliateIds.harcoo}&pid=${productId}`;
  } else if (source === 'lounge') {
    return `${url}?partner=${affiliateIds.lounge}&item=${productId}`;
  } else if (source === 'flaconi') {
    return `${url}?ref=${affiliateIds.flaconi}&item=${productId}`;
  }
  
  // Default fallback
  return url;
};
