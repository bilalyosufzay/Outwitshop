
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Orders & Shopping</h1>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-accent/10 rounded" />
              <div className="h-32 bg-accent/10 rounded" />
            </div>
          ) : orders?.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">No orders found.</p>
              </CardContent>
            </Card>
          ) : (
            orders?.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <span className="text-sm font-medium capitalize px-3 py-1 bg-accent/10 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                    <div className="font-medium">
                      ${order.total_amount}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Orders;
