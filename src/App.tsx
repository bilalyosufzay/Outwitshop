import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateShop from "./pages/my-shop/CreateShop";
import ShopDashboard from "./pages/my-shop/ShopDashboard";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import LuckyDraw from "./pages/LuckyDraw";
import Cart from "./pages/Cart";
import ProductsPage from "@/pages/my-shop/products/ProductsPage";
import AddProductPage from "@/pages/my-shop/products/AddProductPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/lucky-draw" element={<LuckyDraw />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:id" element={<NotFound />} />
              <Route path="/my-shop" element={<Navigate to="/my-shop/dashboard" replace />} />
              <Route path="/my-shop/create" element={<CreateShop />} />
              <Route path="/my-shop/dashboard" element={<ShopDashboard />} />
              <Route path="/my-shop/products" element={<ProductsPage />} />
              <Route path="/my-shop/products/add" element={<AddProductPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
