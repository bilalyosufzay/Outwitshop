
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import LuckyDraw from "./pages/LuckyDraw";
import ShopDashboard from "./pages/my-shop/ShopDashboard";
import CreateShop from "./pages/my-shop/CreateShop";
import Login from "./pages/auth/Login";
import Welcome from "./pages/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/welcome" element={<Welcome />} />
          
          {/* Protected Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/lucky-draw" element={
            <ProtectedRoute>
              <LuckyDraw />
            </ProtectedRoute>
          } />
          <Route path="/my-shop" element={
            <ProtectedRoute>
              <ShopDashboard />
            </ProtectedRoute>
          } />
          <Route path="/my-shop/create" element={
            <ProtectedRoute>
              <CreateShop />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
