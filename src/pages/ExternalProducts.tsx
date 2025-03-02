
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ExternalProductCard from "@/components/ExternalProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShoppingBag, Globe, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/data/types/product";
import { 
  searchExternalProducts, 
  getTrendingExternalProducts,
  getAvailableMarketplacesForCountry,
  getSupportedCountries 
} from "@/services/externalProductsService";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { detectUserCountry, getTaxDisplayText } from "@/utils/localization";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";

const ExternalProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [country, setCountry] = useState("");
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Get available marketplaces for selected country
  const availableMarketplaces = getAvailableMarketplacesForCountry(country);
  const supportedCountries = getSupportedCountries();

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
        sources = availableMarketplaces.map(m => m.id);
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

  // Get tax display text
  const taxInfo = getTaxDisplayText(country);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4 mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            {t("external_products.title", "Global Marketplace")}
          </h1>
          <p className="text-muted-foreground">
            {t("external_products.description", "Shop products from global marketplaces directly through our app!")}
          </p>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Select value={country} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("external_products.select_country", "Select Country")} />
                </SelectTrigger>
                <SelectContent>
                  {supportedCountries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {taxInfo}
            </p>
          </div>
          
          <div className="relative flex gap-2">
            <Input
              type="search"
              placeholder={t("external_products.search_placeholder", "Search global products...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              {t("common.search", "Search")}
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">{t("external_products.all_platforms", "All Platforms")}</TabsTrigger>
              
              {/* Dynamically generate tabs based on available marketplaces */}
              {availableMarketplaces.map((marketplace) => (
                <TabsTrigger key={marketplace.id} value={marketplace.id}>
                  {marketplace.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="border-none shadow-none animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Search Results */}
            {products.length > 0 ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {t("external_products.search_results", "Search Results")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ExternalProductCard 
                      key={product.id} 
                      product={product} 
                      userCountry={country}
                    />
                  ))}
                </div>
              </div>
            ) : searchQuery ? (
              <div className="text-center py-10">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">
                  {t("external_products.no_products", "No products found")}
                </h3>
                <p className="text-muted-foreground">
                  {t("external_products.try_different_search", "Try a different search term or platform")}
                </p>
              </div>
            ) : null}

            {/* Trending Products Section */}
            {!searchQuery && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">
                  {t("external_products.trending_products", "Trending Products")}
                </h2>
                {trendingLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trendingProducts.map((product) => (
                      <ExternalProductCard 
                        key={product.id} 
                        product={product} 
                        userCountry={country}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default ExternalProducts;
