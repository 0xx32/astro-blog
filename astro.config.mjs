import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [vue({ appEntrypoint: '/src/pages/_app' }), tailwind({})],
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  devToolbar: {
    enabled: false,
  },
  experimental: {
    svg: true,
  },
  vite: {
    ssr: {
      external: ['@prisma/client'],
    },
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
})
