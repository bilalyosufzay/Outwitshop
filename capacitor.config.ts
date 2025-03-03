
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ad14e26392fc413ca4cae31f9b10f',
  appName: 'Outwit Shop',
  webDir: 'dist',
  server: {
    url: 'https://ad14e263-92fc-413c-a4ca-e1ae31f9b10f.lovableproject.com?forceHideBadge=true',
    cleartext: true,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: 'always'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#999999"
    }
  }
};

export default config;
