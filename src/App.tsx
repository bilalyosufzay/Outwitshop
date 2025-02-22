
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
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import LuckyDraw from "./pages/LuckyDraw";
import ShopDashboard from "./pages/my-shop/ShopDashboard";
import "./App.css";
import "./i18n/config";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 w-full">
              <div className="container mx-auto px-4 py-4">
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
                  <Route path="/search" element={<Search />} />
                  <Route path="/lucky-draw" element={<LuckyDraw />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/my-shop" element={<ShopDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
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
