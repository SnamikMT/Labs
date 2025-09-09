<template>
  <section class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-10 md:py-14 border-y border-zinc-200/70">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
        <!-- 1 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon1" alt="Маркетинг" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            Маркетолог проведёт анализ по нише
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            и будет работать совместно с дизайнерами
          </p>
        </article>

        <!-- 2 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon2" alt="Команда разработчиков" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            Подключим команду разработчиков
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            и создадим всё полностью под ключ
          </p>
        </article>

        <!-- 3 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon3" alt="Персональный менеджер" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            Персональный менеджер <span class="font-normal text-zinc-500">ответит</span>
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            на любые вопросы даже ночью
          </p>
        </article>

        <!-- 4 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon4" alt="2D и 3D художники" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            2D и 3D художники
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            создадут бескомпромиссный визуал
          </p>
        </article>
      </div>
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
.container { max-width: 1144px; }
</style>
