<template>
  <!-- full-bleed -->
  <div class="relative w-screen select-none" :class="bleedFix">
    <div
      ref="viewport"
      class="overflow-x-hidden overflow-y-hidden"
      @mouseenter="pause" @mouseleave="play"
      @touchstart.passive="pause" @touchend.passive="play"
    >
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
            <!-- ВАЖНО: карточке задаём высоту, внутрянка без absolute -->
            <div
              class="rounded-t-[32px] overflow-hidden bg-white grid place-items-center"
              :style="Object.assign({ height: cardH + 'px' }, cardStyle(i))"
              @click="onCardClick(i)"
            >
              <img
                :src="src"
                alt=""
                draggable="false"
                class="block max-w-full max-h-full w-full h-full object-contain object-center pointer-events-none p-3 sm:p-4"
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- нижний фейд + лёгкий шум -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[84px] sm:h-[120px]"
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

const props = defineProps<{ images?: string[] }>()

import img1 from '~/assets/img/slider/11.jpg'
import img2 from '~/assets/img/slider/22.jpg'
import img3 from '~/assets/img/slider/33.jpg'
const imgs = computed(() => props.images?.length ? props.images : [img1, img2, img3])
const looped = computed(() => [...imgs.value, ...imgs.value, ...imgs.value])

const viewport = ref<HTMLDivElement|null>(null)
const slideW   = ref(0)
const cardH    = ref(0)
const gap      = 24
const tx       = ref(0)
const index    = ref(0)
const dragging = ref(false)
let startX = 0, startTx = 0

const bleedFix = '-ml-[50vw] left-1/2 relative'

function peekByW(vw: number) {
  const isMobile = vw < 640
  const PEEK_VW = isMobile ? 0.06 : 0.14
  const p = Math.round(vw * PEEK_VW)
  return Math.max(24, Math.min(p, 300))
}
const peek = ref(48)
const step = ref(0)

function measure() {
  if (!viewport.value) return
  const vw = window.innerWidth
  peek.value   = peekByW(vw)
  slideW.value = Math.max(300, vw - 2 * peek.value)
  step.value   = slideW.value + gap
  viewport.value.style.width = vw + 'px'

  // адаптивная высота карточки (без кропа)
  const h = Math.min(Math.max(Math.round(vw * 0.56), 260), 740)
  cardH.value = h

  apply()
}
function apply() {
  const vw = viewport.value?.offsetWidth ?? 0
  const centerGap = (vw - slideW.value) / 2
  tx.value = centerGap - index.value * step.value
}
function cardStyle(i:number) {
  const d = Math.max(-1, Math.min(1, i - index.value))
  const rot = d * 4.5
  const sc  = d === 0 ? 1 : 0.987
  return {
    transform: `rotate(${rot}deg) scale(${sc})`,
    transition: dragging.value ? 'none' : 'transform .5s ease'
  }
}
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

let timer: number | null = null
function play() { if (!timer) timer = window.setInterval(next, 3500) }
function pause() { if (timer) { window.clearInterval(timer); timer = null } }

function onDown(e: PointerEvent) {
  dragging.value = true
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  startX = e.clientX
  startTx = tx.value
  pause()
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
function onResize() {
  if (viewport.value) viewport.value.style.width = window.innerWidth + 'px'
  measure()
}

onMounted(() => {
  index.value = imgs.value.length
  if (viewport.value) viewport.value.style.width = window.innerWidth + 'px'
  measure()
  play()
  window.addEventListener('resize', onResize, { passive: true })
})
onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', onResize)
})
watch(imgs, () => {
  index.value = imgs.value.length
  measure()
})
</script>
