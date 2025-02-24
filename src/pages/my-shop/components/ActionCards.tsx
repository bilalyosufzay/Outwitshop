
import { Package, DollarSign, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ActionCards = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Package className="h-4 w-4 mr-2" />
            Manage Products
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <DollarSign className="h-4 w-4 mr-2" />
            View Orders
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Store className="h-4 w-4 mr-2" />
            Shop Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
