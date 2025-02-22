
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Rewards = () => {
  const navigate = useNavigate();

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

        <div className="flex items-center gap-2 mb-6">
          <Award className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Rewards & Points</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Points Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">0 pts</div>
              <Progress value={0} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Earn 100 more points to reach the next tier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No rewards available yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;
