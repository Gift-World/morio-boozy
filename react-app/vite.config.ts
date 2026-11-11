import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: fileURLToPath(new URL('../assets', import.meta.url)),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
