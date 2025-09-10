<template>
  <section
    ref="root"
    class="w-full flex flex-col items-center gap-16 font-[Geist] text-[#101012]"
  >
    <!-- Заголовок -->
    <div class="w-full max-w-[1184px] pt-16 px-4">
      <h2 class="text-[28px] sm:text-[36px] md:text-[44px] leading-tight font-medium not-italic" aria-label="Кому подойдёт">
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
    <div class="w-full max-w-[1184px] grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
      <div class="dream-in" :class="{ on: reveal }" style="--d:80ms">
        <DotCluster :filled="1" :active="reveal" color="#007AFF" />
        <h3 class="text-base sm:text-lg md:text-xl leading-tight font-medium not-italic">Стартапам</h3>
        <p class="text-[14px] sm:text-[15px] leading-6 text-zinc-500">
          Гибко подстраиваемся под бюджет и помогаем выйти на первую прибыль
        </p>
      </div>

      <div class="dream-in" :class="{ on: reveal }" style="--d:160ms">
        <DotCluster :filled="2" :active="reveal" color="#007AFF" />
        <h3 class="text-base sm:text-lg md:text-xl leading-tight font-medium not-italic">Среднему бизнесу</h3>
        <p class="text-[14px] sm:text-[15px] leading-6 text-zinc-500">
          Проводим дизайн-аудит и находим точки роста, повышая ключевые метрики
        </p>
      </div>

      <div class="dream-in" :class="{ on: reveal }" style="--d:240ms">
        <DotCluster :filled="3" :active="reveal" color="#007AFF" />
        <h3 class="text-base sm:text-lg md:text-xl leading-tight font-medium not-italic">Крупному бизнесу</h3>
        <p class="text-[14px] sm:text-[15px] leading-6 text-zinc-500">
          Способны заменять штат дизайнеров или вариативно встраиваться в текущую команду
        </p>
      </div>
    </div>

    <!-- разделитель -->
    <div class="w-full max-w-[1184px] px-4">
      <div class="h-px bg-zinc-200/70 fade-in" :class="{ on: reveal }" style="--d:300ms"></div>
    </div>

    <!-- 2 проекта -->
    <div class="w-full max-w-[1184px] px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div class="card-in" :class="{ on: reveal }" style="--d:360ms">
          <div class="img-card" @mousemove="tilt" @mouseleave="resetTilt">
            <div class="img-card__3d">
              <img :src="project1" alt="" class="img-card__media" draggable="false" />
            </div>
          </div>
        </div>

        <div class="card-in" :class="{ on: reveal }" style="--d:420ms">
          <div class="img-card" @mousemove="tilt" @mouseleave="resetTilt">
            <div class="img-card__3d">
              <img :src="project2" alt="" class="img-card__media" draggable="false" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Заголовок 2 -->
    <div class="w-full max-w-[1184px] px-4">
      <h3
        class="text-[26px] sm:text-[34px] md:text-[42px] leading-tight font-medium not-italic"
        aria-label="Без рисков и догадок. Только результат"
      >
        <span class="type-line">
          <template v-for="(ch, i) in subTitleChars" :key="'b'+i">
            <br v-if="ch === '\n' && i < typedCount2" />
            <span
              v-else
              class="letter"
              :class="{ on: i < typedCount2, space: ch === ' ' }"
            >{{ ch }}</span>
          </template>
        </span>
      </h3>
    </div>


    <!-- Apple-like стек: теперь точно помещается в экран и анимируется ступенчато -->
    <div class="w-full max-w-[1184px] px-4">
      <div ref="appleStack" class="apple-stack">
        <img ref="padLeft"   :src="img1" class="pad left"   alt="" draggable="false" />
        <img ref="padCenter" :src="img2" class="pad center" alt="" draggable="false" />
        <img ref="padRight"  :src="img3" class="pad right"  alt="" draggable="false" />
      </div>
      <!-- Подпись: чёрная строка + СЕРАЯ на новой строке, размер 18px -->
      <p class="mt-6 text-[18px] leading-6 font-medium">
        Получите бесплатную концепцию дизайна в тот же день
        <span class="block text-zinc-500 font-normal break-words">
          Чтобы быть уверенным, что Вам точно понравится
        </span>
      </p>
    </div>


<!-- две карточки + описание внутри одного контейнера (как в Apple-like) -->
<div class="w-full max-w-[1184px] px-4">
  <!-- сетка карточек -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
    <div class="box-in" :class="{ on: reveal }" style="--d:700ms">
      <div class="img-card" @mousemove="tilt" @mouseleave="resetTilt">
        <div class="img-card__3d">
          <img :src="stage" alt="" class="img-card__media contain" draggable="false" />
        </div>
      </div>
    </div>

    <div class="box-in" :class="{ on: reveal }" style="--d:760ms">
      <div class="img-card" @mousemove="tilt" @mouseleave="resetTilt">
        <div class="img-card__3d">
          <img :src="balance" alt="" class="img-card__media contain" draggable="false" />
        </div>
      </div>
    </div>
  </div>

  <!-- описание под карточками (ровно 24px сверху) -->
  <p class="mt-6 text-[18px] leading-6 font-medium">
    Следите за проектом через приложение и получайте кешбек,
    <span class="block text-zinc-500 font-normal">
      мы первые и единственные, кто это придумал
    </span>
  </p>
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

// типинг
const title = 'Кому подойдёт'
const subTitle = 'Без рисков и догадок\nТолько результат'
const subTitleChars = Array.from(subTitle)
const titleChars = title.split('')
const typedCount = ref(0)
const typedCount2 = ref(0)

function typeNext(targetRef: any, chars: string[], speedBase = 34, speedRand = 52) {
  if (targetRef.value < chars.length) {
    if (chars[targetRef.value] === ' ') { targetRef.value++; typeNext(targetRef, chars, speedBase, speedRand); return }
    targetRef.value++
    const base = speedBase + Math.random() * speedRand
    window.setTimeout(() => typeNext(targetRef, chars, speedBase, speedRand), base)
  }
}
watch(reveal, (v) => {
  if (!v) return
  setTimeout(() => typeNext(typedCount,  titleChars, 32, 48), 40)
  setTimeout(() => typeNext(typedCount2, subTitleChars, 30, 46), 520)
})

onMounted(() => {
  if (!root.value || !('IntersectionObserver' in window)) { reveal.value = true; startAppleStack(); return }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        reveal.value = true
        startAppleStack()
        io?.disconnect()
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  )
  io.observe(root.value)
})
onBeforeUnmount(() => { io?.disconnect(); stopAppleStack() })

/* Hover 3D */
function tilt(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width  - 0.5
  const py = (e.clientY - rect.top)  / rect.height - 0.5
  const rx = (-py) * 8, ry = (px) * 10, tx = (-px) * 12, ty = (-py) * 12
  card.style.setProperty('--rx', `${rx}deg`)
  card.style.setProperty('--ry', `${ry}deg`)
  card.style.setProperty('--tx', `${tx}px`)
  card.style.setProperty('--ty', `${ty}px`)
  card.style.setProperty('--gx', `${(px+0.5)*100}%`)
  card.style.setProperty('--gy', `${(py+0.5)*100}%`)
}
function resetTilt(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  card.style.setProperty('--rx', `0deg`)
  card.style.setProperty('--ry', `0deg`)
  card.style.setProperty('--tx', `0px`)
  card.style.setProperty('--ty', `0px`)
}

/* Apple-like стек: ступенчатая анимация, помещается в экран */
const appleStack = ref<HTMLElement|null>(null)
const padLeft   = ref<HTMLImageElement|null>(null)
const padCenter = ref<HTMLImageElement|null>(null)
const padRight  = ref<HTMLImageElement|null>(null)
let rafId:number|undefined

function easeOutQuart(t:number){ return 1 - Math.pow(1 - t, 4) }
function clamp01(x:number){ return Math.max(0, Math.min(1, x)) }

function frame() {
  if (!appleStack.value) { rafId = requestAnimationFrame(frame); return }
  const r = appleStack.value.getBoundingClientRect()
  const vh = window.innerHeight || 1
  // прогресс появления блока
  let p = 1 - (r.top + r.height * .2) / (vh + r.height * .4)
  p = clamp01(p)

  // ступенчатые задержки для L/C/R
  const dL = 0.00, dC = 0.10, dR = 0.20
  const eL = easeOutQuart(clamp01((p - dL) / (1 - dL)))
  const eC = easeOutQuart(clamp01((p - dC) / (1 - dC)))
  const eR = easeOutQuart(clamp01((p - dR) / (1 - dR)))

  // параметры (уменьшенные смещения — чтобы влезало по ширине даже на 1440)
  const Lx = -220 * (1 - eL), Rx = 220 * (1 - eR)
  const Ly =  70  * (1 - eL), Ry = 70  * (1 - eR)
  const Lr =  -7  * (1 - eL), Rr =  7  * (1 - eR)
  const Ls =  .88 + .12 * eL, Rs = .88 + .12 * eR

  const Cy =  60  * (1 - eC)
  const Cs =  .94 + .06 * eC
  const Co =  eC

  const settle = Math.sin((p - .88) * Math.PI * 2) * (p > .88 ? 2.5 : 0)

  if (padLeft.value) {
    padLeft.value.style.transform = `translate3d(${Lx}px, ${Ly+settle}px, 0) rotate(${Lr}deg) scale(${Ls})`
    padLeft.value.style.opacity = String(eL)
  }
  if (padRight.value) {
    padRight.value.style.transform = `translate3d(${Rx}px, ${Ry+settle}px, 0) rotate(${Rr}deg) scale(${Rs})`
    padRight.value.style.opacity = String(eR)
  }
  if (padCenter.value) {
    padCenter.value.style.transform = `translate3d(0, ${Cy+settle}px, 0) scale(${Cs})`
    padCenter.value.style.opacity = String(Co)
  }

  rafId = requestAnimationFrame(frame)
}
function startAppleStack(){ stopAppleStack(); rafId = requestAnimationFrame(frame) }
function stopAppleStack(){ if (rafId) cancelAnimationFrame(rafId) }
</script>

<style scoped>
/* типинг */
.type-line { white-space: pre }
.letter{ display:inline-block; opacity:0; transform: translateY(12px) scale(.985); filter: blur(8px) }
.letter.space{ width:.35em; opacity:1; transform:none; filter:none }
.letter.on{ animation: dream-in .7s cubic-bezier(.2,.8,.2,1) forwards }
@keyframes dream-in{
  0%{ opacity:0; filter:blur(8px); transform:translateY(12px) scale(.985) }
  65%{ opacity:1; filter:blur(0); transform:translateY(-2px) scale(1.01) }
  100%{ opacity:1; filter:blur(0); transform:translateY(0) scale(1) }
}

/* появление карточек */
.dream-in{ opacity:0; transform: translateY(12px) scale(.985); filter: blur(8px);
  transition: opacity .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .6s ease var(--d,0ms) }
.dream-in.on{ opacity:1; filter: blur(0); transform: translateY(0) scale(1) }

.fade-in{ opacity:0; transition: opacity .6s ease var(--d,0ms) }
.fade-in.on{ opacity:1 }

/* карточки */
.card-in{
  height: 220px; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,.08);
  opacity:0; transform: translateY(16px) scale(.975); filter: blur(10px);
  transition: opacity .75s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .7s ease var(--d,0ms);
}
@media (min-width: 640px){ .card-in{ height: 260px } }
@media (min-width: 768px){ .card-in{ height: 320px } }
@media (min-width: 1024px){ .card-in{ height: 360px } }
.card-in.on{ opacity:1; filter: blur(0); transform: translateY(0) scale(1) }

.box-in{
  border-radius: 24px;
  opacity:0; transform: translateY(16px) scale(.98); filter: blur(8px);
  transition: opacity .75s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .7s ease var(--d,0ms);
}
.box-in.on{ opacity:1; filter: blur(0); transform: translateY(0) scale(1) }

/* hover 3D */
.img-card{ position: relative; height: 100%; border-radius: inherit; overflow: hidden; background: #fff;
  border: 1px solid rgba(0,0,0,.06); box-shadow: 0 8px 24px rgba(0,0,0,.06);
  transform-style: preserve-3d; transition: box-shadow .25s ease, border-color .25s ease, transform .25s ease;
  --rx: 0deg; --ry: 0deg; --tx: 0px; --ty: 0px; --gx: 50%; --gy: 50%; }
.card-in .img-card, .box-in .img-card{ border: none; box-shadow: none }
.img-card:hover{ box-shadow: 0 16px 40px rgba(0,0,0,.12); border-color: transparent }
.img-card__3d{ height: 100%; transform: rotateX(var(--rx)) rotateY(var(--ry)); transform-style: preserve-3d; transition: transform .12s ease-out }
.img-card__media{ width: 100%; height: 100%; object-fit: cover; transform: translate3d(var(--tx), var(--ty), 0) scale(1);
  transition: transform .35s cubic-bezier(.2,.8,.2,1); will-change: transform }
.img-card:hover .img-card__media{ transform: translate3d(var(--tx), var(--ty), 0) scale(1.04) }
.img-card__media.contain{ object-fit: contain; background:#fff }
.img-card::after{ content:''; position:absolute; inset:0; pointer-events:none;
  background: radial-gradient(600px 320px at var(--gx) var(--gy), rgba(255,255,255,.18), rgba(255,255,255,0) 60%);
  opacity:0; transition: opacity .25s ease }
.img-card:hover::after{ opacity:1 }

/* Apple-like стек */
.apple-stack{
  position: relative;
  height: clamp(360px, 48vw, 560px);
  perspective: 1200px;
  display: grid; place-items: center;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #eee;
  background: #F7F8FA;
}

/* размеры так подобраны, чтобы точно влезать в экран */
.pad{ position:absolute; will-change: transform, opacity; opacity:0 }
/* desktop */
@media (min-width: 1024px){
  .pad.left, .pad.right{ max-width: 34vw; max-height: 70%; }
  .pad.center{ max-width: 40vw; max-height: 78%; z-index: 2 }
}
/* tablets */
@media (min-width: 640px) and (max-width: 1023.98px){
  .pad.left, .pad.right{ max-width: 42vw; max-height: 70%; }
  .pad.center{ max-width: 48vw; max-height: 78%; z-index: 2 }
}
/* mobile */
@media (max-width: 639.98px){
  .apple-stack{ height: 420px }
  .pad.left, .pad.right{ max-width: 66vw; max-height: 64%; }
  .pad.center{ max-width: 78vw; max-height: 72%; z-index: 2 }
}

.pad.center{ z-index: 2 }
.pad.left{ left: 6% }
.pad.right{ right: 6% }

/* CTA текст раскрытие */
.clip-in{ display:inline-block; opacity:0; transform: translateY(8px);
  clip-path: inset(0 100% 0 0 round 4px);
  transition: opacity .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             clip-path .9s cubic-bezier(.2,.8,.2,1) var(--d,0ms) }
.clip-in.on{ opacity:1; transform: translateY(0); clip-path: inset(0 0 0 0 round 4px) }

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .apple-stack .pad{ opacity:1 !important; transform:none !important }
  .img-card__3d, .img-card__media{ transition:none !important; transform:none !important }
  .img-card::after{ display:none }
  .letter{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important }
  .dream-in{ transition:none !important; opacity:1 !important; transform:none !important; filter:none !important }
}
</style>
