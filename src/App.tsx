
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Welcome from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Cart from "@/pages/Cart";
import LuckyDraw from "@/pages/LuckyDraw";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import Security from "@/pages/Security";
import Connections from "@/pages/community/Connections";
import Polls from "@/pages/community/Polls";
import QASessions from "@/pages/community/QASessions";
import ShareEarn from "@/pages/community/ShareEarn";
import Wishlists from "@/pages/community/Wishlists";
import Orders from "@/pages/buyer/Orders";
import PaymentMethods from "@/pages/buyer/PaymentMethods";
import Addresses from "@/pages/buyer/Addresses";
import RecentlyViewed from "@/pages/buyer/RecentlyViewed";
import PriceAlerts from "@/pages/buyer/PriceAlerts";
import AutoReorder from "@/pages/buyer/AutoReorder";
import Rewards from "@/pages/buyer/Rewards";
import Wallet from "@/pages/buyer/Wallet";
import ShopDashboard from "@/pages/my-shop/ShopDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/search" element={<Search />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Profile Settings Routes */}
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/security" element={
          <ProtectedRoute>
            <Security />
          </ProtectedRoute>
        } />

        {/* Community Routes */}
        <Route path="/connections" element={
          <ProtectedRoute>
            <Connections />
          </ProtectedRoute>
        } />
        <Route path="/polls" element={
          <ProtectedRoute>
            <Polls />
          </ProtectedRoute>
        } />
        <Route path="/qa-sessions" element={
          <ProtectedRoute>
            <QASessions />
          </ProtectedRoute>
        } />
        <Route path="/share-earn" element={
          <ProtectedRoute>
            <ShareEarn />
          </ProtectedRoute>
        } />
        <Route path="/wishlists" element={
          <ProtectedRoute>
            <Wishlists />
          </ProtectedRoute>
        } />

        {/* Buyer Profile Routes */}
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        <Route path="/payment-methods" element={
          <ProtectedRoute>
            <PaymentMethods />
          </ProtectedRoute>
        } />
        <Route path="/addresses" element={
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        } />
        <Route path="/recently-viewed" element={
          <ProtectedRoute>
            <RecentlyViewed />
          </ProtectedRoute>
        } />
        <Route path="/price-alerts" element={
          <ProtectedRoute>
            <PriceAlerts />
          </ProtectedRoute>
        } />
        <Route path="/auto-reorder" element={
          <ProtectedRoute>
            <AutoReorder />
          </ProtectedRoute>
        } />
        <Route path="/rewards" element={
          <ProtectedRoute>
            <Rewards />
          </ProtectedRoute>
        } />
        <Route path="/wallet" element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } />

        {/* Seller Routes */}
        <Route path="/my-shop" element={
          <ProtectedRoute>
            <ShopDashboard />
          </ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/lucky-draw" element={
          <ProtectedRoute>
            <LuckyDraw />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Main Shop Route */}
        <Route path="/" element={<Index />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
