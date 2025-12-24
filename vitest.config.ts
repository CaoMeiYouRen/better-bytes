import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['test/**/*.test.ts'],
        alias: {
            '@': path.resolve(__dirname, './'),
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'clover', 'lcov'],
            reportsDirectory: './coverage',
        },
    },
})
