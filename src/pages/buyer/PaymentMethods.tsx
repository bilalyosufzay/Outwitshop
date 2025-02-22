
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentMethods = () => {
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

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Payment Methods</h1>
          </div>
          <Button onClick={() => navigate('/payment-methods/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Saved Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No payment methods saved.</p>
          </CardContent>
        </Card>
      </div>
      <Navigation />
    </div>
  );
};

export default PaymentMethods;
