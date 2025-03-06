
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import LuckyDraw from "./pages/LuckyDraw";
import Feeds from "./pages/Feeds";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ManageProducts from "./pages/my-shop/products/ManageProducts";
import AddProductForm from "./pages/my-shop/products/AddProductForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
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
