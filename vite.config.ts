// https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
})
