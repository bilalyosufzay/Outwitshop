
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WalletPage = () => {
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

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Wallet & Transactions</h1>
          </div>
          <Button onClick={() => navigate('/wallet/add-funds')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$0.00</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recent transactions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default WalletPage;
