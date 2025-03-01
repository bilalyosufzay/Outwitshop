
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
import { useTranslation } from "react-i18next";

export const BuyerContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

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

  const handleNavigation = (path: string, message?: string) => {
    navigate(path);
    if (message) {
      toast.info(message);
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <ProfileSection
        title={t('profile.buyer.auto_reorder')}
        description={t('profile.buyer.auto_reorder_desc')}
        icon={RefreshCcw}
        onClick={() => handleNavigation('/buyer/auto-reorder', 'Loading auto-reorder settings...')}
      />
      <ProfileSection
        title={t('profile.buyer.price_alerts')}
        description={t('profile.buyer.price_alerts_desc')}
        icon={Bell}
        onClick={() => handleNavigation('/buyer/price-alerts', 'Loading price alerts...')}
      />
      <ProfileSection
        title={t('profile.buyer.orders')}
        icon={ShoppingBag}
        onClick={() => handleNavigation('/buyer/orders')}
      />
      <ProfileSection
        title={t('profile.buyer.wishlist')}
        icon={Heart}
        onClick={() => handleNavigation('/community/wishlists')}
      />
      <ProfileSection
        title={t('profile.buyer.recently_viewed')}
        icon={History}
        onClick={() => handleNavigation('/buyer/recently-viewed')}
      />
      <ProfileSection
        title={t('profile.buyer.addresses')}
        icon={MapPin}
        onClick={() => handleNavigation('/buyer/addresses')}
      />
      <ProfileSection
        title={t('profile.buyer.payment_methods')}
        icon={CreditCard}
        onClick={() => handleNavigation('/buyer/payment-methods')}
      />
      <ProfileSection
        title={t('profile.buyer.wallet')}
        icon={Wallet}
        onClick={() => handleNavigation('/buyer/wallet')}
      />
      <ProfileSection
        title={t('profile.buyer.rewards')}
        icon={Award}
        onClick={() => handleNavigation('/buyer/rewards')}
      />
      <ProfileSection
        title={t('profile.buyer.account_settings')}
        icon={Settings}
        onClick={() => handleNavigation('/settings')}
      />
      <ProfileSection
        title={t('profile.buyer.security')}
        icon={Shield}
        onClick={() => handleNavigation('/security')}
      />
      <ProfileSection
        title={t('profile.buyer.help_center')}
        icon={HelpCircle}
        onClick={() => handleNavigation('/help')}
      />
    </div>
  );
};
