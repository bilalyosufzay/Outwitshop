
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Heart } from "lucide-react";

const Wishlists = () => {
  const navigate = useNavigate();

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
        
        <h1 className="text-2xl font-bold mb-6">Your Wishlists</h1>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Create and manage your wishlists.
          </p>
          
          {/* Placeholder for future wishlist content */}
          <div className="rounded-lg border p-4 flex flex-col items-center justify-center space-y-4">
            <Heart className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              Your wishlist is empty
            </p>
            <Button onClick={() => navigate('/')}>Start Shopping</Button>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Wishlists;
