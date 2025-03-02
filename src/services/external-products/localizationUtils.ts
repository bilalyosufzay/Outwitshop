
// Get available currencies
export const getAvailableCurrencies = (): Array<{code: string, symbol: string, name: string}> => {
  return [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' }
  ];
};

// Get supported countries for the marketplace
export const getSupportedCountries = (): Array<{code: string, name: string}> => {
  return [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'SE', name: 'Sweden' },
    { code: 'TR', name: 'Turkey' },
    { code: 'AT', name: 'Austria' }
  ];
};

// Determine currency based on country
export const getCurrencyForCountry = (country: string): string => {
  let currency = 'USD';
  if (['DE', 'FR', 'AT'].includes(country)) currency = 'EUR';
  if (country === 'UK') currency = 'GBP';
  if (country === 'CA') currency = 'CAD';
  if (country === 'TR') currency = 'TRY';
  if (country === 'SE') currency = 'SEK';
  
  return currency;
};

// Determine if tax is included based on region
export const isTaxIncluded = (country: string): boolean => {
  return ['DE', 'FR', 'UK', 'SE', 'TR'].includes(country);
};
