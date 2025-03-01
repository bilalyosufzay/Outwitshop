
// Firebase Cloud Messaging Service Worker

importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Firebase configuration - must match your main config
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const { notification } = payload;

  if (notification) {
    const { title, body, icon, click_action } = notification;

    // Show notification
    self.registration.showNotification(title || 'Notification', {
      body: body || '',
      icon: icon || '/favicon.ico',
      badge: '/favicon.ico',
      data: payload.data,
      actions: [
        {
          action: 'view',
          title: 'View',
        },
      ],
    });
  }
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  // Extract data from notification
  const data = event.notification.data || {};
  
  // Default URL to open
  let urlToOpen = '/notifications';
  
  // Determine URL based on notification type
  switch (data.type) {
    case 'order_update':
      urlToOpen = `/orders/${data.orderId}`;
      break;
    case 'promotion':
      urlToOpen = `/promotions/${data.promotionId}`;
      break;
    case 'message':
      urlToOpen = '/messages';
      break;
  }
  
  // Open or focus the appropriate window/tab
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there is already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }
        // If no window/tab is open with target URL, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
