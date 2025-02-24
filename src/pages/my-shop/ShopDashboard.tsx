
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import CreateShop from "./CreateShop";
import { WelcomeCard } from "./components/WelcomeCard";
import { StatsCards } from "./components/StatsCards";
import { ActionCards } from "./components/ActionCards";
import { AddProductDialog } from "./components/AddProductDialog";

const ShopDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasShop, setHasShop] = useState<boolean | null>(null);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);

  useEffect(() => {
    const checkShop = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("shops")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      setHasShop(!!data);
    };

    checkShop();
  }, [user]);

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
          <AddProductDialog />
        </div>

        <StatsCards />
        <ActionCards />
      </div>
      <Navigation />
    </div>
  );
};

export default ShopDashboard;
