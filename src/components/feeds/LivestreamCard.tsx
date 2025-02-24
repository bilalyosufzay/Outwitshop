
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LivestreamCardProps {
  index: number;
  shopName: string;
}

export const LivestreamCard = ({ index, shopName }: LivestreamCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isStreaming, setIsStreaming] = useState(false);

  // Check if the user is a seller
  const { data: userLevel } = useQuery({
    queryKey: ['userLevel', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('user_levels')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'seller')
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const isSeller = !!userLevel;

  const handleStartStream = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to start streaming",
        variant: "destructive"
      });
      return;
    }

    if (!isSeller) {
      toast({
        title: "Seller Account Required",
        description: "Only sellers can start livestreams",
        variant: "destructive"
      });
      return;
    }

    setIsStreaming(true);
    toast({
      title: "Stream Started",
      description: "Your livestream has been started successfully"
    });
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-0">
        <img 
          src={`https://picsum.photos/seed/${index + 10}/400/300`} 
          alt="Live stream thumbnail" 
          className="w-full h-48 object-cover"
        />
        {isStreaming && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block"></span>
              LIVE
            </span>
          </div>
        )}
        <div className="p-4">
          <h3 className="font-medium">Product Showcase #{index + 1}</h3>
          <p className="text-sm text-muted-foreground">{shopName}</p>
          
          {isSeller ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="mt-2 w-full"
                  onClick={handleStartStream}
                >
                  <Video className="w-4 h-4 mr-2" />
                  {isStreaming ? 'End Stream' : 'Start Stream'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start Livestream</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Your livestream will be visible to all users.</p>
                  <Button 
                    className="w-full" 
                    onClick={() => setIsStreaming(!isStreaming)}
                  >
                    {isStreaming ? 'End Stream' : 'Start Stream'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button 
              variant="secondary" 
              size="sm" 
              className="mt-2 w-full"
              onClick={() => {
                if (!user) {
                  toast({
                    title: "Authentication Required",
                    description: "Please login to join the stream",
                    variant: "destructive"
                  });
                  return;
                }
                toast({
                  title: "Stream Joined",
                  description: "You've joined the livestream"
                });
              }}
            >
              Join Stream
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
