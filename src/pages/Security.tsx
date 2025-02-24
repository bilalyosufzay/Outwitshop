
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Shield, Key, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Security = () => {
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
        
        <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex items-start space-x-4">
              <Key className="h-5 w-5 text-muted-foreground mt-1" />
              <div className="space-y-1">
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Change your password</p>
                <Button variant="outline" size="sm">Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-start space-x-4">
              <Smartphone className="h-5 w-5 text-muted-foreground mt-1" />
              <div className="space-y-1">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                <Button variant="outline" size="sm">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-start space-x-4">
              <Shield className="h-5 w-5 text-muted-foreground mt-1" />
              <div className="space-y-1">
                <h3 className="font-medium">Security Log</h3>
                <p className="text-sm text-muted-foreground">View recent security activity</p>
                <Button variant="outline" size="sm">View Log</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Security;
