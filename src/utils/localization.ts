
interface CountryConfig {
  currency: string;
  currencySymbol: string;
  taxRate: number;
  exchangeRate: number; // Rate relative to USD
}

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  US: {
    currency: 'USD',
    currencySymbol: '$',
    taxRate: 0.0725, // Average US sales tax
    exchangeRate: 1,
  },
  DE: {
    currency: 'EUR',
    currencySymbol: '€',
    taxRate: 0.19, // German VAT
    exchangeRate: 0.91,
  },
  ES: {
    currency: 'EUR',
    currencySymbol: '€',
    taxRate: 0.21, // Spanish VAT
    exchangeRate: 0.91,
  },
};

export const getLocalizedPrice = (priceUSD: number, countryCode: string = 'US') => {
  const config = COUNTRY_CONFIGS[countryCode] || COUNTRY_CONFIGS.US;
  const priceInLocalCurrency = priceUSD * config.exchangeRate;
  const priceWithTax = priceInLocalCurrency * (1 + config.taxRate);
  
  return {
    price: priceWithTax,
    currency: config.currency,
    symbol: config.currencySymbol,
    formatted: `${config.currencySymbol}${priceWithTax.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
  };
};

export const getUserCountry = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || 'US';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'US';
  }
};
