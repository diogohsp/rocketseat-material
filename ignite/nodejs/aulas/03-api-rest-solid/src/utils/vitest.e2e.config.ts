import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['src/http/**/*.spec.ts'],
    setupFiles: ['./src/http/middlewares/globalSetup.e2e.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [tsconfigPaths()],
})
