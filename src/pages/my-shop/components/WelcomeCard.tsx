
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowRight, X } from "lucide-react";

interface WelcomeCardProps {
  onCancel: () => void;
}

export const WelcomeCard = ({ onCancel }: WelcomeCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/10 to-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <Store className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to Seller Center!</CardTitle>
          <p className="text-muted-foreground">
            Start your journey as a seller by creating your own shop. Unlock the potential to reach thousands of customers!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => navigate("/my-shop/create")}
          >
            <Store className="w-5 h-5" />
            Create Your Shop
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onCancel}
            className="w-full gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Need guidance? Check out our seller guide or contact support
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
