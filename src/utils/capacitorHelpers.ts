
import { Capacitor } from '@capacitor/core';

/**
 * Check if the app is running in a native environment
 */
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Get the current platform (ios, android, web)
 */
export const getPlatform = (): string => {
  return Capacitor.getPlatform();
};

/**
 * Open external URLs safely in a browser
 * @param url URL to open
 */
export const openExternalUrl = async (url: string): Promise<void> => {
  if (isNativePlatform()) {
    try {
      // Use the Browser plugin to open URLs
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url });
    } catch (error) {
      console.error('Error opening external URL:', error);
      // Fallback to window.open
      window.open(url, '_blank');
    }
  } else {
    // Regular web behavior
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Check if the device has network connectivity
 */
export const checkNetworkStatus = async (): Promise<boolean> => {
  if (isNativePlatform()) {
    try {
      const { Network } = await import('@capacitor/network');
      const status = await Network.getStatus();
      return status.connected;
    } catch (error) {
      console.error('Error checking network status:', error);
      return navigator.onLine;
    }
  }
  return navigator.onLine;
};

/**
 * Show a native toast message
 * @param message Message to display
 */
export const showNativeToast = async (message: string): Promise<void> => {
  if (isNativePlatform()) {
    try {
      const { Toast } = await import('@capacitor/toast');
      await Toast.show({
        text: message,
        duration: 'short'
      });
    } catch (error) {
      console.error('Error showing toast:', error);
      // No fallback needed, the app already uses sonner for web toasts
    }
  }
  // In web environment, use the existing toast system
};
