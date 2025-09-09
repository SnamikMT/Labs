// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  css: ['@/assets/css/tailwind.css'], // ⚠️ временно убери '@/assets/fonts.css', чтобы не конфликтовало
  app: {
    head: {
      title: 'Labpics',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // кириллица включена; при желании можно убрать subset, если не нужен
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap&subset=latin,cyrillic'
        }
      ]
    },
    // сразу задаём глобальный класс на body
    bodyAttrs: {
      class: 'font-geist antialiased text-[#101012]'
    }
  },
  nitro: { preset: process.env.NITRO_PRESET || undefined },
  experimental: { typedPages: true },
  devtools: { enabled: false }
})
