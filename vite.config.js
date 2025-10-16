import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Pour Hostinger, utilisez '/' ou votre sous-dossier
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          i18n: ['react-i18next', 'i18next']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
