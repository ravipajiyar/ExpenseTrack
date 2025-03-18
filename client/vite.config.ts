import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure CSS processing is correctly configured
  css: {
    devSourcemap: true,
  },
  // Resolve paths correctly
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
