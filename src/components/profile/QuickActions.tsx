
import { Button } from "@/components/ui/button";
import { Settings2, Bell, Shield } from "lucide-react";

interface QuickActionsProps {
  onNavigate: (path: string) => void;
}

export const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 h-auto py-4" 
        onClick={() => onNavigate('/settings')}
      >
        <Settings2 className="h-5 w-5" />
        <div className="text-left">
          <div className="font-medium">Settings</div>
          <div className="text-sm text-muted-foreground">Manage your preferences</div>
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2 h-auto py-4" 
        onClick={() => onNavigate('/notifications')}
      >
        <Bell className="h-5 w-5" />
        <div className="text-left">
          <div className="font-medium">Notifications</div>
          <div className="text-sm text-muted-foreground">Configure alerts</div>
        </div>
      </Button>

      <Button 
        variant="outline" 
        className="flex items-center gap-2 h-auto py-4" 
        onClick={() => onNavigate('/security')}
      >
        <Shield className="h-5 w-5" />
        <div className="text-left">
          <div className="font-medium">Security</div>
          <div className="text-sm text-muted-foreground">Protect your account</div>
        </div>
      </Button>
    </div>
  );
};
