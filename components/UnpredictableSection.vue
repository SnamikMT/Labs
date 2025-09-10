<template>
  <section ref="root" class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-10 md:py-14">
      <!-- заголовок с «сонным» типингом -->
      <h2
        class="text-[#101012] font-[Geist] font-medium not-italic
               text-[28px] sm:text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em]
               mb-8 sm:mb-10 md:mb-12"
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

      <!-- две карточки, GAP = 64px -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <!-- ЛЕВО: 560×400 -->
        <figure class="space-y-3">
          <div
            class="enter-card left rounded-[28px] overflow-hidden bg-white border border-zinc-100
                   shadow-[0_8px_30px_rgba(0,0,0,.06)]
                   w-full h-[320px] sm:h-[360px] md:w-[560px] md:h-[400px] md:mx-auto"
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
            <span class="block font-medium text-[#101012] leading-tight">
                Адаптируем лендинг под каждое устройство,
            </span>
            <span class="block text-zinc-500 leading-tight">
                чтобы конверсия была космической
            </span>
            </figcaption>
        </figure>

        <!-- ПРАВО: 560×400, внутри SVG 249×249 по центру -->
        <figure class="space-y-3">
          <div
            class="enter-card right rounded-[28px] overflow-hidden bg-[#F2F3F6] border border-zinc-100
                   shadow-[0_8px_30px_rgba(0,0,0,.06)]
                   w-full h-[320px] sm:h-[360px] md:w-[560px] md:h-[400px] md:mx-auto
                   grid place-items-center"
            :class="{ on: inView }"
            style="--t:80ms"
          >
            <!-- точный размер 249×249 -->
            <svg
              :width="baseSize" :height="baseSize" :viewBox="`0 0 ${baseSize} ${baseSize}`"
              class="block"
              role="img" aria-label="Speed gauge"
            >
              <!-- тонкая обводка диска для читабельности -->
              <circle :cx="c" :cy="c" :r="rMain + trackW/2" fill="none" stroke="#E7E9EF" stroke-width="1" />

              <!-- ОСНОВНОЕ КОЛЬЦО: широкий фон + тонкая активная линия -->
              <g :transform="`rotate(-90 ${c} ${c})`">
                <!-- фон шире -->
                <circle
                  :cx="c" :cy="c" :r="rMain"
                  :stroke="trackColor" fill="none" :stroke-width="trackW"
                  stroke-linecap="round" style="vector-effect: non-scaling-stroke"
                />
                <!-- тонкая активная -->
                <circle
                  :cx="c" :cy="c" :r="rMain"
                  :stroke="mainColor" fill="none" :stroke-width="progressW"
                  stroke-linecap="round"
                  :stroke-dasharray="circMain"
                  :stroke-dashoffset="dashMain"
                  style="transition: stroke-dashoffset .18s linear; vector-effect: non-scaling-stroke"
                />
              </g>

              <!-- проценты — заметно меньше -->
              <text :x="c" :y="c" text-anchor="middle" dominant-baseline="middle"
                    :font-size="baseSize*0.12" font-weight="600" fill="#101012">
                {{ displayPercent }}%
              </text>

              <!-- ВНЕШНЯЯ ДУГА: 5 отдельных цветных сегментов, у каждого свой серый фон -->
              <g :transform="`rotate(-90 ${c} ${c})`">
                <!-- серые фоны -->
                <template v-for="(s, idx) in segs" :key="'bg'+idx">
                  <circle
                    :cx="c" :cy="c" :r="rOuter"
                    :stroke="outerTrack" fill="none" :stroke-width="outerW"
                    stroke-linecap="round"
                    :stroke-dasharray="`${s.lenPxBg} ${circOuter - s.lenPxBg}`"
                    :stroke-dashoffset="s.offsetPxBg"
                    style="vector-effect: non-scaling-stroke"
                  />
                </template>
                <!-- цветные сегменты с мягким «дыханием» -->
                <template v-for="(s, idx) in segs" :key="'fg'+idx">
                  <circle
                    class="seg-run"
                    :style="{
                      '--off': s.offsetPx + 'px',
                      '--phase': (idx * 220) + 'ms'
                    }"
                    :cx="c" :cy="c" :r="rOuter"
                    :stroke="s.color" fill="none" :stroke-width="outerW"
                    stroke-linecap="round"
                    :stroke-dasharray="`${s.lenPx} ${circOuter - s.lenPx}`"
                    :stroke-dashoffset="s.offsetPx"
                  />
                </template>
              </g>
            </svg>
          </div>

            <figcaption class="dream-in" :class="{ on: inView }" style="--d:260ms">
            <span class="block font-medium text-[#101012] leading-tight">
                Оптимизируем сайт для мгновенной работы,
            </span>
            <span class="block text-zinc-500 leading-tight">
                чтобы ни один пользователь не ждал загрузку
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

/* ===== Gauge geometry: точный размер 249×249 ===== */
const baseSize = 249
const c        = baseSize / 2

// главное кольцо (умещаем ВСЁ, без обрезаний)
const rMain     = 84                 // радиус
const trackW    = 26                 // широкая подложка
const progressW = 10                 // тонкая активная линия
const mainColor = '#34C759'
const trackColor = '#78788029'

const circMain  = 2 * Math.PI * rMain
const progress  = ref(0)             // 0..1
const displayPercent = ref(0)
const dashMain = computed(() => circMain * (1 - progress.value))

// внешняя дуга — ближе к основной, но с гарантированным полем
const outerGap   = 24                // расстояние от rMain до внешней дуги
const rOuter     = rMain + outerGap  // 108px — влезает с учётом обводки
const outerW     = 1.0               // очень тонкая
const outerTrack = '#78788029'
const circOuter  = 2 * Math.PI * rOuter

// 5 сегментов: Зеленая 100%, Оранжевая 50%, Красная 10% (увеличена), Оранжевая 40%, Оранжевая 90%
// между ними заметный отступ (segGapDeg), у каждого СВОЙ серый фон с паддингом
const segGapDeg = 26
const bgPadDeg  = 7                  // серый фон шире цветного
const L_green = 100, L_or1 = 50, L_red = 20, L_or2 = 70, L_or3 = 90   // красную сделал побольше (20°)

const startDeg = -140                // стартовая позиция по кругу

type Seg = {
  color: string
  lenPx: number
  offsetPx: number
  lenPxBg: number
  offsetPxBg: number
}
const deg2px = (deg:number, r:number) => (deg/360) * (2*Math.PI*r)

const segs = computed<Seg[]>(() => {
  const parts = [
    { color:'#24D568', lenDeg:L_green },
    { color:'#FFA100', lenDeg:L_or1   },
    { color:'#FF3B30', lenDeg:L_red   },
    { color:'#FFA100', lenDeg:L_or2   },
    { color:'#FFA100', lenDeg:L_or3   },
  ]
  let current = startDeg
  const out:Seg[] = []
  parts.forEach(p => {
    const offDeg = current
    const offPx  = -deg2px(offDeg, rOuter)
    const lenPx  =  deg2px(p.lenDeg, rOuter)

    const bgLenPx = deg2px(p.lenDeg + bgPadDeg*2, rOuter)
    const bgOffPx = -deg2px(offDeg - bgPadDeg, rOuter)

    out.push({
      color: p.color,
      lenPx,
      offsetPx: offPx,
      lenPxBg: bgLenPx,
      offsetPxBg: bgOffPx
    })
    current += p.lenDeg + segGapDeg
  })
  return out
})

/* анимация основного процента */
const target = 91
function easeOutCubic(t:number){ return 1 - Math.pow(1 - t, 3) }
function animateGauge(to = target, dur = 1200) {
  const start = performance.now()
  const toP = to / 100
  const tick = (now:number) => {
    const t = Math.min(1, (now - start) / dur)
    const e = easeOutCubic(t)
    progress.value = toP * e
    displayPercent.value = Math.round(to * e)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* запуск при входе в вьюпорт */
onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) {
    inView.value = true; typeNext(); animateGauge(); return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        inView.value = true
        typeNext()
        animateGauge()
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
.container { max-width: 1184px; }

/* ——— «сонный» типинг ——— */
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

/* ——— появление карточек ——— */
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
  20%  { transform: translateY(-2px) rotate(.25deg) }
  45%  { transform: translateY(1px)  rotate(-.2deg) }
  70%  { transform: translateY(-1px) rotate(.12deg) }
  100% { transform: translateY(0)    rotate(0) }
}

/* подписи */
.dream-in{
  opacity:0; transform: translateY(10px); filter: blur(6px);
  transition: opacity .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .5s ease var(--d,0ms);
}
.dream-in.on{ opacity:1; transform: translateY(0); filter: blur(0); }

/* внешний «дыхательный» сдвиг сегментов (еле заметный) */
.seg-run{
  animation: seg-wiggle 2.8s ease-in-out infinite;
  animation-delay: var(--phase, 0ms);
  will-change: stroke-dashoffset;
}
@keyframes seg-wiggle{
  0%   { stroke-dashoffset: var(--off); }
  50%  { stroke-dashoffset: calc(var(--off) - 9px); }
  100% { stroke-dashoffset: var(--off); }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .enter-card{ opacity:1 !important; filter:none !important; animation:none !important; transform:none !important; }
  .dream-in{ transition:none !important; opacity:1 !important; transform:none !important; filter:none !important; }
  .letter{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important; }
  .seg-run{ animation:none !important; }
}
</style>
