
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Key, Fingerprint, Smartphone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSecurityAction = (action: string) => {
    toast.success(`${action} initiated`);
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

        <h1 className="text-2xl font-bold mb-6">Security Settings</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password & Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Change Password</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => handleSecurityAction('Password change')}
                >
                  Update
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Fingerprint className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => handleSecurityAction('2FA setup')}
                >
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Devices</h3>
                    <p className="text-sm text-muted-foreground">
                      See all devices you're logged in to
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => handleSecurityAction('Device management')}
                >
                  View All
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Security Log</h3>
                    <p className="text-sm text-muted-foreground">
                      Review your account activity
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => handleSecurityAction('Security log review')}
                >
                  View Log
                </Button>
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
