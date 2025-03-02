
import { Product } from "@/data/types/product";
import { generateAffiliateUrl } from "./affiliateUtils";
import { getCurrencyForCountry, isTaxIncluded } from "./localizationUtils";

// Map external product data to our Product interface
export const mapExternalProductToProduct = (item: any, country: string): Product => {
  const source = item.source?.toLowerCase() || 'unknown';
  const baseUrl = item.url || '';
  const externalId = item.externalId || `${source}-${Date.now()}`;
  
  // Define country availability based on source
  let countryAvailability: string[] | undefined;
  
  if (source === 'otto') {
    countryAvailability = ['DE', 'AT'];
  } else if (source === 'zalando') {
    countryAvailability = ['DE', 'FR', 'UK', 'SE'];
  } else if (source === 'harcoo' || source === 'lounge') {
    countryAvailability = ['DE', 'UK'];
  } else if (source === 'flaconi') {
    countryAvailability = ['DE', 'FR', 'AT'];
  } else if (source === 'aliexpress') {
    countryAvailability = ['US', 'UK', 'DE', 'FR', 'ES', 'IT', 'NL', 'PL', 'TR', 'RU', 'BR', 'SE'];
  } else if (source === 'shein') {
    countryAvailability = ['US', 'UK', 'DE', 'FR', 'ES', 'IT', 'AU', 'CA', 'RU', 'BR', 'MX', 'AE'];
  }
  
  // Get currency and tax info
  const currency = getCurrencyForCountry(country);
  const taxIncluded = isTaxIncluded(country);

  // Generate proper affiliate URL or use the one provided
  const affiliateUrl = item.affiliateUrl || (baseUrl ? generateAffiliateUrl(baseUrl, source, externalId) : null);
  
  console.log(`Mapping product from ${source}: ${item.title || 'Unknown'}, URL: ${affiliateUrl || 'No URL'}`);

  return {
    id: `${source}-${externalId}`,
    name: item.title || 'Unknown Product',
    price: Number(item.price) || 0,
    originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
    category: item.category || 'External Product',
    image: item.image || '/placeholder.svg',
    images: item.images || [item.image || '/placeholder.svg'],
    description: item.description,
    externalSource: source as any, // Cast to the union type
    externalId: externalId,
    externalUrl: baseUrl,
    countryAvailability,
    taxIncluded,
    currency,
    language: item.language || 'en',
    shippingCountries: item.shippingCountries,
    ...(item.trending && { trending: true }),
    affiliate: {
      url: affiliateUrl,
      commissionRate: item.commissionRate || 1.0 // Default 1% commission or use provided rate
    },
    commissionRate: item.commissionRate || 1.0 // 1% commission
  };
};
