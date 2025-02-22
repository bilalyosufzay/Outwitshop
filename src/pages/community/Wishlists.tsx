
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const Wishlists = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: wishlists, isLoading } = useQuery({
    queryKey: ['wishlists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-accent/10 rounded" />
            <div className="h-32 bg-accent/10 rounded" />
          </div>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Public Wishlists</h1>
          <Button onClick={() => navigate('/wishlists/create')}>
            <Heart className="mr-2 h-4 w-4" />
            Create Wishlist
          </Button>
        </div>

        <div className="space-y-6">
          {wishlists?.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">No wishlists found.</p>
              </CardContent>
            </Card>
          ) : (
            wishlists?.map((wishlist) => (
              <Card key={wishlist.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{wishlist.name}</CardTitle>
                    {wishlist.is_public && (
                      <Badge variant="secondary">Public</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{wishlist.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Wishlists;
