<template>
  <section ref="root" class="w-full bg-white">
    <div class="container mx-auto px-4 md:px-8 py-8 md:py-10">
      <!-- верхняя линия -->
      <div
        class="h-px bg-zinc-200/70 transition-opacity duration-700"
        :class="reveal ? 'opacity-100' : 'opacity-0'"
      />

      <!-- один ряд логотипов -->
      <div class="relative">
        <!-- маски краёв при прокрутке -->
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent"
        />
        <div
          class="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent"
        />

        <ul
          class="mt-6 md:mt-8 flex items-center justify-between gap-6 md:gap-10 lg:gap-14
                 overflow-x-auto flex-nowrap no-scrollbar"
        >
          <li
            v-for="(logo, i) in logos"
            :key="i"
            class="shrink-0 transition-all duration-700 ease-out will-change-transform"
            :style="{ transitionDelay: `${80 * (i + 1)}ms` }"
            :class="reveal ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[.98]'"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="logo-muted h-8 md:h-10 lg:h-12 w-auto max-w-[120px] object-contain select-none"
              draggable="false"
            />
          </li>
        </ul>
      </div>

      <!-- нижняя линия -->
      <div
        class="mt-6 md:mt-8 h-px bg-zinc-200/70 transition-opacity duration-700"
        :class="reveal ? 'opacity-100' : 'opacity-0'"
        :style="{ transitionDelay: `${80 * (logos.length + 1)}ms` }"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import shell     from '@/assets/icons/partners/shell_2Yjlflk.svg'
import lumenis   from '@/assets/icons/partners/Frame 2087326090.svg'
import xlash     from '@/assets/icons/partners/Frame 2087326088.svg'
import toyota    from '@/assets/icons/partners/VIS_toyota_logo_horiz_black_RGB_2021 1.svg'
import mercedes  from '@/assets/icons/partners/Frame.svg'
import skyeng    from '@/assets/icons/partners/Skyeng Base 1.svg'
import economica from '@/assets/icons/partners/logo-economica 1.svg'
import misis     from '@/assets/icons/partners/Frame 2087326089.svg'

const logos = [
  { src: shell,     alt: 'Shell' },
  { src: lumenis,   alt: 'Lumenis' },
  { src: xlash,     alt: 'XLASH' },
  { src: toyota,    alt: 'Toyota' },
  { src: mercedes,  alt: 'Mercedes-Benz' },
  { src: skyeng,    alt: 'Skyeng' },
  { src: economica, alt: 'Экономика Москвы' },
  { src: misis,     alt: 'MISIS University' },
]

const root = ref(null)
const reveal = ref(false)
let io = null

onMounted(() => {
  if (!('IntersectionObserver' in window) || !root.value) {
    reveal.value = true
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        reveal.value = true
        io?.disconnect()
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  )
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<style scoped>
.container { max-width: 1144px; }

/* приглушённые логотипы как на макете */
.logo-muted {
  filter: grayscale(1);
  opacity: .55;
  transition: opacity .2s ease;
}
.logo-muted:hover { opacity: .75; }

/* скрыть скроллбар (чтобы одна строка выглядела чисто на телефоне) */
.no-scrollbar {
  scrollbar-width: none; /* Firefox */
}
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>
