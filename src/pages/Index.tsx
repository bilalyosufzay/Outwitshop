
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrendingSection } from "@/components/TrendingSection";
import { FlashSaleSection } from "@/components/FlashSaleSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import Navigation from "@/components/Navigation";
import "../i18n/config";
import { useEffect, useState } from "react";

const Index = () => {
  const [loadStage, setLoadStage] = useState(0);
  
  useEffect(() => {
    // Enhanced debugging
    console.log("Index page loaded - Starting component rendering");
    setLoadStage(1);
    
    // Delayed checks to see if components mount properly
    const timer = setTimeout(() => {
      console.log("Header rendered:", document.querySelector("header") !== null);
      console.log("HeroSection rendered:", document.querySelector(".animate-fade-in") !== null);
      console.log("Main content rendered:", document.querySelector("main") !== null);
      setLoadStage(2);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <div className="fixed top-0 left-0 z-50 bg-yellow-200 p-2 text-xs">
        Debug: Load Stage {loadStage}
      </div>
      
      <div className="text-center py-8 text-lg">
        Welcome to Outwit Shop - Starting Load...
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        {loadStage >= 1 && (
          <>
            <HeroSection />
            {loadStage >= 2 && (
              <>
                <TrendingSection />
                <FlashSaleSection />
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
