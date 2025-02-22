
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PriceAlerts = () => {
  const navigate = useNavigate();

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
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Price Drop Alerts</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Price Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No active price alerts set.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default PriceAlerts;
