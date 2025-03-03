
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import './i18n/config';
import { Capacitor } from '@capacitor/core';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Check if running in a Capacitor app environment
const isNativeApp = Capacitor.isNativePlatform();
console.log(`Running in ${isNativeApp ? 'native mobile app' : 'web browser'} environment`);

// Add some mobile platform detection
if (isNativeApp) {
  console.log(`Platform: ${Capacitor.getPlatform()}`);
  
  // Listen for device back button on Android
  document.addEventListener('ionBackButton', (ev) => {
    (ev as any).detail.register(10, () => {
      if (window.location.pathname === '/') {
        // Ask for confirmation before exiting the app
        if (window.confirm('Do you want to exit the app?')) {
          (Capacitor as any).Plugins?.App?.exitApp();
        }
      } else {
        // Go back in navigation
        window.history.back();
      }
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
