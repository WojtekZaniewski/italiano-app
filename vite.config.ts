import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');
          if (norm.includes('node_modules/react')) return 'vendor';
          if (norm.includes('/src/data/vocabulary') || norm.includes('/src/data/all-vocabulary')) return 'data-vocab';
          if (norm.includes('/src/data/')) return 'data-content';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
