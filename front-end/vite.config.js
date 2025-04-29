import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, or whatever framework you're using

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
