
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ad14e26392fc413ca4cae1ae31f9b10f',
  appName: 'outwitshop',
  webDir: 'dist',
  server: {
    url: 'https://yourdomain.com', // Replace with your actual custom domain
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
