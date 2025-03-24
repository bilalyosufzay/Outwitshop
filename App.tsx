import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./src/components/ui/sonner";
import { AuthProvider } from "./src/contexts/AuthContext";
import Products from "./src/pages/Products";
import Cart from "./src/pages/Cart";
import Search from "./src/pages/Search";
import Profile from "./src/pages/Profile";
import Notifications from "./src/pages/Notifications";
import Settings from "./src/pages/Settings";
import Security from "./src/pages/Security";
import NotFound from "./src/pages/NotFound";
import ProtectedRoute from "./src/components/ProtectedRoute";
import Welcome from "./src/pages/Welcome";
import Dashboard from "./src/pages/Dashboard";
import LuckyDraw from "./src/pages/LuckyDraw";
import Feeds from "./src/pages/Feeds";
import Login from "./src/pages/auth/Login";
import SignUp from "./src/pages/auth/SignUp";
import ForgotPassword from "./src/pages/auth/ForgotPassword";
import ResetPassword from "./src/pages/auth/ResetPassword";
import ManageProducts from "./src/pages/my-shop/products/ManageProducts";
import AddProductForm from "./src/pages/my-shop/products/AddProductForm";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Mobile app initialization started");
    console.log("Capacitor setup initialized");
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/security" element={<Security />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lucky-draw" element={<LuckyDraw />} />
          <Route path="/feeds" element={<Feeds />} />
          
          {/* Shop and Product Management Routes */}
          <Route
            path="/my-shop/products"
            element={
              <ProtectedRoute>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-shop/products/add"
            element={
              <ProtectedRoute>
                <AddProductForm />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
