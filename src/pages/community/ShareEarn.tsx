
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ShareEarn = () => {
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
        
        <h1 className="text-2xl font-bold mb-6">Share & Earn</h1>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Your Referral Link</h3>
                    <p className="text-sm text-muted-foreground">Share and earn rewards</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Copy Link</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">Total Referrals</h3>
                <p className="text-2xl font-bold mt-2">0</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">Earnings</h3>
                <p className="text-2xl font-bold mt-2">$0.00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default ShareEarn;
