
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import Search from "@/pages/Search";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Security from "@/pages/Security";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import Welcome from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import LuckyDraw from "@/pages/LuckyDraw";
import Feeds from "@/pages/Feeds";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
