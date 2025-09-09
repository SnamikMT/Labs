<template>
  <!-- full-bleed: тянется на всю ширину окна -->
  <div class="relative w-screen select-none" :class="bleedFix">
    <!-- вьюпорт -->
    <div
      ref="viewport"
      class="overflow-x-hidden overflow-y-visible"
      @mouseenter="pause" @mouseleave="play"
      @touchstart.passive="pause" @touchend.passive="play"
    >
      <!-- лента -->
      <div
        ref="track"
        class="flex will-change-transform"
        :style="{
          gap: gap + 'px',
          transform: `translateX(${tx}px)`,
          transition: dragging ? 'none' : 'transform .5s ease'
        }"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp" @pointercancel="onUp" @pointerleave="onUp"
      >
        <template v-for="(src, i) in looped" :key="i">
          <div class="shrink-0" :style="{ width: slideW + 'px' }">
            <!-- карточка БЕЗ фона и БЕЗ границ -->
            <div
              class="relative h-[420px] md:h-[520px] rounded-t-[32px] overflow-hidden"
              :style="cardStyle(i)"
              @click="onCardClick(i)"
            >
              <img
                :src="src"
                alt=""
                draggable="false"
                class="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- full-bleed: тянется на всю ширину окна -->
<div class="relative w-screen select-none" :class="bleedFix">
  <!-- viewport + track ... как у тебя -->

  <!-- нижний фейд/шум -->
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-x-0 bottom-0 h-[96px] md:h-[140px]"
  >
    <!-- белый градиент вверх -->
    <div class="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/0"></div>

    <!-- мягкая зернистость “белый шум” -->
    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <filter id="grain">
        <!-- генерим шум -->
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
        <!-- делаем его нейтрально-серым -->
        <feColorMatrix type="saturate" values="0" />
        <!-- приглушаем альфу, чтобы шум был деликатным -->
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.08" />
        </feComponentTransfer>
      </filter>
      <!-- рисуем прямоугольник с фильтром; слой лёгкий -->
      <rect width="100%" height="100%" filter="url(#grain)" fill="#fff" opacity="0.35" />
    </svg>
  </div>
</div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

/** Можно передать свои картинки через :images="[]" */
const props = defineProps<{ images?: string[] }>()

/** демо-картинки — замени на свои либо прокинь пропсом */
import img1 from '~/assets/img/slider/1.jpg'
import img2 from '~/assets/img/slider/2.jpg'
import img3 from '~/assets/img/slider/3.jpg'
const imgs = computed(() => props.images?.length ? props.images : [img1, img2, img3])

/** тройной массив для бесконечного листания, стартуем из середины */
const looped = computed(() => [...imgs.value, ...imgs.value, ...imgs.value])

const viewport = ref<HTMLDivElement|null>(null)
const slideW   = ref(0)
const gap      = 24
const tx       = ref(0)
const index    = ref(0) // индекс в looped
const dragging = ref(false)
let startX = 0, startTx = 0

// если компонент стоит внутри контейнера с паддингами — чуть «выползем» наружу
const bleedFix = '-ml-[50vw] left-1/2 relative'; // center + full-bleed

/** активный индекс в пределах оригинального массива */
const realIndex = computed(() => {
  const len = imgs.value.length
  return ((index.value % len) + len) % len
})

// сколько «торчит» сосед с каждой стороны (адаптивно от ширины окна)
function peekByW(vw: number) {
  const PEEK_VW = 0.12;                 // 12% экрана на сторону — можно увеличить/уменьшить
  const p = Math.round(vw * PEEK_VW);
  return Math.max(36, Math.min(p, 240)); // границы безопасности
}

const peek = ref(28)
const step = ref(0)

function measure() {
  if (!viewport.value) return
  const vw = window.innerWidth            // было viewport.offsetWidth
  peek.value = peekByW(vw)
  slideW.value = Math.max(300, vw - 2 * peek.value)
  step.value   = slideW.value + gap
  // ширину вьюпорта держим = ширине окна для full-bleed
  viewport.value.style.width = vw + 'px'
  apply()
}


function apply() {
  const vw = viewport.value?.offsetWidth ?? 0
  const centerGap = (vw - slideW.value) / 2
  tx.value = centerGap - index.value * step.value
}

/** стиль: лёгкий наклон соседей */
function cardStyle(i:number) {
  const d = Math.max(-1, Math.min(1, i - index.value)) // -1, 0, 1
  const rot = d * 5
  const sc  = d === 0 ? 1 : 0.985
  return {
    transform: `rotate(${rot}deg) scale(${sc})`,
    transition: dragging.value ? 'none' : 'transform .5s ease'
  }
}

/** клики по «уголкам» */
function onCardClick(i:number) {
  if (i < index.value) prev()
  else if (i > index.value) next()
}

function next() {
  index.value++
  if (index.value >= imgs.value.length * 2) index.value = imgs.value.length
  apply()
}
function prev() {
  index.value--
  if (index.value < imgs.value.length - 1) index.value = imgs.value.length - 1
  apply()
}
function go(i:number) {
  index.value = imgs.value.length + i
  apply()
}

/** autoplay */
let timer: number | null = null
function play() { if (!timer) timer = window.setInterval(next, 3500) }
function pause() { if (timer) { window.clearInterval(timer); timer = null } }

/** drag */
function onDown(e: PointerEvent) {
  dragging.value = true
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  startX = e.clientX
  startTx = tx.value
  pause()
}
function onMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - startX
  tx.value = startTx + dx
}
function onUp() {
  if (!dragging.value) return
  dragging.value = false
  const vw = viewport.value?.offsetWidth ?? 0
  const centerGap = (vw - slideW.value) / 2
  const raw = (-(tx.value - centerGap)) / step.value
  index.value = Math.round(raw)
  apply()
  play()
}

onMounted(() => {
  index.value = imgs.value.length // середина
  // делаем вьюпорт шириной окна
  if (viewport.value) viewport.value.style.width = window.innerWidth + 'px'
  measure()
  play()
  window.addEventListener('resize', () => {
    if (viewport.value) viewport.value.style.width = window.innerWidth + 'px'
    measure()
  })
})
onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', measure)
})
watch(imgs, () => {
  index.value = imgs.value.length
  measure()
})
</script>
