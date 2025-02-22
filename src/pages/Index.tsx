
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import {
  MoreVertical,
  Globe,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES } from "@/data/categories";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import "../i18n/config";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
  { code: "prs", name: "دری", flag: "🇦🇫" },
];

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

const TRENDING_PRODUCTS = [
  {
    id: "5",
    name: "Smart Fitness Watch",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
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

const SALE_PRODUCTS = [
  {
    id: "9",
    name: "Summer Dress",
    price: 39.99,
    originalPrice: 79.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
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

const Index = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLang = localStorage.getItem('preferred-language');
    return savedLang ? LANGUAGES.find(lang => lang.code === savedLang) || LANGUAGES[0] : LANGUAGES[0];
  });

  const handleLanguageChange = async (language: typeof LANGUAGES[0]) => {
    try {
      setCurrentLanguage(language);
      localStorage.setItem('preferred-language', language.code);
      document.documentElement.dir = ['fa', 'prs'].includes(language.code) ? 'rtl' : 'ltr';
      await i18n.changeLanguage(language.code);
      toast.success(`Language changed to ${language.name}`);
    } catch (error) {
      console.error('Error changing language:', error);
      toast.error('Failed to change language. Please try again.');
    }
  };

  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = ['fa', 'prs'].includes(currentLanguage.code) ? 'rtl' : 'ltr';
    // Ensure i18n is using the current language
    i18n.changeLanguage(currentLanguage.code);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/b7de9b33-d899-4c4a-a399-3655bbb16b4c.png"
                alt="Outwit Shop"
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-semibold text-gray-900">Outwit Shop</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
                  <Globe className="w-4 h-4" />
                  <span>{currentLanguage.flag}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {LANGUAGES.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                  >
                    <span className="text-base">{language.flag}</span>
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <span className="sr-only">{t('header.notifications')}</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <span className="sr-only">{t('header.menu')}</span>
                  <MoreVertical className="w-6 h-6 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  return (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => navigate(`/category/${category.id}`)}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-accent" />
                      <span>{category.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        <section className="relative h-48 rounded-2xl overflow-hidden animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
            alt="Shopping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="p-6 text-white">
              <p className="text-sm font-medium mb-2">{t('new_arrival')}</p>
              <h2 className="text-2xl font-semibold mb-4">{t('summer_collection')}</h2>
              <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                {t('shop_now')}
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('trending.title')}
            </h2>
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
              {t('trending.hot')}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRENDING_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">{t('flash_sale.title')}</h2>
            <p className="text-white/80 mb-4">{t('flash_sale.subtitle')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SALE_PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white/10 backdrop-blur-md border border-white/20"
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('featured.title')}
            </h2>
            <button className="text-sm text-accent hover:underline">
              {t('featured.view_all')}
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
