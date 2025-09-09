<template>
  <div class="self-stretch p-7 bg-[#FFFFFF] rounded-3xl outline outline-[0.75px] outline-offset-[-0.75px] outline-Border-Neutral-Base/10 backdrop-blur-md flex flex-col gap-4 overflow-hidden">
    <div class="flex items-center gap-3">
      <div class="relative">
        <!-- круг с дугой прогресса -->
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#a)">
            <path d="M16.0001 2.35718C17.9042 2.35718 19.7898 2.73223 21.549 3.46092C23.3082 4.18962 24.9067 5.25768 26.2531 6.60413C27.5996 7.95058 28.6676 9.54905 29.3963 11.3083C30.125 13.0675 30.5001 14.953 30.5001 16.8572" stroke="var(--Labels-Brand-Primary, #007AFF)" stroke-width="3" stroke-linecap="round"/>
          </g>
          <path d="M16 2.35718C24.0081 2.35718 30.5 8.84905 30.5 16.8572C30.5 24.8653 24.0081 31.3572 16 31.3572C7.99187 31.3572 1.5 24.8653 1.5 16.8572C1.5 8.84905 7.99187 2.35718 16 2.35718Z" stroke="var(--Labels-Brand-Primary, #007AFF)" stroke-opacity="0.3" stroke-width="3"/>
          <defs><clipPath id="a"><path d="M0 16.8572C0 8.02062 7.16344 0.857178 16 0.857178C24.8366 0.857178 32 8.02062 32 16.8572C32 25.6937 24.8366 32.8572 16 32.8572C7.16344 32.8572 0 25.6937 0 16.8572Z" fill="#fff"/></clipPath></defs>
        </svg>
      </div>
      <div class="flex-1">
        <div class="text-Text-Neutral-Strong-Solid text-lg font-medium leading-none">Этапы оплаты</div>
        <div class="text-Labels-Neutral-Secondary/70 text-xs leading-none">{{ paid }} из {{ total }}</div>
      </div>
    </div>

    <div class="p-7 bg-Backgrounds-Neutral-Secondary rounded-2xl relative overflow-hidden">
      <div class="absolute inset-x-0 -top-16 h-56 px-2 flex justify-between pointer-events-none">
        <div v-for="i in 18" :key="i" class="flex-1 origin-top-left rotate-90 outline outline-[0.53px] outline-offset-[-0.27px] outline-Border-Neutral-Base/10"></div>
      </div>

      <div class="w-full flex justify-center items-center gap-2">
        <div class="w-44 p-4 bg-Backgrounds-Neutral-Tertiary rounded-lg text-Text-Neutral-Strong-Solid text-base font-medium leading-none">{{ step1 }}</div>
        <div class="w-44 p-4 bg-Backgrounds-Neutral-Tertiary rounded-lg flex items-center gap-1.5">
          <div class="size-2 bg-Labels-Warning-Primary rounded-full"></div>
          <div class="w-24 text-Text-Neutral-Strong-Solid text-lg font-medium leading-none">{{ step2 }}</div>
        </div>
        <div class="w-44 p-4 bg-Backgrounds-Neutral-Tertiary rounded-lg text-Text-Neutral-Strong-Solid text-base font-medium leading-none">{{ step3 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  paid: string
  total: string
  step1: string
  step2: string
  step3: string
}>()
</script>
