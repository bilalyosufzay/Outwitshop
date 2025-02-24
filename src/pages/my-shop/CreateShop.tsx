
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { toast } from "sonner";
import { useCreateShop } from "./hooks/useCreateShop";

const CreateShop = () => {
  const navigate = useNavigate();
  const { createShop, isLoading } = useCreateShop();

  const handleCreateShop = async () => {
    try {
      await createShop();
      toast.success("Shop created successfully!");
      navigate("/my-shop");
    } catch (error) {
      toast.error("Failed to create shop. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-lg mx-auto py-8">
        <Card className="border shadow-lg">
          <CardHeader className="text-center">
            <Store className="w-12 h-12 mx-auto text-primary mb-2" />
            <CardTitle className="text-2xl">Create Your Shop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center px-6">
            <p className="text-muted-foreground">
              Start your journey as a seller by creating your own shop.
            </p>
            <Button 
              onClick={handleCreateShop} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Shop"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateShop;
