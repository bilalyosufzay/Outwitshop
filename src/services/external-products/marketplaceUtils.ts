
// Get marketplace availability based on country
export const getAvailableMarketplaces = (country: string): string[] => {
  const allMarketplaces = ['aliexpress', 'shein'];
  
  // Add region-specific marketplaces
  if (['DE', 'AT'].includes(country)) {
    allMarketplaces.push('otto');
  }
  
  if (['DE', 'FR', 'UK', 'SE'].includes(country)) {
    allMarketplaces.push('zalando', 'flaconi');
  }
  
  if (['DE', 'UK'].includes(country)) {
    allMarketplaces.push('harcoo', 'lounge');
  }
  
  return allMarketplaces;
};

// Get available marketplaces for a specific country
export const getAvailableMarketplacesForCountry = (country: string): Array<{id: string, name: string}> => {
  const marketplaces = [];
  
  // Global marketplaces
  marketplaces.push({ id: 'aliexpress', name: 'AliExpress' });
  marketplaces.push({ id: 'shein', name: 'Shein' });
  
  // Region-specific marketplaces
  if (['DE', 'AT'].includes(country)) {
    marketplaces.push({ id: 'otto', name: 'Otto' });
  }
  
  if (['DE', 'FR', 'UK', 'SE'].includes(country)) {
    marketplaces.push({ id: 'zalando', name: 'Zalando' });
    marketplaces.push({ id: 'flaconi', name: 'Flaconi' });
  }
  
  if (['DE', 'UK'].includes(country)) {
    marketplaces.push({ id: 'harcoo', name: 'Harcoo' });
    marketplaces.push({ id: 'lounge', name: 'Lounge by Zalando' });
  }
  
  return marketplaces;
};
