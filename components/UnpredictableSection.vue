<template>
  <section ref="root" class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-10 md:py-14">
      <!-- заголовок с «сонным» типингом -->
      <h2
        class="text-[#101012] font-normal not-italic font-[Geist]
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

      <!-- две карточки одинакового размера -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <!-- left card -->
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
            <span class="font-normal text-[#101012]">
              Адаптируем лендинг под каждое устройство,
            </span>
            <span class="text-zinc-500">
              &nbsp;чтобы конверсия была космической
            </span>
          </figcaption>
        </figure>

        <!-- right card -->
        <figure class="space-y-3">
          <div
            class="enter-card right rounded-[28px] overflow-hidden bg-[#F2F3F6] border border-zinc-100
                   shadow-[0_8px_30px_rgba(0,0,0,.06)]
                   h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px]
                   flex items-center justify-center p-6 md:p-10"
            :class="{ on: inView }"
            style="--t:80ms"
          >
            <img
              :src="imgSpeed"
              alt="Скорость загрузки 91%"
              class="block max-w-full max-h-full object-contain select-none pointer-events-none"
              draggable="false"
            />
          </div>
          <figcaption class="dream-in" :class="{ on: inView }" style="--d:260ms">
            <span class="font-normal text-[#101012]">
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import imgResponsive from '@/assets/img/consider/responsive.png'
import imgSpeed      from '@/assets/img/consider/speed-91.png'

const root = ref<HTMLElement|null>(null)
const inView = ref(false)
let io: IntersectionObserver | null = null

/* «сонный» типинг заголовка (с переносом строки) */
const title = 'Учтём даже то,\nчто нельзя предугадать'
const titleChars = Array.from(title)
const typedCount = ref(0)

function typeNext() {
  if (typedCount.value < titleChars.length) {
    // перенос и пробел — без задержки
    if (titleChars[typedCount.value] === '\n' || titleChars[typedCount.value] === ' ') {
      typedCount.value++
      typeNext()
      return
    }
    typedCount.value++
    const base = 32 + Math.random() * 52
    window.setTimeout(typeNext, base)
  }
}

onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) {
    inView.value = true; typeNext(); return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        inView.value = true
        typeNext()
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

/* ===== «сонный» типинг ===== */
.type-line { white-space: pre-wrap; }
.letter{
  display:inline-block;
  opacity:0;
  transform: translateY(12px) scale(.985);
  filter: blur(8px);
  will-change: transform, filter, opacity;
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

/* ===== появление подпиcей (мягкий fade-up) ===== */
.dream-in{
  opacity:0; transform: translateY(10px); filter: blur(6px);
  transition: opacity .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .5s ease var(--d,0ms);
}
.dream-in.on{ opacity:1; transform: translateY(0); filter: blur(0); }

/* ===== въезд карточек + «поддёргивание» при приземлении ===== */
.enter-card{
  opacity:0; filter: blur(10px);
  transform: translateX(0) rotate(0) scale(1); /* финал для совместимости */
  will-change: transform, opacity, filter;
}
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

/* заезд слева/справа с лёгким овер-шутом */
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

/* «поддёргивание» после посадки (микро-кач) */
@keyframes jiggle{
  0%   { transform: translateY(0) rotate(0) }
  20%  { transform: translateY(-2px) rotate(0.25deg) }
  45%  { transform: translateY(1px)  rotate(-0.2deg) }
  70%  { transform: translateY(-1px) rotate(0.12deg) }
  100% { transform: translateY(0)    rotate(0) }
}

/* уважение к reduce motion */
@media (prefers-reduced-motion: reduce){
  .enter-card{ opacity:1 !important; filter:none !important; animation:none !important; transform:none !important; }
  .dream-in{ transition:none !important; opacity:1 !important; transform:none !important; filter:none !important; }
  .letter{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important; }
}
</style>
