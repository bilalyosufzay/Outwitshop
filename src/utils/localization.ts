
type Currency = {
  symbol: string;
  position: 'before' | 'after';
  code: string;
  decimalPlaces: number;
};

const currencyMap: Record<string, Currency> = {
  US: { symbol: '$', position: 'before', code: 'USD', decimalPlaces: 2 },
  CA: { symbol: 'C$', position: 'before', code: 'CAD', decimalPlaces: 2 },
  GB: { symbol: '£', position: 'before', code: 'GBP', decimalPlaces: 2 },
  UK: { symbol: '£', position: 'before', code: 'GBP', decimalPlaces: 2 },
  DE: { symbol: '€', position: 'before', code: 'EUR', decimalPlaces: 2 },
  FR: { symbol: '€', position: 'before', code: 'EUR', decimalPlaces: 2 },
  AT: { symbol: '€', position: 'before', code: 'EUR', decimalPlaces: 2 },
  SE: { symbol: 'kr', position: 'after', code: 'SEK', decimalPlaces: 0 },
  TR: { symbol: '₺', position: 'before', code: 'TRY', decimalPlaces: 2 },
  // Default fallback
  EU: { symbol: '€', position: 'before', code: 'EUR', decimalPlaces: 2 },
};

export const getLocalizedPrice = (price: number, country: string = 'US') => {
  const currency = currencyMap[country] || currencyMap.US;
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(price);

  const formatted = currency.position === 'before' 
    ? `${currency.symbol}${formattedNumber}`
    : `${formattedNumber} ${currency.symbol}`;

  return {
    formatted,
    value: price,
    currency: currency.code
  };
};

// Function to detect user's country from browser
export const detectUserCountry = (): string => {
  // Try to get country from browser language
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang) {
    const countryCode = browserLang.split('-')[1];
    if (countryCode && currencyMap[countryCode]) {
      return countryCode;
    }
  }
  
  // Fallback to checking timezone for rough estimation
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Very rough mapping of common timezones to countries
  if (timezone.includes('America')) {
    if (timezone.includes('New_York') || timezone.includes('Chicago') || 
        timezone.includes('Denver') || timezone.includes('Los_Angeles')) {
      return 'US';
    }
    if (timezone.includes('Toronto') || timezone.includes('Vancouver')) {
      return 'CA';
    }
  }
  
  if (timezone.includes('Europe')) {
    if (timezone.includes('London')) return 'UK';
    if (timezone.includes('Berlin') || timezone.includes('Frankfurt')) return 'DE';
    if (timezone.includes('Paris')) return 'FR';
    if (timezone.includes('Stockholm')) return 'SE';
    if (timezone.includes('Vienna')) return 'AT';
    // Default to DE for other European timezones
    return 'DE';
  }
  
  if (timezone.includes('Turkey') || timezone.includes('Istanbul')) {
    return 'TR';
  }
  
  // Fallback to US if we can't determine
  return 'US';
};

// Function to check if a product is available in a specific country
export const isProductAvailableInCountry = (product: any, country: string): boolean => {
  // If no country restrictions specified, assume it's available everywhere
  if (!product.countryAvailability || product.countryAvailability.length === 0) {
    return true;
  }
  
  return product.countryAvailability.includes(country);
};

// Function to calculate tax for a specific country (for display purposes)
export const calculateTax = (price: number, country: string): number => {
  // VAT rates by country (simplified)
  const taxRates: Record<string, number> = {
    'DE': 0.19, // 19% VAT in Germany
    'FR': 0.20, // 20% VAT in France
    'UK': 0.20, // 20% VAT in UK
    'SE': 0.25, // 25% VAT in Sweden
    'AT': 0.20, // 20% VAT in Austria
    'TR': 0.18, // 18% VAT in Turkey
    'US': 0.0,  // No federal VAT in US
    'CA': 0.05  // 5% GST in Canada (simplified)
  };
  
  const rate = taxRates[country] || 0;
  return price * rate;
};

// Function to get tax display text for a specific country
export const getTaxDisplayText = (country: string): string => {
  // For EU countries, tax is usually included in displayed prices
  if (['DE', 'FR', 'UK', 'SE', 'AT'].includes(country)) {
    return 'VAT included';
  }
  
  if (country === 'TR') {
    return 'KDV included';
  }
  
  if (country === 'CA') {
    return 'GST/HST not included';
  }
  
  if (country === 'US') {
    return 'Sales tax will be calculated at checkout';
  }
  
  return 'Tax information unavailable';
};
