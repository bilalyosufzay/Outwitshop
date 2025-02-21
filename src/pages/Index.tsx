
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { 
  Smartphone,
  ShirtIcon,
  Home,
  Sparkles,
  ShoppingCart,
  Dumbbell,
  Baby,
  Car,
  BookOpen,
  Cat,
  type LucideIcon
} from "lucide-react";

// Temporary mock data
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
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

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  subcategories: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "fashion",
    name: "Fashion",
    icon: ShirtIcon,
    subcategories: ["Women's Clothing", "Men's Clothing", "Children's", "Shoes & Bags", "Accessories"],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    subcategories: ["Phones", "Computers", "Home Appliances", "Audio & Video"],
  },
  {
    id: "home",
    name: "Home & Living",
    icon: Home,
    subcategories: ["Furniture", "Décor", "Kitchen", "Bedding & Bath"],
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: Sparkles,
    subcategories: ["Cosmetics", "Skincare", "Haircare", "Fragrances"],
  },
  {
    id: "grocery",
    name: "Supermarket",
    icon: ShoppingCart,
    subcategories: ["Food & Beverages", "Household", "Personal Care"],
  },
  {
    id: "sports",
    name: "Sports",
    icon: Dumbbell,
    subcategories: ["Equipment", "Activewear", "Outdoor Gear"],
  },
  {
    id: "kids",
    name: "Kids & Baby",
    icon: Baby,
    subcategories: ["Toys", "Baby Essentials", "Maternity"],
  },
  {
    id: "auto",
    name: "Automotive",
    icon: Car,
    subcategories: ["Accessories", "Motorcycle", "Spare Parts"],
  },
  {
    id: "books",
    name: "Books & Media",
    icon: BookOpen,
    subcategories: ["Books", "Magazines", "Music & Movies"],
  },
  {
    id: "pets",
    name: "Pet Supplies",
    icon: Cat,
    subcategories: ["Pet Food", "Accessories", "Aquarium"],
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/b7de9b33-d899-4c4a-a399-3655bbb16b4c.png"
              alt="Outwit Shop"
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-semibold text-gray-900">Outwit Shop</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span className="sr-only">Notifications</span>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative h-48 rounded-2xl overflow-hidden animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
            alt="Shopping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="p-6 text-white">
              <p className="text-sm font-medium mb-2">New Arrival</p>
              <h2 className="text-2xl font-semibold mb-4">Summer Collection</h2>
              <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
            <button className="text-sm text-accent hover:underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => navigate(`/category/${id}`)}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm 
                         hover:shadow-md transition-all duration-300 group space-y-2"
              >
                <div className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 
                             transition-colors duration-300">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm font-medium text-gray-900 text-center">
                  {name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Featured Products
            </h2>
            <button className="text-sm text-accent hover:underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
};

export default Index;
