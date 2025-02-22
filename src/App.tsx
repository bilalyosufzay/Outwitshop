
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
import Settings from "./pages/Settings";
import Security from "./pages/Security";
import AutoReorder from "./pages/buyer/AutoReorder";
import Orders from "./pages/buyer/Orders";
import PaymentMethods from "./pages/buyer/PaymentMethods";
import PriceAlerts from "./pages/buyer/PriceAlerts";
import RecentlyViewed from "./pages/buyer/RecentlyViewed";
import Rewards from "./pages/buyer/Rewards";
import Wallet from "./pages/buyer/Wallet";
import Addresses from "./pages/buyer/Addresses";
import Connections from "./pages/community/Connections";
import Polls from "./pages/community/Polls";
import QASessions from "./pages/community/QASessions";
import ShareEarn from "./pages/community/ShareEarn";
import Wishlists from "./pages/community/Wishlists";
import Notifications from "./pages/Notifications";
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
                  <Route path="/my-shop/*" element={<ShopDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/notifications" element={<Notifications />} />
                  
                  {/* Buyer Routes */}
                  <Route path="/auto-reorder" element={<AutoReorder />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/payment-methods" element={<PaymentMethods />} />
                  <Route path="/price-alerts" element={<PriceAlerts />} />
                  <Route path="/recently-viewed" element={<RecentlyViewed />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/addresses" element={<Addresses />} />

                  {/* Community Routes */}
                  <Route path="/connections" element={<Connections />} />
                  <Route path="/polls" element={<Polls />} />
                  <Route path="/qa-sessions" element={<QASessions />} />
                  <Route path="/share-earn" element={<ShareEarn />} />
                  <Route path="/wishlists" element={<Wishlists />} />

                  {/* Shop Routes */}
                  <Route path="/shop/reviews" element={<div>Shop Reviews</div>} />
                  <Route path="/shop/messages" element={<div>Shop Messages</div>} />
                  <Route path="/shop/ai-assistant" element={<div>AI Assistant</div>} />
                  <Route path="/shop/social" element={<div>Social Integration</div>} />
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
