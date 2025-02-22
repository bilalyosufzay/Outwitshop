
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrendingSection } from "@/components/TrendingSection";
import { FlashSaleSection } from "@/components/FlashSaleSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import Navigation from "@/components/Navigation";
import "../i18n/config";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-8">
        <HeroSection />
        <TrendingSection />
        <FlashSaleSection />
        <FeaturedSection />
      </main>
      <Navigation />
    </div>
  );
};

export default Index;
