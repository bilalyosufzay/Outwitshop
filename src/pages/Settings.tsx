
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleToggle = (setting: string) => {
    toast.success(`${setting} setting updated`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing" className="flex flex-col">
                  <span>Marketing emails</span>
                  <span className="text-sm text-muted-foreground">
                    Receive emails about new products and features
                  </span>
                </Label>
                <Switch
                  id="marketing"
                  onCheckedChange={() => handleToggle('Marketing emails')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="updates" className="flex flex-col">
                  <span>Product updates</span>
                  <span className="text-sm text-muted-foreground">
                    Get notified about platform updates
                  </span>
                </Label>
                <Switch
                  id="updates"
                  defaultChecked
                  onCheckedChange={() => handleToggle('Product updates')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="profile" className="flex flex-col">
                  <span>Public profile</span>
                  <span className="text-sm text-muted-foreground">
                    Make your profile visible to other users
                  </span>
                </Label>
                <Switch
                  id="profile"
                  defaultChecked
                  onCheckedChange={() => handleToggle('Public profile')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="activity" className="flex flex-col">
                  <span>Activity status</span>
                  <span className="text-sm text-muted-foreground">
                    Show when you're active on the platform
                  </span>
                </Label>
                <Switch
                  id="activity"
                  onCheckedChange={() => handleToggle('Activity status')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Settings;
