
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  countryAvailability?: string[];
  images?: string[];
  description?: string;
  sellerId?: string;
  shopId?: string;
  featured?: boolean;
  trending?: boolean;
  onSale?: boolean;
  commissionRate?: number;
  // External products fields
  externalSource?: 'aliexpress' | 'shein' | 'otto' | 'zalando' | 'harcoo' | 'lounge' | 'flaconi' | null;
  externalId?: string;
  externalUrl?: string;
  affiliate?: {
    url: string;
    commissionRate: number;
  };
  // Regional information
  taxIncluded?: boolean;
  currency?: string; // USD, EUR, GBP, CAD, TRY, SEK, etc.
  shippingCountries?: string[]; // List of countries this product ships to
  language?: string; // Primary language for product description
}
