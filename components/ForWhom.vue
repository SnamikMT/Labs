<template>
  <section ref="root" class="w-full flex flex-col items-center gap-10 font-[Geist] text-[#101012]">
    <!-- Заголовок: «сонный» типинг -->
    <div class="w-full max-w-[1184px] pt-16">
      <h2
        class="text-[32px] sm:text-[40px] md:text-[48px] leading-tight font-normal not-italic"
        aria-label="Кому подойдёт"
      >
        <span class="type-line">
          <span
            v-for="(ch, i) in titleChars"
            :key="i"
            class="letter"
            :class="{ on: i < typedCount, space: ch === ' ' }"
          >{{ ch }}</span>
        </span>
      </h2>
    </div>

    <!-- 3 пункта -->
    <div class="w-full max-w-[1184px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
      <div class="dream-in" :class="{ on: reveal }" style="--d:80ms">
        <DotCluster :filled="1" />
        <h3 class="text-lg md:text-xl leading-tight font-normal not-italic">Стартапам</h3>
        <p class="text-[15px] leading-6 text-zinc-500 font-normal not-italic">
          Гибко подстраиваемся под бюджет и помогаем выйти на первую прибыль
        </p>
      </div>

      <div class="dream-in" :class="{ on: reveal }" style="--d:160ms">
        <DotCluster :filled="2" />
        <h3 class="text-lg md:text-xl leading-tight font-normal not-italic">Среднему бизнесу</h3>
        <p class="text-[15px] leading-6 text-zinc-500 font-normal not-italic">
          Проводим дизайн-аудит и находим точки роста, повышая ключевые метрики
        </p>
      </div>

      <div class="dream-in" :class="{ on: reveal }" style="--d:240ms">
        <DotCluster :filled="3" />
        <h3 class="text-lg md:text-xl leading-tight font-normal not-italic">Крупному бизнесу</h3>
        <p class="text-[15px] leading-6 text-zinc-500 font-normal not-italic">
          Способны заменять штат дизайнеров или вариативно встраиваться в текущую команду
        </p>
      </div>
    </div>

    <!-- разделитель -->
    <div class="w-full">
      <div class="h-px bg-zinc-200/70 fade-in" :class="{ on: reveal }" style="--d:300ms"></div>
    </div>

    <!-- 2 проекта -->
    <div class="w-full max-w-[1184px]">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div class="card-in" :class="{ on: reveal }" style="--d:360ms">
          <img :src="project1" alt="" class="w-full h-full object-cover select-none" draggable="false" />
        </div>
        <div class="card-in" :class="{ on: reveal }" style="--d:420ms">
          <img :src="project2" alt="" class="w-full h-full object-cover select-none" draggable="false" />
        </div>
      </div>
    </div>

    <!-- заголовок секции -->
    <div class="w-full max-w-[1184px] pt-12">
      <h3
        class="text-[32px] sm:text-[40px] md:text-[48px] leading-tight font-normal not-italic"
        aria-label="Без рисков и догадок. Только результат"
      >
        <span class="type-line">
          <span
            v-for="(ch, i) in subTitleChars"
            :key="'b'+i"
            class="letter"
            :class="{ on: i < typedCount2, space: ch === ' ' }"
          >{{ ch }}</span>
        </span>
      </h3>
    </div>

    <!-- большой мокап -->
    <div class="w-full max-w-[1184px]">
      <div class="mockup">
        <img
          :src="img1" alt="" class="mock-piece p1" :class="{ on: reveal }"
          draggable="false"
        />
        <img
          :src="img2" alt="" class="mock-piece p2" :class="{ on: reveal }"
          draggable="false"
        />
        <img
          :src="img3" alt="" class="mock-piece p3" :class="{ on: reveal }"
          draggable="false"
        />
      </div>
    </div>

    <!-- подзаголовок CTA -->
    <div class="w-full max-w-[1184px] text-xl leading-tight">
      <p class="clip-in" :class="{ on: reveal }" style="--d:600ms">
        Получите бесплатную концепцию дизайна в тот же день
      </p>
      <p class="clip-in text-zinc-500" :class="{ on: reveal }" style="--d:660ms">
        Чтобы быть уверенным, что Вам точно понравится
      </p>
    </div>

    <!-- две карточки -->
    <div class="w-full max-w-[1184px] grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
      <div class="box-in" :class="{ on: reveal }" style="--d:700ms">
        <img :src="stage" alt="" class="block mx-auto w-full max-w-[520px] h-auto select-none" draggable="false" />
      </div>
      <div class="box-in" :class="{ on: reveal }" style="--d:760ms">
        <img :src="balance" alt="" class="block mx-auto w-full max-w-[520px] h-auto select-none" draggable="false" />
      </div>
    </div>

    <!-- нижний разделитель -->
    <div class="w-full">
      <div class="h-px bg-zinc-200/70 fade-in" :class="{ on: reveal }" style="--d:820ms"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import DotCluster from '@/components/cards/DotCluster.vue'

import project1 from '@/assets/img/5dbad2fbce15b2736b7e0384818771ab40168630.png'
import project2 from '@/assets/img/fb36e58e9a75df35a8db606380143c3058957cbd.png'
import img1 from '@/assets/img/img1.png'
import img2 from '@/assets/img/img2.png'
import img3 from '@/assets/img/img3.png'
import stage from '@/assets/img/project.png'
import balance from '@/assets/img/project1.png'

const root = ref<HTMLElement|null>(null)
const reveal = ref(false)
let io: IntersectionObserver | null = null

// «сонный» типинг заголовков
const title = 'Кому подойдёт'
const subTitle = 'Без рисков и догадок Только результат'
const titleChars = title.split('')
const subTitleChars = subTitle.split('')

const typedCount = ref(0)
const typedCount2 = ref(0)
let t1: number | null = null
let t2: number | null = null

function typeNext(targetRef: any, chars: string[], speedBase = 36, speedRand = 56, cb?: () => void) {
  if (targetRef.value < chars.length) {
    if (chars[targetRef.value] === ' ') { targetRef.value++; typeNext(targetRef, chars, speedBase, speedRand, cb); return }
    targetRef.value++
    const base = speedBase + Math.random() * speedRand
    window.setTimeout(() => typeNext(targetRef, chars, speedBase, speedRand, cb), base)
  } else if (cb) cb()
}

watch(reveal, (v) => {
  if (!v) return
  // запускаем печать верхнего заголовка, затем — нижнего
  t1 = window.setTimeout(() => typeNext(typedCount, titleChars), 40)
  t2 = window.setTimeout(() => typeNext(typedCount2, subTitleChars, 34, 52), 520)
})

onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) { reveal.value = true; return }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        reveal.value = true
        io?.disconnect()
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  )
  io.observe(root.value)
})
onBeforeUnmount(() => {
  io?.disconnect()
  if (t1) window.clearTimeout(t1)
  if (t2) window.clearTimeout(t2)
})
</script>

<style scoped>
/* контейнеры, которые «выплывают» из тумана */
.dream-in{
  opacity:0; transform: translateY(14px) scale(.985); filter: blur(8px);
  transition: opacity .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .6s ease var(--d,0ms);
}
.dream-in.on{
  opacity:1; filter: blur(0); transform: translateY(0) scale(1);
}

/* линии — простой fade */
.fade-in{ opacity:0; transition: opacity .6s ease var(--d,0ms) }
.fade-in.on{ opacity:1 }

/* карточки с изображениями — чуть ярче эффект */
.card-in{
  height: clamp(240px, 30vw, 360px);
  border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,.08);
  opacity:0; transform: translateY(18px) scale(.975); filter: blur(10px);
  transition: opacity .75s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .7s ease var(--d,0ms);
}
.card-in.on{
  opacity:1; filter: blur(0); transform: translateY(0) scale(1);
}

/* подзаголовочные строки (CTA) — клип-раскрытие */
.clip-in{
  display:inline-block;
  opacity:0; transform: translateY(8px);
  clip-path: inset(0 100% 0 0 round 4px);
  transition: opacity .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             clip-path .9s cubic-bezier(.2,.8,.2,1) var(--d,0ms);
}
.clip-in.on{
  opacity:1; transform: translateY(0);
  clip-path: inset(0 0 0 0 round 4px);
}

/* большой мокап */
.mockup{
  position: relative;
  height: clamp(420px, 52vw, 540px);
  border-radius: 32px; overflow: hidden;
  border: 1px solid #eee; background:#F7F8FA;
}
.mock-piece{
  position:absolute; pointer-events:none; user-select:none;
  filter: drop-shadow(0 12px 28px rgba(0,0,0,.12));
  opacity:0;
  transition: opacity .9s cubic-bezier(.2,.75,.2,1) var(--d,0ms),
             transform .9s cubic-bezier(.2,.75,.2,1) var(--d,0ms);
}
.p1{ bottom:0;    left:6%;  width:28%; transform: translate(-60px, -40px) scale(.92); transition-delay: .22s; }
.p2{ bottom:8px;  left:28%; width:38%; transform: translate( 80px, -60px) scale(.92); transition-delay: .26s; }
.p3{ bottom:0;    left:48%; width:48%; transform: translate(140px,  80px) scale(.92); transition-delay: .30s; }
.mock-piece.on{ opacity:1; transform: translate(0,0) scale(1); }

/* «сонный» типинг: буквы по одной, снизу из блюра */
.type-line { white-space: pre; }
.letter{
  display:inline-block;
  opacity:0;
  transform: translateY(14px) scale(.985);
  filter: blur(8px);
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

/* уважение к reduce motion */
@media (prefers-reduced-motion: reduce){
  .dream-in, .card-in, .clip-in { transition:none; opacity:1 !important; transform:none !important; filter:none !important; }
  .mock-piece{ transition:none; opacity:1 !important; transform:none !important; }
  .letter{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important; }
}
</style>
