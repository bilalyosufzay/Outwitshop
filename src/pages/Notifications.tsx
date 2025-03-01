
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Bell, Tag, Package, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import notificationService from "@/services/notificationService";
import { toast } from "sonner";
import { NotificationPermission } from "@/components/NotificationPermission";

const Notifications = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | null>(null);

  useEffect(() => {
    // Check notification permission status on component mount
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
      setNotificationsEnabled(Notification.permission === 'granted');
      
      // If permission is granted, initialize FCM token and listeners
      if (Notification.permission === 'granted') {
        initializeNotifications();
      }
    }
  }, []);
  
  const initializeNotifications = async () => {
    try {
      // Get or refresh FCM token
      await notificationService.getToken();
      
      // Start listening for foreground messages
      notificationService.listenForMessages();
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  const handlePermissionRequest = async () => {
    if ('Notification' in window) {
      try {
        const token = await notificationService.requestPermission();
        
        // Update state based on new permission status
        setPermissionStatus(Notification.permission);
        setNotificationsEnabled(Notification.permission === 'granted');
        
        if (token) {
          toast.success(t('notifications.enabled_success'), {
            description: t('notifications.will_receive_updates'),
          });
          
          // Start listening for foreground messages
          notificationService.listenForMessages();
        } else if (Notification.permission === 'denied') {
          toast.error(t('notifications.permission_denied'), {
            description: t('notifications.enable_in_browser_settings'),
          });
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        toast.error(t('notifications.error'), {
          description: t('notifications.try_again_later'),
        });
      }
    } else {
      toast.error(t('notifications.not_supported'), {
        description: t('notifications.use_modern_browser'),
      });
    }
  };

  const handleCategoryToggle = (category: string, enabled: boolean) => {
    console.log(`${category} notifications ${enabled ? 'enabled' : 'disabled'}`);
    
    // In a real app, this would update user preferences in the backend
    // For now, we'll just show a toast
    toast.success(`${category} notifications ${enabled ? 'enabled' : 'disabled'}`);
  };

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
        
        <h1 className="text-2xl font-bold mb-6">{t('header.notifications')}</h1>
        
        {/* Show permission banner if not yet granted */}
        {permissionStatus !== 'granted' && (
          <div className="mb-6">
            <NotificationPermission />
          </div>
        )}
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Price Alerts</h3>
                    <p className="text-sm text-muted-foreground">Get notified about price drops</p>
                  </div>
                </div>
                <Switch 
                  disabled={!notificationsEnabled} 
                  onCheckedChange={(checked) => handleCategoryToggle('Price Alerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Order Updates</h3>
                    <p className="text-sm text-muted-foreground">Track your order status</p>
                  </div>
                </div>
                <Switch 
                  defaultChecked 
                  disabled={!notificationsEnabled}
                  onCheckedChange={(checked) => handleCategoryToggle('Order Updates', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Wishlist Updates</h3>
                    <p className="text-sm text-muted-foreground">When items are back in stock</p>
                  </div>
                </div>
                <Switch 
                  defaultChecked 
                  disabled={!notificationsEnabled}
                  onCheckedChange={(checked) => handleCategoryToggle('Wishlist Updates', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Marketing</h3>
                    <p className="text-sm text-muted-foreground">Receive promotional updates</p>
                  </div>
                </div>
                <Switch 
                  disabled={!notificationsEnabled}
                  onCheckedChange={(checked) => handleCategoryToggle('Marketing', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Information about notifications if disabled */}
        {permissionStatus === 'denied' && (
          <div className="mt-6 p-4 border border-red-200 rounded-md bg-red-50">
            <p className="text-sm text-red-800">
              Notifications are blocked. Please enable them in your browser settings to receive updates.
            </p>
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Notifications;
