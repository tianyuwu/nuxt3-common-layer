// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    'nuxt-icon',
    'nuxt-icons',
    // "@element-plus/nuxt"
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ]
})