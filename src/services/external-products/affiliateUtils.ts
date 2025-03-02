
/**
 * Generate an affiliate URL for a given product URL and marketplace
 * This adds appropriate tracking parameters based on the marketplace
 */
export const generateAffiliateUrl = (
  baseUrl: string, 
  marketplace: string,
  externalId: string
): string => {
  // Ensure the base URL is valid
  if (!baseUrl || typeof baseUrl !== 'string') {
    console.error('Invalid base URL for affiliate link generation', baseUrl);
    return '';
  }
  
  // Clean the URL to prevent issues
  let url = baseUrl.trim();
  
  // If the URL is already an affiliate URL, return it
  if (url.includes('tag=') || url.includes('aff_id=') || url.includes('ref=')) {
    return url;
  }
  
  try {
    const urlObj = new URL(url);
    
    // Add appropriate parameters based on marketplace
    switch (marketplace.toLowerCase()) {
      case 'aliexpress':
        // Example: ?aff_id=outwitshop&product_id={productId}
        urlObj.searchParams.append('aff_id', 'outwitshop');
        urlObj.searchParams.append('product_id', externalId);
        break;
        
      case 'shein':
        // Example: ?ref=outwitshop&product_id={productId}
        urlObj.searchParams.append('ref', 'outwitshop');
        urlObj.searchParams.append('product_id', externalId);
        break;
        
      case 'otto':
        // Otto specific affiliate parameters
        urlObj.searchParams.append('partner', 'outwitshop');
        urlObj.searchParams.append('campaignId', 'otto-marketplace');
        urlObj.searchParams.append('id', externalId);
        break;
        
      case 'zalando':
        // Zalando specific affiliate parameters
        urlObj.searchParams.append('partner', 'outwitshop');
        urlObj.searchParams.append('source', 'marketplace');
        urlObj.searchParams.append('id', externalId);
        break;
        
      case 'harcoo':
        // Harcoo specific affiliate parameters
        urlObj.searchParams.append('ref', 'outwitshop');
        urlObj.searchParams.append('pid', externalId);
        break;
        
      case 'lounge':
        // Lounge by Zalando specific parameters
        urlObj.searchParams.append('partner', 'outwitshop');
        urlObj.searchParams.append('campaign', 'lounge-marketplace');
        urlObj.searchParams.append('id', externalId);
        break;
        
      case 'flaconi':
        // Flaconi specific parameters
        urlObj.searchParams.append('ref', 'outwitshop');
        urlObj.searchParams.append('product', externalId);
        break;
        
      default:
        // Generic tracking
        urlObj.searchParams.append('ref', 'outwitshop');
    }
    
    console.log(`Generated affiliate URL for ${marketplace}: ${urlObj.toString()}`);
    return urlObj.toString();
  } catch (error) {
    console.error('Error generating affiliate URL:', error);
    
    // If URL parsing fails, add parameters in a simple way
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}ref=outwitshop&id=${externalId}`;
  }
};
