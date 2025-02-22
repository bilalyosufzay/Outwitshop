
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ShareEarn = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: referralCodes } = useQuery({
    queryKey: ['referral-codes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      return data;
    }
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Referral code copied to clipboard');
  };

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

        <h1 className="text-2xl font-bold mb-6">Share & Earn</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Codes</CardTitle>
            </CardHeader>
            <CardContent>
              {referralCodes?.length === 0 ? (
                <p className="text-muted-foreground">No referral codes found.</p>
              ) : (
                <div className="space-y-4">
                  {referralCodes?.map((code) => (
                    <div key={code.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{code.code}</p>
                        <p className="text-sm text-muted-foreground">Rewards earned: ${code.rewards_earned}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleCopyCode(code.code)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How it Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Share2 className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Share Your Code</h3>
                  <p className="text-sm text-muted-foreground">Share your unique referral code with friends</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-1 rounded-full bg-primary/10">
                  <span className="text-xs font-medium">$</span>
                </div>
                <div>
                  <h3 className="font-medium">Earn Rewards</h3>
                  <p className="text-sm text-muted-foreground">Get rewards when friends use your code</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default ShareEarn;
