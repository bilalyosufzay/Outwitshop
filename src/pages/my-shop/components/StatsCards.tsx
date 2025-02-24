
import { Package, DollarSign, Store, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium">Products</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <DollarSign className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium">Revenue</h3>
          <p className="text-2xl font-bold mt-2">$0.00</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <Store className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium">Orders</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="font-medium">Customers</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </CardContent>
      </Card>
    </div>
  );
};
