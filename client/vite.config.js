import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    host: '127.0.0.1', // Use 127.0.0.1 instead of localhost
    port: 5173, // Optional: specify a port    
  },  
  plugins: [react()],
  
})
