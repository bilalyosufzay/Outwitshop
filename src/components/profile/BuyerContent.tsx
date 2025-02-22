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
import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const BuyerContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBuyerProfile = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('user_levels')
          .select('*')
          .eq('type', 'buyer')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching buyer profile:', error);
          return;
        }

        if (!data) {
          // Initialize buyer level if it doesn't exist
          const { error: insertError } = await supabase
            .from('user_levels')
            .insert({
              user_id: user.id,
              type: 'buyer' as const,
              current_level: 'Newbie Shopper',
              total_orders: 0,
              total_spent: 0,
              points: 0
            });

          if (insertError) {
            console.error('Error initializing buyer profile:', insertError);
          }
        }
      } catch (error) {
        console.error('Error in fetchBuyerProfile:', error);
      }
    };

    fetchBuyerProfile();
  }, [user]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <ProfileSection
        title="Auto-Reorder Essentials"
        description="Manage your recurring purchases"
        icon={RefreshCcw}
        onClick={() => {
          handleNavigation('/auto-reorder');
          toast.info("Loading auto-reorder settings...");
        }}
      />
      <ProfileSection
        title="Price Drop Alerts"
        description="Track prices and get notified"
        icon={Bell}
        onClick={() => {
          handleNavigation('/price-alerts');
          toast.info("Loading price alerts...");
        }}
      />
      <ProfileSection
        title="Orders & Shopping"
        icon={ShoppingBag}
        onClick={() => handleNavigation('/orders')}
      />
      <ProfileSection
        title="Wishlist"
        icon={Heart}
        onClick={() => handleNavigation('/wishlists')}
      />
      <ProfileSection
        title="Recently Viewed"
        icon={History}
        onClick={() => handleNavigation('/recently-viewed')}
      />
      <ProfileSection
        title="Saved Addresses"
        icon={MapPin}
        onClick={() => handleNavigation('/addresses')}
      />
      <ProfileSection
        title="Payment Methods"
        icon={CreditCard}
        onClick={() => handleNavigation('/payment-methods')}
      />
      <ProfileSection
        title="Wallet & Transactions"
        icon={Wallet}
        onClick={() => handleNavigation('/wallet')}
      />
      <ProfileSection
        title="Rewards & Points"
        icon={Award}
        onClick={() => handleNavigation('/rewards')}
      />
      <ProfileSection
        title="Account Settings"
        icon={Settings}
        onClick={() => handleNavigation('/settings')}
      />
      <ProfileSection
        title="Security"
        icon={Shield}
        onClick={() => handleNavigation('/security')}
      />
      <ProfileSection
        title="Help Center"
        icon={HelpCircle}
        onClick={() => handleNavigation('/help')}
      />
    </div>
  );
};
