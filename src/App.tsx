
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Search from "@/pages/Search";
import Cart from "@/pages/Cart";
import Profile from "@/pages/Profile";
import Products from "@/pages/Products";
import LuckyDraw from "@/pages/LuckyDraw";
import ShopDashboard from "@/pages/my-shop/ShopDashboard";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/lucky-draw" element={<LuckyDraw />} />
        <Route path="/my-shop" element={<ShopDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
