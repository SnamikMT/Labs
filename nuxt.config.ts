// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],

  // Если у тебя есть локальные @font-face в assets/fonts.css и они НЕ должны конфликтовать —
  // можно вернуть сюда и этот файл. Пока оставим только tailwind.
  css: ['@/assets/css/tailwind.css'],

  app: {
    head: {
      title: 'Labpics',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#101012' }
      ],
      link: [
        // Google Fonts: preconnect (с корректным crossorigin)
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },

        // Geist c display=swap (без subset, чтобы не ловить варнинги)
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap'
        },

        // Фавиконки из /public (попадают в билд автоматически)
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#101012' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    },

    // Глобально включаем шрифт и цвет текста
    bodyAttrs: {
      class: 'font-geist antialiased text-[#101012]'
    }

    // Если деплой в подкаталог (например /landing/), раскомментируй:
    // baseURL: '/landing/'
  },

  nitro: { preset: process.env.NITRO_PRESET || undefined },
  experimental: { typedPages: true },
  devtools: { enabled: false }
})
