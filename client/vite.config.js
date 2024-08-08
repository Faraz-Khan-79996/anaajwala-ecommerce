import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react(),
  svgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
    include: "**/*.svg",
  }),],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      images: path.resolve(__dirname, 'src/images'),
      // Add other directories as needed
    },
  },
  define: {
    'process.platform': JSON.stringify(process.platform), // This adds process.platform to your app
    'process.env.HOME': JSON.stringify(__dirname), // Points to the project root directory
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
})
