import { defineConfig } from 'eslint/config'
import cmyr from 'eslint-config-cmyr'

export default defineConfig([
    ...cmyr,
    {
        rules: {
            'no-console': 0,
        },
    },
])
