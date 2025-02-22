import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import Security from "@/pages/Security";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Cart from "@/pages/Cart";
import Search from "@/pages/Search";
import LuckyDraw from "@/pages/LuckyDraw";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import CreateShop from "@/pages/my-shop/CreateShop";
import ShopDashboard from "@/pages/my-shop/ShopDashboard";
import AddProductPage from "@/pages/my-shop/products/AddProductPage";
import ProductsPage from "@/pages/my-shop/products/ProductsPage";
import QASessions from "@/pages/community/QASessions";
import Polls from "@/pages/community/Polls";
import Wishlists from "@/pages/community/Wishlists";
import Connections from "@/pages/community/Connections";
import ShareEarn from "@/pages/community/ShareEarn";
import AutoReorder from "@/pages/buyer/AutoReorder";
import PriceAlerts from "@/pages/buyer/PriceAlerts";
import Orders from "@/pages/buyer/Orders";
import RecentlyViewed from "@/pages/buyer/RecentlyViewed";
import Addresses from "@/pages/buyer/Addresses";
import PaymentMethods from "@/pages/buyer/PaymentMethods";
import WalletPage from "@/pages/buyer/Wallet";
import Rewards from "@/pages/buyer/Rewards";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/lucky-draw" element={<LuckyDraw />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security"
                element={
                  <ProtectedRoute>
                    <Security />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<Search />} />
              <Route
                path="/qa-sessions"
                element={
                  <ProtectedRoute>
                    <QASessions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/polls"
                element={
                  <ProtectedRoute>
                    <Polls />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlists"
                element={
                  <ProtectedRoute>
                    <Wishlists />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/connections"
                element={
                  <ProtectedRoute>
                    <Connections />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/share-earn"
                element={
                  <ProtectedRoute>
                    <ShareEarn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-shop/create"
                element={
                  <ProtectedRoute>
                    <CreateShop />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-shop"
                element={
                  <ProtectedRoute>
                    <ShopDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-shop/products"
                element={
                  <ProtectedRoute>
                    <ProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-shop/products/add"
                element={
                  <ProtectedRoute>
                    <AddProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/auto-reorder"
                element={
                  <ProtectedRoute>
                    <AutoReorder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/price-alerts"
                element={
                  <ProtectedRoute>
                    <PriceAlerts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recently-viewed"
                element={
                  <ProtectedRoute>
                    <RecentlyViewed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addresses"
                element={
                  <ProtectedRoute>
                    <Addresses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-methods"
                element={
                  <ProtectedRoute>
                    <PaymentMethods />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <ProtectedRoute>
                    <Rewards />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </Router>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
