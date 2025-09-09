<template>
  <section ref="root" class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <!-- Карточки -->
        <article
          v-for="(plan, i) in plans"
          :key="i"
          :data-pos="i"
          :class="[cardClass(plan.variant), 'price-card', { on: inView }]"
          class="relative flex flex-col rounded-[28px] p-6 md:p-8 will-change-transform"
          :style="{'--delay': `${i*120}ms`}"
        >
          <!-- бейдж для «featured» -->
            <div
            v-if="plan.variant === 'featured'"
            class="badge-wrap select-none z-10"
            :class="{ on: inView }"
            :style="{'--delay': `${i*120+200}ms`}"
            >
            <span class="badge-chip">
              Выбирают чаще всего
            </span>
          </div>

          <!-- Заголовок и дескрипшен -->
          <header>
            <h3 :class="titleClass(plan.variant)" class="text-[20px] md:text-[22px]">
              {{ plan.title }}
            </h3>
            <p :class="descClass(plan.variant)" class="mt-2 text-[14px] leading-6 whitespace-pre-line">
              {{ plan.subtitle }}
            </p>
            <div :class="dividerClass(plan.variant)" class="mt-4 h-px"></div>
          </header>

          <!-- Цена (с анимацией счётчика) -->
          <div class="mt-6">
            <div :class="priceClass(plan.variant)">
              {{ displayPrices[i].toLocaleString('ru-RU') }}<span class="ml-1">₽</span>
            </div>
            <div :class="dividerClass(plan.variant)" class="mt-6 h-px"></div>
          </div>

          <!-- Фичи (каскад) -->
          <ul class="mt-6 space-y-4">
            <li
              v-for="(f, fi) in plan.features"
              :key="fi"
              class="flex items-start gap-3 feat"
              :class="{ on: inView }"
              :style="{'--d': `${220 + fi*60 + i*80}ms`}"
            >
              <span class="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
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
            <button
              :class="buttonClass(plan.variant)"
              class="w-full rounded-[14px] px-4 py-3 text-sm cta"
            >
              Выбрать план
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
    subtitle: 'Тем, кто не особо разбирается,\nно очень хочет хороший сайт',
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
    subtitle: 'Тем, кто хочет привлекать клиентов\nчерез интернет и готов в это вложиться',
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
    light: 'min-h-[640px] bg-white shadow-[0_8px_30px_rgba(0,0,0,.06)] border border-zinc-100',
    featured: 'min-h-[640px] bg-[#F4F7FF] shadow-[0_8px_30px_rgba(0,0,0,.06)] border border-[#E7EEFF]',
    dark: 'min-h-[640px] bg-[#101012] text-white shadow-[0_8px_30px_rgba(0,0,0,.12)]'
  } as const)[v]

const titleClass = (v: Variant) =>
  ({ light: 'text-[#101012] font-medium', featured: 'text-[#101012] font-medium', dark: 'text-white font-medium' } as const)[v]

const descClass = (v: Variant) =>
  ({ light: 'text-zinc-500', featured: 'text-zinc-500', dark: 'text-white/60' } as const)[v]

const dividerClass = (v: Variant) =>
  ({ light: 'bg-zinc-200/70', featured: 'bg-[#DEE8FF]', dark: 'bg-white/10' } as const)[v]

const priceClass = (v: Variant) =>
  ({
    light: 'text-[#101012] text-[44px] md:text-[52px] leading-none tracking-tight',
    featured: 'text-[#101012] text-[44px] md:text-[52px] leading-none tracking-tight',
    dark: 'text-white text-[44px] md:text-[52px] leading-none tracking-tight'
  } as const)[v]

const featureClass = (v: Variant) =>
  ({ light: 'text-[#101012]', featured: 'text-[#101012]', dark: 'text-white' } as const)[v]

const buttonClass = (v: Variant) =>
  ({
    light: 'text-white bg-gradient-to-b from-[#2A2D33] to-[#121316] hover:opacity-95 active:opacity-90 transition',
    featured: 'text-white bg-gradient-to-b from-[#2E8BFF] to-[#1B6DFF] hover:opacity-95 active:opacity-90 transition',
    dark: 'text-[#101012] bg-white hover:opacity-95 active:opacity-90 transition'
  } as const)[v]

/* ===== Анимации входа (IntersectionObserver) + счётчик цен ===== */
const root = ref<HTMLElement | null>(null)
const inView = ref(false)
let io: IntersectionObserver | null = null

// отображаемые цены (анимация 0 -> price)
const displayPrices = ref<number[]>(plans.map(() => 0))

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }
function animatePrice(i: number, to: number, duration = 1200) {
  const start = performance.now()
  const from = 0
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration)
    const v = from + (to - from) * easeOutCubic(p)
    displayPrices.value[i] = Math.round(v)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) {
    inView.value = true
    plans.forEach((p, i) => animatePrice(i, p.price, 1000 + i * 200))
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        inView.value = true
        plans.forEach((p, i) => animatePrice(i, p.price, 1000 + i * 200))
        io?.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  io.observe(root.value)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<style scoped>
.container { max-width: 1144px; }

/* ===== Въезд карточек с «поддёргиванием» ===== */
.price-card{
  opacity: 0; filter: blur(10px);
}
.price-card.on{
  opacity: 1; filter: blur(0);
}
.price-card[data-pos="0"].on{
  animation:
    slide-in-left .85s cubic-bezier(.18,.85,.35,1.2) var(--delay,0ms) both,
    jiggle        1.05s ease-out calc(var(--delay,0ms) + .85s) 1 both;
}
.price-card[data-pos="1"].on{
  animation:
    slide-in-up   .85s cubic-bezier(.18,.85,.35,1.2) var(--delay,0ms) both,
    jiggle        1.05s ease-out calc(var(--delay,0ms) + .85s) 1 both;
}
.price-card[data-pos="2"].on{
  animation:
    slide-in-right .85s cubic-bezier(.18,.85,.35,1.2) var(--delay,0ms) both,
    jiggle         1.05s ease-out calc(var(--delay,0ms) + .85s) 1 both;
}

@keyframes slide-in-left{
  0%   { transform: translate(-24px, 18px) rotate(-2deg) scale(.98); }
  70%  { transform: translate(0, 0)        rotate(.6deg)  scale(1.02); }
  100% { transform: translate(0, 0)        rotate(0)      scale(1); }
}
@keyframes slide-in-up{
  0%   { transform: translate(0, 28px) rotate(0deg) scale(.98); }
  70%  { transform: translate(0, 0)    rotate(-.4deg) scale(1.02); }
  100% { transform: translate(0, 0)    rotate(0)       scale(1); }
}
@keyframes slide-in-right{
  0%   { transform: translate(24px, 18px) rotate(2deg) scale(.98); }
  70%  { transform: translate(0, 0)       rotate(-.6deg) scale(1.02); }
  100% { transform: translate(0, 0)       rotate(0)       scale(1); }
}
@keyframes jiggle{
  0%   { transform: translateY(0) rotate(0); }
  22%  { transform: translateY(-2px) rotate(0.25deg); }
  48%  { transform: translateY(1px)  rotate(-0.18deg); }
  72%  { transform: translateY(-1px) rotate(0.12deg); }
  100% { transform: translateY(0)    rotate(0); }
}

/* ===== Бейдж: поп-ин + лёгкое дрожание ===== */
.badge-wrap{
  position: absolute;
  left: 30%; transform: translateX(-50%);
  top: -14px;              /* если надо выше/ниже, подкрутите */
  display: grid; place-items: center;
  opacity: 0; transform-origin: center;
  /* вход как и было */
  animation: badge-in .6s cubic-bezier(.2,.8,.2,1) var(--delay,0ms) both;
}
.badge-wrap.on{
  animation: badge-in .6s cubic-bezier(.2,.8,.2,1) var(--delay,0ms) both;
}
@keyframes badge-in{
  0% { opacity:0; transform: translateY(-8px) scale(.96); }
  60%{ opacity:1; transform: translateY(2px)  scale(1.04); }
  100%{ opacity:1; transform: translateY(0)   scale(1); }
}
.badge-chip{
  display:inline-block; border-radius:999px; background:#2A84FF; color:#fff;
  font-size:12px; padding: 6px 12px; box-shadow:0 4px 14px rgba(42,132,255,.25);
}

/* ===== Каскад фич ===== */
.feat{
  opacity: 0; transform: translateY(8px); filter: blur(8px);
  transition: opacity .6s ease var(--d,0ms),
             transform .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .5s ease var(--d,0ms);
}
.feat.on{
  opacity: 1; transform: translateY(0); filter: blur(0);
}

/* ===== Hover карточек: мягкий подъём + sheen ===== */
.price-card{
  position: relative;
  /* overflow: hidden;  <-- убрать */
  overflow: visible;     /* добавить */
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.price-card:hover{
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 44px rgba(0,0,0,.12);
}
/* шиммер остаётся внутри скруглений */
.price-card::after{
  content:'';
  position:absolute;
  inset: 0;                 /* было inset:-2px; */
  border-radius: inherit;   /* чтобы повторить скругление */
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.35) 35%, transparent 65%);
  transform: translateX(-140%) skewX(-20deg);
  transition: transform .9s ease;
  pointer-events: none;
}
.price-card:hover::after{ transform: translateX(140%) skewX(-20deg); }

/* ===== Кнопка: лёгкая волна при появлении и hover-баттерфлай ===== */
.cta{
  transform: translateY(6px) scale(.985); opacity: 0;
  animation: cta-in .6s cubic-bezier(.2,.8,.2,1) calc(var(--delay,0ms) + 600ms) forwards;
}
@keyframes cta-in{
  0% { opacity:0; transform: translateY(6px) scale(.985); }
  60%{ opacity:1; transform: translateY(-2px) scale(1.015); }
  100%{ opacity:1; transform: translateY(0) scale(1); }
}

.container { max-width: 1144px; }

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .price-card, .feat, .badge-wrap, .cta { transition:none !important; animation:none !important; opacity:1 !important; transform:none !important; filter:none !important; }
}
</style>
