import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repository from /Vault/, not the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/Vault/',
})
