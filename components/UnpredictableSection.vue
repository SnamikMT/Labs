<template>
  <section class="bg-white">
    <div class="container mx-auto px-4 md:px-8 py-14 md:py-20">
      <!-- заголовок -->
      <h2
        class="text-[#101012] font-normal not-italic font-[Geist]
               text-[34px] sm:text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] mb-10 md:mb-12"
      >
        Учтём даже то,<br/>что нельзя предугадать
      </h2>

      <!-- две карточки одинакового размера -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <!-- left card -->
        <figure class="space-y-3">
          <div
            class="rounded-[28px] overflow-hidden bg-white border border-zinc-100
                   shadow-[0_8px_30px_rgba(0,0,0,.06)]
                   h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px]"
          >
            <img
              :src="imgResponsive"
              alt="Адаптивные экраны"
              class="block w-full h-full object-cover select-none pointer-events-none"
              draggable="false"
            />
          </div>
          <figcaption class="text-[15px] leading-6">
            <span class="font-medium text-[#101012]">
              Адаптируем лендинг под каждое устройство,
            </span>
            <span class="text-zinc-500">
              &nbsp;чтобы конверсия была космической
            </span>
          </figcaption>
        </figure>

        <!-- right card -->
        <figure class="space-y-3">
          <div
            class="rounded-[28px] overflow-hidden bg-[#F2F3F6] border border-zinc-100
                   shadow-[0_8px_30px_rgba(0,0,0,.06)]
                   h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px]
                   flex items-center justify-center p-6 md:p-10"
          >
            <img
              :src="imgSpeed"
              alt="Скорость загрузки 91%"
              class="block max-w-full max-h-full object-contain select-none pointer-events-none"
              draggable="false"
            />
          </div>
          <figcaption class="text-[15px] leading-6">
            <span class="font-medium text-[#101012]">
              Оптимизируем сайт для мгновенной работы,
            </span>
            <span class="text-zinc-500">
              &nbsp;чтобы ни один пользователь не ждал загрузку
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import imgResponsive from '@/assets/img/consider/responsive.png'
import imgSpeed      from '@/assets/img/consider/speed-91.png'
</script>

<style scoped>
.container { max-width: 1144px; }
</style>
