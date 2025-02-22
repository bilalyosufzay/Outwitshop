
type Currency = {
  symbol: string;
  position: 'before' | 'after';
  code: string;
};

const currencyMap: Record<string, Currency> = {
  US: { symbol: '$', position: 'before', code: 'USD' },
  GB: { symbol: '£', position: 'before', code: 'GBP' },
  EU: { symbol: '€', position: 'before', code: 'EUR' },
  JP: { symbol: '¥', position: 'before', code: 'JPY' },
  // Add more currencies as needed
};

export const getLocalizedPrice = (price: number, country: string = 'US') => {
  const currency = currencyMap[country] || currencyMap.US;
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  const formatted = currency.position === 'before' 
    ? `${currency.symbol}${formattedNumber}`
    : `${formattedNumber}${currency.symbol}`;

  return {
    formatted,
    value: price,
    currency: currency.code
  };
};
