
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, DollarSign, Package, MessageSquare, BarChart3 } from "lucide-react";
import { Shop } from "@/types/shop";
import { DashboardStats } from "@/types/dashboard";

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

  useEffect(() => {
    const fetchShop = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('shops')
          .select()
          .eq("owner_id", user.id)
          .single();

        if (error) throw error;
        setShop(data as Shop);

        // Fetch dashboard statistics
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

    fetchShop();
  }, [user]);

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Outwit Shop</CardTitle>
            <CardDescription>
              Start your journey as a seller by creating your own shop.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate("/my-shop/create")}
              className="w-full"
            >
              Create Your Shop
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{shop.name}</CardTitle>
            <CardDescription>
              Shop Status: <span className="capitalize">{shop.status}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{shop.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Lifetime earnings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Total orders received
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Active listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unreadMessages}</div>
              <p className="text-xs text-muted-foreground">
                Unread messages
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/my-shop/products/new")}
                className="w-full"
              >
                Add Product
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="secondary"
                onClick={() => navigate("/my-shop/orders")}
                className="w-full"
              >
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => navigate("/my-shop/settings")}
                className="w-full"
              >
                Manage Shop
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
