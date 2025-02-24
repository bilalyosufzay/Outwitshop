
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Cart from "@/pages/Cart";
import Settings from "@/pages/Settings";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import NotFound from "@/pages/NotFound";
import Products from "@/pages/Products";
import Dashboard from "@/pages/Dashboard";
import Welcome from "@/pages/Welcome";
import ShopDashboard from "@/pages/my-shop/ShopDashboard";
import AddProductPage from "@/pages/my-shop/products/AddProductPage";
import VerificationForm from "@/pages/my-shop/verification/VerificationForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/welcome" element={<Welcome />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          
          {/* Shop Routes */}
          <Route
            path="/my-shop"
            element={
              <ProtectedRoute>
                <ShopDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-shop/verification"
            element={
              <ProtectedRoute>
                <VerificationForm />
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
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
