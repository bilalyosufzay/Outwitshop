
import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, User, MessageSquare, Gift, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  
  // Detect screen width to determine if all navigation items should be shown
  useEffect(() => {
    const handleResize = () => {
      setShowAll(window.innerWidth > 640);
    };
    
    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Primary navigation items that are always shown
  const primaryNavItems = [
    { path: "/", icon: <Home className="h-5 w-5" />, label: t("home") },
    { path: "/search", icon: <Search className="h-5 w-5" />, label: t("search") },
    { path: "/cart", icon: <ShoppingCart className="h-5 w-5" />, label: t("cart") },
    { path: "/profile", icon: <User className="h-5 w-5" />, label: t("profile") },
  ];
  
  // Secondary navigation items that are shown based on screen width
  const secondaryNavItems = [
    { path: "/feeds", icon: <MessageSquare className="h-5 w-5" />, label: t("feeds") },
    { path: "/lucky-draw", icon: <Gift className="h-5 w-5" />, label: t("lucky_draw") },
    { path: "/external-products", icon: <Globe className="h-5 w-5" />, label: t("global") },
  ];
  
  // Determine which items to display based on screen width
  const displayItems = showAll 
    ? [...primaryNavItems, ...secondaryNavItems]
    : primaryNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex items-center justify-around px-4 z-50">
      {displayItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center text-xs gap-1",
            isActive(item.path) ? "text-primary" : "text-muted-foreground"
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
