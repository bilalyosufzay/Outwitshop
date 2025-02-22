
import { Home, Search, Gift, ShoppingBag, User, Store } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t("navigation.home"), path: "/" },
    { icon: Search, label: t("navigation.search"), path: "/search" },
    { icon: Gift, label: t("navigation.lucky_draw"), path: "/lucky-draw" },
    { icon: ShoppingBag, label: t("navigation.cart"), path: "/cart" },
    { icon: Store, label: t("navigation.my_shop"), path: "/my-shop" },
    { icon: User, label: t("navigation.profile"), path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-area">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-full transition-colors",
              location.pathname === path
                ? "text-accent"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
