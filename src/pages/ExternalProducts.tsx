
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import Navigation from "@/components/Navigation";
import { Header } from "@/components/Header";
import { Product } from "@/data/types/product";
import { 
  searchExternalProducts, 
  getTrendingExternalProducts,
  getAvailableMarketplacesForCountry 
} from "@/services/externalProductsService";
import { useAuth } from "@/contexts/AuthContext";
import { detectUserCountry } from "@/utils/localization";

// Imported components
import PageHeader from "@/components/external-products/PageHeader";
import CountrySelector from "@/components/external-products/CountrySelector";
import SearchBar from "@/components/external-products/SearchBar";
import MarketplaceTabs from "@/components/external-products/MarketplaceTabs";
import ProductGrid from "@/components/external-products/ProductGrid";
import TrendingProducts from "@/components/external-products/TrendingProducts";

const ExternalProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [country, setCountry] = useState("");
  const { user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  // Initialize country based on URL param or browser detection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const countryParam = params.get("country");
    
    if (countryParam) {
      setCountry(countryParam.toUpperCase());
    } else {
      // Auto-detect country if not specified
      const detectedCountry = detectUserCountry();
      setCountry(detectedCountry);
      
      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set("country", detectedCountry);
      window.history.replaceState({}, "", url);
    }
  }, [location]);

  // Load trending products when country changes
  useEffect(() => {
    if (!country) return;
    
    const loadTrendingProducts = async () => {
      setTrendingLoading(true);
      try {
        const data = await getTrendingExternalProducts(country);
        setTrendingProducts(data);
      } catch (error) {
        console.error("Failed to load trending products:", error);
        toast.error(t("errors.trending_products", "Error loading trending products"));
      } finally {
        setTrendingLoading(false);
      }
    };

    loadTrendingProducts();
  }, [country, t]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Define which sources to search based on the active tab
      let sources: string[] = [];
      
      if (activeTab === 'all') {
        // Use all available marketplaces for this country
        sources = getAvailableMarketplacesForCountry(country).map(m => m.id);
      } else {
        // Use selected marketplace
        sources = [activeTab];
      }
      
      const results = await searchExternalProducts(searchQuery, country, sources);
      setProducts(results);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error(t("errors.search_failed", "Search failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Re-search with the new filter if we already have a query
    if (searchQuery) {
      handleSearch();
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set("country", value);
    window.history.pushState({}, "", url);
    
    // Reset active tab to "all" when changing country
    setActiveTab("all");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4 mb-6">
          <PageHeader />
          
          <CountrySelector 
            country={country} 
            onCountryChange={handleCountryChange} 
          />
          
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          
          <MarketplaceTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            country={country}
          />
        </div>

        {/* Search Results */}
        <ProductGrid
          products={products}
          loading={loading}
          noResultsMessage={true}
          searchQuery={searchQuery}
          userCountry={country}
        />

        {/* Trending Products Section */}
        {!searchQuery && (
          <TrendingProducts
            trendingProducts={trendingProducts}
            loading={trendingLoading}
            country={country}
          />
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default ExternalProducts;
