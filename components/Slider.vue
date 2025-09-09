<template>
  <!-- full-bleed на всю ширину окна -->
  <div class="relative w-screen select-none" :class="bleedFix">
    <!-- вьюпорт БЕЗ вертикального скролла -->
    <div
      ref="viewport"
      class="overflow-x-hidden overflow-y-hidden"
      @mouseenter="pause" @mouseleave="play"
      @touchstart.passive="pause" @touchend.passive="play"
    >
      <!-- лента -->
      <div
        ref="track"
        class="flex will-change-transform touch-pan-x"
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
            <!-- карточка БЕЗ фона/рамок, заметно выше -->
            <div
              class="relative h-[560px] sm:h-[640px] md:h-[740px] lg:h-[820px] xl:h-[900px]
                         rounded-t-[32px] overflow-hidden"
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

    <!-- нижний «белый шум» + плавный белый фейд -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] sm:h-[140px] md:h-[160px]"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/0"></div>
      <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.07" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" fill="#fff" opacity="0.28" />
      </svg>
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

// full-bleed фикса — выходим из контейнерных паддингов родителя
const bleedFix = '-ml-[50vw] left-1/2 relative'; // центрируем и растягиваем

/** активный индекс в пределах оригинального массива (если нужно) */
const realIndex = computed(() => {
  const len = imgs.value.length
  return ((index.value % len) + len) % len
})

// сколько «торчит» сосед с каждой стороны (чуть смелее, чтобы уголки виднее)
function peekByW(vw: number) {
  const PEEK_VW = 0.14;                 // 14% экрана на сторону
  const p = Math.round(vw * PEEK_VW);
  return Math.max(48, Math.min(p, 300)); // безопасные рамки
}

const peek = ref(48)
const step = ref(0)

function measure() {
  if (!viewport.value) return
  const vw = window.innerWidth
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

/** лёгкий наклон соседей */
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
  // чтобы при «высоком» слайдере страница не прокручивалась жестами во время драга
  e.preventDefault()
}
function onMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - startX
  tx.value = startTx + dx
  e.preventDefault()
}
function onUp(e?: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false
  const vw = viewport.value?.offsetWidth ?? 0
  const centerGap = (vw - slideW.value) / 2
  const raw = (-(tx.value - centerGap)) / step.value
  index.value = Math.round(raw)
  apply()
  play()
  if (e) e.preventDefault()
}

onMounted(() => {
  index.value = imgs.value.length // середина
  if (viewport.value) viewport.value.style.width = window.innerWidth + 'px'
  measure()
  play()
  window.addEventListener('resize', onResize, { passive: true })
})
onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', onResize)
})
function onResize() {
  if (viewport.value) viewport.value.style.width = window.innerWidth + 'px'
  measure()
}
watch(imgs, () => {
  index.value = imgs.value.length
  measure()
})
</script>
