<template>
  <section ref="root" class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-10 md:py-14">
      <!-- заголовок с «сонным» типингом -->
      <h2
        class="text-[#101012] font-medium not-italic font-[Geist]
               text-[28px] sm:text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] mb-8 sm:mb-10 md:mb-12"
        aria-label="Учтём даже то, что нельзя предугадать"
      >
        <span class="type-line">
          <template v-for="(ch,i) in titleChars" :key="i">
            <br v-if="ch === '\n' && i < typedCount" />
            <span
              v-else
              class="letter"
              :class="{ on: i < typedCount, space: ch === ' ' }"
            >{{ ch }}</span>
          </template>
        </span>
      </h2>

      <!-- две карточки -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <!-- слева: картинка -->
        <figure class="space-y-3">
          <div
            class="enter-card left rounded-[28px] overflow-hidden bg-white border border-zinc-100
                   shadow-[0_8px_30px_rgba(0,0,0,.06)]
                   h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px]"
            :class="{ on: inView }"
            style="--t:0ms"
          >
            <img
              :src="imgResponsive"
              alt="Адаптивные экраны"
              class="block w-full h-full object-cover select-none pointer-events-none"
              draggable="false"
            />
          </div>
          <figcaption class="dream-in" :class="{ on: inView }" style="--d:180ms">
            <span class="font-medium text-[#101012]">
              Адаптируем лендинг под каждое устройство,
            </span>
            <span class="text-zinc-500">
              &nbsp;чтобы конверсия была космической
            </span>
          </figcaption>
        </figure>

        <!-- справа: живой тонкий гейдж -->
        <figure class="space-y-3">
          <div
            class="enter-card right rounded-[28px] overflow-hidden bg-[#F2F3F6] border border-zinc-100
                   shadow-[0_8px_30px_rgba(0,0,0,.06)]
                   h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px]
                   flex items-center justify-center p-6 md:p-10"
            :class="{ on: inView }"
            style="--t:80ms"
          >
            <div class="w-full max-w-[420px] aspect-square grid place-items-center">
              <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="block">
                <defs>
                  <linearGradient id="gaugeGrad" x1="0" y1="0" :x2="size" :y2="size" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stop-color="#16A34A"/>
                    <stop offset="75%" stop-color="#F59E0B"/>
                  </linearGradient>
                </defs>

                <!-- диск -->
                <circle :cx="c" :cy="c" :r="innerR+18" fill="#fff"/>
                <circle :cx="c" :cy="c" :r="innerR+18" fill="none" stroke="#E7E9EF" stroke-width="1"/>

                <!-- базовая тонкая дорожка + активный прогресс -->
                <g :transform="`rotate(-90 ${c} ${c})`">
                  <circle
                    :cx="c" :cy="c" :r="rMain"
                    stroke="#E8EAF2" fill="none" :stroke-width="stroke" stroke-linecap="round"
                    style="vector-effect: non-scaling-stroke"
                  />
                  <circle
                    :cx="c" :cy="c" :r="rMain"
                    :stroke="`url(#gaugeGrad)`" fill="none" :stroke-width="stroke" stroke-linecap="round"
                    :stroke-dasharray="circMain"
                    :stroke-dashoffset="dashMain"
                    style="transition: stroke-dashoffset .18s linear; vector-effect: non-scaling-stroke"
                  />
                </g>

                <!-- внутренняя сверхтонкая линия до процента -->
                <g :transform="`rotate(-90 ${c} ${c})`">
                  <circle
                    :cx="c" :cy="c" :r="rThin"
                    stroke="#EEF0F6" fill="none" :stroke-width="strokeThin"
                    style="vector-effect: non-scaling-stroke"
                  />
                  <circle
                    :cx="c" :cy="c" :r="rThin"
                    stroke="#2A84FF" fill="none" :stroke-width="strokeThin" stroke-linecap="round"
                    :stroke-dasharray="circThin"
                    :stroke-dashoffset="dashThin"
                    style="vector-effect: non-scaling-stroke"
                  />
                </g>

                <!-- внешнее сверхтонкое кольцо с равномерными штрихами.
                     Движение — только dashoffset, без вращения всей группы -->
                <g :transform="`rotate(-90 ${c} ${c})`">
                  <circle
                    :cx="c" :cy="c" :r="rDecor"
                    stroke="#B7F7C3" fill="none" :stroke-width="strokeDecor"
                    :stroke-dasharray="dashPattern"
                    :stroke-dashoffset="decorOffset"
                    stroke-linecap="butt" opacity=".95"
                    class="dash-run"
                    style="vector-effect: non-scaling-stroke"
                  />
                </g>

                <!-- число -->
                <text :x="c" :y="c" text-anchor="middle" dominant-baseline="central"
                      :font-size="size*0.22" font-weight="600" fill="#101012">
                  {{ displayPercent }}%
                </text>
              </svg>
            </div>
          </div>

          <figcaption class="dream-in" :class="{ on: inView }" style="--d:260ms">
            <span class="font-medium text-[#101012]">
              Оптимизируем сайт для мгновенной работы,
            </span>
            <span class="text-zinc-500">
              &nbsp;чтобы ни один пользователь не ждал загрузку
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import imgResponsive from '@/assets/img/consider/responsive.png'

/* in-view */
const root = ref<HTMLElement|null>(null)
const inView = ref(false)
let io: IntersectionObserver | null = null

/* заголовок — «сонный» типинг */
const title = 'Учтём даже то,\nчто нельзя предугадать'
const titleChars = Array.from(title)
const typedCount = ref(0)
function typeNext() {
  if (typedCount.value < titleChars.length) {
    if (titleChars[typedCount.value] === '\n' || titleChars[typedCount.value] === ' ') {
      typedCount.value++; typeNext(); return
    }
    typedCount.value++
    const base = 28 + Math.random() * 42
    window.setTimeout(typeNext, base)
  }
}

/* Gauge */
const target = 91
const displayPercent = ref(0)
const progress = ref(0) // 0..1

// geometry base
const size = 240
const c = size / 2

// главный прогресс — ОЧЕНЬ тонкий
const rMain   = size * 0.35
const stroke  = size * 0.055             // было 0.08
const circMain = 2 * Math.PI * rMain
const dashMain = computed(() => circMain * (1 - progress.value))

// внутренняя линия — ультратонкая
const rThin      = rMain - stroke * 0.65
const strokeThin = size * 0.012          // было 0.02
const circThin   = 2 * Math.PI * rThin
const dashThin   = computed(() => circThin * (1 - progress.value))

// внешнее кольцо — сверхтонкое, много мелких штрихов
const rDecor       = rMain + stroke * 0.58
const strokeDecor  = size * 0.007        // ещё тоньше
const circDecor    = 2 * Math.PI * rDecor
const dashLen      = circDecor / 80      // ~80 маленьких штрихов
const dashGap      = dashLen * 1.2
const dashPattern  = `${dashLen} ${dashGap}`

// анимируем dashoffset (не вращаем всю группу)
const decorOffset = ref(0)
let decorTimer: number | null = null
function runDecor(speed = 40) { // px/s по окружности
  const step = () => {
    decorOffset.value = (decorOffset.value + speed * (1/60)) % circDecor
    decorTimer = requestAnimationFrame(step)
  }
  decorTimer = requestAnimationFrame(step)
}

function easeOutCubic(t:number){ return 1 - Math.pow(1 - t, 3) }
function animateGauge(to = target, dur = 1200) {
  const start = performance.now()
  const fromP = 0
  const fromN = 0
  const toP = to / 100
  const tick = (now:number) => {
    const t = Math.min(1, (now - start) / dur)
    const e = easeOutCubic(t)
    progress.value = fromP + (toP - fromP) * e
    displayPercent.value = Math.round(fromN + (to - fromN) * e)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) {
    inView.value = true; typeNext(); animateGauge(); runDecor(); return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        inView.value = true
        typeNext()
        animateGauge()
        runDecor()
        io?.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  io.observe(root.value)
})
onBeforeUnmount(() => {
  io?.disconnect()
  if (decorTimer) cancelAnimationFrame(decorTimer)
})
</script>

<style scoped>
.container { max-width: 1144px; }

/* сонный типинг */
.type-line { white-space: pre-wrap; }
.letter{
  display:inline-block;
  opacity:0;
  transform: translateY(12px) scale(.985);
  filter: blur(8px);
}
.letter.space{ width:.35em; opacity:1; transform:none; filter:none; }
.letter.on{
  animation: dream-in .7s cubic-bezier(.2,.8,.2,1) forwards;
}
@keyframes dream-in{
  0%   { opacity:0; filter:blur(8px); transform:translateY(12px) scale(.985) }
  65%  { opacity:1; filter:blur(0);   transform:translateY(-2px) scale(1.01) }
  100% { opacity:1; filter:blur(0);   transform:translateY(0)    scale(1) }
}

/* подписи */
.dream-in{
  opacity:0; transform: translateY(10px); filter: blur(6px);
  transition: opacity .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .5s ease var(--d,0ms);
}
.dream-in.on{ opacity:1; transform: translateY(0); filter: blur(0); }

/* въезд карточек + лёгкое поддёргивание */
.enter-card{ opacity:0; filter: blur(10px); }
.enter-card.on{ opacity:1; filter: blur(0); }
.enter-card.left.on{
  animation:
    slide-in-left .85s cubic-bezier(.18,.85,.35,1.2) var(--t,0ms) both,
    jiggle        1.05s ease-out calc(var(--t,0ms) + .85s) 1 both;
}
.enter-card.right.on{
  animation:
    slide-in-right .85s cubic-bezier(.18,.85,.35,1.2) var(--t,0ms) both,
    jiggle         1.05s ease-out calc(var(--t,0ms) + .85s) 1 both;
}
@keyframes slide-in-left{
  0%   { transform: translateX(-16vw) rotate(-3deg) scale(.965); opacity:.0 }
  70%  { transform: translateX(0)      rotate(.6deg) scale(1.02); opacity:1 }
  100% { transform: translateX(0)      rotate(0)     scale(1) }
}
@keyframes slide-in-right{
  0%   { transform: translateX(16vw) rotate(3deg) scale(.965); opacity:.0 }
  70%  { transform: translateX(0)    rotate(-.6deg) scale(1.02); opacity:1 }
  100% { transform: translateX(0)    rotate(0)      scale(1) }
}
@keyframes jiggle{
  0%   { transform: translateY(0) rotate(0) }
  20%  { transform: translateY(-2px) rotate(0.25deg) }
  45%  { transform: translateY(1px)  rotate(-0.2deg) }
  70%  { transform: translateY(-1px) rotate(0.12deg) }
  100% { transform: translateY(0)    rotate(0) }
}

/* анимация dashoffset у внешнего кольца */
.dash-run{
  animation: dash 8s linear infinite;
  will-change: stroke-dashoffset;
}
@keyframes dash{
  to { stroke-dashoffset: -99999; } /* большое число — плавная бесконечность */
}

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .enter-card{ opacity:1 !important; filter:none !important; animation:none !important; transform:none !important; }
  .dream-in{ transition:none !important; opacity:1 !important; transform:none !important; filter:none !important; }
  .letter{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important; }
  .dash-run{ animation:none !important; }
}
</style>
