
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, ShoppingBag, LogIn, Gift, Star, Truck } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-accent/10 to-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="space-y-6">
          <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
            <PartyPopper className="w-10 h-10 text-accent animate-bounce" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Outwit Shop!
          </CardTitle>
          <p className="text-lg text-muted-foreground">
            Your account has been successfully created. Get ready to explore amazing products and exclusive deals!
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
              <Gift className="w-8 h-8 text-accent mb-2" />
              <h3 className="font-semibold">Special Offers</h3>
              <p className="text-sm text-muted-foreground">Exclusive deals for new members</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
              <Star className="w-8 h-8 text-accent mb-2" />
              <h3 className="font-semibold">Earn Points</h3>
              <p className="text-sm text-muted-foreground">Rewards on every purchase</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-accent/5 rounded-lg">
              <Truck className="w-8 h-8 text-accent mb-2" />
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Quick and reliable shipping</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full gap-2 text-lg h-14">
              <Link to="/">
                <ShoppingBag className="w-6 h-6" />
                Start Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full gap-2 text-lg h-14">
              <Link to="/auth/login">
                <LogIn className="w-6 h-6" />
                Sign In
              </Link>
            </Button>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              Need assistance? Our support team is here to help!
            </p>
            <p className="text-sm font-medium text-accent hover:text-accent/80 cursor-pointer">
              Contact Support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
