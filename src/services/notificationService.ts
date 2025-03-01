
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import firebaseConfig from '../config/firebase';
import { toast } from 'sonner';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

class NotificationService {
  private vapidKey = process.env.FIREBASE_VAPID_KEY || 'YOUR_VAPID_KEY';
  
  // Request permission and get token
  async requestPermission() {
    console.log('Requesting notification permission...');
    
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        return this.getToken();
      } else {
        console.log('Notification permission denied.');
        return null;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return null;
    }
  }
  
  // Get FCM token
  async getToken() {
    try {
      const currentToken = await getToken(messaging, { vapidKey: this.vapidKey });
      
      if (currentToken) {
        console.log('FCM token obtained:', currentToken);
        this.saveTokenToLocalStorage(currentToken);
        this.sendTokenToServer(currentToken);
        return currentToken;
      } else {
        console.log('No FCM token available. Request permission first.');
        return null;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }
  
  // Save token to localStorage
  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem('fcm-token', token);
  }
  
  // Send token to backend server
  private async sendTokenToServer(token: string) {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/notifications/register-device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          userId: localStorage.getItem('user-id') || 'anonymous',
          platform: 'web',
        }),
      });
      
      if (response.ok) {
        console.log('FCM token registered with server successfully');
      } else {
        console.error('Failed to register FCM token with server');
      }
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  }
  
  // Listen for foreground messages
  listenForMessages() {
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload);
      
      const { notification } = payload;
      
      if (notification) {
        const { title, body } = notification;
        
        // Show toast notification for foreground messages
        toast(title || 'New notification', {
          description: body || '',
          duration: 5000,
          action: {
            label: 'View',
            onClick: () => this.handleNotificationClick(payload),
          },
        });
      }
    });
  }
  
  // Handle notification click
  private handleNotificationClick(payload: any) {
    console.log('Notification clicked:', payload);
    
    // Extract data from notification payload
    const data = payload.data || {};
    
    // Handle different types of notifications
    switch (data.type) {
      case 'order_update':
        window.location.href = `/orders/${data.orderId}`;
        break;
      case 'promotion':
        window.location.href = `/promotions/${data.promotionId}`;
        break;
      case 'message':
        window.location.href = '/messages';
        break;
      default:
        window.location.href = '/notifications';
    }
  }
}

export default new NotificationService();
