
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

// Improved service worker registration for web
if ('serviceWorker' in navigator && !isNativeApp) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Service Worker update found!');
          
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
              // You could show a toast notification here to prompt the user to refresh
            }
          });
        });
      })
      .catch(registrationError => {
        console.log('Service Worker registration failed: ', registrationError);
      });
      
    // Handle communication with the service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Message from Service Worker: ', event.data);
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
