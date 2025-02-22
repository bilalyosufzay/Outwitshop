
import { useNavigate } from "react-router-dom";
import { ProfileSection } from "./ProfileSection";
import {
  ShoppingBag,
  Heart,
  History,
  MapPin,
  CreditCard,
  Wallet,
  Award,
  Settings,
  Shield,
  HelpCircle,
  RefreshCcw,
  Bell,
} from "lucide-react";

export const BuyerContent = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <ProfileSection
        title="Auto-Reorder Essentials"
        description="Manage your recurring purchases"
        icon={RefreshCcw}
        onClick={() => navigate('/auto-reorder')}
      />
      <ProfileSection
        title="Price Drop Alerts"
        description="Track prices and get notified"
        icon={Bell}
        onClick={() => navigate('/price-alerts')}
      />
      <ProfileSection
        title="Orders & Shopping"
        icon={ShoppingBag}
        onClick={() => navigate('/orders')}
      />
      <ProfileSection
        title="Wishlist"
        icon={Heart}
        onClick={() => navigate('/wishlists')}
      />
      <ProfileSection
        title="Recently Viewed"
        icon={History}
        onClick={() => navigate('/recently-viewed')}
      />
      <ProfileSection
        title="Saved Addresses"
        icon={MapPin}
        onClick={() => navigate('/addresses')}
      />
      <ProfileSection
        title="Payment Methods"
        icon={CreditCard}
        onClick={() => navigate('/payment-methods')}
      />
      <ProfileSection
        title="Wallet & Transactions"
        icon={Wallet}
        onClick={() => navigate('/wallet')}
      />
      <ProfileSection
        title="Rewards & Points"
        icon={Award}
        onClick={() => navigate('/rewards')}
      />
      <ProfileSection
        title="Account Settings"
        icon={Settings}
        onClick={() => navigate('/settings')}
      />
      <ProfileSection
        title="Security"
        icon={Shield}
        onClick={() => navigate('/security')}
      />
      <ProfileSection
        title="Help Center"
        icon={HelpCircle}
        onClick={() => navigate('/help')}
      />
    </div>
  );
};
