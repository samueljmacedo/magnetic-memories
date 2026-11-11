import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves the site from /<repo-name>/. Change to '/' for a custom domain.
  base: '/magnetic-memories/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
plugins: [react()],
})
