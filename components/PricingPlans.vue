<template>
  <section class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <!-- Карточки -->
        <article
          v-for="(plan, i) in plans"
          :key="i"
          :class="cardClass(plan.variant)"
          class="relative flex flex-col rounded-[28px] p-6 md:p-8"
        >
          <!-- бейдж для «featured» -->
          <div
            v-if="plan.variant === 'featured'"
            class="absolute -top-4 left-1/2 -translate-x-1/2 select-none"
          >
            <span
              class="inline-block rounded-full bg-[#2A84FF] text-white text-xs px-3 py-1 shadow-sm"
            >
              Выбирают чаще всего
            </span>
          </div>

          <!-- Заголовок и дескрипшен -->
          <header>
            <h3 :class="titleClass(plan.variant)" class="text-[20px] md:text-[22px]">
              {{ plan.title }}
            </h3>
            <p :class="descClass(plan.variant)" class="mt-2 text-[14px] leading-6">
              {{ plan.subtitle }}
            </p>
            <div :class="dividerClass(plan.variant)" class="mt-4 h-px"></div>
          </header>

          <!-- Цена -->
          <div class="mt-6">
            <div :class="priceClass(plan.variant)">
              {{ plan.price.toLocaleString('ru-RU') }}<span class="ml-1">₽</span>
            </div>
            <div :class="dividerClass(plan.variant)" class="mt-6 h-px"></div>
          </div>

          <!-- Фичи -->
          <ul class="mt-6 space-y-4">
            <li v-for="(f, fi) in plan.features" :key="fi" class="flex items-start gap-3">
              <span class="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
                <!-- синий кружок с галочкой -->
                <span class="absolute inset-0 rounded-full bg-[#2187FF]" />
                <svg
                  viewBox="0 0 24 24"
                  class="relative h-3.5 w-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span :class="featureClass(plan.variant)" class="leading-6 text-[15px]">
                {{ f }}
              </span>
            </li>
          </ul>

          <!-- Кнопка -->
          <div class="mt-auto pt-8">
            <button :class="buttonClass(plan.variant)" class="w-full rounded-[14px] px-4 py-3 text-sm">
              Выбрать план
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Variant = 'light' | 'featured' | 'dark'

interface Plan {
  title: string
  subtitle: string
  price: number
  features: string[]
  variant: Variant
}

const plans: Plan[] = [
  {
    title: 'Только дизайн',
    subtitle: 'Тем, у кого есть разработчики\nи нужен макет наилучшего качества',
    price: 1000,
    features: [
      'Дизайн лендинга',
      'Адаптация под все устройства',
      '3 × Дизайн-концепция',
      'Обратная связь 24/7',
      'Статическая графика'
    ],
    variant: 'light'
  },
  {
    title: 'Лендинг под ключ',
    subtitle:
      'Тем, кто не особо разбирается,\nно очень хочет хороший сайт',
    price: 2000,
    features: [
      'Дизайн лендинга',
      'Адаптация под все устройства',
      '3 × Дизайн-концепция',
      'Обратная связь 24/7',
      'Статическая графика',
      'Анимированная графика',
      'Разработка на Framer и Webflow'
    ],
    variant: 'featured'
  },
  {
    title: 'Создание и продвижение',
    subtitle:
      'Тем, кто хочет привлекать клиентов\nчерез интернет и готов в это вложиться',
    price: 3000,
    features: [
      'Дизайн лендинга',
      'Адаптация под все устройства',
      '3 × Дизайн-концепция',
      'Обратная связь 24/7',
      'Статическая графика',
      'Анимированная графика',
      'Разработка на Framer и Webflow',
      'Маркетинговый аудит',
      'Маркетинговая стратегия',
      '1 месяц контекстной рекламы'
    ],
    variant: 'dark'
  }
]

// стили по вариантам
const cardClass = (v: Variant) =>
  ({
    light:
      'min-h-[640px] bg-white shadow-[0_8px_30px_rgba(0,0,0,.06)] border border-zinc-100',
    featured:
      'min-h-[640px] bg-[#F4F7FF] shadow-[0_8px_30px_rgba(0,0,0,.06)] border border-[#E7EEFF]',
    dark:
      'min-h-[640px] bg-[#101012] text-white shadow-[0_8px_30px_rgba(0,0,0,.12)]'
  } as const)[v]

const titleClass = (v: Variant) =>
  ({
    light: 'text-[#101012] font-medium',
    featured: 'text-[#101012] font-medium',
    dark: 'text-white font-medium'
  } as const)[v]

const descClass = (v: Variant) =>
  ({
    light: 'whitespace-pre-line text-zinc-500',
    featured: 'whitespace-pre-line text-zinc-500',
    dark: 'whitespace-pre-line text-white/60'
  } as const)[v]

const dividerClass = (v: Variant) =>
  ({
    light: 'bg-zinc-200/70',
    featured: 'bg-[#DEE8FF]',
    dark: 'bg-white/10'
  } as const)[v]

const priceClass = (v: Variant) =>
  ({
    light:
      'text-[#101012] text-[44px] md:text-[52px] leading-none tracking-tight',
    featured:
      'text-[#101012] text-[44px] md:text-[52px] leading-none tracking-tight',
    dark: 'text-white text-[44px] md:text-[52px] leading-none tracking-tight'
  } as const)[v]

const featureClass = (v: Variant) =>
  ({
    light: 'text-[#101012]',
    featured: 'text-[#101012]',
    dark: 'text-white'
  } as const)[v]

const buttonClass = (v: Variant) =>
  ({
    light:
      'text-white bg-gradient-to-b from-[#2A2D33] to-[#121316] hover:opacity-95 active:opacity-90 transition',
    featured:
      'text-white bg-gradient-to-b from-[#2E8BFF] to-[#1B6DFF] hover:opacity-95 active:opacity-90 transition',
    dark:
      'text-[#101012] bg-white hover:opacity-95 active:opacity-90 transition'
  } as const)[v]
</script>

<style scoped>
.container { max-width: 1144px; }
</style>
