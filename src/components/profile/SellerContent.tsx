
import { useNavigate } from "react-router-dom";
import { ProfileSection } from "./ProfileSection";
import { Store, Star, MessageSquare, Bot, Link, ChartBar, Package, Users, FileText } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const SellerContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
        title="Manage Shop"
        icon={Store}
        onClick={() => handleNavigation('/my-shop')}
      />
      <ProfileSection
        title="Analytics"
        icon={ChartBar}
        onClick={() => handleNavigation('/my-shop/analytics', 'Loading analytics...')}
      />
      <ProfileSection
        title="Orders Management"
        icon={Package}
        onClick={() => handleNavigation('/my-shop/orders', 'Loading orders...')}
      />
      <ProfileSection
        title="Customer Reviews"
        icon={Star}
        onClick={() => handleNavigation('/my-shop/reviews')}
      />
      <ProfileSection
        title="Customer Messages"
        icon={MessageSquare}
        onClick={() => handleNavigation('/my-shop/messages')}
      />
      <ProfileSection
        title="Customer Management"
        icon={Users}
        onClick={() => handleNavigation('/my-shop/customers', 'Loading customer management...')}
      />
      <ProfileSection
        title="AI Assistant"
        icon={Bot}
        onClick={() => handleNavigation('/my-shop/ai-assistant')}
      />
      <ProfileSection
        title="Social Integration"
        icon={Link}
        onClick={() => handleNavigation('/my-shop/social')}
      />
      <ProfileSection
        title="Reports"
        icon={FileText}
        onClick={() => handleNavigation('/my-shop/reports', 'Loading reports...')}
      />
    </div>
  );
};
