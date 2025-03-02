
import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, User, MessageSquare, Gift, ShoppingBag, Heart, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex items-center justify-around px-4 z-50">
      <Link
        to="/"
        className={cn(
          "flex flex-col items-center text-xs gap-1",
          isActive("/") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Home className="h-5 w-5" />
        <span>{t("navigation.home")}</span>
      </Link>

      <Link
        to="/feeds"
        className={cn(
          "flex flex-col items-center text-xs gap-1",
          isActive("/feeds") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <MessageSquare className="h-5 w-5" />
        <span>{t("navigation.feeds", "Feeds")}</span>
      </Link>

      <Link
        to="/lucky-draw"
        className={cn(
          "flex flex-col items-center text-xs gap-1",
          isActive("/lucky-draw") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Gift className="h-5 w-5" />
        <span>{t("navigation.lucky_draw")}</span>
      </Link>

      <Link
        to="/search"
        className={cn(
          "flex flex-col items-center text-xs gap-1",
          isActive("/search") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Search className="h-5 w-5" />
        <span>{t("navigation.search")}</span>
      </Link>

      <Link
        to="/cart"
        className={cn(
          "flex flex-col items-center text-xs gap-1",
          isActive("/cart") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <ShoppingCart className="h-5 w-5" />
        <span>{t("navigation.cart")}</span>
      </Link>

      <Link
        to="/profile"
        className={cn(
          "flex flex-col items-center text-xs gap-1",
          isActive("/profile") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <User className="h-5 w-5" />
        <span>{t("navigation.profile")}</span>
      </Link>

      <Link
        to="/external-products"
        className={cn(
          "flex flex-col items-center text-xs gap-1",
          isActive("/external-products") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Globe className="h-5 w-5" />
        <span>{t("navigation.global", "Global")}</span>
      </Link>
    </nav>
  );
};

export default Navigation;
