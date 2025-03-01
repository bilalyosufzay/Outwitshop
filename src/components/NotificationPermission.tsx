
import React, { useEffect, useState } from 'react';
import notificationService from '../services/notificationService';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const NotificationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Check initial notification permission status
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      try {
        const token = await notificationService.requestPermission();
        
        // Update permission status
        setPermissionStatus(Notification.permission);
        
        if (token) {
          toast.success(t('notifications.enabled_success'), {
            description: t('notifications.will_receive_updates'),
          });
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

  // Don't show anything if notifications aren't supported
  if (!('Notification' in window)) {
    return null;
  }

  // Don't show if already granted
  if (permissionStatus === 'granted') {
    return null;
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-accent/10 rounded-full">
          <Bell className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{t('notifications.enable_notifications')}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {t('notifications.stay_updated')}
          </p>
          <Button 
            size="sm" 
            onClick={requestPermission}
          >
            {t('notifications.enable_now')}
          </Button>
        </div>
      </div>
    </div>
  );
};
