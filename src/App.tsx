
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
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import "./i18n/config";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-1 w-full">
            <div className="container mx-auto px-4 py-4">
              <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <div className="space-y-8">
                        <HeroSection />
                        <TrendingSection />
                        <FlashSaleSection />
                        <FeaturedSection />
                      </div>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Routes */}
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                <Route path="/lucky-draw" element={<ProtectedRoute><LuckyDraw /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/my-shop/*" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                
                {/* Buyer Routes */}
                <Route path="/auto-reorder" element={<ProtectedRoute><AutoReorder /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
                <Route path="/price-alerts" element={<ProtectedRoute><PriceAlerts /></ProtectedRoute>} />
                <Route path="/recently-viewed" element={<ProtectedRoute><RecentlyViewed /></ProtectedRoute>} />
                <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
                <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />

                {/* Community Routes */}
                <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
                <Route path="/polls" element={<ProtectedRoute><Polls /></ProtectedRoute>} />
                <Route path="/qa-sessions" element={<ProtectedRoute><QASessions /></ProtectedRoute>} />
                <Route path="/share-earn" element={<ProtectedRoute><ShareEarn /></ProtectedRoute>} />
                <Route path="/wishlists" element={<ProtectedRoute><Wishlists /></ProtectedRoute>} />

                {/* Shop Routes */}
                <Route path="/shop/reviews" element={<ProtectedRoute><div>Shop Reviews</div></ProtectedRoute>} />
                <Route path="/shop/messages" element={<ProtectedRoute><div>Shop Messages</div></ProtectedRoute>} />
                <Route path="/shop/ai-assistant" element={<ProtectedRoute><div>AI Assistant</div></ProtectedRoute>} />
                <Route path="/shop/social" element={<ProtectedRoute><div>Social Integration</div></ProtectedRoute>} />
              </Routes>
            </div>
          </main>
          <Navigation />
          <ChatSupport />
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
