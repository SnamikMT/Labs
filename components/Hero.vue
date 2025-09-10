<template>
  <section class="relative overflow-hidden bg-white isolate">
    <!-- фон-свечение: теперь ПОД контентом -->
    <div
      class="pointer-events-none absolute inset-x-0 -top-20 h-[360px] blur-3xl opacity-60
             bg-gradient-to-b from-[#EAF3FF] to-transparent -z-10"
      aria-hidden="true"
    />

<!-- top bar -->
<header class="container mx-auto px-4 md:px-8 py-4 md:py-6">
  <div class="flex items-center justify-between md:justify-center">
    <!-- логотип: слева на мобиле, по центру на ≥md -->
    <a href="/" class="inline-flex items-center gap-2">
      <img :src="logoIcon" alt="Labpics" class="h-7 w-auto select-none" />
    </a>

    <!-- бургер: только мобила, две полоски -->
    <button
      class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg"
      aria-label="Открыть меню"
      @click="menuOpen = !menuOpen"
    >
      <svg viewBox="0 0 24 24" class="h-7 w-7 text-[#101012]">
        <path d="M4 7h16"  stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M4 17h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</header>


<!-- hero -->
<div class="container mx-auto px-4 md:px-8 mt-[54px]">
  <div class="flex flex-col items-center text-center">
    <!-- H1: разнесено на две части -->
    <h1
      class="relative z-0 text-[#101012] font-geist font-medium not-italic tracking-[-0.02em] leading-[1.05]
             text-[48px] sm:text-[44px] md:text-[56px] lg:text-[72px]"
      aria-label="Лендинги, которые"
    >
      <!-- строка 1 -->
      <span class="type-line">
        <span
          v-for="(ch, i) in chars1"
          :key="'p1'+i"
          class="letter"
          :class="{ on: i < typed1, space: ch === ' ' }"
        >{{ ch }}</span>
      </span>

      <!-- перенести «которые» на новую строку только на мобиле -->
      <br class="block sm:hidden" />

      <!-- строка 2 -->
      <span class="type-line sm:ml-2">
        <span
          v-for="(ch, i) in chars2"
          :key="'p2'+i"
          class="letter"
          :class="{ on: i < typed2, space: ch === ' ' }"
        >{{ ch }}</span>
      </span>
    </h1>

        <!-- WOW svg -->
        <div class="relative -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-7 z-[1]">
          <img
            :src="wowSvg"
            alt="просто вау"
            class="wow block h-[56px] sm:h-[72px] md:h-[86px] lg:h-[98px] w-auto
                   pointer-events-none select-none"
            :class="wowIn ? 'is-in' : ''"
          />
        </div>

        <!-- CTA -->
        <div class="mt-6 flex w-full max-w-[720px] flex-col sm:flex-row items-stretch justify-center gap-3">
          <button
            class="cta-btn inline-flex items-center justify-center gap-2 rounded-2xl
                   h-12 w-full md:w-[247px] text-white bg-[#2187FF]
                   hover:opacity-95 active:opacity-90"
            @mousemove="magnet($event)" @mouseleave="magnetReset($event)"
          >
            <span class="cta-inner" :class="{ on: ctasIn }" style="--d:240ms">
              <img :src="boltIcon" alt="" class="h-5 w-5" />
              <span>Сделать заказ</span>
            </span>
          </button>

          <button
            class="cta-btn inline-flex items-center justify-center gap-2 rounded-2xl
                   h-12 w-full md:w-[247px] text-[#2187FF] bg-white border border-[#E0EDFF]
                   hover:bg-[#F7FBFF] active:opacity-90"
            @mousemove="magnet($event)" @mouseleave="magnetReset($event)"
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
    <div class="mt-[54px] md:mt-14">
      <Slider />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logoIcon  from '@/assets/icons/Logo Mono.svg'
import boltIcon  from '@/assets/icons/bolt.svg'
import phoneIcon from '@/assets/icons/phone.svg'
import wowSvg    from '@/assets/icons/wow.svg'
import Slider    from './Slider.vue'

const menuOpen = ref(false)

/* типинг: 2 части */
const part1 = 'Лендинги,'
const part2 = 'которые'
const chars1 = part1.split('')
const chars2 = part2.split('')

const typed1 = ref(0)
const typed2 = ref(0)
const wowIn  = ref(false)
const ctasIn = ref(false)

let tA: number | null = null
let tB: number | null = null

function typeLine(refCnt: any, arr: string[], base = 38, rand = 56, cb?: () => void) {
  if (refCnt.value < arr.length) {
    if (arr[refCnt.value] === ' ') { refCnt.value++; typeLine(refCnt, arr, base, rand, cb); return }
    refCnt.value++
    const delay = base + Math.random() * rand
    window.setTimeout(() => typeLine(refCnt, arr, base, rand, cb), delay)
  } else if (cb) cb()
}

onMounted(() => {
  // сначала первая строка, затем — вторая
  tA = window.setTimeout(() => {
    typeLine(typed1, chars1, 36, 52, () => {
      tB = window.setTimeout(() => {
        typeLine(typed2, chars2, 36, 52, () => {
          // после печати показываем wow и CTA
          setTimeout(() => (wowIn.value = true), 140)
          setTimeout(() => (ctasIn.value = true), 260)
        })
      }, 80)
    })
  }, 20)
})

onBeforeUnmount(() => {
  if (tA) window.clearTimeout(tA)
  if (tB) window.clearTimeout(tB)
})

</script>

<style scoped>
.container { max-width: 1144px; }

/* типинг */
.type-line { white-space: pre; }
.letter{ display:inline-block; opacity:0; transform: translateY(14px) scale(.985); filter: blur(8px); }
.letter.space{ width:.35em; opacity:1; transform:none; filter:none; }
.letter.on{ animation: dream-in .7s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes dream-in{
  0%{ opacity:0; filter:blur(8px); transform:translateY(14px) scale(.985) }
  65%{ opacity:1; filter:blur(0); transform:translateY(-2px) scale(1.01) }
  100%{ opacity:1; filter:blur(0); transform:translateY(0) scale(1) }
}

/* WOW */
.wow{ opacity:0; transform: translateY(-60vh) rotate(-6deg) scale(.9); }
.wow.is-in{ animation: wow-drop .9s cubic-bezier(.17,.84,.44,1) both; }
@keyframes wow-drop{
  0%{ opacity:0; transform: translateY(-60vh) rotate(-6deg) scale(.9) }
  60%{ opacity:1; transform: translateY(10px) rotate(1.5deg) scale(1.03) }
  100%{ opacity:1; transform: translateY(0) rotate(0) scale(1) }
}

/* CTA */
.cta-btn{
  position: relative; overflow: hidden;
  transform: translate3d(var(--mx,0), var(--my,0), 0);
  transition: transform .12s ease-out;
}
.cta-btn::after{
  content:''; position:absolute; inset:-2px;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.35) 35%, transparent 65%);
  transform: translateX(-140%) skewX(-20deg);
  transition: transform .8s ease; pointer-events:none;
}
.cta-btn:hover::after{ transform: translateX(140%) skewX(-20deg); }
.cta-btn:active{ transform: translate3d(var(--mx,0), var(--my,0), 0) scale(.98); }

.cta-inner{
  display:inline-flex; align-items:center; gap:.5rem;
  opacity:0; transform: translateY(12px) scale(.98); filter: blur(6px);
}
.cta-inner.on{ animation: cta-in .6s cubic-bezier(.2,.8,.2,1) var(--d,0ms) forwards; }
@keyframes cta-in{
  0%{ opacity:0; filter:blur(6px); transform:translateY(12px) scale(.98) }
  65%{ opacity:1; filter:blur(0); transform:translateY(-1px) scale(1.01) }
  100%{ opacity:1; filter:blur(0); transform:translateY(0) scale(1) }
}

/* меню transition */
.fade-enter-active, .fade-leave-active{ transition: opacity .18s ease, transform .18s ease; }
.fade-enter-from, .fade-leave-to{ opacity:0; transform: translateY(-4px); }

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .wow.is-in{ animation:none; opacity:1; transform:none }
  .cta-btn{ transition:none }
  .cta-inner{ opacity:1; transform:none; filter:none; animation:none !important; }
  .letter{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important; }
}
</style>
