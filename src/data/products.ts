export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  countryAvailability?: string[]; // List of country codes where product is available
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    countryAvailability: ["US", "DE", "ES"],
  },
  {
    id: "2",
    name: "Classic Leather Watch",
    price: 199.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
  },
  {
    id: "3",
    name: "Modern Desk Lamp",
    price: 89.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
  },
  {
    id: "4",
    name: "Minimalist Backpack",
    price: 129.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
];

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: "5",
    name: "Smart Fitness Watch",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    countryAvailability: ["US", "DE", "ES"],
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    price: 179.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
  },
  {
    id: "7",
    name: "Premium Coffee Maker",
    price: 249.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: "8",
    name: "Wireless Earbuds",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
  },
];

export const SALE_PRODUCTS: Product[] = [
  {
    id: "9",
    name: "Summer Dress",
    price: 39.99,
    originalPrice: 79.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    countryAvailability: ["US", "DE", "ES"],
  },
  {
    id: "10",
    name: "Running Shoes",
    price: 69.99,
    originalPrice: 129.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: "11",
    name: "Portable Speaker",
    price: 49.99,
    originalPrice: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
  },
  {
    id: "12",
    name: "Kitchen Mixer",
    price: 199.99,
    originalPrice: 299.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1622444435576-c8d475d86d09?w=800&q=80",
  },
];
