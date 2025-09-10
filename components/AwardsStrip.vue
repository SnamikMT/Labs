<template>
  <section class="bg-white">
    <div class="container mx-auto px-4 md:px-8 mt-[64px]">
      <div class="h-px bg-zinc-200/70"></div>

      <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 py-10 md:py-12">
        <li class="flex flex-col items-center text-center gap-3">
          <img :src="gLogo"  alt="Google partner" class="h-8 w-auto" />
          <span class="text-sm text-zinc-500">Партнёры Google</span>
        </li>
        <li class="flex flex-col items-center text-center gap-3">
          <img :src="grav"   alt="Гравитация"      class="h-8 w-auto" />
          <span class="text-sm text-zinc-500">Премия “Гравитация”</span>
        </li>
        <li class="flex flex-col items-center text-center gap-3">
          <img :src="drush"  alt="Design Rush"     class="h-8 w-auto" />
          <span class="text-sm text-zinc-500">Design Rush Award</span>
        </li>
        <li class="flex flex-col items-center text-center gap-3">
          <img :src="beh"    alt="Behance"         class="h-8 w-auto" />
          <span class="text-sm text-zinc-500">Награда за лучший UI</span>
        </li>
        <li class="flex flex-col items-center text-center gap-3">
          <img :src="gsea"   alt="GSEA"            class="h-8 w-auto" />
          <span class="text-sm text-zinc-500">Премия “Прорыв года”</span>
        </li>
      </ul>

      <div class="h-px bg-zinc-200/70"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gLogo from '@/assets/awards/google.svg'
import grav  from '@/assets/awards/gravitation.svg'
import drush from '@/assets/awards/designrush.svg'
import beh   from '@/assets/awards/behance.svg'
import gsea  from '@/assets/awards/gsea.svg'
</script>

<style scoped>
.container { max-width: 1184px; }
</style>
