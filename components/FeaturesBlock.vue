<template>
  <section class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-10 md:py-14">
      <!-- верхний разделитель -->
      <div aria-hidden="true" class="h-px bg-zinc-200/70"></div>

      <!-- контент -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 py-8 md:py-[64px]">
        <!-- 1 -->
        <article class="flex flex-col items-start gap-0 text-left">
          <img :src="icon1" alt="Маркетинг" class="h-7 w-7 object-contain" />
          <h3 class="mt-4 text-[18px] md:text-[18px] leading-tight font-medium text-[#101012]">
            Маркетолог проведёт анализ по нише
          </h3>
          <p class="mt-0 text-[18px] leading-tight text-zinc-500">
            и будет работать совместно с дизайнерами
          </p>
        </article>

        <!-- 2 -->
        <article class="flex flex-col items-start gap-0 text-left">
          <img :src="icon2" alt="Команда разработчиков" class="h-7 w-7 object-contain" />
          <h3 class="mt-4 text-[18px] md:text-[18px] leading-tight font-medium text-[#101012]">
            Подключим команду разработчиков
          </h3>
          <p class="mt-0 text-[18px] leading-tight text-zinc-500">
            и создадим всё полностью под ключ
          </p>
        </article>

        <!-- 3 -->
        <article class="flex flex-col items-start gap-0 text-left">
          <img :src="icon3" alt="Персональный менеджер" class="h-7 w-7 object-contain" />
          <h3 class="mt-4 text-[18px] md:text-[18px] leading-tight font-medium text-[#101012]">
            Персональный менеджер <span class="font-medium text-zинc-500">ответит</span>
          </h3>
          <p class="mt-0 text-[18px] leading-tight text-zinc-500">
            на любые вопросы даже ночью
          </p>
        </article>

        <!-- 4 -->
        <article class="flex flex-col items-start gap-0 text-left">
          <img :src="icon4" alt="2D и 3D художники" class="h-7 w-7 object-contain" />
          <h3 class="mt-4 text-[18px] md:text-[18px] leading-tight font-medium text-[#101012]">
            2D и 3D художники
          </h3>
          <p class="mt-0 text-[18px] leading-tight text-zinc-500">
            создадут бескомпромиссный визуал
          </p>
        </article>
      </div>

      <!-- нижний разделитель c инсетами 64px -->
      <div aria-hidden="true" class="h-px bg-zinc-200/70"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// жёсткие импорты твоих SVG-файлов
import icon1 from '@/assets/feature/megaphone.svg'
import icon2 from '@/assets/feature/dev-team.svg'
import icon3 from '@/assets/feature/manager.svg'
import icon4 from '@/assets/feature/artists.svg'
</script>

<style scoped>
.container { max-width: 1184px; }
</style>
