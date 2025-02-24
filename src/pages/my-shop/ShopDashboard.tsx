import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Store, Package, DollarSign, Users, ArrowLeft, FileText, AlertCircle, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import CreateShop from "./CreateShop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

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
        <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Welcome to Seller Center
              </DialogTitle>
              <DialogDescription>
                Before creating your shop, please ensure you have the following information ready.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Required Information</h3>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Valid government-issued ID card
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Business license (if applicable)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Contact email and phone number
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Physical business address
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Verification Process</p>
                  <p>Your shop application will be reviewed within 1-2 business days. We'll verify your information to ensure a safe marketplace for all users.</p>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  onClick={() => {
                    setShowWelcomeDialog(false);
                    toast.info("Please fill in all required information carefully");
                  }} 
                  className="w-full"
                >
                  Continue to Shop Creation
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Required Product Information
                </DialogTitle>
                <DialogDescription>
                  Please ensure you have the following information ready before adding a product.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Basic Information</h3>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Product name and detailed description
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Category and subcategory selection
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Price and any applicable discounts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Stock quantity and SKU (if applicable)
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Media Requirements</h3>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      High-quality product images (min. 800x800px)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Multiple angles of the product
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Product dimensions in photos
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Additional Details</h3>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Shipping dimensions and weight
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Product specifications and features
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Any variants (size, color, etc.)
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Important Notice</p>
                    <p>Products must comply with our marketplace guidelines and terms of service. Ensure all information is accurate and up-to-date.</p>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate("/my-shop/products/add")} 
                  className="w-full"
                >
                  Continue to Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

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
      </div>
      <Navigation />
    </div>
  );
};

export default ShopDashboard;
