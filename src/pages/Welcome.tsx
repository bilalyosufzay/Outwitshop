
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <PartyPopper className="w-12 h-12 mx-auto mb-4 text-primary" />
          <CardTitle className="text-2xl">Welcome!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your account has been successfully created.
          </p>
          <Button asChild className="w-full">
            <Link to="/">Start Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/auth/login">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
