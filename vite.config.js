

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
      external: ['react-router-dom'] // Ajouter react-router-dom comme dépendance externe
    }
  }
})
