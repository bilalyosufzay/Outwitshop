
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AutoReorder = () => {
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
          <RefreshCcw className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Auto-Reorder Essentials</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Auto-Reorders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No active auto-reorder subscriptions found.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for Auto-Reorder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Start shopping to get personalized recommendations.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default AutoReorder;
