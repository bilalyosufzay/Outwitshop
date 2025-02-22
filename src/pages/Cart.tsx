
import Navigation from "@/components/Navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cart = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">Start shopping to add items to your cart</p>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Continue Shopping
          </Button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Cart;
