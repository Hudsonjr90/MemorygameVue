import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { quasarOptions } from './quasar-options.ts'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'

  return {
    plugins: [
      ...(isDevelopment ? [vueDevTools()] : []),

      vue({
        template: {
          transformAssetUrls,
        },
      }),

      quasar({
        ...quasarOptions,

        sassVariables: fileURLToPath(
          new URL(
            './src/assets/styles/quasar-variables.sass',
            import.meta.url,
          ),
        ),
      }),
    ],

    server: {
      host: '0.0.0.0',
      port: 9000,
    },
  }
})