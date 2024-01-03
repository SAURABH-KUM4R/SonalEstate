import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Here it means if you have seen '/api' in any request just add target's value at the front of that request.
      '/api' : {
        target: 'http://127.0.0.1:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
