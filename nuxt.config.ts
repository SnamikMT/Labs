
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/fonts.css'
  ],
  app: {
    head: {
      title: 'Labpics',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  nitro: {
    preset: process.env.NITRO_PRESET || undefined
  },
  experimental: {
    typedPages: true
  },
  devtools: { enabled: false }
})
