// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    'nuxt-icon',
    'nuxt-icons',
    'nuxt-lodash',
    '@element-plus/nuxt'
  ],
  lodash: {
    prefix: '_',
  },
  // css: [
  //   '@unocss/reset/tailwind-compat.css',
  // ]
})