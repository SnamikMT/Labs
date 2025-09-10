<template>
  <section ref="root" class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-10 md:py-[64px]">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[64px]">
        <!-- LEFT -->
        <figure
          class="space-y-3 transform-gpu will-change-transform transition-all duration-700 ease-out"
          :class="inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[.98]'"
          style="transition-delay: 80ms"
        >
          <div class="card">
            <div class="tilt">
              <div class="wobble rounded-[28px] overflow-hidden border shadow-[0_8px_30px_rgba(0,0,0,.06)]
                          h-[280px] sm:h-[320px] md:h-[380px] lg:h-[440px] bg-white">
                <div class="h-full w-full grid place-items-center p-4 md:p-6">
                  <img
                    :src="leftImg"
                    alt="case-left"
                    class="block max-w-full max-h-full object-contain select-none pointer-events-none transition-transform duration-700"
                    :class="inView ? 'scale-100' : 'scale-[.985]'"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <figcaption v-if="leftCaption" class="text-[15px] leading-6 text-zinc-500">
            {{ leftCaption }}
          </figcaption>
        </figure>

        <!-- RIGHT -->
        <figure
          class="space-y-3 transform-gpu will-change-transform transition-all duration-700 ease-out"
          :class="inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[.98]'"
          style="transition-delay: 180ms"
        >
          <div class="card">
            <div class="tilt">
              <div class="wobble rounded-[28px] overflow-hidden border border-zinc-100 shadow-[0_8px_30px_rgba(0,0,0,.06)]
                          h-[280px] sm:h-[320px] md:h-[380px] lg:h-[440px] bg-white">
                <div class="h-full w-full grid place-items-center p-4 md:p-6">
                  <img
                    :src="rightImg"
                    alt="case-right"
                    class="block max-w-full max-h-full object-contain select-none pointer-events-none transition-transform duration-700"
                    :class="inView ? 'scale-100' : 'scale-[.985]'"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <figcaption v-if="rightCaption" class="text-[15px] leading-6 text-zinc-500">
            {{ rightCaption }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

/** ЗАМЕНИ эти импорты для другой пары (или скопируй файл под новое имя) */
import leftImg  from '@/assets/cases/pair-1-left.png'
import rightImg from '@/assets/cases/pair-1-right.png'

/** подписи (опционально) */
const leftCaption  = ''
const rightCaption = ''

/** анимация появления при скролле */
const root = ref<HTMLElement | null>(null)
const inView = ref(false)
let io: IntersectionObserver | null = null

onMounted(() => {
  if (!root.value) { inView.value = true; return }
  if (!('IntersectionObserver' in window)) { inView.value = true; return }

  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        inView.value = true
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

/* ---------- 3D сцена ---------- */
.card{
  perspective: 1200px;            /* глубина сцены */
  transform-style: preserve-3d;
}
.tilt{
  transform: rotateX(0deg) rotateY(0deg) translateZ(0);
  transform-style: preserve-3d;
  transition: transform .28s cubic-bezier(.2,.8,.2,1),
              filter .28s ease, box-shadow .28s ease;
  will-change: transform;
}
.card:hover .tilt{
  /* наклон в правый верх: верх и правый край ближе к зрителю */
  transform: rotateX(-6deg) rotateY(-6deg) translateZ(0);
  filter: saturate(1.03);
}
.wobble{
  transform: translateZ(0);        /* базовая плоскость для внутренней качки */
  transform-origin: 70% 20%;       /* точка «колбы» */
  transition: box-shadow .28s ease;
}
.card:hover .wobble{
  /* усилим тень на hover для объёма */
  box-shadow: 0 18px 38px rgba(0,0,0,.12), 0 6px 14px rgba(0,0,0,.06);
  /* запустить качание после завершения наклона */
  animation: wobble 2.2s ease-in-out .28s infinite;
}

/* эффект «колбы»: малые колебания вокруг наклонённой позы */
@keyframes wobble{
  0%   { transform: translateZ(0) rotateX(0deg) rotateY(0deg) }
  25%  { transform: translateZ(0) rotateX(-1.2deg) rotateY( 0.8deg) }
  50%  { transform: translateZ(0) rotateX( 0.8deg)  rotateY(-0.9deg) }
  75%  { transform: translateZ(0) rotateX(-0.6deg) rotateY( 0.6deg) }
  100% { transform: translateZ(0) rotateX(0deg)  rotateY(0deg) }
}

/* аккуратное поведение при reduce motion */
@media (prefers-reduced-motion: reduce){
  .tilt, .wobble{ transition:none }
  .card:hover .wobble{ animation:none }
}
</style>
