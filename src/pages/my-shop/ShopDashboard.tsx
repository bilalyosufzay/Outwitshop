
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import CreateShop from "./CreateShop";
import { WelcomeCard } from "./components/WelcomeCard";
import { StatsCards } from "./components/StatsCards";
import { ActionCards } from "./components/ActionCards";
import { AddProductDialog } from "./components/AddProductDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ShopDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasShop, setHasShop] = useState<boolean | null>(null);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
  const [shopStatus, setShopStatus] = useState<{
    verified: boolean;
    verification_status: string;
  } | null>(null);

  useEffect(() => {
    const checkShop = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("shops")
        .select("id, verified, verification_status")
        .eq("owner_id", user.id)
        .single();

      setHasShop(!!data);
      if (data) {
        setShopStatus({
          verified: data.verified,
          verification_status: data.verification_status,
        });
      }
    };

    checkShop();
  }, [user]);

  const handleSubmitVerification = () => {
    navigate("/my-shop/verification");
    toast.info("Please complete your shop verification to start selling.");
  };

  if (hasShop === null) {
    return <div>Loading...</div>;
  }

  if (!hasShop) {
    return (
      <>
        <WelcomeCard 
          open={showWelcomeDialog} 
          onOpenChange={setShowWelcomeDialog} 
        />
        <CreateShop />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          size="icon"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Shop</h1>
          <div className="flex gap-2">
            {shopStatus?.verification_status !== 'approved' && (
              <Button 
                variant="outline"
                onClick={handleSubmitVerification}
                className="gap-2"
              >
                <ShieldCheck className="h-4 w-4" />
                Submit for Verification
              </Button>
            )}
            <AddProductDialog />
          </div>
        </div>

        {shopStatus?.verification_status !== 'approved' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Verification Required</CardTitle>
              <CardDescription>
                Complete your shop verification to start selling products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-medium">Required Information:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Valid government-issued ID (Passport, Driver's License, or National ID)</li>
                <li>Business registration document or license (if applicable)</li>
                <li>Proof of address (utility bill or bank statement)</li>
                <li>Contact information (phone number and email)</li>
                <li>Bank account details for receiving payments</li>
                <li>Tax identification number (if applicable)</li>
              </ul>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Note: Verification typically takes 1-3 business days. You'll be notified via email once your shop is verified.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <StatsCards />
        <ActionCards />
      </div>
      <Navigation />
    </div>
  );
};

export default ShopDashboard;
