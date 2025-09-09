<template>
  <div class="p-4 bg-Backgrounds-Neutral-Primary rounded-3xl backdrop-blur-3xl flex flex-col gap-2 overflow-hidden">
    <div class="text-Text-Neutral-Strong-Solid text-lg font-medium leading-none">История транзакций</div>

    <div class="py-2 border-b-[0.75px] border-Border-Neutral-Base/10 flex items-center text-Labels-Neutral-Secondary/70 text-xs font-medium">
      <div class="flex-1">Тип и время</div>
      <div class="flex-1">Сумма</div>
      <div class="flex-1 text-right">Баланс</div>
    </div>

    <div class="flex flex-col gap-[3px]">
      <div v-for="(row, i) in rows" :key="i" class="flex items-center gap-1.5 py-1.5">
        <div class="flex-1 flex items-center gap-2">
          <div class="size-7 p-[3px] rounded-full grid place-items-center"
               :class="row.badgeBg">
          </div>
          <div class="flex flex-col leading-none">
            <div class="text-Text-Neutral-Strong-Solid text-xs font-medium">{{ row.title }}</div>
            <div class="text-Text-Neutral-Soft-Solid text-[9px] font-medium">{{ row.time }}</div>
          </div>
        </div>
        <div class="flex-1">
          <div class="text-Labels-Neutral-Primary text-xs font-medium leading-none">{{ row.amount }}</div>
          <div class="text-Labels-Neutral-Secondary/70 text-[9px] font-medium leading-[9px]">{{ row.amountUsd }}</div>
        </div>
        <div class="flex-1 text-right">
          <div class="text-Text-Neutral-Strong-Solid text-xs font-medium leading-none">{{ row.balance }}</div>
          <div class="text-Text-Neutral-Soft-Solid text-[9px] font-medium leading-[9px]">{{ row.balanceUsd }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  {
    title: 'Кешбек', time: '14:09',
    amount: '2 000 ₽', amountUsd: '~$20.00',
    balance: '22 000,05 ₽', balanceUsd: '~$220.01',
    badgeBg: 'bg-Colors-Blue-100/10',
  },
  // добавь остальные строки по аналогии
]
</script>
