<template>
  <section class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-10 md:py-14 border-y border-zinc-200/70">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
        <!-- 1 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon1" alt="Погрузимся в проект" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            Погрузимся в проект
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            проведём исследования и дадим рекомендации
          </p>
        </article>

        <!-- 2 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon2" alt="ТЗ и план" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            Сами напишем техническое задание
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            согласуем его, подготовим оценку и составим роадмап проекта
          </p>
        </article>

        <!-- 3 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon3" alt="Соберём команду" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            Соберём команду, которая уже работала в нише
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            и имеет наиболее релевантный опыт
          </p>
        </article>

        <!-- 4 -->
        <article class="flex flex-col items-start gap-3 text-left">
          <img :src="icon4" alt="Концепции и правки" class="h-7 w-7 object-contain" />
          <h3 class="text-[18px] md:text-[20px] leading-6 font-medium text-[#101012]">
            Предложим несколько вариантов концепции
          </h3>
          <p class="text-[15px] leading-6 text-zinc-500">
            и до 3 итераций правок
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import icon1 from '@/assets/icons/process-1.svg'
import icon2 from '@/assets/icons/process-2.svg'
import icon3 from '@/assets/icons/process-3.svg'
import icon4 from '@/assets/icons/process-4.svg'
</script>

<style scoped>
.container { max-width: 1144px; }
</style>
