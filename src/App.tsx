
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import { Header } from "./components/Header";
import { Toaster } from "sonner";
import { ChatSupport } from "./components/ChatSupport";
import { Routes, Route } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { TrendingSection } from "./components/TrendingSection";
import { FlashSaleSection } from "./components/FlashSaleSection";
import { FeaturedSection } from "./components/FeaturedSection";
import "./App.css";
import "./i18n/config";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="min-h-screen bg-background pb-16">
            <Header />
            <main className="container mx-auto px-4">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <div className="space-y-8">
                      <HeroSection />
                      <TrendingSection />
                      <FlashSaleSection />
                      <FeaturedSection />
                    </div>
                  } 
                />
                <Route path="/search" element={<div>Search Page</div>} />
                <Route path="/lucky-draw" element={<div>Lucky Draw Page</div>} />
                <Route path="/cart" element={<div>Cart Page</div>} />
                <Route path="/my-shop" element={<div>My Shop Page</div>} />
                <Route path="/profile" element={<div>Profile Page</div>} />
              </Routes>
            </main>
            <Navigation />
            <ChatSupport />
          </div>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
