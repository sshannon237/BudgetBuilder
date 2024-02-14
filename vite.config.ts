import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@mui/material/styles',
      '@emotion/styled',
      // '@mui/x-date-pickers'
    ],
  },
  plugins: [react()],
})
