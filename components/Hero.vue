<template>
  <section class="relative overflow-hidden bg-white">
    <!-- top bar -->
    <header class="container mx-auto flex items-center justify-center py-6">
      <img :src="logoIcon" alt="Labpics" class="h-7 w-auto" />
    </header>

    <!-- hero -->
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex flex-col items-center text-center">
        <!-- H1: «сонный» типинг -->
        <h1
          class="relative z-0 text-[#101012] font-[Geist] font-normal not-italic
                 leading-[1.05] tracking-[-0.02em]
                 text-[34px] sm:text-[44px] md:text-[56px] lg:text-[72px]"
          aria-label="Лендинги, которые"
        >
          <span class="type-line">
            <span
              v-for="(ch, i) in chars"
              :key="i"
              class="letter"
              :class="{ on: i < typedCount, space: ch === ' ' }"
            >{{ ch }}</span>
          </span>
        </h1>

        <!-- SVG: залет сверху -->
        <div class="relative -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-7 z-[1]">
          <img
            :src="wowSvg"
            alt="просто вау"
            class="wow block h-[56px] sm:h-[72px] md:h-[86px] lg:h-[98px] w-auto
                   pointer-events-none select-none"
            :class="wowIn ? 'is-in' : ''"
          />
        </div>

        <!-- CTA: сонное появление + магнит + блик -->
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <!-- btn 1 -->
          <button
            class="cta-btn inline-flex items-center gap-2 rounded-xl px-4 py-3 text-white bg-[#2187FF]
                   hover:opacity-95 active:opacity-90"
            @mousemove="magnet($event)"
            @mouseleave="magnetReset($event)"
          >
            <span class="cta-inner" :class="{ on: ctasIn }" style="--d:240ms">
              <img :src="boltIcon" alt="" class="h-5 w-5" />
              <span>Сделать заказ</span>
            </span>
          </button>

          <!-- btn 2 -->
          <button
            class="cta-btn inline-flex items-center gap-2 rounded-xl px-4 py-3 text-[#2187FF] bg-[#EAF3FF]
                   hover:opacity-95 active:opacity-90"
            @mousemove="magnet($event)"
            @mouseleave="magnetReset($event)"
          >
            <span class="cta-inner" :class="{ on: ctasIn }" style="--d:320ms">
              <img :src="phoneIcon" alt="" class="h-5 w-5" />
              <span>Забронировать звонок</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- slider -->
    <div class="mt-10 md:mt-14">
      <Slider />
    </div>

    <!-- мягкое свечение -->
    <div
      class="pointer-events-none absolute inset-x-0 -top-20 h-[360px] blur-3xl opacity-60
             bg-gradient-to-b from-[#EAF3FF] to-transparent"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import logoIcon  from '@/assets/icons/Logo Mono.svg'
import boltIcon  from '@/assets/icons/bolt.svg'
import phoneIcon from '@/assets/icons/phone.svg'
import wowSvg    from '@/assets/icons/wow.svg'
import Slider    from './Slider.vue'

/* ——— типинг заголовка ——— */
const fullText = 'Лендинги, которые'
const chars = fullText.split('')
const typedCount = ref(0)
const wowIn  = ref(false)
const ctasIn = ref(false)

let timer: number | null = null
function typeNext() {
  if (typedCount.value < chars.length) {
    if (chars[typedCount.value] === ' ') { // пробел — без анимационной задержки
      typedCount.value++
      typeNext()
      return
    }
    typedCount.value++
    const base = 38 + Math.random() * 56 // «сонная» скорость
    timer = window.setTimeout(typeNext, base)
  } else {
    setTimeout(() => (wowIn.value = true), 140)  // svg влетает
    setTimeout(() => (ctasIn.value = true), 260) // кнопки появляются каскадом
  }
}

/* ——— магнит для кнопок ——— */
function magnet(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.setProperty('--mx', `${x * 8}px`)
  el.style.setProperty('--my', `${y * 8}px`)
}
function magnetReset(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--mx', '0px')
  el.style.setProperty('--my', '0px')
}

onMounted(() => { typeNext() })
onBeforeUnmount(() => { if (timer) window.clearTimeout(timer) })
</script>

<style scoped>
.container { max-width: 1144px; }

/* ——— «сонный» типинг ——— */
.type-line { white-space: pre; }
.letter{
  display:inline-block;
  opacity: 0;
  transform: translateY(14px) scale(.985);
  filter: blur(8px);
  will-change: transform, filter, opacity;
}
.letter.space{ width:.35em; opacity:1; transform:none; filter:none; }
.letter.on{
  animation: dream-in .7s cubic-bezier(.2,.8,.2,1) forwards;
}
@keyframes dream-in{
  0%   { opacity:0; filter:blur(8px); transform:translateY(14px) scale(.985) }
  65%  { opacity:1; filter:blur(0);   transform:translateY(-2px) scale(1.01) }
  100% { opacity:1; filter:blur(0);   transform:translateY(0)    scale(1) }
}

/* ——— SVG: влет сверху ——— */
.wow{ opacity:0; transform: translateY(-60vh) rotate(-6deg) scale(.9); }
.wow.is-in{
  animation: wow-drop .9s cubic-bezier(.17,.84,.44,1) both;
}
@keyframes wow-drop{
  0%   { opacity:0; transform: translateY(-60vh) rotate(-6deg) scale(.9) }
  60%  { opacity:1; transform: translateY(10px)  rotate(1.5deg) scale(1.03) }
  100% { opacity:1; transform: translateY(0)     rotate(0)      scale(1) }
}

/* ——— CTA: появление + магнит + блик ——— */
/* оболочка кнопки: только магнит (смещения) и sheen на hover */
.cta-btn{
  position: relative;
  overflow: hidden;
  transform: translate3d(var(--mx,0), var(--my,0), 0);
  transition: transform .12s ease-out;
  will-change: transform;
}
.cta-btn::after{
  /* зеркальный блик */
  content:'';
  position:absolute; inset:-2px;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.35) 35%, transparent 65%);
  transform: translateX(-140%) skewX(-20deg);
  transition: transform .8s ease;
  pointer-events: none;
}
.cta-btn:hover::after{ transform: translateX(140%) skewX(-20deg); }
.cta-btn:active{ transform: translate3d(var(--mx,0), var(--my,0), 0) scale(.98); }

/* внутренний слой: отвечает за «сонное» появление */
.cta-inner{
  display:inline-flex; align-items:center; gap:.5rem;
  opacity: 0;
  transform: translateY(12px) scale(.98);
  filter: blur(6px);
}
.cta-inner.on{
  animation: cta-in .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms) forwards;
}
@keyframes cta-in{
  0%   { opacity:0; filter:blur(6px); transform:translateY(12px) scale(.98) }
  65%  { opacity:1; filter:blur(0);   transform:translateY(-1px) scale(1.01) }
  100% { opacity:1; filter:blur(0);   transform:translateY(0)    scale(1) }
}

/* уважение к reduce motion */
@media (prefers-reduced-motion: reduce){
  .wow.is-in{ animation:none; opacity:1; transform:none }
  .cta-btn{ transition:none }
  .cta-inner{ opacity:1; transform:none; filter:none; animation:none !important; }
  .letter{ opacity:1; transform:none; filter:none; animation:none !important; }
}
</style>
