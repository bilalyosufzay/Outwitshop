
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ad14e26392fc413ca4cae1ae31f9b10f',
  appName: 'wishful-shopper',
  webDir: 'dist',
  server: {
    url: 'https://outwitshop.netlify.app', // Updated to use Netlify URL
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
