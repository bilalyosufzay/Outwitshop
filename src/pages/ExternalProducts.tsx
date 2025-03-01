
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ExternalProductCard from "@/components/ExternalProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShoppingBag, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/data/types/product";
import { searchExternalProducts, getTrendingExternalProducts } from "@/services/externalProductsService";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ExternalProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [country, setCountry] = useState("US");
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  // Get user country from query parameter or default to "US"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const countryParam = params.get("country");
    if (countryParam) {
      setCountry(countryParam.toUpperCase());
    }
  }, [location]);

  // Load trending products on mount
  useEffect(() => {
    const loadTrendingProducts = async () => {
      setTrendingLoading(true);
      try {
        const data = await getTrendingExternalProducts(country);
        setTrendingProducts(data);
      } catch (error) {
        console.error("Failed to load trending products:", error);
        toast({
          title: "Error loading trending products",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setTrendingLoading(false);
      }
    };

    loadTrendingProducts();
  }, [country, toast]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Define which sources to search based on the active tab
      let sources = ['aliexpress', 'shein', 'otto'];
      if (activeTab === 'aliexpress') sources = ['aliexpress'];
      if (activeTab === 'shein') sources = ['shein'];
      if (activeTab === 'otto') sources = ['otto'];
      
      // Don't include Otto for non-German users
      if (country !== 'DE' && sources.includes('otto')) {
        sources = sources.filter(s => s !== 'otto');
      }
      
      const results = await searchExternalProducts(searchQuery, country, sources);
      setProducts(results);
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        title: "Search failed",
        description: "Unable to fetch products. Please try again.",
        variant: "destructive",
      });
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
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4 mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Global Marketplace
          </h1>
          <p className="text-muted-foreground">
            Shop products from AliExpress, Shein, and Otto (Germany only) directly through our app!
          </p>
          
          <div className="flex items-center gap-2">
            <Select value={country} onValueChange={handleCountryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="FR">France</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="AU">Australia</SelectItem>
              </SelectContent>
            </Select>
            {country !== 'DE' && (
              <p className="text-xs text-muted-foreground">
                Note: Otto products are only available in Germany
              </p>
            )}
          </div>
          
          <div className="relative flex gap-2">
            <Input
              type="search"
              placeholder="Search global products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All Platforms</TabsTrigger>
              <TabsTrigger value="aliexpress">AliExpress</TabsTrigger>
              <TabsTrigger value="shein">Shein</TabsTrigger>
              {country === 'DE' && (
                <TabsTrigger value="otto">Otto</TabsTrigger>
              )}
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
                <h2 className="text-lg font-semibold mb-4">Search Results</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ExternalProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : searchQuery ? (
              <div className="text-center py-10">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">
                  Try a different search term or platform
                </p>
              </div>
            ) : null}

            {/* Trending Products Section */}
            {!searchQuery && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Trending Products</h2>
                {trendingLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trendingProducts.map((product) => (
                      <ExternalProductCard key={product.id} product={product} />
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
