
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ActionCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/my-shop/products/add")}
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
  );
};
