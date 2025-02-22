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
          // Initialize seller level if it doesn't exist
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

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <ProfileSection
        title="Manage Shop"
        icon={Store}
        onClick={() => {
          navigate('/my-shop');
          toast.info("Loading shop dashboard...");
        }}
      />
      <ProfileSection
        title="Analytics"
        icon={ChartBar}
        onClick={() => {
          navigate('/shop/analytics');
          toast.info("Loading analytics...");
        }}
      />
      <ProfileSection
        title="Orders Management"
        icon={Package}
        onClick={() => {
          navigate('/shop/orders');
          toast.info("Loading orders...");
        }}
      />
      <ProfileSection
        title="Customer Reviews"
        icon={Star}
        onClick={() => navigate('/shop/reviews')}
      />
      <ProfileSection
        title="Customer Messages"
        icon={MessageSquare}
        onClick={() => navigate('/shop/messages')}
      />
      <ProfileSection
        title="Customer Management"
        icon={Users}
        onClick={() => {
          navigate('/shop/customers');
          toast.info("Loading customer management...");
        }}
      />
      <ProfileSection
        title="AI Assistant"
        icon={Bot}
        onClick={() => navigate('/shop/ai-assistant')}
      />
      <ProfileSection
        title="Social Integration"
        icon={Link}
        onClick={() => navigate('/shop/social')}
      />
      <ProfileSection
        title="Reports"
        icon={FileText}
        onClick={() => {
          navigate('/shop/reports');
          toast.info("Loading reports...");
        }}
      />
    </div>
  );
};
