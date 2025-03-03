
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrendingSection } from "@/components/TrendingSection";
import { FlashSaleSection } from "@/components/FlashSaleSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import Navigation from "@/components/Navigation";
import "../i18n/config";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import notificationService from "@/services/notificationService";
import { getTrendingExternalProducts } from "@/services/externalProductsService";
import ProductGrid from "@/components/external-products/ProductGrid";
import { Product } from "@/data/types/product";

const Index = () => {
  const [loadStage, setLoadStage] = useState(0);
  const { i18n, t } = useTranslation();
  const [externalProducts, setExternalProducts] = useState<Product[]>([]);
  const [userCountry, setUserCountry] = useState("US");
  const [loadingExternalProducts, setLoadingExternalProducts] = useState(true);
  
  useEffect(() => {
    console.log("Index page loaded - Starting component rendering");
    setLoadStage(1);
    
    const timer = setTimeout(() => {
      console.log("All components loaded");
      setLoadStage(2);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set RTL direction for Arabic and Persian languages
    if (i18n.language === 'ar' || i18n.language === 'fa') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = i18n.language;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);
  
  useEffect(() => {
    // Initialize notifications if permission is already granted
    if ('Notification' in window && Notification.permission === 'granted') {
      // Get token and start listening for messages
      notificationService.getToken();
      notificationService.listenForMessages();
    }
  }, []);

  // Fetch trending external products
  useEffect(() => {
    const fetchExternalProducts = async () => {
      try {
        setLoadingExternalProducts(true);
        // Get user country (could be expanded with geolocation API in the future)
        // For now, we'll use a hardcoded value
        const country = "US"; // Default country
        setUserCountry(country);
        
        // Fetch trending products for this country
        const products = await getTrendingExternalProducts(country, 8);
        console.log(`Fetched ${products.length} trending external products`);
        setExternalProducts(products);
      } catch (error) {
        console.error("Error fetching external products:", error);
      } finally {
        setLoadingExternalProducts(false);
      }
    };

    if (loadStage >= 1) {
      fetchExternalProducts();
    }
  }, [loadStage]);

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        {loadStage >= 1 && (
          <>
            <HeroSection />
            {loadStage >= 2 && (
              <>
                <TrendingSection />
                <FlashSaleSection />
                
                {/* External Marketplace Products Section */}
                <section className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">
                      {t("external_marketplace.title", "Global Marketplace")}
                    </h2>
                    <a href="/external-products" className="text-primary text-sm font-medium flex items-center">
                      {t("external_marketplace.view_all", "View All")}
                    </a>
                  </div>
                  
                  <ProductGrid 
                    products={externalProducts}
                    loading={loadingExternalProducts}
                    userCountry={userCountry}
                    isTrending={true}
                  />
                </section>
                
                <FeaturedSection />
              </>
            )}
          </>
        )}
      </main>
      
      <Navigation />
    </div>
  );
};

export default Index;
