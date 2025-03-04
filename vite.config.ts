
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080
  }
})
</lov-add-dependency>clsx@latest</lov-add-dependency>
<lov-add-dependency>class-variance-authority@latest</lov-add-dependency>
<lov-add-dependency>tailwind-merge@latest</lov-add-dependency>
<lov-add-dependency>sonner@latest</lov-add-dependency>
<lov-add-dependency>next-themes@latest</lov-add-dependency>
<lov-add-dependency>@radix-ui/react-slot@latest</lov-add-dependency>
<lov-add-dependency>@vitejs/plugin-react@latest</lov-add-dependency>
