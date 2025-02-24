
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, ShoppingBag, LogIn } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/10 to-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <PartyPopper className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to Outwit Shop!</CardTitle>
          <p className="text-muted-foreground">
            Your account has been successfully created. Start exploring our amazing products and deals!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild size="lg" className="w-full gap-2">
            <Link to="/">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full gap-2">
            <Link to="/auth/login">
              <LogIn className="w-5 h-5" />
              Sign In
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Need help? Contact our support team
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
