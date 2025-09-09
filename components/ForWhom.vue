<template>
  <section ref="root" class="w-full flex flex-col items-center gap-8 sm:gap-10 font-[Geist] text-[#101012]">
    <!-- Заголовок: «сонный» типинг -->
    <div class="w-full max-w-[1184px] pt-10 sm:pt-16 px-4">
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
    <div class="w-full max-w-[1184px] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 px-4">
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
    <div class="w-full px-4">
      <div class="h-px bg-zinc-200/70 fade-in" :class="{ on: reveal }" style="--d:300ms"></div>
    </div>

    <!-- 2 проекта (с новым hover-эффектом) -->
    <div class="w-full max-w-[1184px] px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        <div class="card-in" :class="{ on: reveal }" style="--d:360ms">
          <div
            class="img-card"
            @mousemove="tilt"
            @mouseleave="resetTilt"
          >
            <div class="img-card__3d">
              <img :src="project1" alt="" class="img-card__media" draggable="false" />
            </div>
          </div>
        </div>

        <div class="card-in" :class="{ on: reveal }" style="--d:420ms">
          <div
            class="img-card"
            @mousemove="tilt"
            @mouseleave="resetTilt"
          >
            <div class="img-card__3d">
              <img :src="project2" alt="" class="img-card__media" draggable="false" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- заголовок секции -->
    <div class="w-full max-w-[1184px] pt-8 sm:pt-12 px-4">
      <h3 class="text-[26px] sm:text-[34px] md:text-[42px] leading-tight font-medium not-italic" aria-label="Без рисков и догадок. Только результат">
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
    <div class="w-full max-w-[1184px] px-4">
      <div class="mockup">
        <img :src="img1" alt="" class="mock-piece p1" :class="{ on: reveal }" draggable="false" />
        <img :src="img2" alt="" class="mock-piece p2" :class="{ on: reveal }" draggable="false" />
        <img :src="img3" alt="" class="mock-piece p3" :class="{ on: reveal }" draggable="false" />
      </div>
    </div>

    <!-- подзаголовок CTA -->
    <div class="w-full max-w-[1184px] text-[15px] sm:text-base md:text-xl leading-tight px-4">
      <p class="clip-in" :class="{ on: reveal }" style="--d:600ms">
        Получите бесплатную концепцию дизайна в тот же день
      </p>
      <p class="clip-in text-zinc-500" :class="{ on: reveal }" style="--d:660ms">
        Чтобы быть уверенным, что Вам точно понравится
      </p>
    </div>

    <!-- две карточки (тоже с новым hover) -->
    <div class="w-full max-w-[1184px] grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 px-4">
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

    <!-- нижний разделитель -->
    <div class="w-full px-4">
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

// типинг заголовков
const title = 'Кому подойдёт'
const subTitle = 'Без рисков и догадок Только результат'
const titleChars = title.split('')
const subTitleChars = subTitle.split('')

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
onBeforeUnmount(() => { io?.disconnect() })

/* ===== Hover 3D (курсор) для img-card ===== */
function tilt(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width  - 0.5 // -0.5..0.5
  const py = (e.clientY - rect.top)  / rect.height - 0.5

  const rx = (-py) * 8  // наклон по X (вперёд/назад)
  const ry = ( px) * 10 // наклон по Y (влево/вправо)
  const tx = (-px) * 12 // параллакс картинки
  const ty = (-py) * 12

  card.style.setProperty('--rx', `${rx}deg`)
  card.style.setProperty('--ry', `${ry}deg`)
  card.style.setProperty('--tx', `${tx}px`)
  card.style.setProperty('--ty', `${ty}px`)
  card.style.setProperty('--gx', `${(px+0.5)*100}%`) // позиция блика
  card.style.setProperty('--gy', `${(py+0.5)*100}%`)
}
function resetTilt(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  card.style.setProperty('--rx', `0deg`)
  card.style.setProperty('--ry', `0deg`)
  card.style.setProperty('--tx', `0px`)
  card.style.setProperty('--ty', `0px`)
}
</script>

<style scoped>
/* ===== появление (как раньше) ===== */
.dream-in{
  opacity:0; transform: translateY(12px) scale(.985); filter: blur(8px);
  transition: opacity .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .7s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .6s ease var(--d,0ms);
}
.dream-in.on{ opacity:1; filter: blur(0); transform: translateY(0) scale(1); }
.fade-in{ opacity:0; transition: opacity .6s ease var(--d,0ms) }
.fade-in.on{ opacity:1 }

/* карточки-проекты — адаптивные высоты */
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
.card-in.on{ opacity:1; filter: blur(0); transform: translateY(0) scale(1); }

/* боксы снизу (контейнер уже есть) */
.box-in{
  border-radius: 24px; background:#F7F8FA; border:1px solid #eee; padding: 10px;
  opacity:0; transform: translateY(16px) scale(.98); filter: blur(8px);
  transition: opacity .75s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0ms),
             filter .7s ease var(--d,0ms);
}
.box-in.on{ opacity:1; filter: blur(0); transform: translateY(0) scale(1); }

/* ===== НОВЫЙ HOVER-ЭФФЕКТ для картинок ===== */
.img-card{
  position: relative;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
  transform-style: preserve-3d;
  transition: box-shadow .25s ease, border-color .25s ease, transform .25s ease;
  /* переменные по умолчанию */
  --rx: 0deg; --ry: 0deg; --tx: 0px; --ty: 0px; --gx: 50%; --gy: 50%;
}
.card-in .img-card, .box-in .img-card{ border: none; box-shadow: none; } /* не дублировать рамки */
.img-card:hover{
  box-shadow: 0 16px 40px rgba(0,0,0,.12);
  border-color: transparent;
}

/* 3D слой: наклон по переменным */
.img-card__3d{
  height: 100%;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition: transform .12s ease-out;
}

/* само изображение — лёгкий параллакс и зум */
.img-card__media{
  width: 100%; height: 100%;
  object-fit: cover;
  transform: translate3d(var(--tx), var(--ty), 0) scale(1);
  transition: transform .35s cubic-bezier(.2,.8,.2,1);
  will-change: transform;
}
.img-card:hover .img-card__media{ transform: translate3d(var(--tx), var(--ty), 0) scale(1.04); }
.img-card__media.contain{ object-fit: contain; background:#fff; }

/* бликующая маска — «glare» (едет к курсору) */
.img-card::after{
  content: '';
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    radial-gradient(600px 320px at var(--gx) var(--gy),
      rgba(255,255,255,.18), rgba(255,255,255,0) 60%);
  opacity: 0; transition: opacity .25s ease;
}
.img-card:hover::after{ opacity: 1; }

/* большой мокап (как раньше, с мобильными правками) */
.mockup{
  position: relative;
  height: 340px;
  border-radius: 24px; overflow: hidden;
  border: 1px solid #eee; background:#F7F8FA;
}
@media (min-width: 640px){ .mockup{ height: 420px } }
@media (min-width: 768px){ .mockup{ height: 520px } }
@media (min-width: 1024px){ .mockup{ height: 540px } }

.mock-piece{
  position:absolute; pointer-events:none; user-select:none;
  filter: drop-shadow(0 12px 28px rgba(0,0,0,.12));
  opacity:0;
  transition: opacity .9s cubic-bezier(.2,.75,.2,1) var(--d,0ms),
             transform .9s cubic-bezier(.2,.75,.2,1) var(--d,0ms);
}
.p1{ bottom:0; left:6%;  width:28%; transform: translate(-60px, -40px) scale(.92); transition-delay: .22s; }
.p2{ bottom:8px; left:28%; width:38%; transform: translate( 80px, -60px) scale(.92); transition-delay: .26s; }
.p3{ bottom:0; left:48%; width:48%; transform: translate(140px, 80px)  scale(.92); transition-delay: .30s; }
@media (max-width: 639px){
  .p1{ bottom:0; left:2%;  width:36%; transform: translate(-28px, -18px) scale(.94); }
  .p2{ bottom:6px; left:24%; width:52%; transform: translate( 36px, -26px)  scale(.94); }
  .p3{ bottom:0; left:50%; width:60%; transform: translate( 56px,  34px)  scale(.94); }
}
.mock-piece.on{ opacity:1; transform: translate(0,0) scale(1); }

/* типинг букв */
.type-line { white-space: pre; }
.letter{ display:inline-block; opacity:0; transform: translateY(12px) scale(.985); filter: blur(8px); }
.letter.space{ width:.35em; opacity:1; transform:none; filter:none; }
.letter.on{ animation: dream-in .7s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes dream-in{
  0%{ opacity:0; filter:blur(8px); transform:translateY(12px) scale(.985) }
  65%{ opacity:1; filter:blur(0); transform:translateY(-2px) scale(1.01) }
  100%{ opacity:1; filter:blur(0); transform:translateY(0) scale(1) }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce){
  .img-card__3d{ transition: none !important; transform: none !important; }
  .img-card__media{ transition: none !important; transform: none !important; }
  .img-card::after{ display:none }
}
</style>
