import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/api': {
      target: 'http://localhost:3030/',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, '')
    },
    cors:false
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './setup.js',
},
  define: {
    'process.env': {}
  }
})


