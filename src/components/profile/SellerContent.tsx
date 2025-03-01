
import { useNavigate } from "react-router-dom";
import { ProfileSection } from "./ProfileSection";
import { Store, Star, MessageSquare, Bot, Link, ChartBar, Package, Users, FileText } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const SellerContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSellerProfile = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('user_levels')
          .select('*')
          .eq('type', 'seller')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching seller profile:', error);
          return;
        }

        if (!data) {
          const { error: insertError } = await supabase
            .from('user_levels')
            .insert({
              user_id: user.id,
              type: 'seller' as const,
              current_level: 'Starter Seller',
              total_sales: 0,
              average_rating: 0,
              points: 0
            });

          if (insertError) {
            console.error('Error initializing seller profile:', insertError);
          }
        }
      } catch (error) {
        console.error('Error in fetchSellerProfile:', error);
      }
    };

    fetchSellerProfile();
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
        title={t('profile.seller.manage_shop')}
        icon={Store}
        onClick={() => handleNavigation('/my-shop')}
      />
      <ProfileSection
        title={t('profile.seller.manage_products')}
        icon={Package}
        onClick={() => handleNavigation('/my-shop/products', 'Loading your products...')}
      />
      <ProfileSection
        title={t('profile.seller.analytics')}
        icon={ChartBar}
        onClick={() => handleNavigation('/my-shop/analytics', 'Loading analytics...')}
      />
      <ProfileSection
        title={t('profile.seller.orders')}
        icon={Package}
        onClick={() => handleNavigation('/my-shop/orders', 'Loading orders...')}
      />
      <ProfileSection
        title={t('profile.seller.reviews')}
        icon={Star}
        onClick={() => handleNavigation('/my-shop/reviews')}
      />
      <ProfileSection
        title={t('profile.seller.messages')}
        icon={MessageSquare}
        onClick={() => handleNavigation('/my-shop/messages')}
      />
      <ProfileSection
        title={t('profile.seller.customers')}
        icon={Users}
        onClick={() => handleNavigation('/my-shop/customers', 'Loading customer management...')}
      />
      <ProfileSection
        title={t('profile.seller.ai_assistant')}
        icon={Bot}
        onClick={() => handleNavigation('/my-shop/ai-assistant')}
      />
      <ProfileSection
        title={t('profile.seller.social')}
        icon={Link}
        onClick={() => handleNavigation('/my-shop/social')}
      />
      <ProfileSection
        title={t('profile.seller.reports')}
        icon={FileText}
        onClick={() => handleNavigation('/my-shop/reports', 'Loading reports...')}
      />
    </div>
  );
};
