import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Cloudflare (and a custom domain) serve the site from the root. GitHub Pages serves it
  // from /<repo-name>/, so its workflow sets VITE_BASE=/magnetic-memories/ while it is still used.
  base: process.env.VITE_BASE ?? '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
plugins: [react()],
})
