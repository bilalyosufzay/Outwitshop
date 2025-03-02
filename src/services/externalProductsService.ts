
// Re-export all functionality from the sub-modules
export { 
  searchExternalProducts,
  getTrendingExternalProducts
} from './external-products/searchApi';

export {
  trackAffiliateClick
} from './external-products/trackingApi';

export {
  getAvailableMarketplaces,
  getAvailableMarketplacesForCountry
} from './external-products/marketplaceUtils';

export {
  getAvailableCurrencies,
  getSupportedCountries
} from './external-products/localizationUtils';

export {
  generateAffiliateUrl
} from './external-products/affiliateUtils';

export {
  mapExternalProductToProduct
} from './external-products/productMappers';
