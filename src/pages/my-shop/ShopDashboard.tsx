
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Shop } from "@/types/shop";
import { DashboardStats } from "@/types/dashboard";
import { VerificationSection } from "./components/VerificationSection";
import { StatsCards } from "./components/StatsCards";
import { ShopInfoCard } from "./components/ShopInfoCard";
import { ActionCards } from "./components/ActionCards";
import { WelcomeCard } from "./components/WelcomeCard";

const ShopDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shop, setShop] = useState<Shop | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchShop = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('shops')
        .select()
        .eq("owner_id", user.id)
        .single();

      if (error) throw error;
      
      const transformedShop: Shop = {
        ...data,
        verification_status: (data.verification_status || 'pending') as Shop['verification_status'],
        verification_documents: (data.verification_documents as any[] || []).map((doc: any) => ({
          type: doc.type as 'business_license' | 'id_card' | 'proof_of_address',
          url: doc.url,
          uploaded_at: doc.uploaded_at,
        })),
      };
      
      setShop(transformedShop);

      if (data) {
        const [
          { count: ordersCount, sum: revenue },
          { count: productsCount },
          { count: unreadCount },
        ] = await Promise.all([
          supabase
            .from('orders')
            .select('id, total_amount', { count: 'exact', head: false })
            .eq('shop_id', data.id)
            .then(({ count, data }) => ({
              count: count || 0,
              sum: data?.reduce((acc, order) => acc + (order.total_amount || 0), 0) || 0,
            })),
          supabase
            .from('products')
            .select('id', { count: 'exact', head: true })
            .eq('shop_id', data.id),
          supabase
            .from('messages')
            .select('id', { count: 'exact', head: true })
            .eq('shop_id', data.id)
            .eq('read', false),
        ]);

        setStats({
          totalOrders: ordersCount,
          totalRevenue: revenue,
          totalProducts: productsCount || 0,
          unreadMessages: unreadCount || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching shop:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShop();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!shop) {
    return <WelcomeCard onCancel={() => navigate("/")} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        <ShopInfoCard shop={shop} />

        <Card>
          <CardContent className="py-6">
            <VerificationSection shop={shop} onVerificationUpdate={fetchShop} />
          </CardContent>
        </Card>

        <StatsCards stats={stats} />
        <ActionCards />
      </div>
    </div>
  );
};

export default ShopDashboard;
