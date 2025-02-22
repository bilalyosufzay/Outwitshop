
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
import { Loader2 } from "lucide-react";

interface Shop {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

const ShopDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shop, setShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("shops")
          .select()
          .eq("owner_id", user.id)
          .single();

        if (error) throw error;
        setShop(data as Shop);
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
          <CardFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full"
            >
              Exit Shop Dashboard
            </Button>
          </CardFooter>
        </Card>

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
