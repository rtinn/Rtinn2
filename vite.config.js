import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['mixed-decls'],
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom']
    },
    chunkSizeWarningLimit: 1000 // Ignorer l'avertissement pour les chunks > 500 kB
  }
})