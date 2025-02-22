
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WelcomeCardProps {
  onCancel: () => void;
}

export const WelcomeCard = ({ onCancel }: WelcomeCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Outwit Shop</CardTitle>
          <CardDescription>
            Start your journey as a seller by creating your own shop.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => navigate("/my-shop/create")}
            className="w-full"
          >
            Create Your Shop
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
