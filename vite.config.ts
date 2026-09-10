import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    allowedHosts: ['.onamp.dev'],
  },
  test: {
    coverage: {
      include: ['src/content/scenarioValidation.ts', 'src/lib/*.ts'],
      reporter: ['text'],
      thresholds: { branches: 75, functions: 85, lines: 85, statements: 85 },
    },
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: './src/test/setup.ts',
  },
})
