
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: '/',  // Explicitly set the base to root
  server: {
    host: true,
    port: 8080,
    strictPort: true, // Ensure the port is strictly enforced
    allowedHosts: ['ad14e263-92fc-413c-a4ca-e1ae31f9b10f.lovableproject.com']
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
        },
      },
    },
    typescript: {
      typeCheck: false
    }
  },
}));
