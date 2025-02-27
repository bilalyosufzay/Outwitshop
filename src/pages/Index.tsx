
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
    console.log("Index page loaded - Starting component rendering");
    setLoadStage(1);
    
    const timer = setTimeout(() => {
      console.log("All components loaded");
      setLoadStage(2);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
